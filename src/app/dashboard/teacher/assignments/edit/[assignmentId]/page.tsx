
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Share, Wand2, PlusCircle, Trash2, FileUp, BookOpen, FileText, Calendar, GripVertical, AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";


// Mock data for the assignment being edited
const mockAssignmentData = {
  title: "Essay: The Impact of AI",
  subject: "English",
  type: "Essay",
  dueDate: new Date("2024-07-25"),
  points: 100,
  instructions: "Write a 500-word essay on the potential positive and negative impacts of Artificial Intelligence on society. Consider aspects like employment, ethics, and daily life. Cite at least two sources.",
  rubric: "Clarity: 25%\nArgument Strength: 30%\nUse of Sources: 25%\nGrammar & Style: 20%",
  materials: [
    { type: "pdf", name: "Source_Article_1.pdf", icon: BookOpen },
    { type: "link", name: "AI Ethics - Stanford Encyclopedia", icon: FileText, link: "https://plato.stanford.edu/entries/ethics-ai/" },
  ]
};

type AssignmentMaterial = { type: string; name: string; icon: React.ElementType; link?: string; };
type AssignmentData = Omit<typeof mockAssignmentData, 'materials'> & {
    materials: AssignmentMaterial[];
};


export default function EditAssignmentPage() {
  const params = useParams();
  const assignmentId = params.assignmentId as string;
  const [assignmentData, setAssignmentData] = useState<AssignmentData>(mockAssignmentData);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof AssignmentData) => {
    const value = e.target.id === 'points' ? parseInt(e.target.value) || 0 : e.target.value;
    setAssignmentData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSelectChange = (value: string, field: keyof AssignmentData) => {
    setAssignmentData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined, field: keyof AssignmentData) => {
    if (date) {
        setAssignmentData(prev => ({...prev, [field]: date}));
    }
  }

  const handleDeleteMaterial = (index: number) => {
    setAssignmentData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
     toast({
        title: "Material Removed",
        description: "The material has been removed from the assignment.",
        variant: "destructive"
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAssignmentData(prev => ({
        ...prev,
        materials: [...prev.materials, { type: "file", name: file.name, icon: FileUp }],
      }));
      toast({
        title: "File Added",
        description: `${file.name} has been added to your materials.`,
      });
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Action Bar */}
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-14 z-30">
        <div className="flex items-center gap-4">
           <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/teacher/assignments">
                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Link>
           </Button>
           <div className="text-sm text-muted-foreground">
             <span className="max-w-[200px] truncate hidden md:inline">Editing: {assignmentData.title}</span>
             <span className="hidden md:inline"> | Last saved 2 mins ago</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Preview Mode", description: "This would show a student's view of the assignment." })}><Eye className="mr-2 h-4 w-4" /> Preview</Button>
          <Button size="sm" onClick={() => toast({ title: "Assignment Saved!", description: "Your changes have been saved successfully." })}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
          <Button variant="ghost" size="icon" onClick={() => toast({ title: "Sharing Options", description: "Sharing functionality is not yet implemented." })}><Share className="h-4 w-4" /></Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 grid md:grid-cols-3 gap-6">
        
        {/* Left/Main Editing Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Assignment Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Overview</CardTitle>
              <CardDescription>High-level details about this assignment.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="assignmentTitle">Assignment Title</Label>
                <Input id="assignmentTitle" value={assignmentData.title} onChange={(e) => handleInputChange(e, 'title')} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="assignmentSubject">Subject</Label>
                <Input id="assignmentSubject" value={assignmentData.subject} onChange={(e) => handleInputChange(e, 'subject')} />
              </div>
               <div className="space-y-1">
                <Label htmlFor="assignmentType">Assignment Type</Label>
                <Select value={assignmentData.type} onValueChange={(value) => handleSelectChange(value, 'type')}>
                  <SelectTrigger id="assignmentType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Essay">Essay</SelectItem>
                    <SelectItem value="File Upload">File Upload</SelectItem>
                    <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-1">
                <Label htmlFor="dueDate">Due Date</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !assignmentData.dueDate && "text-muted-foreground")}
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            {assignmentData.dueDate ? format(assignmentData.dueDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" selected={assignmentData.dueDate} onSelect={(date) => handleDateChange(date, 'dueDate')} initialFocus/>
                    </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1 md:col-span-2">
                <Label htmlFor="points">Points</Label>
                <Input id="points" type="number" value={assignmentData.points} onChange={(e) => handleInputChange(e, 'points')} />
              </div>
            </CardContent>
          </Card>

          {/* Assignment Content Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>Provide instructions, rubric, and supporting materials.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" defaultValue={["instructions", "materials"]} className="w-full">
                  <AccordionItem value="instructions">
                    <AccordionTrigger className="text-lg font-semibold">📝 Instructions</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <Textarea value={assignmentData.instructions} onChange={(e) => handleInputChange(e, 'instructions')} rows={8} className="mb-2" />
                      <Button variant="ghost" size="sm" className="text-primary" onClick={() => toast({ title: "AI Assist", description: "This feature will help improve instructions." })}><Wand2 className="mr-2 h-4 w-4" /> Improve with AI</Button>
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="rubric">
                    <AccordionTrigger className="text-lg font-semibold">⚖️ Grading Rubric</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <Textarea value={assignmentData.rubric} onChange={(e) => handleInputChange(e, 'rubric')} rows={6} className="mb-2" placeholder="e.g., Clarity - 25%, Evidence - 50%, Grammar - 25%" />
                      <Button variant="ghost" size="sm" className="text-primary" onClick={() => toast({ title: "AI Assist", description: "This feature will help generate a rubric." })}><Wand2 className="mr-2 h-4 w-4" /> Generate Rubric with AI</Button>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="materials">
                    <AccordionTrigger className="text-lg font-semibold">🧰 Attached Materials</AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-3">
                      {assignmentData.materials.map((material, index) => (
                         <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                           <div className="flex items-center gap-3">
                             <material.icon className="h-5 w-5 text-muted-foreground" />
                             <span className="text-sm font-medium">{material.name}</span>
                           </div>
                           <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteMaterial(index)}>
                             <Trash2 className="h-4 w-4" />
                           </Button>
                         </div>
                      ))}
                      <div className="!mt-6">
                        <Label htmlFor="file-upload" className="mt-2 flex justify-center items-center w-full px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary">
                          <div className="space-y-1 text-center">
                            <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
                             <p className="text-sm text-muted-foreground"><span className="text-primary font-semibold">Upload a file</span> or drag and drop</p>
                          </div>
                           <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>

        </div>

        {/* Right Utility/Preview Column */}
        <div className="hidden md:block space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>AI Assistant & Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "AI Assistant", description: "Difficulty adjustment feature is not yet implemented." })}><Wand2 className="mr-2 h-4 w-4"/> Adjust Difficulty</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "AI Assistant", description: "Plagiarism check feature is not yet implemented." })}><AlertTriangle className="mr-2 h-4 w-4"/> Check for Plagiarism</Button>
              <Separator className="my-2" />
               <Label className="text-xs text-muted-foreground">Publishing</Label>
               <Button variant="secondary" className="w-full justify-start" onClick={() => toast({ title: "Assignment Published!", description: "This would assign it to a class." })}><PlusCircle className="mr-2 h-4 w-4"/> Assign to Class</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
