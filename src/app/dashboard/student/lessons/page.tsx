import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, PlayCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for student's lessons
const lessons = [
  { id: "1", title: "Introduction to Algebra", subject: "Mathematics", status: "Completed", teacher: "Dr. Teacher" },
  { id: "2", title: "The Solar System", subject: "Science", status: "In Progress", teacher: "Dr. Teacher" },
  { id: "3", title: "Shakespeare's Sonnets", subject: "English", status: "Not Started", teacher: "Ms. Emily" },
];

export default function StudentLessonsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Lessons</h1>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Lessons</CardTitle>
          <CardDescription>Here are the lessons assigned to you. Click to start or continue learning.</CardDescription>
        </CardHeader>
        <CardContent>
          {lessons.length === 0 ? (
             <div className="text-center py-12">
               <Image 
                src="https://placehold.co/300x200.png" 
                alt="No lessons assigned" 
                width={300} 
                height={200} 
                className="mx-auto mb-4 rounded-md"
                data-ai-hint="empty books desk"
              />
              <h3 className="text-xl font-semibold mb-2">No Lessons Assigned Yet</h3>
              <p className="text-muted-foreground">Check back later or contact your teacher.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{lesson.title}</CardTitle>
                       {lesson.status === "Completed" ? <CheckCircle className="h-5 w-5 text-green-500" /> : <BookOpen className="h-5 w-5 text-primary" />}
                    </div>
                    <CardDescription>{lesson.subject} - By {lesson.teacher}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                     <p className="text-sm">Status: 
                       <span className={`font-medium ml-1
                         ${lesson.status === 'Completed' ? 'text-green-600' : 
                           lesson.status === 'In Progress' ? 'text-yellow-600' : 
                           'text-gray-500'}`}>
                         {lesson.status}
                       </span>
                     </p>
                     <Image 
                        src={`https://placehold.co/300x150.png?text=${encodeURIComponent(lesson.subject)}`}
                        alt={lesson.title}
                        width={300}
                        height={150}
                        className="w-full h-32 object-cover rounded-md mt-2 mb-2"
                        data-ai-hint={`${lesson.subject.toLowerCase()} learning`}
                     />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/dashboard/student/lessons/${lesson.id}`}>
                        {lesson.status === "Completed" ? "Review Lesson" : lesson.status === "In Progress" ? "Continue Lesson" : "Start Lesson"}
                        <PlayCircle className="ml-2 h-4 w-4" />
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
