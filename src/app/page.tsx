
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, BookOpen, Users, Cpu, UserPlus, LayoutDashboard, Sparkles, Wand2, Network, Accessibility, BarChart3, Quote, FileCheck2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 space-y-20 md:space-y-28">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Spark Curiosity. Save Time. Teach Smarter.
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-foreground/80">
          {siteConfig.name} is the AI co-pilot for modern educators. Craft engaging lessons, automate grading, and get the insights you need to help every student succeed.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/signup" className={buttonVariants({ size: "lg" })}>
            Get Started for Free
          </Link>
          <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
            View Your Dashboard <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-12">
            <Image
              src="https://placehold.co/1000x500.png"
              alt="EduGenius Platform Mockup on a laptop"
              width={1000}
              height={500}
              className="rounded-lg shadow-2xl mx-auto ring-1 ring-border"
              data-ai-hint="teacher helping student laptop"
              priority
            />
        </div>
      </section>

       {/* Core Features Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight font-headline">The All-in-One Toolkit for Modern Teaching</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">From planning to grading, EduGenius has you covered.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Wand2 className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">AI-Powered Content Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Generate complete lesson plans, engaging presentations, and custom quizzes in minutes, not hours.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <FileCheck2 className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">Streamlined Grading & Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Let our AI assist with grading essays and assignments, providing constructive feedback for students.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <BarChart3 className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">Actionable Student Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Visualize student progress and class performance with an easy-to-understand analytics dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/30 rounded-lg p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Unlock Your Teaching Superpowers</h2>
                <p className="text-lg text-muted-foreground">Go from idea to engaging classroom activity in three simple steps.</p>
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mr-4 flex-shrink-0">1</div>
                        <div>
                            <h4 className="font-semibold">Define Your Topic</h4>
                            <p className="text-muted-foreground">Tell the AI your lesson topic, grade level, and duration.</p>
                        </div>
                    </li>
                     <li className="flex items-start">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mr-4 flex-shrink-0">2</div>
                        <div>
                            <h4 className="font-semibold">Generate Content Instantly</h4>
                            <p className="text-muted-foreground">Watch as EduGenius builds a complete lesson plan with activities and materials.</p>
                        </div>
                    </li>
                     <li className="flex items-start">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mr-4 flex-shrink-0">3</div>
                        <div>
                            <h4 className="font-semibold">Edit, Assign, and Teach</h4>
                            <p className="text-muted-foreground">Fine-tune the plan in our intuitive editor and assign it to your students.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="hidden md:block">
                 <Image
                    src="https://placehold.co/500x500.png"
                    alt="AI features illustration"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-xl"
                    data-ai-hint="ai brain technology"
                  />
            </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">Trusted by Innovative Educators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="italic text-foreground/80 mb-4">"EduGenius has been a game-changer. I'm spending less time on prep and more time connecting with my students. The AI-generated lesson plans are a fantastic starting point."</p>
              <div className="flex items-center gap-4 mt-4">
                 <Image src="https://placehold.co/50x50.png" alt="Teacher testimonial" width={50} height={50} className="rounded-full" data-ai-hint="teacher person" />
                 <div>
                    <p className="font-semibold">- Maria Garcia</p>
                    <p className="text-sm text-muted-foreground">8th Grade Science Teacher</p>
                 </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="italic text-foreground/80 mb-4">"The analytics dashboard is incredibly insightful. I can quickly see which topics my class is struggling with and adjust my teaching strategy accordingly. Highly recommended!"</p>
              <div className="flex items-center gap-4 mt-4">
                <Image src="https://placehold.co/50x50.png" alt="Teacher testimonial" width={50} height={50} className="rounded-full" data-ai-hint="male teacher" />
                <div>
                  <p className="font-semibold">- David Chen</p>
                  <p className="text-sm text-muted-foreground">High School History Teacher</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section>
        <div className="relative isolate overflow-hidden rounded-lg bg-primary/90 px-6 py-16 text-center shadow-xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground font-headline">Ready to Reimagine Your Classroom?</h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Join thousands of educators who are using EduGenius to create more dynamic and impactful learning experiences.
            </p>
            <div className="mt-8">
              <Link href="/signup" className={buttonVariants({ size: "lg", variant: "secondary" })}>
                Sign Up for Free and Start Creating
              </Link>
            </div>
             <div className="absolute -top-24 -right-24 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                <div className="aspect-[1.1] w-[40.125rem] bg-gradient-to-tr from-[#ffffff] to-[#a0e9ff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
        </div>
      </section>
    </div>
  );
}
