import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart3, Users, Activity, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import Image from "next/image";
// Note: For actual charts, you would use a library like Recharts and the Chart components from shadcn/ui.
// This placeholder will use static images or simple text.

export default function TeacherAnalyticsPage() {
  // Mock data for analytics
  const overallEngagement = 75; // percentage
  const topPerformingClass = "Grade 10 - Mathematics";
  const challengingTopic = "Quantum Physics";
  const assignmentCompletionRate = 88; // percentage

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Classroom Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallEngagement}%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">Out of 150 total students</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts / Low Performance</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3 Students</div>
            <p className="text-xs text-muted-foreground">Need attention in Algebra</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" /> Performance Heatmap (Placeholder)
          </CardTitle>
          <CardDescription>Visual overview of student performance across topics and classes.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Image 
            src="https://placehold.co/800x400.png" 
            alt="Performance Heatmap Placeholder" 
            width={800} 
            height={400} 
            className="mx-auto rounded-md shadow-md"
            data-ai-hint="data chart graph"
          />
          <p className="mt-4 text-muted-foreground">
            Detailed engagement heatmaps and student score distributions will be displayed here.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Top Performing Class</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xl font-semibold text-green-600">{topPerformingClass}</p>
                <p className="text-sm text-muted-foreground">Consistently high engagement and scores.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Most Challenging Topic</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xl font-semibold text-orange-600">{challengingTopic}</p>
                <p className="text-sm text-muted-foreground">Consider reviewing or providing supplementary materials.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
