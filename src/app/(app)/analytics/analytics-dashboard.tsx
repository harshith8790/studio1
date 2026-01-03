"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, Trash2, PlusCircle, Wand2, ArrowDown, ArrowUp } from "lucide-react";
import { useActions } from "ai/rsc";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    analyzePostPerformance,
    type AnalyzePostPerformanceOutput,
} from "@/ai/flows/ai-analytics-dashboard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const PostSchema = z.object({
  postId: z.string().min(1),
  content: z.string().min(10),
  engagement: z.coerce.number().min(0),
  reach: z.coerce.number().min(0),
});

const FormSchema = z.object({
  posts: z.array(PostSchema).min(1, "Please add at least one post."),
});

type PostWithAnalysis = z.infer<typeof PostSchema> & { analysis?: AnalyzePostPerformanceOutput['analysis'][0] };

export function AnalyticsDashboard() {
    const { toast } = useToast();
    const { analyzePostPerformance: analyzeAction } = useActions({
        analyzePostPerformance
    });
    const [posts, setPosts] = useState<PostWithAnalysis[]>([
        { postId: 'post-1', content: 'Just launched my new video on AI in content creation! Check it out! #AI #ContentCreation', engagement: 1200, reach: 15000 },
        { postId: 'post-2', content: 'Quick tip: Use natural light for your videos. It makes a huge difference. #VideoTips #CreatorLife', engagement: 2500, reach: 22000 },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            posts: posts,
        },
    });
    
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "posts",
    });

    const handleAnalyze = async () => {
        setIsLoading(true);
        try {
            const currentPosts = form.getValues('posts');
            const result = await analyzeAction({
                platform: "Instagram", // Mocked
                contentNiche: "Tech & AI", // Mocked
                recentPosts: currentPosts,
                growthGoal: "Engagement", // Mocked
                audienceSize: "1k-10k", // Mocked
            });
            
            const analyzedPosts = currentPosts.map(post => {
                const analysis = result.analysis.find(a => a.postId === post.postId);
                return { ...post, analysis };
            });

            setPosts(analyzedPosts);

            toast({
                title: "Analysis Complete!",
                description: "Your post performance insights are ready.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to analyze posts. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="animate-in fade-in-0 zoom-in-95">
            <Form {...form}>
                <div className="space-y-6">
                    {fields.map((field, index) => (
                        <Card key={field.id}>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Post {index + 1}</CardTitle>
                                    <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`content-${index}`}>Content</Label>
                                    <Textarea
                                        id={`content-${index}`}
                                        placeholder="Your post caption or content..."
                                        {...form.register(`posts.${index}.content`)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`engagement-${index}`}>Engagement</Label>
                                        <Input id={`engagement-${index}`} type="number" placeholder="e.g., 1200" {...form.register(`posts.${index}.engagement`)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`reach-${index}`}>Reach</Label>
                                        <Input id={`reach-${index}`} type="number" placeholder="e.g., 15000" {...form.register(`posts.${index}.reach`)} />
                                    </div>
                                </div>
                                 <input type="hidden" {...form.register(`posts.${index}.postId`)} defaultValue={`post-${index + 1}`} />
                            </CardContent>
                            {posts[index]?.analysis && (
                                <CardFooter className="flex flex-col items-start gap-4 p-6 border-t bg-secondary/50">
                                    <h4 className="font-semibold flex items-center gap-2"><Wand2 className="h-5 w-5 text-primary" /> AI Analysis</h4>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="summary">
                                            <AccordionTrigger>Performance Summary</AccordionTrigger>
                                            <AccordionContent>{posts[index].analysis?.performanceSummary}</AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="success">
                                            <AccordionTrigger className="text-green-600">
                                                <ArrowUp className="h-4 w-4 mr-2"/>What Worked Well
                                            </AccordionTrigger>
                                            <AccordionContent>{posts[index].analysis?.successFactors}</AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="failure">
                                            <AccordionTrigger className="text-red-600">
                                               <ArrowDown className="h-4 w-4 mr-2"/>Areas for Improvement
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <p><b>What could be better:</b> {posts[index].analysis?.failureFactors}</p>
                                                <p className="mt-2"><b>Suggestion:</b> {posts[index].analysis?.improvementSuggestions}</p>
                                                </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardFooter>
                            )}
                        </Card>
                    ))}
                    <div className="flex justify-between items-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => append({ postId: `post-${fields.length + 1}`, content: '', engagement: 0, reach: 0 })}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Post
                        </Button>
                        <Button onClick={handleAnalyze} disabled={isLoading || fields.length === 0}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Analyze Performance
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
