import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart3, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function ParentProgressPage() {
  // In a real app, this data would be fetched based on the parent's linked student(s).
  const studentName = "Alex Student"; // Mock data
  const progressData = [
    { subject: "Mathematics", score: 85, trend: "up" },
    { subject: "Science", score: 92, trend: "up" },
    { subject: "English", score: 78, trend: "stable" },
    { subject: "History", score: 80, trend: "down" },
  ];
  const recentActivity = [
    { date: "2024-07-15", activity: "Submitted 'Algebra Quiz'" },
    { date: "2024-07-14", activity: "Viewed 'Photosynthesis Lesson'" },
    { date: "2024-07-12", activity: "Received feedback on 'Essay: The Roman Empire'" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <BarChart3 className="mr-2 h-6 w-6 text-primary" />
            {studentName}&apos;s Progress Overview
          </CardTitle>
          <CardDescription>
            Stay updated on {studentName}&apos;s academic performance and activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Image 
            src="https://placehold.co/800x300.png" 
            alt="Student progress illustration" 
            width={800} 
            height={300} 
            className="rounded-md object-cover mb-6"
            data-ai-hint="child learning" 
          />
          <p className="text-muted-foreground">
            This is a read-only view of your child&apos;s dashboard information. For detailed discussions, please contact the teacher.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {progressData.map((item) => (
                <li key={item.subject} className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
                  <span>{item.subject}</span>
                  <span className={`font-semibold ${item.score >= 80 ? 'text-green-600' : item.score >=60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {item.score}%
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentActivity.map((item) => (
                <li key={item.date + item.activity} className="text-sm p-3 border-l-4 border-accent bg-accent/10 rounded-r-md">
                  <span className="font-medium">{item.date}:</span> {item.activity}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-yellow-50 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700">
        <CardHeader className="flex flex-row items-center space-x-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          <CardTitle className="font-headline text-yellow-700 dark:text-yellow-300">Important Note</CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-700 dark:text-yellow-400">
          <p>
            Progress data is updated periodically. For the most current information or any concerns, please communicate directly with {studentName}&apos;s teacher.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
