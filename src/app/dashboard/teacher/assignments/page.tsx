import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ClipboardCheck, PlusCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for assignments
const assignments = [
  { id: "1", title: "Algebra Basics Quiz", type: "Multiple Choice", dueDate: "2024-07-20", status: "Published", submissions: 15, total: 20 },
  { id: "2", title: "Essay: The Impact of AI", type: "Long Form", dueDate: "2024-07-25", status: "Draft", submissions: 0, total: 20 },
  { id: "3", title: "Photosynthesis Project", type: "Project", dueDate: "2024-08-01", status: "Published", submissions: 5, total: 18 },
];

export default function TeacherAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">My Assignments</h1>
        <Button asChild>
          <Link href="/dashboard/teacher/assignments/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Assignment
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Management</CardTitle>
          <CardDescription>View, edit, or create new assignments and quizzes.</CardDescription>
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
                data-ai-hint="empty state tasks"
              />
              <h3 className="text-xl font-semibold mb-2">No Assignments Yet</h3>
              <p className="text-muted-foreground mb-4">Start by creating your first assignment or quiz.</p>
              <Button asChild>
                <Link href="/dashboard/teacher/assignments/create">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Assignment
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                     <CardTitle className="text-lg font-semibold">{assignment.title}</CardTitle>
                     <ClipboardCheck className="h-5 w-5 text-primary" />
                    </div>
                    <CardDescription>{assignment.type} - Due: {assignment.dueDate}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">Submissions: {assignment.submissions}/{assignment.total}</p>
                    <p className="text-sm">Status: <span className={`font-medium ${assignment.status === 'Published' ? 'text-green-600' : assignment.status === 'Draft' ? 'text-yellow-600' : 'text-gray-500'}`}>{assignment.status}</span></p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                     <Button variant="outline" size="sm" asChild>
                       {/* Placeholder link, ideally to an edit page /dashboard/teacher/assignments/edit/[assignmentId] */}
                      <Link href="#"><Edit className="mr-1 h-3 w-3" /> Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => alert(`Delete ${assignment.title}? (Mock action)`)}>
                      <Trash2 className="mr-1 h-3 w-3" /> Delete
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
