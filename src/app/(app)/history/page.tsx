import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "History | Content Spark",
};

const historyItems = [
    {
        idea: "A tutorial on how to use the new AI features in Photoshop.",
        platform: "Instagram",
        date: "2 days ago",
        content: "Unleash your creativity with Photoshop's new AI tools! 🤖✨ In this quick tutorial, I'll show you how to use Generative Fill to transform your photos in seconds. It's a game-changer! What will you create first? #PhotoshopAI #GenerativeFill #PhotoEditing #CreativeTools #AIart",
        hashtags: ["PhotoshopAI", "GenerativeFill", "PhotoEditing", "CreativeTools", "AIart"],
    },
    {
        idea: "Why consistency is more important than virality for new creators.",
        platform: "LinkedIn",
        date: "5 days ago",
        content: "Stop chasing viral hits. Start building a loyal audience. For new creators, consistency is the key to long-term growth. Showing up regularly builds trust, establishes your expertise, and creates a real community. Virality is a bonus, not a strategy. #ContentCreation #CreatorEconomy #Consistency #AudienceBuilding #MarketingStrategy",
        hashtags: ["ContentCreation", "CreatorEconomy", "Consistency", "AudienceBuilding", "MarketingStrategy"],
    },
];

export default function HistoryPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
             <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Content History</h1>
                <p className="text-muted-foreground">Review your previously generated content.</p>
            </div>
            <div className="space-y-6">
                {historyItems.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-base">Idea: "{item.idea}"</CardTitle>
                            <CardDescription>
                                For <span className="font-semibold text-primary">{item.platform}</span> &middot; Generated {item.date}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground whitespace-pre-wrap font-body">{item.content}</p>
                        </CardContent>
                        <CardFooter>
                            <div className="flex flex-wrap gap-2">
                                {item.hashtags.map((tag, i) => (
                                    <Badge key={i} variant="secondary">#{tag}</Badge>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
