
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateLessonPlan, type GenerateLessonPlanInput, type GenerateLessonPlanOutput } from "@/ai/flows/generate-lesson-plan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, AlertTriangle, FileText, Image as ImageIcon, Video, FileQuestion, Link as LinkIcon, CheckSquare, Users, Lightbulb, School, Clock, Bookmark, Download, Sparkles, BookCopy, BrainCircuit, Microscope, Globe } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const lessonPlanSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
  gradeLevel: z.string().min(1, "Grade level is required."),
  lessonType: z.string().optional(),
  learningDuration: z.string().optional(),
});

type LessonPlanFormData = z.infer<typeof lessonPlanSchema>;

const lessonTypeOptions = [
  { value: "Direct Instruction", label: "Direct Instruction", icon: Users },
  { value: "Project-Based Learning", label: "Project-Based Learning", icon: Microscope },
  { value: "Flipped Classroom", label: "Flipped Classroom", icon: BookCopy },
  { value: "Inquiry-Based Learning", label: "Inquiry-Based Learning", icon: BrainCircuit },
];

const learningDurationOptions = [
  { value: "15 minutes", label: "15 Min" },
  { value: "30 minutes", label: "30 Min" },
  { value: "45 minutes", label: "45 Min" },
  { value: "1 hour", label: "1 Hour" },
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
    control,
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
    } catch (e: any) {
      setError(e.message || "Failed to generate lesson plan. Please try again.");
      toast({
        title: "Error Generating Lesson Plan",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderLoadingState = () => (
    <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
            <CardTitle>AI is thinking...</CardTitle>
            <CardDescription>Generating a comprehensive lesson plan based on your inputs. This may take a moment.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Wand2 className="h-16 w-16 text-primary animate-pulse" />
            <p className="text-muted-foreground">Building learning objectives...</p>
            <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
    </Card>
  );

  const renderOutput = () => generatedPlan && (
    <Card className="col-span-1 lg:col-span-2 bg-secondary/30">
        <CardHeader className="flex flex-row justify-between items-start">
            <div>
                <CardTitle className="text-xl font-headline">Generated Plan: {generatedPlan.topic}</CardTitle>
                <CardDescription>
                Grade: {generatedPlan.gradeLevel}
                {generatedPlan.lessonType && ` | Type: ${generatedPlan.lessonType}`}
                {generatedPlan.learningDuration && ` | Duration: ${generatedPlan.learningDuration}`}
                </CardDescription>
            </div>
            <div className="flex gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => toast({ title: "Bookmarked! (Placeholder)"})}><Bookmark className="h-4 w-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Bookmark Plan</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => toast({ title: "Downloaded! (Placeholder)"})}><Download className="h-4 w-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Download as PDF</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">🎯 Learning Objectives</AccordionTrigger>
                    <AccordionContent className="p-4 bg-background rounded-md">
                        <p className="text-foreground/90 text-base">{generatedPlan.learningObjective}</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold">🧩 Lesson Breakdown</AccordionTrigger>
                    <AccordionContent>
                        <div className="overflow-x-auto rounded-md border bg-background">
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
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-semibold">🧰 Required Materials</AccordionTrigger>
                    <AccordionContent className="p-4 bg-background rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedPlan.materials.map((material, index) => {
                            const Icon = materialTypeIcons[material.type.toLowerCase()] || materialTypeIcons.default;
                            return (
                                <Card key={index} className="flex items-start p-3">
                                    <Icon className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">{material.name}</p>
                                        <p className="text-xs text-muted-foreground capitalize">{material.type}</p>
                                        {material.link && (
                                            <a href={material.link.startsWith('placeholder://') ? '#' : material.link} target="_blank" rel="noopener noreferrer" className="block text-xs text-primary hover:underline truncate">
                                                {material.link.startsWith('placeholder://') ? 'Placeholder Link' : material.link}
                                            </a>
                                        )}
                                        {material.description && <p className="text-xs text-foreground/80 mt-1">{material.description}</p>}
                                    </div>
                                </Card>
                            );
                        })}
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-semibold">♿ Accessibility Suggestions</AccordionTrigger>
                    <AccordionContent className="p-4 bg-background rounded-md">
                        <ul className="list-disc list-inside space-y-2 text-foreground/90">
                            {generatedPlan.accessibilitySuggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Input Panel */}
            <Card className="col-span-1 sticky top-20">
                <CardHeader>
                <CardTitle className="flex items-center"><Wand2 className="mr-2 h-6 w-6" /> AI Lesson Assistant</CardTitle>
                <CardDescription>
                    Provide the details and let AI create a plan for you.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm flex items-start">
                            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" /> {error}
                        </div>
                    )}
                    <div>
                        <Label htmlFor="topic">Topic</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Input id="topic" placeholder="e.g., Photosynthesis" {...register("topic")} disabled={isLoading}/>
                                </TooltipTrigger>
                                <TooltipContent><p>Need help? Try 'Climate Change for Middle School'.</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {errors.topic && <p className="text-sm text-destructive mt-1">{errors.topic.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="gradeLevel">Grade Level</Label>
                        <Controller
                            name="gradeLevel"
                            control={control}
                            render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                <SelectTrigger id="gradeLevel">
                                    <SelectValue placeholder="Select grade level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Primary School</SelectLabel>
                                        <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                                        <SelectItem value="1st Grade">1st Grade</SelectItem>
                                        <SelectItem value="2nd Grade">2nd Grade</SelectItem>
                                        <SelectItem value="3rd Grade">3rd Grade</SelectItem>
                                        <SelectItem value="4th Grade">4th Grade</SelectItem>
                                        <SelectItem value="5th Grade">5th Grade</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Middle School</SelectLabel>
                                        <SelectItem value="6th Grade">6th Grade</SelectItem>
                                        <SelectItem value="7th Grade">7th Grade</SelectItem>
                                        <SelectItem value="8th Grade">8th Grade</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>High School</SelectLabel>
                                        <SelectItem value="9th Grade">9th Grade</SelectItem>
                                        <SelectItem value="10th Grade">10th Grade</SelectItem>
                                        <SelectItem value="11th Grade">11th Grade</SelectItem>
                                        <SelectItem value="12th Grade">12th Grade</SelectItem>
                                    </SelectGroup>
                                     <SelectGroup>
                                        <SelectLabel>Higher Education</SelectLabel>
                                        <SelectItem value="University Level">University</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            )}
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
                                    <SelectItem key={option.value} value={option.value}>
                                        <div className="flex items-center gap-2">
                                            <option.icon className="h-4 w-4" /> {option.label}
                                        </div>
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            )}
                        />
                    </div>

                    <div>
                        <Label>Learning Duration (Optional)</Label>
                        <Controller
                            name="learningDuration"
                            control={control}
                            render={({ field }) => (
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    {learningDurationOptions.map(option => (
                                        <Button key={option.value} type="button" variant={field.value === option.value ? "default" : "outline"} onClick={() => field.onChange(option.value)} disabled={isLoading}>
                                            <Clock className="mr-2 h-4 w-4"/> {option.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Wand2 className="mr-2 h-4 w-4" /> Generate Plan</>}
                    </Button>
                    <Button variant="secondary" disabled={isLoading} className="w-full" onClick={() => toast({ title: "Feeling lucky! (Placeholder)" })}>
                        <Sparkles className="mr-2 h-4 w-4" /> I'm Feeling Lucky
                    </Button>
                </CardFooter>
            </Card>

            {/* Output Panel */}
            <div className="col-span-1 lg:col-span-2">
                {isLoading ? renderLoadingState() : generatedPlan ? renderOutput() : (
                    <Card className="col-span-1 lg:col-span-2 flex items-center justify-center min-h-[400px] border-dashed">
                        <div className="text-center p-8">
                            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Your Generated Lesson Plan Will Appear Here</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Fill out the form on the left to get started.
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    </form>
  );
}
