import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ClipboardList, Edit3, CheckSquare, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for student's assignments
const assignments = [
  { id: "1", title: "Algebra Basics Quiz", subject: "Mathematics", dueDate: "2024-07-20", status: "Submitted", grade: "A" },
  { id: "2", title: "Essay: The Impact of AI", subject: "English", dueDate: "2024-07-25", status: "Pending Submission", grade: null },
  { id: "3", title: "Photosynthesis Project", subject: "Science", dueDate: "2024-08-01", status: "Graded", grade: "B+" },
  { id: "4", title: "History Short Answer Questions", subject: "History", dueDate: "2024-07-18", status: "Late", grade: null },
];

export default function StudentAssignmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Assignments</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Tasks & Quizzes</CardTitle>
          <CardDescription>Keep track of your assignments, due dates, and grades.</CardDescription>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <div className="text-center py-12">
              <Image 
                src="https://placehold.co/300x200.png" 
                alt="No assignments" 
                width={300} 
                height={200} 
                className="mx-auto mb-4 rounded-md"
                data-ai-hint="empty checklist tasks"
              />
              <h3 className="text-xl font-semibold mb-2">No Assignments Here!</h3>
              <p className="text-muted-foreground">Looks like you're all caught up. Great job!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="flex flex-col">
                  <CardHeader>
                     <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">{assignment.title}</CardTitle>
                        {assignment.status === "Submitted" || assignment.status === "Graded" ? 
                            <CheckSquare className="h-5 w-5 text-green-500" /> : 
                        assignment.status === "Late" ?
                            <AlertCircle className="h-5 w-5 text-destructive" /> :
                            <ClipboardList className="h-5 w-5 text-primary" />}
                     </div>
                    <CardDescription>{assignment.subject} - Due: {assignment.dueDate}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm">Status: 
                      <span className={`font-medium ml-1
                        ${assignment.status === 'Submitted' ? 'text-blue-600' :
                          assignment.status === 'Graded' ? 'text-green-600' :
                          assignment.status === 'Late' ? 'text-red-600' :
                          'text-yellow-600'}`}>
                        {assignment.status}
                      </span>
                    </p>
                    {assignment.grade && <p className="text-sm">Grade: <span className="font-bold">{assignment.grade}</span></p>}
                     <Image 
                        src={`https://placehold.co/300x150.png?text=${encodeURIComponent(assignment.subject)}`}
                        alt={assignment.title}
                        width={300}
                        height={150}
                        className="w-full h-32 object-cover rounded-md mt-2 mb-2"
                        data-ai-hint={`${assignment.subject.toLowerCase()} assignment`}
                     />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/dashboard/student/assignments/${assignment.id}`}>
                        {assignment.status === "Pending Submission" ? "Submit Assignment" : "View Details"}
                        <Edit3 className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
