import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, BookOpen, Users, Cpu } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Welcome to {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-foreground/80">
          {siteConfig.description} Empowering educators and inspiring students through innovative AI tools and personalized learning experiences.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/signup" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
          <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Login <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-7 font-headline">Personalized Learning</h3>
            <p className="mt-2 text-base leading-7 text-foreground/70">
              Tailored lessons and tasks to suit individual student needs and learning styles.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Cpu className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-7 font-headline">AI-Powered Tools</h3>
            <p className="mt-2 text-base leading-7 text-foreground/70">
              Leverage AI for lesson generation, auto-grading, and insightful feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-7 font-headline">Inclusive Platform</h3>
            <p className="mt-2 text-base leading-7 text-foreground/70">
              Accessibility features designed to support diverse learners. (TTS, dyslexia mode, contrast options)
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30 rounded-lg p-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-center font-headline">Key Features</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold font-headline">Role-Based Dashboards</h4>
                <p className="text-sm text-foreground/70">Separate interfaces for Teachers, Students, and Parents.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold font-headline">Lesson Management</h4>
                <p className="text-sm text-foreground/70">Create, assign, and track multimedia lessons and tasks.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold font-headline">AI Grading & Content Review</h4>
                <p className="text-sm text-foreground/70">Automated grading for MCQs and AI assistance for text responses.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold font-headline">Accessibility Options</h4>
                <p className="text-sm text-foreground/70">Features like text-to-speech, dyslexia-friendly mode, and high contrast.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Transforming Education with AI</h2>
            <p className="mt-4 text-lg text-foreground/80">
              EduGenius is committed to providing an engaging and effective learning environment. 
              Our AI-driven features save teachers time, provide students with personalized paths, and keep parents informed.
            </p>
            <div className="mt-8">
              <Link href="/signup" className={buttonVariants({ size: "lg", variant: "default" })}>
                Join EduGenius Today
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="EduGenius Platform Showcase"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="education technology"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
