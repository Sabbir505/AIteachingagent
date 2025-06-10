"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createQuiz, type CreateQuizInput, type CreateQuizOutput } from "@/ai/flows/create-quiz";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, AlertTriangle, FileQuestion } from "lucide-react";

const quizGeneratorSchema = z.object({
  lessonPlan: z.string().min(50, "Lesson plan text must be at least 50 characters long."),
  numQuestions: z.coerce.number().min(1, "Must generate at least 1 question.").max(20, "Cannot generate more than 20 questions."),
});

type QuizGeneratorFormData = z.infer<typeof quizGeneratorSchema>;

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

interface GeneratedQuiz {
  questions: QuizQuestion[];
}


export default function QuizGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuizGeneratorFormData>({
    resolver: zodResolver(quizGeneratorSchema),
    defaultValues: {
      numQuestions: 5,
    }
  });

  const onSubmit: SubmitHandler<QuizGeneratorFormData> = async (data) => {
    setIsLoading(true);
    setGeneratedQuiz(null);
    setError(null);
    try {
      const result: CreateQuizOutput = await createQuiz(data as CreateQuizInput);
      try {
        const parsedQuiz: GeneratedQuiz = JSON.parse(result.quiz);
        if (!parsedQuiz.questions || !Array.isArray(parsedQuiz.questions)) {
          throw new Error("Invalid quiz format received from AI.");
        }
        setGeneratedQuiz(parsedQuiz);
        toast({
          title: "Quiz Generated!",
          description: `The AI has successfully created a ${parsedQuiz.questions.length}-question quiz.`,
        });
        reset();
      } catch (parseError) {
        console.error("Error parsing generated quiz:", parseError, "Raw AI output:", result.quiz);
        throw new Error("AI generated an invalid quiz format. Please try again or adjust the lesson plan input.");
      }
      
    } catch (e: any) {
      console.error("Error generating quiz:", e);
      setError(e.message || "Failed to generate quiz. Please try again.");
      toast({
        title: "Error Generating Quiz",
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
          <CardTitle className="flex items-center"><Wand2 className="mr-2 h-6 w-6 text-primary" /> AI Quiz Generator</CardTitle>
          <CardDescription>
            Paste your lesson plan content and specify the number of questions to generate an AI-powered quiz.
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
              <Label htmlFor="lessonPlan">Lesson Plan Content</Label>
              <Textarea
                id="lessonPlan"
                placeholder="Paste the full text of your lesson plan here..."
                {...register("lessonPlan")}
                rows={10}
                disabled={isLoading}
              />
              {errors.lessonPlan && <p className="text-sm text-destructive mt-1">{errors.lessonPlan.message}</p>}
            </div>
            <div>
              <Label htmlFor="numQuestions">Number of Questions (1-20)</Label>
              <Input
                id="numQuestions"
                type="number"
                min="1"
                max="20"
                {...register("numQuestions")}
                disabled={isLoading}
              />
              {errors.numQuestions && <p className="text-sm text-destructive mt-1">{errors.numQuestions.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {generatedQuiz && (
        <Card className="mt-6 bg-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center"><FileQuestion className="mr-2 h-6 w-6"/> Generated Quiz</CardTitle>
            <CardDescription>Review the AI-generated quiz questions below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {generatedQuiz.questions.map((q, index) => (
              <div key={index} className="p-4 border rounded-md bg-background shadow-sm">
                <p className="font-semibold mb-2">Question {index + 1}: {q.question}</p>
                <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                  {q.answers.map((ans, ansIndex) => (
                    <li key={ansIndex} className={cn(ansIndex === q.correctAnswerIndex && "font-bold text-green-600")}>
                      {ans} {ansIndex === q.correctAnswerIndex && "(Correct Answer)"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(JSON.stringify(generatedQuiz, null, 2))}>
                Copy Quiz (JSON)
            </Button>
           </CardFooter>
        </Card>
      )}
    </div>
  );
}
