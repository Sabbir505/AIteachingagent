"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Volume2, Mic, FileText, Video, Box } from "lucide-react";
import Image from "next/image";

interface LessonViewerProps {
  lessonId: string;
  // In a real app, lesson content would be fetched based on lessonId
}

// Mock lesson data
const mockLesson = {
  title: "The Solar System Exploration",
  subject: "Science",
  pages: [
    { 
      type: "text", 
      title: "Introduction",
      content: "Welcome to our journey through the Solar System! Our solar system is a vast and wondrous place, home to our planet Earth and many other celestial bodies. It consists of the Sun (our star), eight planets, their moons, dwarf planets, asteroids, and comets. Understanding the solar system helps us comprehend our place in the universe and the conditions necessary for life.",
      image: "https://placehold.co/600x300.png",
      imageHint: "galaxy stars"
    },
    { 
      type: "video", 
      title: "Video: Tour of the Planets",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video
      content: "Watch this short video to get a visual tour of the planets in our solar system. Pay attention to the unique features of each planet.",
      image: "https://placehold.co/600x300.png",
      imageHint: "planets video"
    },
    { 
      type: "interactive", // Placeholder for 3D model or interactive element
      title: "Interactive: Explore Mars",
      content: "Imagine you are exploring the surface of Mars. This interactive module (placeholder) would allow you to navigate a 3D model of the Martian terrain.",
      image: "https://placehold.co/600x300.png",
      imageHint: "mars rover"
    },
    {
      type: "quiz",
      title: "Quick Quiz",
      content: "Let's test your knowledge so far!",
      questions: [
        { question: "How many planets are in our Solar System?", options: ["7", "8", "9", "10"], answer: "8" },
        { question: "What is the name of our galaxy?", options: ["Andromeda", "Triangulum", "Milky Way", "Pinwheel"], answer: "Milky Way" }
      ],
      image: "https://placehold.co/600x300.png",
      imageHint: "quiz test"
    },
    { 
      type: "text", 
      title: "Conclusion",
      content: "You've completed the lesson on the Solar System! We've learned about the Sun, the planets, and other celestial bodies. Keep exploring and stay curious about the universe around you.",
      image: "https://placehold.co/600x300.png",
      imageHint: "telescope night sky"
    }
  ]
};

type DeliveryStyle = "standard" | "simplifiedText" | "audio" | "visual";

export default function LessonViewer({ lessonId }: LessonViewerProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [deliveryStyle, setDeliveryStyle] = useState<DeliveryStyle>("standard");
  const [lesson, setLesson] = useState(mockLesson); // Later, fetch based on lessonId

  // This is a placeholder. Actual content adaptation would be complex.
  const adaptContent = (pageContent: string) => {
    if (deliveryStyle === "simplifiedText") {
      return `Simplified: ${pageContent.substring(0, Math.min(pageContent.length, 150))}... (full simplification logic needed)`;
    }
    return pageContent;
  };

  const currentPage = lesson.pages[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < lesson.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };
  
  // TTS and STT placeholders
  const handleTTS = () => alert("Text-to-Speech functionality would read the content aloud. (Not implemented)");
  const handleSTT = () => alert("Speech-to-Text for interaction/notes would be activated here. (Not implemented)");

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-2xl font-headline">{lesson.title} - {currentPage.title}</CardTitle>
                <CardDescription>{lesson.subject} - Page {currentPageIndex + 1} of {lesson.pages.length}</CardDescription>
            </div>
            <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-2">
                    <Label htmlFor="deliveryStyle" className="text-sm">Delivery Style:</Label>
                    <Select value={deliveryStyle} onValueChange={(value) => setDeliveryStyle(value as DeliveryStyle)}>
                        <SelectTrigger id="deliveryStyle" className="w-[180px]">
                        <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="simplifiedText">Simplified Text</SelectItem>
                        <SelectItem value="audio">Audio Narration</SelectItem>
                        <SelectItem value="visual">Visual Focus</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex space-x-1">
                    <Button variant="outline" size="icon" onClick={handleTTS} title="Text-to-Speech">
                        <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleSTT} title="Speech-to-Text Input">
                        <Mic className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-[400px] space-y-4">
        {currentPage.image && (
             <Image 
                src={currentPage.image} 
                alt={currentPage.title}
                width={600}
                height={300}
                className="w-full h-auto max-h-[300px] object-cover rounded-md mb-4"
                data-ai-hint={currentPage.imageHint || lesson.subject.toLowerCase()}
             />
        )}

        {currentPage.type === "text" && <p className="whitespace-pre-wrap">{adaptContent(currentPage.content)}</p>}
        {currentPage.type === "video" && currentPage.videoUrl && (
          <div>
            <p className="mb-2">{adaptContent(currentPage.content)}</p>
            <video controls src={currentPage.videoUrl} className="w-full rounded-md aspect-video bg-muted">
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {currentPage.type === "interactive" && (
            <div className="text-center p-8 border rounded-md bg-secondary/20">
                <Box className="h-16 w-16 text-primary mx-auto mb-4"/>
                <h3 className="text-xl font-semibold">{currentPage.title}</h3>
                <p>{adaptContent(currentPage.content)}</p>
                <Button className="mt-4">Launch Interactive (Placeholder)</Button>
            </div>
        )}
        {currentPage.type === "quiz" && currentPage.questions && (
            <div>
                <h3 className="text-xl font-semibold mb-2">{currentPage.title}</h3>
                <p className="mb-4">{adaptContent(currentPage.content)}</p>
                <div className="space-y-4">
                    {currentPage.questions.map((q, idx) => (
                        <Card key={idx}>
                            <CardContent className="p-4">
                                <p className="font-medium mb-2">{idx + 1}. {q.question}</p>
                                <ul className="space-y-1">
                                    {q.options.map((opt, optIdx) => (
                                        <li key={optIdx}>
                                            <Button variant="outline" className="w-full justify-start" onClick={() => alert(`Selected: ${opt}. Correct: ${q.answer}`)}>
                                                {String.fromCharCode(65 + optIdx)}. {opt}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevPage} disabled={currentPageIndex === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNextPage} disabled={currentPageIndex === lesson.pages.length - 1}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
