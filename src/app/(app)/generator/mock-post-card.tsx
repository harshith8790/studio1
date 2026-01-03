"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { AICaptionHashtagGenerationOutput } from "@/ai/flows/ai-caption-hashtag-generation";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

type MockPostCardProps = {
    generation: AICaptionHashtagGenerationOutput;
    platform: "Instagram" | "YouTube" | "LinkedIn" | "X";
}

const platformIcons = {
    Instagram: <Instagram className="h-5 w-5" />,
    YouTube: <Youtube className="h-5 w-5" />,
    LinkedIn: <Linkedin className="h-5 w-5" />,
    X: <Twitter className="h-5 w-5" />,
};

export function MockPostCard({ generation, platform }: MockPostCardProps) {
    const user = {
        name: "Alex Creative",
        handle: "@alexcreative",
        avatar: placeholderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '',
    };
    const postImage = placeholderImages.find(p => p.id === 'post-image-1');

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 bg-secondary/50 p-4">
                 <div className="flex items-center gap-2 text-sm font-semibold">
                    {platformIcons[platform]}
                    <span>{platform} Preview</span>
                 </div>
            </CardHeader>
            <CardContent className="p-0">
                {postImage && (platform === "Instagram" || platform === "LinkedIn") && (
                     <Image
                        src={postImage.imageUrl}
                        alt="Post image"
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover aspect-square"
                        data-ai-hint={postImage.imageHint}
                    />
                )}
                <div className="p-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.handle}</p>
                        </div>
                    </div>
                    <p className="text-sm text-foreground whitespace-pre-wrap font-body">
                        {generation.platformOptimizedText}
                    </p>
                </div>

            </CardContent>
            <CardFooter className="p-4 border-t">
                 <div className="flex flex-wrap gap-2">
                    {generation.hashtags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="font-normal">#{tag}</Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
