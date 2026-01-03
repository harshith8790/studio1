
"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks, addWeeks } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data representing scheduled content with status
const scheduledContent = [
  {
    date: new Date(2024, 0, 1), // Jan 1
    title: "Workout",
    status: "posted",
  },
  {
    date: new Date(2024, 0, 2), // Jan 2
    title: "Morning rou...",
    status: "posted",
  },
    {
    date: new Date(2024, 0, 3), // Jan 3
    title: "Quick tips",
    status: "planned",
  },
  {
    date: new Date(2023, 11, 31), // Dec 31
    title: "Recipe share",
    status: "missed",
  },
];

type ScheduledPost = (typeof scheduledContent)[0];
type Status = "posted" | "planned" | "missed";


const statusStyles: { [key in Status]: { icon: React.ReactNode, badge: string, text: string } } = {
    posted: {
        icon: <CheckCircle2 className="h-4 w-4" />,
        badge: "bg-green-100 text-green-800 border-green-200",
        text: "text-green-800"
    },
    planned: {
        icon: <Clock className="h-4 w-4" />,
        badge: "bg-blue-100 text-blue-800 border-blue-200",
        text: "text-blue-800"
    },
    missed: {
        icon: <XCircle className="h-4 w-4" />,
        badge: "bg-red-100 text-red-800 border-red-200",
        text: "text-red-800"
    }
}


export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 0, 2));


  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };


  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl">
            Content Calendar
            </h1>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-md font-semibold text-foreground">
                {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
            </span>
             <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToPreviousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
            const dayContent = scheduledContent.filter(
                (item) => format(item.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
            );
            const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

            return (
                <Card 
                    key={day.toString()} 
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                        "cursor-pointer transition-all hover:bg-muted/50 min-h-[120px]",
                        isSelected && "border-primary ring-2 ring-primary"
                    )}
                >
                    <CardContent className="p-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{format(day, "eee")}</span>
                            <span className={cn("font-semibold", isSelected && "text-primary")}>{format(day, "d")}</span>
                        </div>
                        <div className="mt-2 space-y-1">
                            {dayContent.map((item) => {
                                const styles = statusStyles[item.status as Status];
                                return (
                                    <Badge key={item.title} variant="outline" className={cn("w-full justify-start gap-2 truncate py-1 text-xs font-medium", styles.badge, styles.text)}>
                                        {styles.icon}
                                        <span className="truncate">{item.title}</span>
                                    </Badge>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )
        })}
      </div>
      
      <div className="flex justify-center items-center gap-6 text-sm">
        {Object.entries(statusStyles).map(([status, { icon, text }]) => (
            <div key={status} className="flex items-center gap-2">
                <span className={cn(text)}>{icon}</span>
                <span className="capitalize text-muted-foreground">{status}</span>
            </div>
        ))}
      </div>
    </div>
  );
}

