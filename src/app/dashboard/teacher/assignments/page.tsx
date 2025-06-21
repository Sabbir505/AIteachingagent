
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, PlusCircle, Edit, Trash2, Search, Filter } from "lucide-react";
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

// Mock data for assignments
const assignmentsData = [
  { id: "1", title: "Algebra Basics Quiz", type: "Multiple Choice", subject: "Mathematics", dueDate: "2024-07-20", status: "Published", submissions: 15, total: 20 },
  { id: "2", title: "Essay: The Impact of AI", type: "Essay", subject: "English", dueDate: "2024-07-25", status: "Draft", submissions: 0, total: 20 },
  { id: "3", title: "Photosynthesis Project", type: "Project", subject: "Science", dueDate: "2024-08-01", status: "Published", submissions: 5, total: 18 },
  { id: "4", title: "History Short Answer", type: "Short Answer", subject: "History", dueDate: "2024-08-05", status: "Draft", submissions: 0, total: 22 },
  { id: "5", title: "Lab Report: Titration", type: "File Upload", subject: "Chemistry", dueDate: "2024-08-10", status: "Published", submissions: 0, total: 15 },
];

const assignmentStatuses = ["Published", "Draft", "Archived"]; // Example statuses
const assignmentTypes = ["Multiple Choice", "Essay", "Project", "Short Answer", "File Upload"]; // Example types

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const searchMatch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === "all" || assignment.status === statusFilter;
      const typeMatch = typeFilter === "all" || assignment.type === typeFilter;
      return searchMatch && statusMatch && typeMatch;
    });
  }, [assignments, searchTerm, statusFilter, typeFilter]);

  const getBadgeVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case "Published":
        return "default";
      case "Draft":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
    toast({
      title: "Assignment Deleted",
      description: "The assignment has been successfully removed.",
    });
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Assignments</h1>
          <p className="text-muted-foreground">View, manage, and create assignments for your classes.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/teacher/assignments/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Assignment
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5"/> Filter & Search Assignments</CardTitle>
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
                {assignmentStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="all">All Types</SelectItem>
                {assignmentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-12">
               <Image 
                src="https://placehold.co/300x200.png" 
                alt="No assignments" 
                width={300} 
                height={200} 
                className="mx-auto mb-4 rounded-md"
                data-ai-hint="empty state tasks"
              />
              <h3 className="text-xl font-semibold mb-2">No Assignments Found</h3>
              <p className="text-muted-foreground mb-4">
                {assignments.length > 0 ? "No assignments match your current filters." : "Start by creating your first assignment!"}
              </p>
               {assignments.length === 0 && (
                 <Button asChild>
                  <Link href="/dashboard/teacher/assignments/create">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Assignment
                  </Link>
                </Button>
               )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAssignments.map((assignment) => (
                <Card key={assignment.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                     <CardTitle className="text-lg font-semibold">{assignment.title}</CardTitle>
                     <ClipboardCheck className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                    <CardDescription>{assignment.subject} - Due: {assignment.dueDate}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                    <p className="text-sm text-muted-foreground">Type: {assignment.type}</p>
                    <p className="text-sm text-muted-foreground">Submissions: {assignment.submissions}/{assignment.total}</p>
                     <div>
                      <Badge variant={getBadgeVariant(assignment.status)}>{assignment.status}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 bg-secondary/30 p-3">
                     <Button variant="outline" size="sm" asChild>
                       <Link href={`/dashboard/teacher/assignments/edit/${assignment.id}`}><Edit className="mr-1 h-3 w-3" /> Edit</Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-1 h-3 w-3" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the assignment "{assignment.title}". This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteAssignment(assignment.id)}>
                            Delete
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
