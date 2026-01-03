"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useActions } from "ai/rsc";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    generateCaptionAndHashtags,
    type AICaptionHashtagGenerationOutput,
} from "@/ai/flows/ai-caption-hashtag-generation";
import { MockPostCard } from "./mock-post-card";
import { Card, CardContent } from "@/components/ui/card";

const FormSchema = z.object({
    rawIdea: z.string().min(10, {
        message: "Your idea must be at least 10 characters.",
    }).max(500, { message: "Your idea must be less than 500 characters." }),
    platform: z.enum(["Instagram", "YouTube", "LinkedIn", "X"]),
    audienceSize: z.string().min(1, { message: "Please select an audience size." }),
    niche: z.string().min(2, { message: "Please specify your niche." }),
});

export function GeneratorView() {
    const { toast } = useToast();
    const { generateCaptionAndHashtags: generateAction } = useActions({
        generateCaptionAndHashtags
    });
    const [generation, setGeneration] = useState<AICaptionHashtagGenerationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            rawIdea: "",
            platform: "Instagram",
            audienceSize: "1k-10k",
            niche: "Tech & AI",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setGeneration(null);
        try {
            const result = await generateAction(data);
            setGeneration(result);
            toast({
                title: "Content Generated!",
                description: "Your new post is ready to be reviewed.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate content. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 animate-in fade-in-0 zoom-in-95">
            <Card className="lg:col-span-2 h-fit">
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="rawIdea"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Raw Idea</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="e.g., A tutorial on how to use the new AI features in Photoshop."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Describe your content idea in a few sentences.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="platform"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Platform</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a platform" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Instagram">Instagram</SelectItem>
                                                    <SelectItem value="YouTube">YouTube</SelectItem>
                                                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                                    <SelectItem value="X">X (Twitter)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="audienceSize"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Audience Size</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select size" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="0-1k">0-1k</SelectItem>
                                                    <SelectItem value="1k-10k">1k-10k</SelectItem>
                                                    <SelectItem value="10k-50k">10k-50k</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Sparkles className="mr-2 h-4 w-4" />
                                )}
                                Generate Content
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="lg:col-span-3">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 rounded-lg border border-dashed">
                        <Wand2 className="h-12 w-12 text-primary animate-pulse" />
                        <h3 className="text-xl font-semibold mt-4">Generating your content...</h3>
                        <p className="text-muted-foreground mt-2">The AI is warming up. This might take a moment.</p>
                    </div>
                )}
                {generation && (
                    <div className="space-y-6">
                        <MockPostCard
                            generation={generation}
                            platform={form.getValues("platform")}
                        />
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Wand2 className="h-5 w-5 text-primary" /> Strategic Rationale</h3>
                                <p className="text-muted-foreground whitespace-pre-wrap font-body">{generation.strategicRationale}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
                 {!isLoading && !generation && (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 rounded-lg border border-dashed">
                        <Sparkles className="h-12 w-12 text-muted-foreground/50" />
                        <h3 className="text-xl font-semibold mt-4">Your masterpiece awaits</h3>
                        <p className="text-muted-foreground mt-2">Fill out the form to generate your next social media post.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
