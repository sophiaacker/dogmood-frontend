'use server';
/**
 * @fileOverview Analyzes a pet image to identify potential symptoms or conditions.
 *
 * - analyzePetImageForSymptoms - A function that handles the pet image analysis process.
 * - AnalyzePetImageForSymptomsInput - The input type for the analyzePetImageForSymptoms function.
 * - AnalyzePetImageForSymptomsOutput - The return type for the analyzePetImageForSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePetImageForSymptomsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a pet, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the expected format description
    ),
  species: z
    .string()
    .describe(
      'The species of the animal in the photo (e.g., dog, cat, bird, small mammal).'
    ),
});
export type AnalyzePetImageForSymptomsInput = z.infer<
  typeof AnalyzePetImageForSymptomsInputSchema
>;

const AnalyzePetImageForSymptomsOutputSchema = z.object({
  symptoms: z
    .array(z.string())
    .describe('A list of potential symptoms or conditions identified in the image.'),
  confidenceScores: z
    .array(z.number())
    .describe('A list of confidence scores for each identified symptom.'),
  summary: z
    .string()
    .describe('A summary of the potential symptoms and conditions identified.'),
});

export type AnalyzePetImageForSymptomsOutput = z.infer<
  typeof AnalyzePetImageForSymptomsOutputSchema
>;

export async function analyzePetImageForSymptoms(
  input: AnalyzePetImageForSymptomsInput
): Promise<AnalyzePetImageForSymptomsOutput> {
  return analyzePetImageForSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePetImageForSymptomsPrompt',
  input: {schema: AnalyzePetImageForSymptomsInputSchema},
  output: {schema: AnalyzePetImageForSymptomsOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing pet images for potential symptoms or conditions.

You will use this information to identify potential symptoms and conditions present in the pet.

Analyze the following image and description to identify any potential health concerns. Provide a summary of your findings.

Species: {{{species}}}

Image: {{media url=photoDataUri}}

Output in JSON format the list of symptoms, confidence scores for those symptoms, and a summary of the analysis.
`, // Added instructions for species and output format
});

const analyzePetImageForSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzePetImageForSymptomsFlow',
    inputSchema: AnalyzePetImageForSymptomsInputSchema,
    outputSchema: AnalyzePetImageForSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
