import EssayGraderForm from "@/components/teacher/EssayGraderForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function TeacherGradingPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center font-headline">
          <ShieldCheck className="mr-3 h-8 w-8 text-primary" />
          AI-Assisted Grading
        </h1>
        <p className="text-muted-foreground mt-1">
          Use AI to help review and provide feedback on student essays and long-form responses.
        </p>
      </header>
      
      <EssayGraderForm />

      <Card>
        <CardHeader>
          <CardTitle>Important Considerations</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong>AI is an assistant:</strong> The AI-generated grade and feedback are suggestions. Always use your professional judgment for the final assessment.</p>
            <p><strong>Review and Edit:</strong> Carefully review the AI's output. Edit feedback for tone, accuracy, and specific relevance to your student and curriculum.</p>
            <p><strong>Bias Awareness:</strong> Be mindful of potential biases in AI models. Ensure fairness and equity in your grading practices.</p>
            <p><strong>Student Privacy:</strong> Ensure you have appropriate consent and follow institutional policies when using AI tools with student data.</p>
        </CardContent>
      </Card>
    </div>
  );
}
