import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Check, BookOpen, GraduationCap, HeartHandshake, Eye, GitBranch, WandSparkles, UsersRound, ChartColumn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import * as React from "react";

const features = [
  {
    icon: <WandSparkles />,
    title: "AI Lesson Generation",
    description: "Create comprehensive lesson plans, quizzes, and presentation outlines in minutes.",
  },
  {
    icon: <UsersRound />,
    title: "Role-Based Dashboards",
    description: "Personalized experiences for Teachers, Students, and Parents to manage their unique tasks.",
  },
  {
    icon: <BookOpen />,
    title: "Multimodal Content",
    description: "Engage students with diverse content including text, video, interactive elements, and more.",
  },
  {
    icon: <ChartColumn />,
    title: "Auto-Grading & Analytics",
    description: "Save time with automated grading for multiple-choice questions and gain insights into student performance.",
  },
  {
    icon: <Eye />,
    title: "Accessibility First",
    description: "Includes text-to-speech, high-contrast, and dyslexia-friendly fonts for inclusive learning.",
  },
  {
    icon: <GitBranch />,
    title: "Flexible & Customizable",
    description: "Adapt and edit AI-generated content to perfectly fit your curriculum and teaching style.",
  },
];

const testimonials = [
  {
    name: "Sarah J., High School Teacher",
    role: "Teacher",
    avatar: "https://i.pravatar.cc/150?img=1",
    comment: "EduGenius has been a game-changer for my lesson planning. I can generate a high-quality draft in minutes, which gives me more time to focus on my students. The AI features are like having a teaching assistant!"
  },
  {
    name: "Alex P., 10th Grade Student",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?img=2",
    comment: "The lessons are way more fun now. I like that I can watch videos or listen to the text if I don't feel like reading. It makes learning feel less like a chore."
  },
  {
    name: "David M., Parent",
    role: "Parent",
    avatar: "https://i.pravatar.cc/150?img=3",
    comment: "The parent dashboard is fantastic. I can easily see my son's progress and upcoming assignments without having to ask him all the time. It helps me feel more involved in his education."
  }
];


