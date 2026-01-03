import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
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
