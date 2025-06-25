
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, GraduationCap, HeartHandshake, PlayCircle, FileText, FileQuestion, Presentation, BookOpenCheck, Type, Eye, Lightbulb, Mic, Server, ShieldCheck, Palette, BrainCircuit, ClipboardEdit, MessagesSquare, Languages, Bot, Network, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 lg:pl-8">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
              Revolutionize Education with AI-Powered Multimodal Learning
            </h1>
            <p className="max-w-2xl text-lg text-foreground/80">
              For Teachers. For Students. For Parents. One seamless platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Try EduGenius
              </Link>
              <Link href="#" className={buttonVariants({ variant: "outline", size: "lg" })}>
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="https://placehold.co/600x500.png"
              alt="A preview of the EduGenius dashboard interface"
              width={600}
              height={500}
              className="rounded-xl shadow-2xl"
              data-ai-hint="dashboard preview"
              priority
            />
          </div>
        </section>

        {/* Role-Based Features Section */}
        <section id="features" className="py-12 md:py-24 bg-secondary/40">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold font-headline">Made for Everyone in the Classroom Ecosystem</h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={Users} 
                    title="For Teachers" 
                    description="Lesson planning, grading, and automation to give you more time to teach." 
                    features={["AI Lesson Planner", "Student Analytics", "AI Grading Assist"]}
                />
                <FeatureCard 
                    icon={GraduationCap} 
                    title="For Students" 
                    description="Interactive lessons, engaging quizzes, and instant feedback to enhance learning." 
                    features={["Interactive Lessons", "Track Your Progress", "Submit Assignments"]}
                />
                <FeatureCard 
                    icon={HeartHandshake} 
                    title="For Parents" 
                    description="Transparent progress tracking to stay informed and involved in your child's education." 
                    features={["Progress Overview", "Teacher Communication", "View Assignments"]} 
                />
            </div>
          </div>
        </section>

        {/* AI-Powered Features Section */}
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold font-headline">Built on Google Genkit + Gemini AI</h2>
              <p className="mt-4 text-lg text-muted-foreground">Let AI handle the heavy lifting</p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <InfoCard
                icon={FileText}
                title="Lesson Plan Generator"
                description="Craft detailed lesson plans in seconds, complete with objectives, activities, and materials."
              />
              <InfoCard
                icon={FileQuestion}
                title="Quiz Generator"
                description="Automatically create relevant quiz questions based on your lesson content."
              />
              <InfoCard
                icon={Presentation}
                title="Presentation Outline Generator"
                description="Generate structured slide-by-slide outlines for engaging presentations."
              />
              <InfoCard
                icon={BookOpenCheck}
                title="AI Essay Grader"
                description="Get instant, constructive feedback and a suggested grade for student essays."
              />
            </div>
          </div>
        </section>

        {/* Live Interface Preview Section */}
        <section className="py-12 md:py-24 bg-secondary/40">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold font-headline">Fast, Responsive & Beautifully Designed</h2>
              <p className="mt-4 text-lg text-muted-foreground">Experience a seamless and intuitive user interface built for modern education.</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <Card className="overflow-hidden shadow-2xl border-4 border-primary/20 bg-primary/5">
                <CardContent className="p-2">
                  <Image
                    src="https://placehold.co/1200x750.png"
                    alt="Animated preview of the EduGenius interface"
                    width={1200}
                    height={750}
                    className="w-full rounded-lg"
                    data-ai-hint="UI dashboard animation"
                  />
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground mt-4">
                (This is a placeholder for a live demo or video walkthrough)
              </p>
            </div>
          </div>
        </section>
        
        {/* Accessibility Section */}
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold font-headline">Accessible by Design</h2>
              <p className="mt-4 text-lg text-muted-foreground">Ensuring learning is for everyone, regardless of ability.</p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <InfoCard
                icon={Type}
                title="Dyslexia-Friendly Mode"
                description="Switch to a font specifically designed to improve readability for users with dyslexia."
              />
              <InfoCard
                icon={Eye}
                title="High-Contrast Theme"
                description="Enhance on-screen visibility with a theme that meets WCAG contrast standards."
              />
              <InfoCard
                icon={Lightbulb}
                title="AI Accessibility Tips"
                description="Receive AI-generated suggestions to make your lesson plans more inclusive for all learners."
              />
              <InfoCard
                icon={Mic}
                title="Speech & Text Tools"
                description="Text-to-speech and content simplification features are coming soon to aid comprehension."
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-12 md:py-24 bg-secondary/40">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold font-headline">Built on a Future-Proof Stack</h2>
              <p className="mt-4 text-lg text-muted-foreground">Leveraging the best of modern web and AI technology for a reliable and scalable platform.</p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               <InfoCard
                icon={Server}
                title="Next.js 15 & React"
                description="Fast, server-rendered application with the latest features for a modern web experience."
              />
              <InfoCard
                icon={ShieldCheck}
                title="TypeScript & Zod"
                description="Ensures type-safety and reliable, schema-validated data structures throughout the app."
              />
              <InfoCard
                icon={Palette}
                title="ShadCN UI & Tailwind"
                description="A beautiful, responsive, and customizable design system for a clean user interface."
              />
               <InfoCard
                icon={BrainCircuit}
                title="Google Genkit & Gemini"
                description="State-of-the-art generative AI for powerful content creation and assistance."
              />
               <InfoCard
                icon={ClipboardEdit}
                title="React-Hook-Form"
                description="Performant and flexible forms for a seamless and intuitive user input experience."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-24">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold font-headline">How EduGenius Works</h2>
                    <p className="mt-4 text-lg text-muted-foreground">A simple, powerful flow for everyone in the learning journey.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <StepCard number="1" title="Sign Up & Choose Role" description="Create an account and select your role—Teacher, Student, or Parent—to get a personalized dashboard." />
                    <StepCard number="2" title="Access Tools & Lessons" description="Teachers use AI to create engaging content, while students dive into their interactive lessons." />
                    <StepCard number="3" title="Track & Collaborate" description="Submit work, monitor performance, and collaborate to achieve learning goals." />
                </div>
            </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-12 md:py-24 bg-secondary/40">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">What Our Early Users Say</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="I've reclaimed my weekends! The AI lesson planner is a lifesaver. What used to take hours now takes minutes, and the quality is outstanding."
                name="Sarah W."
                role="9th Grade Biology Teacher"
                imageHint="female teacher portrait"
              />
              <TestimonialCard
                quote="The interactive lessons make learning so much more fun. I can actually see how I'm improving with the performance tracker."
                name="Alex J."
                role="10th Grade Student"
                imageHint="male student portrait"
              />
              <TestimonialCard
                quote="As a parent, being able to see my child's progress and communicate with his teacher on one platform has been incredibly reassuring. I feel so much more involved."
                name="Maria G."
                role="Parent"
                imageHint="parent portrait"
              />
            </div>
          </div>
        </section>

        {/* Plans/Coming Soon Section */}
        <section className="py-12 md:py-24">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold font-headline">What's Next for EduGenius</h2>
                    <p className="mt-4 text-lg text-muted-foreground">We're constantly innovating. Here's a sneak peek at what's coming soon.</p>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <InfoCard
                        icon={MessagesSquare}
                        title="Real-time Messaging"
                        description="Direct parent-teacher communication channels to stay connected."
                    />
                    <InfoCard
                        icon={Languages}
                        title="Multilingual Support"
                        description="Content generation and UI available in multiple languages."
                    />
                    <InfoCard
                        icon={Bot}
                        title="Custom AI Tutors"
                        description="Personalized AI tutor personalities to guide students."
                    />
                    <InfoCard
                        icon={Network}
                        title="LMS Integrations"
                        description="Seamlessly connect with Google Classroom, Moodle, and more."
                    />
                </div>
                <div className="mt-12 text-center">
                    <Button size="lg" asChild>
                      <Link href="#">
                        <Rocket className="mr-2 h-5 w-5" />
                        Join Pilot Program
                      </Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-secondary/40">
          <div className="container text-center">
            <h2 className="text-4xl font-bold tracking-tight text-primary font-headline">Ready to Transform Your Learning Experience?</h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-foreground/80">
              Join the educational revolution. Sign up today to get early access and discover the future of education.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Get Early Access
              </Link>
              <Link href="#" className={buttonVariants({ variant: "outline", size: "lg" })}>
                 See Live Demo <PlayCircle className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Helper components for cleaner structure

