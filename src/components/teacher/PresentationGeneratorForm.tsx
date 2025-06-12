"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generatePresentationOutline, type GeneratePresentationOutlineInput, type GeneratePresentationOutlineOutput } from "@/ai/flows/generate-presentation-outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, AlertTriangle, Presentation, ListChecks, StickyNote } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the schema locally for client-side validation
const GeneratePresentationOutlineInputSchema = z.object({
  topic: z.string().min(1, "Topic is required.").describe('The main topic of the presentation.'),
  gradeLevel: z.string().optional().describe('The target grade level for the presentation (e.g., "Grade 5", "High School Physics").'),
  numSlides: z
    .number()
    .min(3, "Number of slides must be at least 3.")
    .max(15, "Number of slides cannot exceed 15.")
    .default(5)
    .describe('The desired number of content slides in the presentation (excluding title and thank you/Q&A slide).'),
});

type PresentationGeneratorFormData = GeneratePresentationOutlineInput;

export default function PresentationGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState<GeneratePresentationOutlineOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<PresentationGeneratorFormData>({
    resolver: zodResolver(GeneratePresentationOutlineInputSchema),
    defaultValues: {
      numSlides: 5, // Default number of slides
      topic: "",
      gradeLevel: "",
    },
  });

  const onSubmit: SubmitHandler<PresentationGeneratorFormData> = async (data) => {
    setIsLoading(true);
    setGeneratedOutline(null);
    setError(null);
    try {
      const result = await generatePresentationOutline(data);
      setGeneratedOutline(result);
      toast({
        title: "Presentation Outline Generated!",
        description: "The AI has successfully created a presentation outline.",
      });
      // Optionally reset: reset();
    } catch (e: any) {
      console.error("Error generating presentation outline:", e);
      setError(e.message || "Failed to generate presentation outline. Please try again.");
      toast({
        title: "Error Generating Outline",
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
          <CardTitle className="flex items-center"><Wand2 className="mr-2 h-6 w-6 text-primary" /> AI Presentation Outline Generator</CardTitle>
          <CardDescription>
            Enter a topic, target grade level, and desired number of slides. AI will generate a structured outline for your presentation.
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
              <Label htmlFor="topic">Presentation Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., The Water Cycle, Introduction to Python"
                {...register("topic")}
                disabled={isLoading}
              />
              {errors.topic && <p className="text-sm text-destructive mt-1">{errors.topic.message}</p>}
            </div>
            <div>
              <Label htmlFor="gradeLevel">Grade Level (Optional)</Label>
              <Input
                id="gradeLevel"
                placeholder="e.g., Grade 3, High School Chemistry"
                {...register("gradeLevel")}
                disabled={isLoading}
              />
              {errors.gradeLevel && <p className="text-sm text-destructive mt-1">{errors.gradeLevel.message}</p>}
            </div>
            <div>
              <Label htmlFor="numSlides">Number of Content Slides (3-15)</Label>
              <Controller
                name="numSlides"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value, 10))}
                    defaultValue={String(field.value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="numSlides">
                      <SelectValue placeholder="Select number of slides" />
                    </SelectTrigger>
                    <SelectContent>
                      {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
                        <SelectItem key={num} value={String(num)}>{num} Slides</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.numSlides && <p className="text-sm text-destructive mt-1">{errors.numSlides.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Outline...
                </>
              ) : (
                "Generate Presentation Outline"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {generatedOutline && (
        <Card className="mt-6 bg-secondary/10 border border-secondary">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center">
              <Presentation className="mr-2 h-6 w-6" /> Generated Outline: {generatedOutline.presentationTitle}
            </CardTitle>
            <CardDescription>
              Review the generated outline. You can copy this content to build your presentation slides.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {generatedOutline.slides.map((slide, index) => (
              <Card key={index} className="bg-background/70 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Slide {index + 1}: {slide.slideTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm flex items-center"><ListChecks className="mr-2 h-4 w-4 text-accent"/>Slide Content:</h4>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-foreground/90">
                      {slide.slideContent.map((point, pIndex) => (
                        <li key={pIndex}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  {slide.notes && (
                     <div>
                        <h4 className="font-semibold text-sm flex items-center"><StickyNote className="mr-2 h-4 w-4 text-accent"/>Speaker Notes:</h4>
                        <p className="text-xs italic text-muted-foreground pl-4">{slide.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4">
            <Button variant="outline" onClick={() => {setGeneratedOutline(null); reset();}} className="w-full sm:w-auto">
                Clear & Start New Outline
            </Button>
            <Button 
              variant="default" 
              onClick={() => navigator.clipboard.writeText(JSON.stringify(generatedOutline, null, 2))}
              className="w-full sm:w-auto"
            >
                Copy Outline (JSON)
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
