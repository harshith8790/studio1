import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "Trend Radar | Content Spark",
};

const trends = [
    {
        title: "AI-Powered Video Editing Tools",
        competition: "Low",
        rationale: "There's a growing interest in simplifying video editing. Showcasing new AI tools can attract viewers looking for efficiency hacks.",
        hashtags: ["AIVideo", "FutureOfEditing", "CreatorTools", "VideoEditing", "TechTrends"],
    },
    {
        title: "The 'Day in the Life' of a Coder",
        competition: "Medium",
        rationale: "Humanizes the tech field and is highly relatable. Focus on a unique aspect of your day to stand out, like 'a day of debugging' or 'building a feature from scratch'.",
        hashtags: ["CodingLife", "DevLife", "DayInTheLife", "TechVlog", "SoftwareEngineer"],
    },
    {
        title: "Explaining Complex AI Concepts Simply",
        competition: "Low",
        rationale: "Many people are curious about AI but intimidated by jargon. Breaking down topics like 'Large Language Models' or 'Neural Networks' into simple analogies is highly valuable and shareable.",
        hashtags: ["AIExplained", "LearnAI", "TechSimplified", "MachineLearning", "ArtificialIntelligence"],
    },
];

export default function TrendsPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
             <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Trend Radar</h1>
                <p className="text-muted-foreground">Discover low-competition trends in your niche.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trends.map((trend, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{trend.title}</CardTitle>
                                <Badge variant={trend.competition === "Low" ? "default" : "secondary"} className={trend.competition === "Low" ? "bg-green-500/20 text-green-700 border-green-500/30" : ""}>
                                    {trend.competition} Competition
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <div className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <Wand2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                    <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Why it works:</span> {trend.rationale}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-3">
                            <Separator />
                            <div className="flex flex-wrap gap-2">
                                {trend.hashtags.map((tag, i) => (
                                    <Badge key={i} variant="outline">#{tag}</Badge>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
