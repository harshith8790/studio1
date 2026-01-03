"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Fingerprint,
  History,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/generator",
    label: "Generator",
    icon: Sparkles,
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart,
  },
  {
    href: "/trends",
    label: "Trend Radar",
    icon: TrendingUp,
  },
  {
    href: "/collaborate",
    label: "Collaborate",
    icon: Users,
  },
  {
    href: "/history",
    label: "History",
    icon: History,
  },
  {
    href: "/brand-dna",
    label: "Brand DNA",
    icon: Fingerprint,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
              asChild
              isActive={pathname === link.href}
              tooltip={link.label}
            >
              <Link href={link.href}>
                <link.icon />
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