export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="container text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            The Future of <span className="text-primary">Learning</span> is Here
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
            EduGenius is an AI-powered, multimodal learning platform designed to empower teachers, engage students, and inform parents.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Log In
            </Link>
          </div>
          <div className="mt-12 lg:mt-16">
             <Image
              src="https://sdmntprwestus3.oaiusercontent.com/files/00000000-0704-61fd-afd5-e65c0b488ee2/raw?se=2025-06-30T03%3A25%3A32Z&amp;sp=r&amp;sv=2024-08-04&amp;sr=b&amp;scid=da6ef745-6400-5ce2-8efa-d3c87f44ce9a&amp;skoid=a3412ad4-1a13-47ce-91a5-c07730964f35&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2025-06-29T18%3A10%3A34Z&amp;ske=2025-06-30T18%3A10%3A34Z&amp;sks=b&amp;skv=2024-08-04&amp;sig=voDmFjW4huH8OCK6QV9PaaLs%2BSh%2BOLvDXiW0pnDKBvo%3D"
              alt="A teacher and student collaborating with a futuristic, holographic educational interface."
              width={1200}
              height={300}
              className="rounded-xl shadow-2xl ring-1 ring-border/20"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 lg:py-32 bg-secondary/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Everything You Need to Succeed</h2>
            <p className="mt-4 text-lg text-foreground/70">
              From AI-powered tools to robust accessibility features, we've got you covered.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="relative transform rounded-xl border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      {React.cloneElement(feature.icon, { className: "h-7 w-7 text-primary" })}
                  </div>
                  <h3 className="mt-6 text-xl font-bold font-headline">{feature.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 sm:py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">A Platform for Everyone</h2>
            <p className="mt-4 text-lg text-foreground/70">
              EduGenius is tailored to meet the unique needs of every user in the educational ecosystem.
            </p>
          </div>
          <div className="mt-16">
            <Tabs defaultValue="teacher" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto h-auto">
                <TabsTrigger value="teacher" className="py-2 flex items-center gap-2"><UsersRound /> Teachers</TabsTrigger>
                <TabsTrigger value="student" className="py-2 flex items-center gap-2"><GraduationCap /> Students</TabsTrigger>
                <TabsTrigger value="parent" className="py-2 flex items-center gap-2"><HeartHandshake /> Parents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="teacher" className="mt-8">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-headline">Streamline Your Workflow</h3>
                    <p className="text-foreground/70">Reclaim your time with powerful AI tools. Generate lesson plans, create quizzes, and get grading assistance, all in one place. Focus more on teaching and less on administrative tasks.</p>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>Instant content creation for any subject</span></li>
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>Automated analytics on student engagement</span></li>
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>Easy management of multiple classes and assignments</span></li>
                    </ul>
                  </div>
                  <Image src="https://placehold.co/600x400.png" alt="A teacher looking confident and relaxed while using a laptop to manage lesson plans in a modern classroom." width={600} height={400} className="rounded-xl shadow-lg" data-ai-hint="teacher technology" />
                </div>
              </TabsContent>

              <TabsContent value="student" className="mt-8">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                   <Image src="https://placehold.co/600x400.png" alt="An engaged student smiling while using a tablet for an interactive lesson in a comfortable learning environment." width={600} height={400} className="rounded-xl shadow-lg order-last lg:order-first" data-ai-hint="student learning" />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-headline">Your Personalized Learning Path</h3>
                    <p className="text-foreground/70">Experience learning like never before. Access lessons in the format that works best for you, from text and video to interactive modules. Track your progress and get instant feedback.</p>
                     <ul className="space-y-2 text-foreground/90">
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>Engaging lessons with varied content types</span></li>
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>Clear overview of assignments and due dates</span></li>
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>Performance dashboard to see your growth</span></li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="parent" className="mt-8">
                 <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-headline">Stay Connected and Informed</h3>
                    <p className="text-foreground/70">Be an active partner in your child's education. The parent dashboard provides a clear, concise overview of your child's academic progress, recent activity, and performance trends.</p>
                     <ul className="space-y-2 text-foreground/90">
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>At-a-glance view of subject performance</span></li>
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>Monitor recent submissions and activities</span></li>
                      <li className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /><span>Facilitates informed conversations with teachers</span></li>
                    </ul>
                  </div>
                  <Image src="https://placehold.co/600x400.png" alt="A parent and child looking together at a tablet displaying educational progress, fostering a supportive home learning environment." width={600} height={400} className="rounded-xl shadow-lg" data-ai-hint="parent child" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

       {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-24 lg:py-32 bg-secondary/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Loved by Educators and Families</h2>
            <p className="mt-4 text-lg text-foreground/70">
              Don't just take our word for it. Here's what people are saying about EduGenius.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="p-6 flex-grow">
                  <p className="text-foreground/80 italic">&quot;{testimonial.comment}&quot;</p>
                </CardContent>
                <CardHeader className="flex-row items-center gap-4 pt-0">
                  <Image src={testimonial.avatar} alt={testimonial.name} width={40} height={40} className="rounded-full" />
                  <div>
                    <CardTitle className="text-base font-bold">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (Placeholder) */}
      <section id="pricing" className="py-20 sm:py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-foreground/70">
              Choose the plan that's right for you. Get started for free.
            </p>
          </div>
           <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:max-w-4xl mx-auto">
             <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>For individuals and small classrooms getting started.</CardDescription>
                    <p className="text-4xl font-bold pt-4">$0 <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Up to 2 classes</p>
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Basic AI features</p>
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Community support</p>
                </CardContent>
                <CardContent>
                     <Button className="w-full" variant="outline">Get Started</Button>
                </CardContent>
            </Card>
            <Card className="flex flex-col border-primary ring-2 ring-primary">
                <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For dedicated teachers and professionals.</CardDescription>
                    <p className="text-4xl font-bold pt-4">$12 <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Unlimited classes</p>
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Advanced AI features</p>
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Advanced analytics</p>
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Priority support</p>
                </CardContent>
                <CardContent>
                     <Button className="w-full">Choose Pro</Button>
                </CardContent>
            </Card>
             <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>School</CardTitle>
                    <CardDescription>For entire schools and districts.</CardDescription>
                    <p className="text-4xl font-bold pt-4">Custom</p>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Everything in Pro</p>
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />SSO & custom integrations</p>
                    <p><Check className="inline h-4 w-4 mr-2 text-green-500" />Dedicated account manager</p>
                </CardContent>
                 <CardContent>
                     <Button className="w-full" variant="outline">Contact Sales</Button>
                 </CardContent>
            </Card>
           </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-primary/10">
        <div className="container text-center">
           <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Ready to Transform Your Classroom?</h2>
           <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            Join thousands of educators, students, and parents who are embracing the future of learning.
          </p>
          <div className="mt-8">
            <Link href="/signup" className={cn(buttonVariants({ size: "lg" }))}>
              Sign Up for Free Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary/50">
        <div className="container flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center gap-2">
             <Icons.logo className="h-5 w-5 text-primary" />
             <p className="font-semibold">{siteConfig.name}</p>
             <p className="text-muted-foreground">&copy; {new Date().getFullYear()}</p>
          </div>
           <nav className="flex gap-4 mt-4 md:mt-0">
              <Link href="/#features" className="text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
           </nav>
        </div>
      </footer>
    </div>
  );
}
