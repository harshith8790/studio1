import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/dashboard" className={cn("flex items-center", className)}>
       <h1 className="text-xl font-bold text-foreground">CTK</h1>
    </Link>
  );
}
