"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  CalendarDays,
  Flame,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import Link from 'next/link';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const engagementData = [
    { name: "Post 1", total: 421 },
    { name: "Post 2", total: 789 },
    { name: "Post 3", total: 543 },
    { name: "Post 4", total: 981 },
    { name: "Post 5", total: 654 },
    { name: "Post 6", total: 1123 },
    { name: "Post 7", total: 887 },
];

const calendarIdeas = [
    { day: "Mon", idea: "Share a behind-the-scenes look at your process." },
    { day: "Wed", idea: "Post a quick tip related to your niche." },
    { day: "Fri", idea: "Engage your audience with a Q&A session." },
];

export function DashboardClient() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Alex! Here's your content overview.</p>
            </div>
            <Link href="/generator">
              <Button>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content
              </Button>
            </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Creator Health Score</CardTitle>
                    <HeartPulse className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-500">82%</div>
                    <p className="text-xs text-muted-foreground">
                        Your content strategy is strong and consistent.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Consistency Streak</CardTitle>
                    <Flame className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">14 Days</div>
                    <p className="text-xs text-muted-foreground">
                        Great job posting consistently this month!
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">AI Content Calendar</CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {calendarIdeas.map((item) => (
                             <div key={item.day} className="flex items-start gap-2">
                                <div className="text-sm font-bold w-10 text-primary">{item.day}:</div>
                                <p className="text-sm text-muted-foreground">{item.idea}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
            <Card className="col-span-full xl:col-span-4">
                <CardHeader>
                    <CardTitle>Recent Engagement</CardTitle>
                    <CardDescription>
                        Performance of your last 7 posts.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={engagementData}>
                            <XAxis
                                dataKey="name"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                             <Tooltip
                                cursor={{fill: 'hsl(var(--secondary))'}}
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                }}
                            />
                            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="col-span-full xl:col-span-3">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        Jump right back into your creative flow.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                     <Link href="/analytics" className="group">
                        <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-secondary">
                            <div className="p-2 bg-secondary rounded-lg"><Activity className="h-6 w-6 text-primary"/></div>
                            <div>
                                <p className="font-semibold">Analyze Performance</p>
                                <p className="text-sm text-muted-foreground">Get AI feedback on your recent posts.</p>
                            </div>
                        </div>
                    </Link>
                     <Link href="/trends" className="group">
                        <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-secondary">
                            <div className="p-2 bg-secondary rounded-lg"><TrendingUp className="h-6 w-6 text-primary"/></div>
                            <div>
                                <p className="font-semibold">Discover Trends</p>
                                <p className="text-sm text-muted-foreground">Find the next big thing in your niche.</p>
                            </div>
                        </div>
                    </Link>
                     <Link href="/collaborate" className="group">
                        <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-secondary">
                            <div className="p-2 bg-secondary rounded-lg"><Users className="h-6 w-6 text-primary"/></div>
                            <div>
                                <p className="font-semibold">Find Collaborators</p>
                                <p className="text-sm text-muted-foreground">Connect with other creators.</p>
                            </div>
                        </div>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
