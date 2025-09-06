'use server';

import { analyzePetImageForSymptoms } from '@/ai/flows/analyze-pet-image-for-symptoms';
import { interpretPetBehavior } from '@/ai/flows/interpret-pet-behavior-for-issue-categories';
import { provideTriageRecommendation } from '@/ai/flows/provide-triage-recommendation-based-on-ai-analysis';
import { z } from 'zod';

const triageSchema = z.object({
  species: z.string().min(1, 'Species is required.'),
  photoDataUri: z.string().min(1, 'An image of your pet is required.'),
  behaviors: z.string().min(10, 'Please describe the behavior in at least 10 characters.'),
});

export type TriageResult = {
  recommendation: 'monitor' | 'routine visit' | 'urgent care';
  reason: string;
  imageAnalysis: string;
  behavioralAnalysis: string;
};

export async function getTriageRecommendationAction(
  prevState: { result: TriageResult | null; error: string | null; },
  formData: FormData
): Promise<{ result: TriageResult | null; error: string | null; }> {

  const validatedFields = triageSchema.safeParse({
    species: formData.get('species'),
    photoDataUri: formData.get('photoDataUri'),
    behaviors: formData.get('behaviors'),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      result: null,
      error: firstError || 'Invalid input.',
    };
  }

  const { species, photoDataUri, behaviors } = validatedFields.data;

  try {
    const [imageAnalysisResult, behaviorAnalysisResult] = await Promise.all([
      analyzePetImageForSymptoms({ species, photoDataUri }),
      interpretPetBehavior({ species, behaviors }),
    ]);

    if (!imageAnalysisResult || !behaviorAnalysisResult) {
      throw new Error('Failed to get analysis from AI.');
    }
    
    const imageAnalysis = imageAnalysisResult.summary;
    const behavioralAnalysis = behaviorAnalysisResult.issueCategories;

    const triageRecommendationResult = await provideTriageRecommendation({
      species,
      imageAnalysis,
      behavioralAnalysis,
    });

    if (!triageRecommendationResult) {
      throw new Error('Failed to get triage recommendation from AI.');
    }
    
    return {
      result: {
        ...triageRecommendationResult,
        imageAnalysis,
        behavioralAnalysis,
      },
      error: null
    };

  } catch (error) {
    console.error(error);
    return {
      result: null,
      error: 'An unexpected error occurred while analyzing. Please try again.',
    };
  }
}
