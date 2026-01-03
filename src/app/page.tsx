import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images.json";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:grid-cols-5">
      <div className="flex items-center justify-center py-12 xl:col-span-2">
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <div className="flex justify-center">
                    <Logo />
                </div>
                <h1 className="text-3xl font-bold tracking-tighter mt-4">Welcome to Content Spark</h1>
                <p className="text-balance text-muted-foreground">
                    Sign in to ignite your content strategy and spark your creativity.
                </p>
            </div>
            <div className="grid gap-4">
                <Button variant="outline" asChild>
                    <Link href="/dashboard">
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 64.5C305.1 102.8 274.9 88 248 88c-73.2 0-133.1 61.9-133.1 138.8s59.9 138.8 133.1 138.8c79.2 0 111.3-52.2 114.9-78.8H248v-66h239.5c.4 12.7 1.2 26.4 1.2 42.6z"></path></svg>
                        Continue with Google
                    </Link>
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                By signing in, you agree to our{" "}
                <Link href="#" className="underline">
                    Terms of Service
                </Link>
                .
            </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block xl:col-span-3">
        <Image
          src={placeholderImages[0].imageUrl}
          alt="Abstract image representing creativity and content creation"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.4]"
          data-ai-hint={placeholderImages[0].imageHint}
        />
      </div>
    </div>
  );
}
