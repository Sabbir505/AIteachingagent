
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, BookOpen, Users, Cpu, UserPlus, LayoutDashboard, Sparkles, Wand2, Network, Accessibility, BarChart3, Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          {siteConfig.name}: Revolutionizing Learning with AI
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-foreground/80">
          Empowering educators with smart tools and inspiring students through personalized, accessible, and engaging learning experiences.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/signup" className={buttonVariants({ size: "lg" })}>
            Join EduGenius Today
          </Link>
          <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Sign In <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-12">
            <Image
              src="https://placehold.co/1000x500.png"
              alt="EduGenius Platform Mockup"
              width={1000}
              height={500}
              className="rounded-lg shadow-xl mx-auto"
              data-ai-hint="education platform interface"
              priority
            />
        </div>
      </section>

      {/* How EduGenius Works Section */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">Get Started in 3 Easy Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <UserPlus className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">1. Sign Up & Choose Role</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Create your account in minutes and select your role – Teacher, Student, or Parent – to unlock a tailored experience.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <LayoutDashboard className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">2. Access Your Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Navigate your personalized dashboard, designed to give you quick access to all the tools and information you need.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">3. Explore AI Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Leverage AI for lesson planning, quiz generation, automated grading, content review, and much more.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Existing Features Section (Retained and slightly adjusted) */}
      <section className="py-16 md:py-0">
         <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">Core Platform Features</h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-7 font-headline">Personalized Learning</h3>
            <p className="mt-2 text-base leading-7 text-foreground/70">
              Tailored lessons and tasks to suit individual student needs and learning styles.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Cpu className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-7 font-headline">AI-Powered Tools</h3>
            <p className="mt-2 text-base leading-7 text-foreground/70">
              Leverage AI for lesson generation, auto-grading, and insightful feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-7 font-headline">Inclusive Platform</h3>
            <p className="mt-2 text-base leading-7 text-foreground/70">
              Accessibility features designed to support diverse learners (TTS, dyslexia mode, contrast options).
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose EduGenius Section */}
      <section className="bg-secondary/30 rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">Unlock the Future of Education with EduGenius</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Wand2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold font-headline">AI-Powered Efficiency</h4>
              <p className="text-sm text-foreground/70">Automate lesson planning, quiz creation, and grading to save valuable time and focus on teaching.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Network className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold font-headline">Tailored Learning Journeys</h4>
              <p className="text-sm text-foreground/70">Provide students with personalized content and adaptive learning paths that cater to their unique needs.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Accessibility className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold font-headline">Inclusive & Accessible Design</h4>
              <p className="text-sm text-foreground/70">Built-in tools like text-to-speech, dyslexia-friendly fonts, and contrast options ensure learning for all.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold font-headline">Actionable Insights & Analytics</h4>
              <p className="text-sm text-foreground/70">Track student progress, identify learning gaps, and make data-driven decisions with comprehensive analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Placeholder) */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">Loved by Educators and Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="italic text-foreground/80 mb-4">"EduGenius has transformed how I plan my lessons. The AI tools are incredibly intuitive and save me hours of work each week!"</p>
              <p className="font-semibold">- Ms. Sarah K., 8th Grade Science Teacher</p>
              <Image src="https://placehold.co/150x150.png" alt="Teacher testimonial" width={80} height={80} className="rounded-full mt-4 float-right" data-ai-hint="teacher person" />
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="italic text-foreground/80 mb-4">"Learning with EduGenius is fun! The lessons are easy to follow, and I like that I can learn at my own pace. The AI feedback helps me understand my mistakes."</p>
              <p className="font-semibold">- Alex P., Grade 6 Student</p>
               <Image src="https://placehold.co/150x150.png" alt="Student testimonial" width={80} height={80} className="rounded-full mt-4 float-right" data-ai-hint="student person" />
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 md:py-0">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-primary text-primary-foreground p-8 md:p-12 rounded-lg">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Ready to Transform Your Educational Experience?</h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Join the EduGenius community today and discover a smarter, more engaging way to teach and learn.
            </p>
            <div className="mt-8">
              <Link href="/signup" className={buttonVariants({ size: "lg", variant: "secondary" })}>
                Sign Up for Free
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="https://placehold.co/500x350.png"
              alt="Happy students and teachers"
              width={500}
              height={350}
              className="rounded-lg shadow-xl"
              data-ai-hint="diverse students learning"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

    