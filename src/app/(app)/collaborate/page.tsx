import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Send } from "lucide-react";
import Image from "next/image";

export const metadata = {
    title: "Collaborate | Content Spark",
};

const collaborators = [
    {
        name: "GadgetGirl",
        followers: "8.2k",
        niche: "Tech Reviews",
        avatarId: "collab-1",
        imageHint: "person smiling"
    },
    {
        name: "CodeWithClara",
        followers: "5.5k",
        niche: "Web Development",
        avatarId: "collab-2",
        imageHint: "woman portrait"
    },
    {
        name: "AI Explained",
        followers: "9.1k",
        niche: "AI & ML",
        avatarId: "collab-3",
        imageHint: "man working"
    },
];


export default function CollaboratePage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
             <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Find Collaborators</h1>
                <p className="text-muted-foreground">Connect with creators in a similar niche and follower range.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {collaborators.map((collab) => {
                    const avatar = placeholderImages.find(p => p.id === collab.avatarId);
                    return (
                        <Card key={collab.name} className="flex flex-col">
                            <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                                {avatar &&
                                    <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                                        <AvatarImage src={avatar.imageUrl} alt={collab.name} data-ai-hint={avatar.imageHint} />
                                        <AvatarFallback>{collab.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                }
                                <h3 className="font-semibold text-lg">{collab.name}</h3>
                                <p className="text-muted-foreground text-sm">{collab.followers} followers</p>
                                <Badge variant="secondary" className="mt-3">{collab.niche}</Badge>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Collab Request
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
