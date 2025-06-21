"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, PlusCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for lessons
const lessons = [
  { id: "1", title: "Introduction to Algebra", subject: "Mathematics", dateCreated: "2024-07-01", status: "Published" },
  { id: "2", title: "The Solar System", subject: "Science", dateCreated: "2024-07-05", status: "Draft" },
  { id: "3", title: "Shakespeare's Sonnets", subject: "English", dateCreated: "2024-06-20", status: "Published" },
  { id: "4", title: "World War II Overview", subject: "History", dateCreated: "2024-07-10", status: "Archived" },
];

export default function TeacherLessonsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">My Lessons</h1>
        <Button asChild>
          <Link href="/dashboard/teacher/lessons/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Lesson
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Management</CardTitle>
          <CardDescription>View, edit, or create new lessons for your classes.</CardDescription>
        </CardHeader>
        <CardContent>
          {lessons.length === 0 ? (
            <div className="text-center py-12">
              <Image 
                src="https://placehold.co/300x200.png" 
                alt="No lessons" 
                width={300} 
                height={200} 
                className="mx-auto mb-4 rounded-md"
                data-ai-hint="empty state books"
              />
              <h3 className="text-xl font-semibold mb-2">No Lessons Yet</h3>
              <p className="text-muted-foreground mb-4">Start by creating your first lesson plan.</p>
              <Button asChild>
                <Link href="/dashboard/teacher/lessons/create">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Lesson
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <Card key={lesson.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{lesson.title}</CardTitle>
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <CardDescription>{lesson.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">Date Created: {lesson.dateCreated}</p>
                    <p className="text-sm">Status: <span className={`font-medium ${lesson.status === 'Published' ? 'text-green-600' : lesson.status === 'Draft' ? 'text-yellow-600' : 'text-gray-500'}`}>{lesson.status}</span></p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                       {/* Placeholder link, ideally to an edit page /dashboard/teacher/lessons/edit/[lessonId] */}
                      <Link href="#"><Edit className="mr-1 h-3 w-3" /> Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => alert(`Delete ${lesson.title}? (Mock action)`)}>
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
