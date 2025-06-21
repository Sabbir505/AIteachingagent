"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlusCircle, Edit, Trash2, Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data for lessons
const lessonsData = [
  { id: "1", title: "Introduction to Algebra", subject: "Mathematics", dateCreated: "2024-07-01", status: "Published" },
  { id: "2", title: "The Solar System", subject: "Science", dateCreated: "2024-07-05", status: "Draft" },
  { id: "3", title: "Shakespeare's Sonnets", subject: "English", dateCreated: "2024-06-20", status: "Published" },
  { id: "4", title: "World War II Overview", subject: "History", dateCreated: "2024-07-10", status: "Archived" },
  { id: "5", title: "Advanced Algebra Concepts", subject: "Mathematics", dateCreated: "2024-07-12", status: "Draft" },
];

const lessonStatuses = ["Published", "Draft", "Archived"];

export default function TeacherLessonsPage() {
  const [lessons, setLessons] = useState(lessonsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const { toast } = useToast();

  const uniqueSubjects = useMemo(() => ["all", ...Array.from(new Set(lessons.map(l => l.subject)))], [lessons]);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const searchMatch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || lesson.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === "all" || lesson.status === statusFilter;
      const subjectMatch = subjectFilter === "all" || lesson.subject === subjectFilter;
      return searchMatch && statusMatch && subjectMatch;
    });
  }, [lessons, searchTerm, statusFilter, subjectFilter]);
  
  const getBadgeVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case "Published":
        return "default";
      case "Draft":
        return "secondary";
      case "Archived":
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleDeleteLesson = (lessonId: string) => {
    setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== lessonId));
    toast({
      title: "Lesson Deleted",
      description: "The lesson has been successfully removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Lessons</h1>
          <p className="text-muted-foreground">View, manage, and create lessons for your classes.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/teacher/lessons/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Lesson
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5"/> Filter & Search Lessons</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by title or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
             <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {lessonStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                {uniqueSubjects.map(subject => (
                  <SelectItem key={subject} value={subject} className="capitalize">{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLessons.length === 0 ? (
            <div className="text-center py-12">
              <Image 
                src="https://placehold.co/300x200.png" 
                alt="No lessons found" 
                width={300} 
                height={200} 
                className="mx-auto mb-4 rounded-md"
                data-ai-hint="empty state documents"
              />
              <h3 className="text-xl font-semibold mb-2">No Lessons Found</h3>
              <p className="text-muted-foreground mb-4">
                {lessons.length > 0 ? "No lessons match your current filters." : "Start by creating your first lesson plan!"}
              </p>
              {lessons.length === 0 && (
                <Button asChild>
                  <Link href="/dashboard/teacher/lessons/create">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Lesson
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLessons.map((lesson) => (
                <Card key={lesson.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold">{lesson.title}</CardTitle>
                      <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                    <CardDescription>{lesson.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                    <p className="text-sm text-muted-foreground">Date Created: {lesson.dateCreated}</p>
                    <div>
                      <Badge variant={getBadgeVariant(lesson.status)}>{lesson.status}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 bg-secondary/30 p-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/teacher/lessons/edit/${lesson.id}`}><Edit className="mr-1 h-3 w-3" /> Edit</Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-1 h-3 w-3" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the lesson
                            "{lesson.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteLesson(lesson.id)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
