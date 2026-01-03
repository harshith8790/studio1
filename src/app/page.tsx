import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/stars";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Stars />
      <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-center px-4 sm:px-8 md:px-16 bg-background/80 backdrop-blur-sm">
        <Logo />
      </header>

      <main className="container mx-auto px-4 pt-32 sm:pt-40">
        <div className="grid grid-cols-1 gap-16 items-center">
          <div className="flex flex-col gap-6 items-center text-center">
            <Badge variant="outline" className="border-primary/50 text-primary py-1 px-3">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Creator Coach
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Your Personal <span className="text-primary">AI Creator</span> Coach
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Meet CTK — the intelligent agent that helps entrepreneurs and content creators craft compelling strategies, generate content, and grow their audience 24/7.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Chatting Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
