'use server';

/**
 * @fileOverview An AI Trend Radar agent.
 *
 * - trendRadar - A function that handles the trend radar process.
 * - TrendRadarInput - The input type for the trendRadar function.
 * - TrendRadarOutput - The return type for the trendRadar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendRadarInputSchema = z.object({
  niche: z.string().describe('The content niche of the creator.'),
});
export type TrendRadarInput = z.infer<typeof TrendRadarInputSchema>;

const TrendRadarOutputSchema = z.object({
  trend: z.string().describe('The trending topic.'),
  strategicRationale: z.string().describe('The strategic rationale for using this trend.'),
  hashtags: z.array(z.string()).describe('Five relevant hashtags for the trend.'),
});
export type TrendRadarOutput = z.infer<typeof TrendRadarOutputSchema>;

export async function trendRadar(input: TrendRadarInput): Promise<TrendRadarOutput> {
  return trendRadarFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trendRadarPrompt',
  input: {schema: TrendRadarInputSchema},
  output: {schema: TrendRadarOutputSchema},
  prompt: `You are an expert in identifying trending topics within specific content niches.

  Based on the content niche provided, identify a trending topic that has low competition and high potential for reach.

  Provide a strategic rationale for why this trend is suitable for the creator.
  Generate five relevant hashtags for the trend.

  Content Niche: {{{niche}}}

  Format your response as a JSON object with the following keys:
  - trend: The trending topic.
  - strategicRationale: The strategic rationale for using this trend.
  - hashtags: An array of five relevant hashtags for the trend.`,
});

const trendRadarFlow = ai.defineFlow(
  {
    name: 'trendRadarFlow',
    inputSchema: TrendRadarInputSchema,
    outputSchema: TrendRadarOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
