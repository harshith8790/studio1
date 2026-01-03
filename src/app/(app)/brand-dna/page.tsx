"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const FormSchema = z.object({
  brandTone: z.string().min(2, "Please describe your brand tone."),
  missionStatement: z.string().min(10, "Please provide a mission statement."),
  targetAudience: z.string().min(10, "Please describe your target audience."),
});

export default function BrandDnaPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // Mock pre-filled data as if loaded from Firestore
        defaultValues: {
            brandTone: "Informative, witty, and slightly futuristic.",
            missionStatement: "To demystify artificial intelligence for creative professionals and empower them to use AI as a tool for innovation.",
            targetAudience: "Graphic designers, video editors, and content creators aged 25-40 who are curious about AI but may not have a technical background.",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        console.log("Saving Brand DNA:", data);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        toast({
            title: "Brand DNA Saved!",
            description: "Your brand profile has been updated.",
        });
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
             <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Brand DNA</h1>
                <p className="text-muted-foreground">Define your brand's voice to personalize AI generations.</p>
            </div>
            <Card>
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <FormField
                                control={form.control}
                                name="brandTone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand Tone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Professional, funny, serious..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            What is the overall feeling of your brand's voice?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="missionStatement"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Core Mission</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="What is the core purpose of your content?" {...field} />
                                        </FormControl>
                                         <FormDescription>
                                            What drives you to create content for your audience?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="targetAudience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target Audience</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Describe your ideal follower." {...field} />
                                        </FormControl>
                                         <FormDescription>
                                            Who are you trying to reach with your content?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="mr-2 h-4 w-4" />
                                    )}
                                    Save Profile
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
