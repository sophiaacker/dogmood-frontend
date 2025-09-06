// This is an AI-powered application for pet triage advice.
'use server';

/**
 * @fileOverview Provides a triage recommendation (monitor, routine visit, urgent care) based on AI analysis and a red-flag checklist.
 *
 * - provideTriageRecommendation - A function that provides a triage recommendation.
 * - ProvideTriageRecommendationInput - The input type for the provideTriageRecommendation function.
 * - ProvideTriageRecommendationOutput - The return type for the provideTriageRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideTriageRecommendationInputSchema = z.object({
  imageAnalysis: z.string().describe('The AI analysis of the pet image.'),
  behavioralAnalysis: z.string().describe('The AI analysis of the pet behavior.'),
  species: z
    .string()
    .describe(
      'The species of the animal. Supported values are: dogs, cats, small mammals, and birds.'
    ),
});
export type ProvideTriageRecommendationInput = z.infer<
  typeof ProvideTriageRecommendationInputSchema
>;

const ProvideTriageRecommendationOutputSchema = z.object({
  recommendation: z
    .enum(['monitor', 'routine visit', 'urgent care'])
    .describe('The triage recommendation.'),
  reason: z.string().describe('The reasoning behind the triage recommendation.'),
});
export type ProvideTriageRecommendationOutput = z.infer<
  typeof ProvideTriageRecommendationOutputSchema
>;

export async function provideTriageRecommendation(
  input: ProvideTriageRecommendationInput
): Promise<ProvideTriageRecommendationOutput> {
  return provideTriageRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideTriageRecommendationPrompt',
  input: {schema: ProvideTriageRecommendationInputSchema},
  output: {schema: ProvideTriageRecommendationOutputSchema},
  prompt: `You are an expert veterinary triage specialist. Based on the AI analysis of the pet's image and behavior, and taking into account the species of the animal, provide a triage recommendation (monitor, routine visit, or urgent care). Also include the reasoning behind the triage recommendation.

Here is the AI analysis of the pet image:
{{imageAnalysis}}

Here is the AI analysis of the pet behavior:
{{behavioralAnalysis}}

Species: {{species}}

Consider the following red-flag checklist:
- Severe pain or distress
- Difficulty breathing
- Pale gums
- Weakness or collapse
- Loss of consciousness
- Seizures
- Heavy bleeding
- Suspected poisoning
- Inability to urinate or defecate
- Severe vomiting or diarrhea

Based on the above information, provide a triage recommendation and the reasoning behind it.
`,
});

const provideTriageRecommendationFlow = ai.defineFlow(
  {
    name: 'provideTriageRecommendationFlow',
    inputSchema: ProvideTriageRecommendationInputSchema,
    outputSchema: ProvideTriageRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
