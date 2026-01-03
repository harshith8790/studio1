import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/stars";

export default function LoginPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4">
      <Stars />
      <div className="flex flex-col items-center gap-8 text-center">
        <Logo className="text-8xl font-bold" />
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="px-8 py-6 text-lg">
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
