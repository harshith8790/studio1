import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const loginImage = placeholderImages.find(p => p.id === 'login-hero');
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:grid-cols-5">
      <div className="flex items-center justify-center py-12 xl:col-span-2">
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <div className="flex justify-center">
                    <Logo />
                </div>
                <h1 className="text-3xl font-bold tracking-tighter mt-4">Welcome Back</h1>
                <p className="text-balance text-muted-foreground">
                    Sign in to ignite your content strategy.
                </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
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
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Login</Link>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                    Sign up
                </Link>
            </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block xl:col-span-3">
        {loginImage && <Image
          src={loginImage.imageUrl}
          alt={loginImage.description}
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.4]"
          data-ai-hint={loginImage.imageHint}
        />}
      </div>
    </div>
  );
}
