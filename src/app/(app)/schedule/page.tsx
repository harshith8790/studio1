
"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks, addWeeks, isSameDay } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Wand2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";


type Status = "posted" | "planned" | "missed";

interface ScheduledPost {
    date: Date;
    title: string;
    status: Status;
}

// Mock data representing scheduled content with status
const initialScheduledContent: ScheduledPost[] = [
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
  const [scheduledContent, setScheduledContent] = useState<ScheduledPost[]>(initialScheduledContent);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const handleSelectDate = (day: Date) => {
    setSelectedDate(day);
    const contentForDay = scheduledContent.find(item => isSameDay(item.date, day));
    setNote(contentForDay?.title || "");
  }

  const handleSaveNote = () => {
    if (!note.trim()) {
        toast({
            title: "Note is empty",
            description: "Please write something before saving.",
            variant: "destructive"
        })
        return;
    };

    setScheduledContent(prevContent => {
        const existingIndex = prevContent.findIndex(item => isSameDay(item.date, selectedDate));
        if (existingIndex > -1) {
            const updatedContent = [...prevContent];
            updatedContent[existingIndex] = { ...updatedContent[existingIndex], title: note, status: "planned" };
            return updatedContent;
        } else {
            return [...prevContent, { date: selectedDate, title: note, status: "planned" }];
        }
    });

    toast({
        title: "Content Saved!",
        description: `Your notes for ${format(selectedDate, "MMM d")} have been saved.`
    })
  }
  
  // Set initial note for selected date
  useState(() => {
    handleSelectDate(selectedDate);
  });


  return (
    <div className="flex flex-col gap-8 animate-in fade-in-0 zoom-in-95">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="grid grid-cols-7 gap-2">
                {days.map((day) => {
                    const dayContent = scheduledContent.filter(
                        (item) => format(item.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                    );
                    const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

                    return (
                        <Card 
                            key={day.toString()} 
                            onClick={() => handleSelectDate(day)}
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
                  <div className="flex justify-center items-center gap-6 text-sm mt-4">
                    {Object.entries(statusStyles).map(([status, { icon, text }]) => (
                        <div key={status} className="flex items-center gap-2">
                            <span className={cn(text)}>{icon}</span>
                            <span className="capitalize text-muted-foreground">{status}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wand2 className="h-5 w-5 text-primary"/>
                            Daily Dose of Post Analysis
                        </CardTitle>
                        <CardDescription>
                            Notes for {format(selectedDate, "MMMM d, yyyy")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid w-full gap-2">
                            <Label htmlFor="note">Your Content/Notes</Label>
                            <Textarea 
                                id="note"
                                placeholder="Type your content ideas or analysis here..." 
                                className="min-h-[150px]"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        <Button className="w-full" onClick={handleSaveNote}>
                            <Save className="mr-2 h-4 w-4"/>
                            Save Note
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}