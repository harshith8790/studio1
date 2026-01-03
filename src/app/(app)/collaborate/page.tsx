"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Send, Sparkles, ChevronDown, Check, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const collaborators = [
    {
        id: "creator-1",
        name: "GadgetGirl",
        followers: "8.2k",
        niche: "Tech Reviews",
        audienceType: "Professionals",
        primaryPlatform: "YouTube",
        avatarId: "collab-1",
        matchScore: 92,
        matchReason: "Her focus on 'Tech Reviews' complements your 'AI & ML' niche. A collaboration could merge practical gadget applications with theoretical AI concepts, appealing to both your audiences.",
        whatYouBring: "Deep AI expertise and a knack for explaining complex topics simply.",
        whatTheyBring: "A large, engaged audience interested in tangible tech products and a talent for high-quality video production.",
        expectedOutcome: "A joint video series on 'AI-Powered Gadgets' could significantly boost subscribers for both channels and establish a new content category.",
        suggestedCollabType: "Co-Content"
    },
    {
        id: "creator-2",
        name: "CodeWithClara",
        followers: "5.5k",
        niche: "Web Development",
        audienceType: "Students",
        primaryPlatform: "Instagram",
        avatarId: "collab-2",
        matchScore: 85,
        matchReason: "Clara's audience of students is eager to learn. Your AI content can provide them with a cutting-edge skill set, while her platform offers a high-engagement format for visual tutorials.",
        whatYouBring: "Advanced knowledge in AI and machine learning.",
        whatTheyBring: "A strong Instagram presence and experience creating bite-sized educational content for beginners.",
        expectedOutcome: "An Instagram Reels series on 'Adding AI to Your First Web App' could drive high engagement and cross-promote your more in-depth YouTube content.",
        suggestedCollabType: "Co-Content"
    },
    {
        id: "creator-3",
        name: "AI Explained",
        followers: "9.1k",
        niche: "AI & ML",
        audienceType: "Founders",
        primaryPlatform: "Podcast",
        avatarId: "collab-3",
        matchScore: 78,
        matchReason: "You share the same niche but on different platforms. A podcast appearance would allow you to reach a new audience of founders who prefer audio content, establishing your authority in a different medium.",
        whatYouBring: "A fresh perspective and a new voice for his podcast audience.",
        whatTheyBring: "An established podcast with a loyal listener base of decision-makers and tech founders.",
        expectedOutcome: "Increased brand awareness in the startup community and a significant traffic spike to your primary platform from podcast show notes.",
        suggestedCollabType: "Affiliate / Revenue Sharing"
    },
];

type RequestStatus = 'idle' | 'loading' | 'sent';
type RequestStates = { [key: string]: RequestStatus };

export default function CollaboratePage() {
    const { toast } = useToast();
    const [requestStates, setRequestStates] = useState<RequestStates>({});

    const handleSendRequest = (creatorId: string) => {
        setRequestStates(prev => ({ ...prev, [creatorId]: 'loading' }));
        // Mock API call to send collaboration request
        setTimeout(() => {
            setRequestStates(prev => ({ ...prev, [creatorId]: 'sent' }));
            toast({
                title: "Request Sent!",
                description: "Your collaboration request has been delivered.",
            });
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
             <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Collaboration Matching</h1>
                <p className="text-muted-foreground">AI-powered suggestions for your next great collaboration.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {collaborators.map((collab) => {
                    const avatar = placeholderImages.find(p => p.id === collab.avatarId);
                    const requestStatus = requestStates[collab.id] || 'idle';
                    
                    return (
                        <Card key={collab.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                     {avatar &&
                                        <Avatar className="w-16 h-16 border-2 border-primary">
                                            <AvatarImage src={avatar.imageUrl} alt={collab.name} />
                                            <AvatarFallback>{collab.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                    }
                                    <div className="flex-grow">
                                        <CardTitle className="text-xl">{collab.name}</CardTitle>
                                        <CardDescription>{collab.niche} &middot; {collab.followers} followers</CardDescription>
                                    </div>
                                    <Badge className="flex gap-1.5 items-center text-base py-1 px-3">
                                        <Sparkles className="h-4 w-4" />
                                        {collab.matchScore}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            Why is this a good match?
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1">Reason for Match</h4>
                                                <p className="text-xs text-muted-foreground">{collab.matchReason}</p>
                                            </div>
                                             <div>
                                                <h4 className="font-semibold text-sm mb-1">Complementary Strengths</h4>
                                                 <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">You bring:</span> {collab.whatYouBring}</p>
                                                 <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">They bring:</span> {collab.whatTheyBring}</p>
                                            </div>
                                             <div>
                                                <h4 className="font-semibold text-sm mb-1">Expected Outcome</h4>
                                                <p className="text-xs text-muted-foreground">{collab.expectedOutcome}</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                            <CardFooter className="flex flex-col items-stretch gap-3">
                                <div className="text-xs text-center text-muted-foreground">Suggested Collab: <span className="font-semibold text-primary">{collab.suggestedCollabType}</span></div>
                                <Button 
                                    className="w-full"
                                    onClick={() => handleSendRequest(collab.id)}
                                    disabled={requestStatus !== 'idle'}
                                >
                                    {requestStatus === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {requestStatus === 'sent' && <Check className="mr-2 h-4 w-4" />}
                                    {requestStatus === 'idle' && <Send className="mr-2 h-4 w-4" />}
                                    {requestStatus === 'sent' ? 'Request Sent' : 'Send Collab Request'}
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
