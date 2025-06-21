
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Share, Wand2, PlusCircle, Trash2, GripVertical, FileUp, BookOpen, Video, Link as LinkIcon, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// Mock data for the lesson being edited
const mockLessonData = {
  title: "Introduction to Algebra",
  subject: "Mathematics",
  gradeLevel: "7th Grade",
  duration: "45 minutes",
  tags: ["Algebra", "Beginner", "Equations"],
  learningObjectives: "Students will be able to understand the concept of variables.\nStudents will be able to solve simple linear equations.",
  phases: [
    { title: "Engage", time: "5 min", activity: "Start with a real-world problem: 'If 3 apples cost $2, how much does one apple cost?' to introduce the idea of an unknown value." },
    { title: "Explore", time: "15 min", activity: "Group activity: Students work together to solve a series of visual puzzles that represent simple equations." },
    { title: "Explain", time: "10 min", activity: "Teacher-led instruction on the definition of variables, constants, and coefficients. Demonstrate how to write and solve a one-step linear equation on the board." },
    { title: "Assess", time: "15 min", activity: "Students complete a short worksheet with 5 linear equations to solve individually. Review answers as a class." },
  ],
  materials: [
    { type: "worksheet", name: "Algebra Puzzles.pdf", icon: BookOpen },
    { type: "video", name: "Khan Academy: Intro to Variables", icon: Video, link: "https://www.youtube.com/watch?v=vDqOoI-4Z6M" },
  ]
};

type LessonPhase = { title: string; time: string; activity: string; };
type LessonMaterial = { type: string; name: string; icon: React.ElementType; link?: string; };
type LessonData = Omit<typeof mockLessonData, 'phases' | 'materials'> & {
    phases: LessonPhase[];
    materials: LessonMaterial[];
};


export default function EditLessonPage() {
  const params = useParams();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;
  const [lessonData, setLessonData] = useState<LessonData>(mockLessonData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof LessonData) => {
    setLessonData(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  const handleSelectChange = (value: string, field: keyof LessonData) => {
    setLessonData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhaseChange = (index: number, field: keyof LessonPhase, value: string) => {
    const newPhases = [...lessonData.phases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    setLessonData(prev => ({ ...prev, phases: newPhases }));
  };

  const handleAddPhase = () => {
    setLessonData(prev => ({
      ...prev,
      phases: [...prev.phases, { title: "New Phase", time: "5 min", activity: "" }],
    }));
  };

  const handleDeletePhase = (index: number) => {
    setLessonData(prev => ({
      ...prev,
      phases: prev.phases.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteMaterial = (index: number) => {
    setLessonData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Action Bar */}
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-14 z-30">
        <div className="flex items-center gap-4">
           <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/teacher/lessons">
                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Link>
           </Button>
           <div className="text-sm text-muted-foreground">
             <span className="max-w-[200px] truncate hidden md:inline">Editing: {lessonData.title}</span>
             <span className="hidden md:inline"> | Last saved 1 min ago</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
          <Button size="sm"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
          <Button variant="ghost" size="icon"><Share className="h-4 w-4" /></Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 grid md:grid-cols-3 gap-6">
        
        {/* Left/Main Editing Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Lesson Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Overview</CardTitle>
              <CardDescription>High-level details about your lesson.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="lessonTitle">Lesson Title</Label>
                <Input id="lessonTitle" value={lessonData.title} onChange={(e) => handleInputChange(e, 'title')} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lessonSubject">Subject</Label>
                <Input id="lessonSubject" value={lessonData.subject} onChange={(e) => handleInputChange(e, 'subject')} />
              </div>
               <div className="space-y-1">
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Select value={lessonData.gradeLevel} onValueChange={(value) => handleSelectChange(value, 'gradeLevel')}>
                  <SelectTrigger id="gradeLevel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6th Grade">6th Grade</SelectItem>
                    <SelectItem value="7th Grade">7th Grade</SelectItem>
                    <SelectItem value="8th Grade">8th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="lessonDuration">Duration</Label>
                <Select value={lessonData.duration} onValueChange={(value) => handleSelectChange(value, 'duration')}>
                  <SelectTrigger id="lessonDuration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="45 minutes">45 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Content Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
              <CardDescription>Build out the core components of your lesson here.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" defaultValue={["objectives", "phases"]} className="w-full">
                  <AccordionItem value="objectives">
                    <AccordionTrigger className="text-lg font-semibold">🎯 Learning Objectives</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <Textarea value={lessonData.learningObjectives} onChange={(e) => handleInputChange(e, 'learningObjectives')} rows={4} className="mb-2" />
                      <Button variant="ghost" size="sm" className="text-primary"><Wand2 className="mr-2 h-4 w-4" /> Improve with AI</Button>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="phases">
                    <AccordionTrigger className="text-lg font-semibold">🧩 Lesson Phases</AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                      {lessonData.phases.map((phase, index) => (
                        <Card key={index} className="bg-secondary/30">
                          <CardHeader className="flex flex-row items-center justify-between p-4">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                              <Input value={phase.title} onChange={(e) => handlePhaseChange(index, 'title', e.target.value)} className="text-md font-medium h-7 p-1 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-ring"/>
                              <div className="flex items-center text-sm text-muted-foreground ml-2">
                                <Clock className="h-4 w-4 mr-1" />
                                <Input value={phase.time} onChange={(e) => handlePhaseChange(index, 'time', e.target.value)} className="w-20 h-7 text-xs p-1" />
                              </div>
                            </div>
                             <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7"><Wand2 className="h-4 w-4 text-primary" /></Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeletePhase(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                             </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <Textarea value={phase.activity} onChange={(e) => handlePhaseChange(index, 'activity', e.target.value)} rows={3} />
                          </CardContent>
                        </Card>
                      ))}
                      <Button variant="outline" className="w-full mt-4" onClick={handleAddPhase}><PlusCircle className="mr-2 h-4 w-4" /> Add Phase</Button>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="materials">
                    <AccordionTrigger className="text-lg font-semibold">🧰 Materials & Resources</AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-3">
                      {lessonData.materials.map((material, index) => (
                         <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                           <div className="flex items-center gap-3">
                             <material.icon className="h-5 w-5 text-muted-foreground" />
                             <span className="text-sm font-medium">{material.name}</span>
                             {material.link && <LinkIcon className="h-4 w-4 text-primary cursor-pointer"/>}
                           </div>
                           <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteMaterial(index)}>
                             <Trash2 className="h-4 w-4" />
                           </Button>
                         </div>
                      ))}
                      <div className="!mt-6">
                        <Label>Add New Material</Label>
                        <div className="mt-2 flex justify-center items-center w-full px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary">
                          <div className="space-y-1 text-center">
                            <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
                             <p className="text-sm text-muted-foreground">
                                <span className="text-primary font-semibold">Upload a file</span> or drag and drop
                             </p>
                            <p className="text-xs text-muted-foreground">PDF, DOC, PNG, JPG up to 10MB</p>
                          </div>
                        </div>
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
              <Button variant="outline" className="w-full justify-start"><Wand2 className="mr-2 h-4 w-4"/> Simplify Language</Button>
              <Button variant="outline" className="w-full justify-start"><PlusCircle className="mr-2 h-4 w-4"/> Add a Quiz</Button>
              <Separator className="my-2" />
               <Label className="text-xs text-muted-foreground">Version History</Label>
               <p className="text-sm">Not yet implemented.</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
