import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/dashboard" className={cn("flex items-center gap-2", className)}>
       <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
        <Zap className="h-5 w-5" />
       </div>
       <h1 className="text-xl font-bold text-foreground">CTK</h1>
    </Link>
  );
}
