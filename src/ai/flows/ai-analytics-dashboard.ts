'use server';

/**
 * @fileOverview AI-driven analysis of post performance for content creators.
 *
 * This file defines a Genkit flow that provides key engagement and reach insights,
 * including an AI-driven analysis of post performance with explanations for successes and failures.
 *
 * @exports analyzePostPerformance - A function that initiates the post performance analysis flow.
 * @exports AnalyzePostPerformanceInput - The input type for the analyzePostPerformance function.
 * @exports AnalyzePostPerformanceOutput - The return type for the analyzePostPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePostPerformanceInputSchema = z.object({
  platform: z
    .string()
    .describe('The social media platform where the content was posted (e.g., Instagram, YouTube).'),
  contentNiche: z.string().describe('The content niche of the creator (e.g., beauty, gaming, cooking).'),
  recentPosts: z
    .array(z.object({
      postId: z.string().describe('The unique identifier for the post.'),
      engagement: z.number().describe('The engagement rate of the post (e.g., likes, comments, shares).'),
      reach: z.number().describe('The reach of the post (e.g., impressions, views).'),
      content: z.string().describe('The content of the post (e.g., text, caption).'),
    }))
    .describe('An array of recent posts with their engagement and reach metrics.'),
  growthGoal: z
    .string()
    .describe('The creator growth goal (reach, engagement, consistency)'),
  audienceSize: z
    .string()
    .describe('The creator audience size (0–10k followers)'),
});
export type AnalyzePostPerformanceInput = z.infer<typeof AnalyzePostPerformanceInputSchema>;

const AnalyzePostPerformanceOutputSchema = z.object({
  analysis: z
    .array(z.object({
      postId: z.string().describe('The unique identifier for the post.'),
      performanceSummary: z.string().describe('A summary of the post performance.'),
      successFactors: z.string().describe('Reasons for the post success.'),
      failureFactors: z.string().describe('Reasons for the post failure.'),
      improvementSuggestions: z.string().describe('Suggestions for improving future posts.'),
    }))
    .describe('An array of post performance analysis results.'),
});
export type AnalyzePostPerformanceOutput = z.infer<typeof AnalyzePostPerformanceOutputSchema>;

export async function analyzePostPerformance(input: AnalyzePostPerformanceInput): Promise<AnalyzePostPerformanceOutput> {
  return analyzePostPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePostPerformancePrompt',
  input: {schema: AnalyzePostPerformanceInputSchema},
  output: {schema: AnalyzePostPerformanceOutputSchema},
  prompt: `You are an expert social media analyst providing insights to content creators.

You will analyze the performance of recent posts and provide actionable feedback.

Platform: {{{platform}}}
Content Niche: {{{contentNiche}}}
Growth Goal: {{{growthGoal}}}
Audience Size: {{{audienceSize}}}

Recent Posts:
{{#each recentPosts}}
  Post ID: {{{postId}}}
  Engagement: {{{engagement}}}
  Reach: {{{reach}}}
  Content: {{{content}}}
{{/each}}

Analyze each post and provide a performance summary, reasons for success and failure, and improvement suggestions.

Format your response as a JSON object conforming to the following schema:
${JSON.stringify(AnalyzePostPerformanceOutputSchema.describe, null, 2)}`,
});

const analyzePostPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzePostPerformanceFlow',
    inputSchema: AnalyzePostPerformanceInputSchema,
    outputSchema: AnalyzePostPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
