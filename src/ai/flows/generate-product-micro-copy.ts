'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating elegant and concise taglines
 * and descriptive micro-copy for luxury sneaker products, maintaining a high-end brand voice.
 *
 * - generateProductMicroCopy - A function to generate product micro-copy.
 * - GenerateProductMicroCopyInput - The input type for the generateProductMicroCopy function.
 * - GenerateProductMicroCopyOutput - The return type for the generateProductMicroCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Zod schema for the input of the generateProductMicroCopy flow.
 */
const GenerateProductMicroCopyInputSchema = z.object({
  productName: z.string().describe('The name of the luxury sneaker product.'),
  productDescription: z.string().describe('A detailed description of the luxury sneaker, including its unique selling points, materials, and design philosophy.'),
  targetAudience: z.string().optional().describe('An optional description of the target audience for the sneaker, to tailor the copy further.'),
  keyFeatures: z.array(z.string()).optional().describe('An optional list of key features or technologies of the sneaker.'),
});
/**
 * TypeScript type for the input of the generateProductMicroCopy flow.
 */
export type GenerateProductMicroCopyInput = z.infer<typeof GenerateProductMicroCopyInputSchema>;

/**
 * Zod schema for the output of the generateProductMicroCopy flow.
 */
const GenerateProductMicroCopyOutputSchema = z.object({
  tagline: z.string().describe('A concise, elegant, and impactful tagline for the luxury sneaker product.'),
  microCopyHighlights: z.array(z.string()).describe('An array of 3-5 short, descriptive micro-copy bullet points or highlights, each no more than 15 words, emphasizing luxury, design, and key benefits.'),
});
/**
 * TypeScript type for the output of the generateProductMicroCopy flow.
 */
export type GenerateProductMicroCopyOutput = z.infer<typeof GenerateProductMicroCopyOutputSchema>;

/**
 * Generates elegant and concise taglines and descriptive micro-copy for luxury sneaker products.
 * @param input The input containing product details.
 * @returns A promise that resolves to the generated tagline and micro-copy highlights.
 */
export async function generateProductMicroCopy(input: GenerateProductMicroCopyInput): Promise<GenerateProductMicroCopyOutput> {
  return generateProductMicroCopyFlow(input);
}

/**
 * Genkit prompt definition for generating product micro-copy.
 * It uses the input product details to craft a tagline and several highlights.
 */
const generateProductMicroCopyPrompt = ai.definePrompt({
  name: 'generateProductMicroCopyPrompt',
  input: {schema: GenerateProductMicroCopyInputSchema},
  output: {schema: GenerateProductMicroCopyOutputSchema},
  prompt: `You are an expert luxury brand copywriter specializing in high-end sneaker products. Your task is to generate elegant, concise taglines and descriptive micro-copy highlights for a luxury sneaker. The tone should be sophisticated, exclusive, and aspirational, maintaining a high-end brand voice.

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}
{{#if targetAudience}}
Target Audience: {{{targetAudience}}}
{{/if}}
{{#if keyFeatures}}
Key Features:
{{#each keyFeatures}}- {{{this}}}
{{/each}}
{{/if}}

Based on the information above, generate a compelling tagline and 3-5 concise micro-copy highlights for this luxury sneaker. Ensure each highlight is no more than 15 words and focuses on design, craftsmanship, and user experience.`,
});

/**
 * Genkit flow definition for generating product micro-copy.
 * This flow orchestrates the call to the AI model using the defined prompt.
 */
const generateProductMicroCopyFlow = ai.defineFlow(
  {
    name: 'generateProductMicroCopyFlow',
    inputSchema: GenerateProductMicroCopyInputSchema,
    outputSchema: GenerateProductMicroCopyOutputSchema,
  },
  async input => {
    const {output} = await generateProductMicroCopyPrompt(input);
    if (!output) {
      throw new Error('Failed to generate product micro-copy: output is undefined.');
    }
    return output;
  }
);
