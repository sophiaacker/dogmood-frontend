'use server';
/**
 * @fileOverview Interprets pet behaviors to suggest potential issue categories.
 *
 * - interpretPetBehavior - A function that handles the behavior interpretation process.
 * - InterpretPetBehaviorInput - The input type for the interpretPetBehavior function.
 * - InterpretPetBehaviorOutput - The return type for the interpretPetBehavior function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretPetBehaviorInputSchema = z.object({
  species: z
    .string()
    .describe("The animal's species. Supported: dogs, cats, small mammals, and birds."),
  behaviors: z.string().describe('The unusual behaviors exhibited by the pet.'),
});
export type InterpretPetBehaviorInput = z.infer<
  typeof InterpretPetBehaviorInputSchema
>;

const InterpretPetBehaviorOutputSchema = z.object({
  issueCategories: z
    .string()
    .describe('A summary of potential issue categories that might be the cause of the described behaviors.'),
  reasoning: z
    .string()
    .optional()
    .describe('Reasoning behind including specific issue categories in the summary.'),
});
export type InterpretPetBehaviorOutput = z.infer<
  typeof InterpretPetBehaviorOutputSchema
>;

export async function interpretPetBehavior(
  input: InterpretPetBehaviorInput
): Promise<InterpretPetBehaviorOutput> {
  return interpretPetBehaviorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretPetBehaviorPrompt',
  input: {schema: InterpretPetBehaviorInputSchema},
  output: {schema: InterpretPetBehaviorOutputSchema},
  prompt: `You are an expert veterinarian specializing in interpreting pet behaviors to identify potential issue categories.

You will use the provided information about the pet's species and behaviors to generate a summary of potential issue categories that might be the cause of the described behaviors.

Species: {{{species}}}
Behaviors: {{{behaviors}}}

Respond with a summary of potential issue categories. Also include reasoning for including each issue category if the behaviors are subtle or vague.
`,
});

const interpretPetBehaviorFlow = ai.defineFlow(
  {
    name: 'interpretPetBehaviorFlow',
    inputSchema: InterpretPetBehaviorInputSchema,
    outputSchema: InterpretPetBehaviorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
