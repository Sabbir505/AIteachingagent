import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TeacherClassesPage() {
  // Mock data
  const classes = [
    { id: "1", name: "Grade 10 - Mathematics", students: 25, period: "Period 1" },
    { id: "2", name: "Grade 11 - AP Physics", students: 18, period: "Period 3" },
    { id: "3", name: "Grade 9 - English Literature", students: 30, period: "Period 4" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">My Classes</h1>
        <Button asChild>
          {/* Placeholder for actual create class functionality */}
          <Link href="#"> 
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Class
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Management</CardTitle>
          <CardDescription>View and manage your classes, students, and schedules.</CardDescription>
        </CardHeader>
        <CardContent>
          {classes.length === 0 ? (
             <div className="text-center py-12">
               <Image 
                src="https://placehold.co/300x200.png" 
                alt="No classes" 
                width={300} 
                height={200} 
                className="mx-auto mb-4 rounded-md"
                data-ai-hint="empty classroom students"
              />
              <h3 className="text-xl font-semibold mb-2">No Classes Found</h3>
              <p className="text-muted-foreground mb-4">Create your first class to get started.</p>
              <Button asChild>
                <Link href="#">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Class
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls) => (
                <Card key={cls.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{cls.name}</CardTitle>
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <CardDescription>{cls.period}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Students: {cls.students}</p>
                    {/* Add more details or actions like "View Roster", "Manage Assignments" */}
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                        <Link href="#">View Class Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
