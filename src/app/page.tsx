
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, BarChart, Users, GraduationCap, HeartHandshake, Eye, ListTodo } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
              Empower Every Learner, Supercharge Every Teacher.
            </h1>
            <p className="max-w-2xl text-lg text-foreground/80">
              Welcome to {siteConfig.name}, the all-in-one platform that brings AI-powered lesson planning, student engagement, and parent communication together seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Start for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#features" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Explore Features
              </Link>
            </div>
          </div>
          <div className="block">
            <Image
              src="https://placehold.co/600x500.png"
              alt="A vibrant, modern classroom with students using tablets"
              width={600}
              height={500}
              className="rounded-xl shadow-2xl"
              data-ai-hint="modern classroom technology"
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

            <Tabs defaultValue="teacher" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-md mx-auto h-auto sm:h-12 gap-2 sm:gap-0">
                <TabsTrigger value="teacher" className="h-10"><Users className="mr-2"/> For Teachers</TabsTrigger>
                <TabsTrigger value="student" className="h-10"><GraduationCap className="mr-2"/> For Students</TabsTrigger>
                <TabsTrigger value="parent" className="h-10"><HeartHandshake className="mr-2"/> For Parents</TabsTrigger>
              </TabsList>

              {/* Teacher Content */}
              <TabsContent value="teacher">
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                   <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                        <FeatureCard icon={Bot} title="AI Lesson Planner" description="Generate lesson plans, quizzes, and presentations in minutes. Spend more time teaching, less time planning." />
                        <FeatureCard icon={BarChart} title="Student Analytics" description="Get insights into class performance and identify learning gaps with our intuitive dashboard." />
                   </div>
                   <div className="hidden lg:flex justify-center">
                        <Image src="https://placehold.co/400x300.png" alt="Teacher dashboard view" width={400} height={300} className="rounded-lg shadow-lg" data-ai-hint="teacher dashboard data" />
                   </div>
                </div>
              </TabsContent>

              {/* Student Content */}
              <TabsContent value="student">
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                   <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                        <FeatureCard icon={ListTodo} title="Interactive Lessons" description="Engage with dynamic content, videos, and quizzes tailored to your learning style." />
                        <FeatureCard icon={BarChart} title="Track Your Progress" description="View your grades, feedback, and performance over time to stay on top of your goals." />
                   </div>
                   <div className="hidden lg:flex justify-center">
                        <Image src="https://placehold.co/400x300.png" alt="Student assignment view" width={400} height={300} className="rounded-lg shadow-lg" data-ai-hint="student learning online" />
                   </div>
                </div>
              </TabsContent>

              {/* Parent Content */}
              <TabsContent value="parent">
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                   <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                        <FeatureCard icon={Eye} title="Progress Overview" description="Stay informed about your child's academic performance, upcoming assignments, and grades." />
                        <FeatureCard icon={Users} title="Teacher Communication" description="Easily communicate with teachers and stay involved in your child's educational journey." />
                   </div>
                   <div className="hidden lg:flex justify-center">
                        <Image src="https://placehold.co/400x300.png" alt="Parent progress monitoring view" width={400} height={300} className="rounded-lg shadow-lg" data-ai-hint="parent child computer" />
                   </div>
                </div>
              </TabsContent>
            </Tabs>
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

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <Card className="text-left h-full">
        <CardHeader>
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
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
