'use server';

import { z } from 'zod';

const triageSchema = z.object({
  species: z.string().min(1, 'Species is required.'),
  photoDataUri: z.string().min(1, 'A photo or video of your pet is required.'),
  behaviors: z.string().optional(),
});

export type TriageResult = {
  recommendation: 'monitor' | 'routine visit' | 'urgent care';
  reason: string;
  imageAnalysis: string;
  behavioralAnalysis: string;
};

// Helper function to convert Data URI to Blob
function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

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
    const fileBlob = dataURItoBlob(photoDataUri);
    const apiFormData = new FormData();
    apiFormData.append('file', fileBlob, 'upload');
    apiFormData.append('species', species);
    if (behaviors) {
      apiFormData.append('behaviors', behaviors);
    }

    const response = await fetch('https://6a986891ea04.ngrok-free.app/analyze', {
      method: 'POST',
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Analysis failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    
    return {
      result,
      error: null
    };

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
    return {
      result: null,
      error: errorMessage,
    };
  }
}
