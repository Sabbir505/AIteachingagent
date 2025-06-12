
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateLessonPlan, type GenerateLessonPlanInput, type GenerateLessonPlanOutput } from "@/ai/flows/generate-lesson-plan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, AlertTriangle, FileText, Image as ImageIcon, Video, FileQuestion, Link as LinkIcon, CheckSquare, Users, Lightbulb } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const lessonPlanSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
  gradeLevel: z.string().min(1, "Grade level is required."),
  lessonType: z.string().optional(),
  learningDuration: z.string().optional(),
});

type LessonPlanFormData = z.infer<typeof lessonPlanSchema>;

const lessonTypeOptions = [
  { value: "Direct Instruction", label: "Direct Instruction" },
  { value: "Project-Based Learning", label: "Project-Based Learning" },
  { value: "Flipped Classroom", label: "Flipped Classroom" },
  { value: "Inquiry-Based Learning", label: "Inquiry-Based Learning" },
  { value: "Collaborative Learning", label: "Collaborative Learning" },
];

const learningDurationOptions = [
  { value: "15 minutes", label: "15 Minutes" },
  { value: "30 minutes", label: "30 Minutes" },
  { value: "45 minutes", label: "45 Minutes" },
  { value: "1 hour", label: "1 Hour" },
  { value: "Multi-day unit", label: "Multi-day Unit" },
];

const materialTypeIcons: { [key: string]: React.ElementType } = {
  diagram: ImageIcon,
  quiz: FileQuestion,
  worksheet: FileText,
  video: Video,
  link: LinkIcon,
  interactive: CheckSquare,
  presentation: Users,
  default: Lightbulb,
};


export default function LessonGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GenerateLessonPlanOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control, // For Select components
  } = useForm<LessonPlanFormData>({
    resolver: zodResolver(lessonPlanSchema),
  });

  const onSubmit: SubmitHandler<LessonPlanFormData> = async (data) => {
    setIsLoading(true);
    setGeneratedPlan(null);
    setError(null);
    try {
      const result = await generateLessonPlan(data as GenerateLessonPlanInput);
      setGeneratedPlan(result);
      toast({
        title: "Lesson Plan Generated!",
        description: "The AI has successfully created a new lesson plan.",
      });
      // Do not reset form here, user might want to tweak and regenerate
      // reset(); 
    } catch (e: any) {      setError(e.message || "Failed to generate lesson plan. Please try again.");
      toast({
        title: "Error Generating Lesson Plan",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Wand2 className="mr-2 h-6 w-6 text-primary" /> AI Lesson Plan Generator</CardTitle>
          <CardDescription>
            Enter a topic, grade level, and optional details, and let AI assist you in creating a structured lesson plan.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Photosynthesis, The American Revolution"
                {...register("topic")}
                disabled={isLoading}
              />
              {errors.topic && <p className="text-sm text-destructive mt-1">{errors.topic.message}</p>}
            </div>
            <div>
              <Label htmlFor="gradeLevel">Grade Level</Label>
              <Input
                id="gradeLevel"
                placeholder="e.g., 5th Grade, High School Biology"
                {...register("gradeLevel")}
                disabled={isLoading}
              />
              {errors.gradeLevel && <p className="text-sm text-destructive mt-1">{errors.gradeLevel.message}</p>}
            </div>

            <div>
              <Label htmlFor="lessonType">Lesson Type (Optional)</Label>
              <Controller
                name="lessonType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <SelectTrigger id="lessonType">
                      <SelectValue placeholder="Select lesson type" />
                    </SelectTrigger>
                    <SelectContent>
                      {lessonTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.lessonType && <p className="text-sm text-destructive mt-1">{errors.lessonType.message}</p>}
            </div>

            <div>
              <Label htmlFor="learningDuration">Learning Duration (Optional)</Label>
               <Controller
                name="learningDuration"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <SelectTrigger id="learningDuration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {learningDurationOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.learningDuration && <p className="text-sm text-destructive mt-1">{errors.learningDuration.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Lesson Plan"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {generatedPlan && (
        <Card className="mt-6 bg-secondary/10 border border-secondary">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Generated Lesson Plan: {generatedPlan.topic}</CardTitle>
            <CardDescription>
              Grade: {generatedPlan.gradeLevel}
              {generatedPlan.lessonType && ` | Type: ${generatedPlan.lessonType}`}
              {generatedPlan.learningDuration && ` | Duration: ${generatedPlan.learningDuration}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">I. Learning Objective</h3>
              <p className="text-foreground/90 pl-2 border-l-4 border-primary py-1">{generatedPlan.learningObjective}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">II. Lesson Breakdown</h3>
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Phase</TableHead>
                      <TableHead className="w-[80px]">Time</TableHead>
                      <TableHead>Activity Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generatedPlan.lessonBreakdown.map((phase, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{phase.phase}</TableCell>
                        <TableCell>{phase.time}</TableCell>
                        <TableCell className="whitespace-pre-wrap">{phase.activityDescription}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">III. Accessibility Suggestions</h3>
              <ul className="list-disc list-inside space-y-1 pl-4 text-foreground/90">
                {generatedPlan.accessibilitySuggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">IV. Materials</h3>
              <ul className="space-y-2">
                {generatedPlan.materials.map((material, index) => {
                  const Icon = materialTypeIcons[material.type.toLowerCase()] || materialTypeIcons.default;
                  return (
                    <li key={index} className="flex items-start p-3 bg-background/50 rounded-md border">
                      <Icon className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{material.name}</span> (<span className="text-xs text-muted-foreground">{material.type}</span>)
                        {material.link && (
                          <a href={material.link.startsWith('placeholder://') ? '#' : material.link} target="_blank" rel="noopener noreferrer" className="block text-xs text-primary hover:underline truncate">
                            {material.link.startsWith('placeholder://') ? 'Placeholder Link' : material.link}
                          </a>
                        )}
                        {material.description && <p className="text-xs text-foreground/80 mt-0.5">{material.description}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </CardContent>
           <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4">
            <Button variant="outline" onClick={() => {setGeneratedPlan(null); reset();}} className="w-full sm:w-auto">
                Clear & Start New Plan
            </Button>
            <Button 
              variant="default" 
              onClick={() => navigator.clipboard.writeText(JSON.stringify(generatedPlan, null, 2))}
              className="w-full sm:w-auto"
            >
                Copy Plan as JSON
            </Button>
           </CardFooter>
        </Card>
      )}
    </div>
  );
}
