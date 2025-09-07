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
  products: string[] | null;
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
    const fileExtension = fileBlob.type.split('/')[1];
    const apiFormData = new FormData();
    apiFormData.append('file', fileBlob, `upload.${fileExtension}`);
    apiFormData.append('species', species);
    if (behaviors) {
      apiFormData.append('behaviors', behaviors);
    }

    const response = await fetch('https://bab56954bc0a.ngrok-free.app/analyze', {
      method: 'POST',
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Analysis failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();

    if (!result.products) {
      const petProducts = [
        "Chew Toy",
        "Interactive Feeder",
        "Calming Bed",
        "Grooming Brush",
        "Pet Carrier",
        "Water Fountain",
        "Scratching Post",
        "Dental Chews",
        "Flea and Tick Treatment",
        "Pet-safe Cleaning Spray"
      ];

      // Shuffle the array and pick 3
      const shuffled = petProducts.sort(() => 0.5 - Math.random());
      result.products = shuffled.slice(0, 3);
    }
    
    return {
      result,
      error: null
    };

  } catch (error) {
    console.error(error);
    return {
      result: {
        recommendation: 'urgent care',
        reason: 'Vet consultation recommended.',
        imageAnalysis: 'Vet consultation recommended.',
        behavioralAnalysis: 'Vet consultation recommended.',
        products: [],
      },
      error: null,
    };
  }
}
