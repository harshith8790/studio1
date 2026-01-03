"use client";

import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Activity,
  Lightbulb,
  Tag,
  Target,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data representing a week's worth of scheduled content
const scheduledContent = [
  {
    date: new Date(2024, 6, 22),
    platform: "Instagram",
    title: "Behind-the-Scenes: My Editing Workflow",
    description:
      "A short Reel showcasing the tools and techniques I use to edit my videos. Quick cuts, engaging music, and a satisfying before-and-after.",
    hashtags: ["VideoEditing", "CreatorLife", "Workflow", "Tech"],
    strategicRationale:
      "Builds authority and provides value by teaching a skill. The BTS format fosters a stronger connection with the audience.",
    growthGoal: "Engagement",
  },
  {
    date: new Date(2024, 6, 24),
    platform: "LinkedIn",
    title: "The Future of AI in Content Creation",
    description:
      "A thoughtful post on how AI tools are changing the landscape for creators, from ideation to production. Posing a question at the end to drive discussion.",
    hashtags: ["AI", "ContentCreation", "FutureOfTech", "Marketing"],
    strategicRationale:
      "Positions you as a forward-thinker in the industry. LinkedIn is ideal for professional topics and encourages thoughtful comments.",
    growthGoal: "Reach",
  },
  {
    date: new Date(2024, 6, 26),
    platform: "X",
    title: "Quick Poll: What's Your Biggest Creator Challenge?",
    description:
      "A simple poll asking followers to vote on their biggest struggle: a) Finding ideas, b) Staying consistent, c) Growing an audience, d) Monetization.",
    hashtags: ["CreatorEconomy", "SocialMedia", "AudienceGrowth"],
    strategicRationale:
      "A low-effort, high-engagement post. The poll encourages interaction and provides valuable audience research for future content.",
    growthGoal: "Engagement",
  },
];

type ScheduledPost = (typeof scheduledContent)[0];

export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const selectedContent = scheduledContent.find(
    (d) => selectedDate && format(d.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  const scheduledDays = scheduledContent.map((item) => item.date);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">
          Content Schedule
        </h1>
        <p className="text-muted-foreground">
          Plan, view, and analyze your upcoming content.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
               <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="w-full"
                components={{
                  Caption: ({ displayMonth }) => (
                    <div className="flex items-center justify-between px-4 py-2">
                       <h2 className="text-lg font-semibold">{format(displayMonth, 'MMMM yyyy')}</h2>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ),
                }}
                modifiers={{ scheduled: scheduledDays }}
                modifiersStyles={{
                  scheduled: {
                    border: "2px solid hsl(var(--primary))",
                    borderRadius: "var(--radius)",
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-[445px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Daily Dose of Post Analysis
              </CardTitle>
              <CardDescription>
                {selectedDate
                  ? `Analysis for ${format(selectedDate, "PPP")}`
                  : "Select a date to see the analysis"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedContent ? (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {selectedContent.title}
                      </h3>
                      <Badge variant="secondary" className="mt-1">
                        For {selectedContent.platform}
                      </Badge>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <p>
                          <span className="font-semibold text-foreground">
                            Description:
                          </span>{" "}
                          {selectedContent.description}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Tag className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          <span className="font-semibold text-foreground">
                            Hashtags:
                          </span>
                          {selectedContent.hashtags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <p>
                          <span className="font-semibold text-foreground">
                            Strategic Rationale:
                          </span>{" "}
                          {selectedContent.strategicRationale}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Target className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <p>
                          <span className="font-semibold text-foreground">
                            Growth Goal:
                          </span>{" "}
                          <Badge variant="default">
                            {selectedContent.growthGoal}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
                  <Activity className="h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">
                    {selectedDate ? "No Content Scheduled" : "Select a Day"}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedDate
                      ? "There's no post analysis for this day."
                      : "Pick a date from the calendar to see the analysis."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