const FeatureCard = ({ icon: Icon, title, description, features }: { icon: React.ElementType, title: string, description: string, features: string[] }) => (
    <Card className="h-full flex flex-col text-left p-2 shadow hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex-row items-start gap-4">
            <div className="bg-primary/10 text-primary min-w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <CardTitle className="text-xl mb-1">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="flex-grow pt-0">
            <ul className="space-y-2 text-sm text-foreground/80 mt-4">
                {features.map(feature => (
                    <li key={feature} className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

const InfoCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <Card className="text-center p-6 shadow hover:shadow-lg transition-shadow h-full">
        <div className="flex justify-center mb-4">
            <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center">
                <Icon className="w-8 h-8" />
            </div>
        </div>
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
    </Card>
);


const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
    <div className="flex flex-col items-center p-6 bg-background border rounded-lg shadow hover:shadow-lg transition-shadow">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
            {number}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

const TestimonialCard = ({ quote, name, role, imageHint }: { quote: string, name: string, role: string, imageHint: string }) => (
  <Card className="h-full flex flex-col shadow hover:shadow-lg transition-shadow">
    <CardContent className="pt-6 flex-grow">
      <p className="italic text-foreground/80">"{quote}"</p>
    </CardContent>
    <CardHeader className="flex-row items-center gap-4">
      <Image
        src="https://placehold.co/50x50.png"
        alt={`Portrait of ${name}`}
        width={50}
        height={50}
        className="rounded-full"
        data-ai-hint={imageHint}
      />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </CardHeader>
  </Card>
);

// A new CheckCircle icon for the feature list
const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

    




