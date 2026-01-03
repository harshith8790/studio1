import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/dashboard" className={cn("flex items-center gap-2", className)}>
       <Sparkles className="h-6 w-6 text-primary" />
       <h1 className="text-xl font-bold text-foreground hidden group-data-[state=expanded]:sm:inline-block">Content Spark</h1>
    </Link>
  );
}
