"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const FormSchema = z.object({
  platform: z.string().min(1, { message: "Please select your primary platform." }),
  contentNiche: z.string().min(2, { message: "Please enter your content niche." }),
  growthGoal: z.string().min(1, { message: "Please select your main growth goal." }),
});

export function OnboardingForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            platform: "",
            contentNiche: "",
            growthGoal: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        console.log("Onboarding data:", data);
        // Mock API call to save data
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toast({
            title: "Welcome to Content Spark!",
            description: "Your profile is all set up.",
        });
        router.push("/dashboard");
    }

    return (
        <Card>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="platform"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Primary Platform</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="e.g., Instagram" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Instagram">Instagram</SelectItem>
                                            <SelectItem value="YouTube">YouTube</SelectItem>
                                            <SelectItem value="TikTok">TikTok</SelectItem>
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
                            name="contentNiche"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content Niche</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Tech Reviews, Fitness, Cooking" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="growthGoal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Main Growth Goal</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="What's your focus?" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Reach">Grow My Reach</SelectItem>
                                            <SelectItem value="Engagement">Increase Engagement</SelectItem>
                                            <SelectItem value="Consistency">Improve Posting Consistency</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Rocket className="mr-2 h-4 w-4" />
                            )}
                            Let's Go!
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
