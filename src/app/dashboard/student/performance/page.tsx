import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GraduationCap, BarChart, CheckCircle, Award, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

// Placeholder for charts - in a real app, use shadcn/ui Chart components with Recharts

export default function StudentPerformancePage() {
  // Mock data for student performance
  const overallGrade = "B+";
  const subjectsPerformance = [
    { name: "Mathematics", grade: "A-", trend: "up" },
    { name: "Science", grade: "B+", trend: "stable" },
    { name: "English", grade: "A", trend: "up" },
    { name: "History", grade: "C+", trend: "down" },
  ];
  const completedAssignments = 15;
  const upcomingAssignments = 3;
  const recentFeedback = [
    { assignment: "Algebra Quiz", feedback: "Great job on solving quadratic equations!", score: "95%" },
    { assignment: "Photosynthesis Project", feedback: "Excellent presentation, clear understanding of concepts.", score: "88%" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline flex items-center">
        <GraduationCap className="mr-3 h-8 w-8 text-primary" /> My Performance
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-primary/10 border-primary">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">Overall Grade</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-6xl font-bold text-primary">{overallGrade}</p>
            <p className="text-sm text-primary/80">Across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completed Assignments</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-4xl font-bold">{completedAssignments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <p className="text-4xl font-bold">{upcomingAssignments}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><BarChart className="mr-2 h-5 w-5" /> Subject Breakdown</CardTitle>
          <CardDescription>Your performance in different subjects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectsPerformance.map((subject) => (
              <div key={subject.name} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                <div>
                  <p className="font-medium">{subject.name}</p>
                  <p className="text-xs text-muted-foreground">Current Grade: {subject.grade}</p>
                </div>
                <div className={`flex items-center text-sm font-semibold ${subject.trend === "up" ? "text-green-600" : subject.trend === "down" ? "text-red-600" : "text-gray-600"}`}>
                  {subject.trend === "up" && <TrendingUp className="mr-1 h-4 w-4" />}
                  {subject.trend === "down" && <TrendingDown className="mr-1 h-4 w-4" />}
                  {subject.grade}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center"><Award className="mr-2 h-5 w-5" /> Recent Feedback & Achievements</CardTitle>
            <CardDescription>Highlights from your recently graded assignments.</CardDescription>
        </CardHeader>
        <CardContent>
            {recentFeedback.length > 0 ? (
                <ul className="space-y-3">
                    {recentFeedback.map(item => (
                        <li key={item.assignment} className="p-3 border-l-4 border-accent bg-accent/10 rounded-r-md">
                            <h4 className="font-semibold">{item.assignment} - Score: {item.score}</h4>
                            <p className="text-sm text-muted-foreground italic">&quot;{item.feedback}&quot;</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">No recent feedback available.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
