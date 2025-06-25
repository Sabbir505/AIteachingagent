
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, BarChart, Users, GraduationCap, HeartHandshake, Eye, ListTodo, ShieldCheck, FilePlus2, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
          <div className="flex flex-col items-start space-y-6">
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
          <div className="lg:block">
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

        {/* Features For Everyone Section */}
        <section id="features" className="py-12 md:py-24 bg-secondary/40">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold font-headline">An Ecosystem for Education</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                EduGenius is designed for everyone in the learning journey. Select a role to see how we can help you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard icon={Users} title="For Teachers" description="Generate lesson plans, quizzes, and presentations in minutes. Spend more time teaching, less time planning." features={["AI Lesson Planner", "Student Analytics", "AI Grading Assist"]}/>
                <FeatureCard icon={GraduationCap} title="For Students" description="Engage with dynamic content, videos, and quizzes tailored to your learning style." features={["Interactive Lessons", "Track Your Progress", "Submit Assignments"]}/>
                <FeatureCard icon={HeartHandshake} title="For Parents" description="Stay informed about your child's academic performance, upcoming assignments, and grades." features={["Progress Overview", "Teacher Communication", "View Assignments"]} />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-24">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold font-headline">Go from Idea to Impact in 3 Steps</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our intuitive process makes content creation a breeze for educators.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <StepCard number="1" title="Define & Generate" description="Provide your topic and grade level. Let our AI craft a detailed lesson plan or presentation outline." />
                    <StepCard number="2" title="Customize & Assign" description="Fine-tune the generated content in our easy-to-use editor and assign it to your classes with a single click." />
                    <StepCard number="3" title="Track & Improve" description="Monitor student engagement and performance through our analytics to inform your future teaching." />
                </div>
            </div>
        </section>


        {/* Testimonials Section */}
        <section className="bg-secondary/40 py-12 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">Why People Love EduGenius</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Final CTA Section */}
        <section className="py-24">
          <div className="container text-center">
            <h2 className="text-4xl font-bold tracking-tight text-primary font-headline">Join the Educational Revolution.</h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-foreground/80">
              Ready to transform your teaching and learning experience? Sign up today and discover the future of education.
            </p>
            <div className="mt-10">
              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Get Started for Free Today
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
    <Card className="h-full flex flex-col items-start text-left">
        <CardHeader>
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <CardTitle>{title}</CardTitle>
             <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow w-full">
            <ul className="space-y-2 text-sm text-muted-foreground">
                {features.map(feature => (
                    <li key={feature} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        {feature}
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
    <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
            {number}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

const TestimonialCard = ({ quote, name, role, imageHint }: { quote: string, name: string, role: string, imageHint: string }) => (
  <Card className="h-full flex flex-col">
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
