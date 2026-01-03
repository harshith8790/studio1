'use server';

/**
 * @fileOverview Generates a content calendar tailored to the user's niche, platform, and goals.
 *
 * - generateContentCalendar - A function that generates the content calendar.
 * - ContentCalendarInput - The input type for the generateContentCalendar function.
 * - ContentCalendarOutput - The return type for the generateContentCalendar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentCalendarInputSchema = z.object({
  platform: z
    .string()
    .describe('The social media platform (e.g., Instagram, YouTube Shorts).'),
  contentNiche: z.string().describe('The content niche (e.g., beauty, fitness, tech).'),
  growthGoal: z
    .string()
    .describe(
      'The creator growth goal (e.g., reach, engagement, consistency, follower count).'
    ),
  brandProfile: z
    .string()
    .describe(
      'A description of the brand profile including tone, target audience, and mission.'
    ),
  trendRadar: z.string().describe('Trending topics within the user\'s niche.'),
});
export type ContentCalendarInput = z.infer<typeof ContentCalendarInputSchema>;

const ContentCalendarOutputSchema = z.object({
  calendar: z
    .array(
      z.object({
        date: z.string().describe('The date for the content.'),
        platform: z.string().describe('The platform for the content.'),
        contentNiche: z.string().describe('The content niche.'),
        growthGoal: z.string().describe('The growth goal.'),
        title: z.string().describe('The title of the content.'),
        description: z.string().describe('A brief description of the content.'),
        hashtags: z.array(z.string()).describe('Relevant hashtags for the content.'),
        strategicRationale: z
          .string()
          .describe('Explanation of why this content works for the user.'),
      })
    )
    .describe('A structured content calendar with daily content suggestions.'),
});
export type ContentCalendarOutput = z.infer<typeof ContentCalendarOutputSchema>;

export async function generateContentCalendar(input: ContentCalendarInput): Promise<
  ContentCalendarOutput
> {
  return contentCalendarFlow(input);
}

const contentCalendarPrompt = ai.definePrompt({
  name: 'contentCalendarPrompt',
  input: {schema: ContentCalendarInputSchema},
  output: {schema: ContentCalendarOutputSchema},
  prompt: `You are an expert social media strategist. Generate a weekly content calendar with daily content suggestions for a content creator on {{{platform}}} in the {{{contentNiche}}} niche. The content creator's goal is to increase {{{growthGoal}}}.

Use the following brand profile to tailor the content to the creator's brand:

{{{brandProfile}}}

Incorporate trending topics from the trend radar:

{{{trendRadar}}}

Each content suggestion should include:
- date: The date for the content.
- platform: The platform for the content.
- contentNiche: The content niche.
- growthGoal: The growth goal.
- title: A catchy title for the content.
- description: A brief description of the content.
- hashtags: Relevant hashtags for the content. Limit to 5.
- strategicRationale: Explanation of why this content works for the user, referencing AIDA and PAS frameworks.

Format the output as a JSON object with a 'calendar' field, which is an array of content suggestions.

Make sure to format the hashtags without the '# character'.

Follow this format:
{
  "calendar": [
    {
      "date": "2024-01-01",
      "platform": "Instagram",
      "contentNiche": "beauty",
      "growthGoal": "reach",
      "title": "New Year's Makeup Tutorial",
      "description": "A step-by-step guide to creating a stunning makeup look for New Year's Eve.",
      "hashtags": ["newyearsmakeup", "makeuptutorial", "beauty", "glam", "nye"],
      "strategicRationale": "This content leverages the AIDA framework by grabbing Attention with a relevant topic, creating Interest with a tutorial, building Desire with a stunning look, and prompting Action by encouraging viewers to recreate the look and share their creations."
    },
    {
      "date": "2024-01-02",
      "platform": "Instagram",
      "contentNiche": "beauty",
      "growthGoal": "reach",
      "title": "Skincare Routine for Winter",
      "description": "A detailed guide to protecting your skin from the harsh winter weather.",
      "hashtags": ["skincare", "winter skincare", "beauty", "hydration", "routine"],
      "strategicRationale": "This content uses the PAS framework by identifying the Problem of dry winter skin, Agitating the problem by highlighting the discomfort and potential damage, and Solving the problem with a detailed skincare routine."
    }
  ]
}


`, // AIDA (Attention, Interest, Desire, Action) and PAS (Problem, Agitate, Solve)
})

const contentCalendarFlow = ai.defineFlow(
  {
    name: 'contentCalendarFlow',
    inputSchema: ContentCalendarInputSchema,
    outputSchema: ContentCalendarOutputSchema,
  },
  async input => {
    const {output} = await contentCalendarPrompt(input);
    return output!;
  }
);
