'use server';
/**
 * @fileOverview An AI agent to generate captions and hashtags for social media posts.
 *
 * - generateCaptionAndHashtags - A function that generates captions and hashtags based on input parameters.
 * - AICaptionHashtagGenerationInput - The input type for the generateCaptionAndHashtags function.
 * - AICaptionHashtagGenerationOutput - The return type for the generateCaptionAndHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICaptionHashtagGenerationInputSchema = z.object({
  niche: z.string().describe('The content niche of the creator.'),
  platform: z.enum(['Instagram', 'YouTube', 'LinkedIn', 'X']).describe('The social media platform.'),
  audienceSize: z.string().describe('The approximate audience size of the creator (e.g., 0-1k, 1k-10k).'),
  rawIdea: z.string().describe('The raw idea or topic for the social media post.'),
  brandTone: z.string().optional().describe('The brand tone of the content creator, such as professional, funny, or serious.'),
  missionStatement: z.string().optional().describe('The mission statement of the content creator.'),
});
export type AICaptionHashtagGenerationInput = z.infer<typeof AICaptionHashtagGenerationInputSchema>;

const AICaptionHashtagGenerationOutputSchema = z.object({
  strategicRationale: z.string().describe('The strategic rationale behind the generated caption and hashtags, explaining why they are effective.'),
  platformOptimizedText: z.string().describe('A social media post optimized for the specified platform based on the raw idea.'),
  hashtags: z.array(z.string()).describe('An array of 5 relevant hashtags for the post.'),
});
export type AICaptionHashtagGenerationOutput = z.infer<typeof AICaptionHashtagGenerationOutputSchema>;

export async function generateCaptionAndHashtags(
  input: AICaptionHashtagGenerationInput
): Promise<AICaptionHashtagGenerationOutput> {
  return aiCaptionHashtagGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCaptionHashtagGenerationPrompt',
  input: {schema: AICaptionHashtagGenerationInputSchema},
  output: {schema: AICaptionHashtagGenerationOutputSchema},
  prompt: `You are a social media expert specializing in creating engaging content for various platforms.

Given the following information, generate a strategic rationale, a platform-optimized text, and a list of 5 relevant hashtags.
Ensure the content adheres to AIDA and PAS marketing frameworks.

Content Niche: {{{niche}}}
Platform: {{{platform}}}
Audience Size: {{{audienceSize}}}
Raw Idea: {{{rawIdea}}}
Brand Tone: {{{brandTone}}}
Mission Statement: {{{missionStatement}}}

Strategic Rationale: Explain the strategy behind the caption and hashtags.
Platform-Optimized Text: A social media post optimized for {{platform}} based on the raw idea.
Hashtags: A list of 5 relevant hashtags for the post.

Output in JSON format.
`,
});

const aiCaptionHashtagGenerationFlow = ai.defineFlow(
  {
    name: 'aiCaptionHashtagGenerationFlow',
    inputSchema: AICaptionHashtagGenerationInputSchema,
    outputSchema: AICaptionHashtagGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
