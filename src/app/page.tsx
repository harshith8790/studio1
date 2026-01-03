import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/stars";
import { ArrowRight, PlayCircle, Send, Sparkles, Instagram, BookOpen, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#" },
  { name: "How It Works", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Stars />
      <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-4 sm:px-8 md:px-16 bg-background/80 backdrop-blur-sm">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
             <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Try Free</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 sm:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6 items-start text-left">
            <Badge variant="outline" className="border-primary/50 text-primary py-1 px-3">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Marketing Agent
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Your Personal <span className="text-primary">AI Marketing</span> Assistant
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Meet CTK — the intelligent agent that helps entrepreneurs and content creators craft compelling marketing strategies, generate content, and grow their audience 24/7.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Start Chatting Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative">
             <div className="p-4 sm:p-6 rounded-2xl bg-secondary/50 border border-border backdrop-blur-lg shadow-2xl shadow-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-background rounded-full border border-border">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">CTK AI Agent</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Online • Ready to help
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-end">
                    <div className="max-w-xs sm:max-w-sm rounded-2xl rounded-br-none bg-primary text-primary-foreground p-4">
                      I need help creating a content strategy for my new fitness coaching business
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-md rounded-2xl rounded-bl-none bg-muted/50 p-4">
                      <p className="font-medium">Great choice! For your fitness coaching business, I recommend a 3-pillar content strategy:</p>
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><span className="font-bold">Educational Content</span> - Workout tips, nutrition facts</span>
                        </li>
                         <li className="flex items-start gap-2">
                           <BarChart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><span className="font-bold">Social Proof</span> - Client transformations, testimonials</span>
                        </li>
                         <li className="flex items-start gap-2">
                           <Instagram className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span><span className="font-bold">Engagement</span> - Challenges, Q&As, polls</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6">
                  <input
                    type="text"
                    placeholder="Ask CTK AI anything..."
                    className="w-full rounded-full bg-background border border-input h-12 pl-4 pr-12 text-sm"
                  />
                  <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-24 pb-16">
          <div>
            <p className="text-4xl font-bold text-primary">10K+</p>
            <p className="text-muted-foreground">Active Users</p>
          </div>
           <div>
            <p className="text-4xl font-bold text-primary">500K+</p>
            <p className="text-muted-foreground">Contents Generated</p>
          </div>
           <div>
            <p className="text-4xl font-bold text-primary">98%</p>
            <p className="text-muted-foreground">Satisfaction Rate</p>
          </div>
        </div>
      </main>
    </div>
  );
}
