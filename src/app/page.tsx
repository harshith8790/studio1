"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/stars";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";


const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function LandingPage() {
  const auth = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Login Successful!",
        description: "Welcome back.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Stars />
      <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-center px-4 sm:px-8 md:px-16 bg-background/80 backdrop-blur-sm">
        <Logo />
      </header>

      <main className="container mx-auto px-4 pt-32 sm:pt-40 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
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
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Chatting Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
             <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Welcome back! Please enter your details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...form.register("email")}
                            />
                             {form.formState.errors.email && (
                                <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                             <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" {...form.register("password")} />
                             {form.formState.errors.password && (
                                <p className="text-destructive text-sm">{form.formState.errors.password.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                             {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>

      </main>
        <footer className="container mx-auto px-4 py-16">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
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
        </footer>
    </div>
  );
}
