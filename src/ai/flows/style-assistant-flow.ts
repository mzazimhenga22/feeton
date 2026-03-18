'use server';
/**
 * @fileOverview Genkit flow for the Feeton Style Assistant.
 * Helps users select the perfect luxury sneaker based on their lifestyle and aesthetic preferences.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleAssistantInputSchema = z.object({
  userPreference: z.string().describe('The user\'s style preference or activity (e.g., "minimalist", "neon-punk", "high-performance running").'),
});
export type StyleAssistantInput = z.infer<typeof StyleAssistantInputSchema>;

const StyleAssistantOutputSchema = z.object({
  recommendation: z.string().describe('A sophisticated recommendation for a Feeton Kicks model.'),
  reasoning: z.string().describe('The design or technical reason why this model fits the user.'),
  stylingTip: z.string().describe('A short tip on how to style these sneakers.'),
});
export type StyleAssistantOutput = z.infer<typeof StyleAssistantOutputSchema>;

export async function getStyleRecommendation(input: StyleAssistantInput): Promise<StyleAssistantOutput> {
  return styleAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleAssistantPrompt',
  input: {schema: StyleAssistantInputSchema},
  output: {schema: StyleAssistantOutputSchema},
  prompt: `You are the Feeton Style AI, an elite digital concierge for a futuristic luxury sneaker brand.
A client is seeking a recommendation.

User Request: "{{{userPreference}}}"

Provide a recommendation from our current catalogue:
1. FEETON CARBON FLUX (Performance, stealth, technical)
2. NEON PULSE XT (Bold, illuminating, experimental)
3. CRIMSON EDGE 01 (Lifestyle, sharp, avant-garde)

Response should be sophisticated and high-end.`,
});

const styleAssistantFlow = ai.defineFlow(
  {
    name: 'styleAssistantFlow',
    inputSchema: StyleAssistantInputSchema,
    outputSchema: StyleAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) throw new Error('AI could not generate recommendation');
    return output;
  }
);
