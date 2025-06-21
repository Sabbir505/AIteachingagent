"use client";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilePlus2, Cpu, Construction, Bell, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const LessonGeneratorForm = dynamic(() => import("@/components/teacher/LessonGeneratorForm"), {
  loading: () => <div className="flex h-64 items-center justify-center"><Cpu className="h-12 w-12 animate-spin text-primary" /></div>,
  ssr: false
});

export default function CreateLessonPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold flex items-center font-headline">
          <FilePlus2 className="mr-3 h-8 w-8 text-primary" />
          Create New Lesson
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate a comprehensive lesson plan with AI or build one from scratch.
        </p>
      </header>

      <Tabs defaultValue="ai-generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-generator">Generate with AI</TabsTrigger>
          <TabsTrigger value="manual-creator">Create Manually</TabsTrigger>
        </TabsList>
        <TabsContent value="ai-generator">
           <LessonGeneratorForm />
        </TabsContent>
        <TabsContent value="manual-creator">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Construction className="mr-2 h-6 w-6" /> Manual Creator Coming Soon!</CardTitle>
              <CardDescription>
                We're building a powerful, intuitive lesson editor. For now, you can use the AI Generator or download our template.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-16 space-y-4">
               <div className="p-8 border-2 border-dashed rounded-lg">
                    <h3 className="text-lg font-semibold text-muted-foreground">Form Preview (placeholder)</h3>
                    <p className="text-sm text-muted-foreground">The manual lesson editor will appear here.</p>
               </div>
               <div className="flex justify-center gap-4 mt-6">
                 <Button variant="outline" disabled><Download className="mr-2"/> Download Template</Button>
                 <Button disabled><Bell className="mr-2" /> Notify Me When It's Ready</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
