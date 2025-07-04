
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
import jsPDF from 'jspdf';
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LessonPlanFormData>({
    resolver: zodResolver(lessonPlanSchema),
    defaultValues: {
      topic: "",
      gradeLevel: "",
    },
  });

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
        title: !isBookmarked ? "Lesson Plan Bookmarked!" : "Bookmark Removed",
        description: "You can find your bookmarked plans in your library (feature coming soon).",
    });
  };

  const handleDownloadPdf = (plan: GenerateLessonPlanOutput | null) => {
    if (!plan) return;

    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4'
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPos = 30;

      const addText = (text: string, size: number, isBold = false) => {
          if (!text) return;
          if (yPos > doc.internal.pageSize.getHeight() - 40) {
              doc.addPage();
              yPos = 30;
          }
          doc.setFontSize(size);
          doc.setFont(undefined, isBold ? 'bold' : 'normal');
          const lines = doc.splitTextToSize(text, contentWidth);
          const textHeight = doc.getTextDimensions(lines).h;
          if (yPos + textHeight > doc.internal.pageSize.getHeight() - 30) {
             doc.addPage();
             yPos = 30;
          }
          doc.text(lines, margin, yPos);
          yPos += textHeight + 10;
      }
      
      const addSectionHeader = (text: string) => {
        yPos += 10;
        addText(text, 14, true);
        yPos += 5;
      }

      addText(plan.topic, 20, true);
      addText(`Grade: ${plan.gradeLevel} | Type: ${plan.lessonType || 'N/A'} | Duration: ${plan.learningDuration || 'N/A'}`, 10);
      yPos += 20;
      addSectionHeader("🎯 Learning Objective");
      addText(plan.learningObjective, 12);
      addSectionHeader("🧩 Lesson Breakdown");
      plan.lessonBreakdown.forEach(phase => {
        addText(`${phase.phase} (${phase.time})`, 11, true);
        addText(phase.activityDescription, 11);
      });
      addSectionHeader("🧰 Materials");
      plan.materials.forEach(material => {
          let materialText = `[${material.type}] ${material.name}`;
          if (material.description) materialText += ` - ${material.description}`;
          addText(materialText, 11);
      });
      addSectionHeader("♿ Accessibility Suggestions");
      plan.accessibilitySuggestions.forEach(suggestion => {
        addText(`- ${suggestion}`, 11);
      });

      const safeFilename = (plan.topic.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_') || 'lesson_plan').toLowerCase();
      
      doc.save(`${safeFilename}.pdf`);
      
      toast({
        title: "Download Starting...",
        description: `Your PDF "${safeFilename}.pdf" is being prepared.`,
      });

    } catch (error: any) {
      console.error("Failed to generate PDF:", error);
      toast({
        title: "PDF Generation Failed",
        description: error.message || "Could not create the PDF. Please check the console.",
        variant: "destructive",
      });
    }
  };


  const onSubmit: SubmitHandler<LessonPlanFormData> = async (data) => {
    setIsLoading(true);
    setGeneratedPlan(null);
    setIsBookmarked(false);
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

  return (
    <div className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
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
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
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
        </form>

        <div className="space-y-6">
            {isLoading ? (
            <Card>
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
            ) : generatedPlan ? (
            <Card className="bg-secondary/30">
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
                                    <Button variant="outline" size="icon" onClick={handleToggleBookmark}>
                                        <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-primary text-primary")} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>{isBookmarked ? "Remove Bookmark" : "Bookmark Plan"}</p></TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => handleDownloadPdf(generatedPlan)}>
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Download as PDF</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-5"]} className="w-full">
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
                        <AccordionItem value="item-5">
                            <AccordionTrigger className="text-lg font-semibold">🖼️ Visual Aids</AccordionTrigger>
                            <AccordionContent className="p-4 bg-background rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(generatedPlan.mediaSuggestions && generatedPlan.mediaSuggestions.length > 0) ? (
                                generatedPlan.mediaSuggestions.map((media, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-sm capitalize">{media.type}</CardTitle>
                                        <CardDescription className="text-xs">{media.altText}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Image
                                            src={media.url}
                                            alt={media.altText}
                                            width={400}
                                            height={250}
                                            className="rounded-md object-cover w-full aspect-video"
                                        />
                                    </CardContent>
                                </Card>
                                ))
                            ) : (
                                <p className="text-muted-foreground col-span-full text-center">No visual aids were suggested for this lesson plan.</p>
                            )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            ) : (
                !isLoading && (
                    <Card className="flex items-center justify-center min-h-[200px] border-dashed">
                        <div className="text-center p-8">
                            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Your Generated Lesson Plan Will Appear Here</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Fill out the form above to get started.
                            </p>
                        </div>
                    </Card>
                )
            )}
        </div>
    </div>
  );
}
