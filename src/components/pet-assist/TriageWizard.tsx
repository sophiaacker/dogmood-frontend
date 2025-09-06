"use client";

import { useState, useMemo, useTransition, useEffect, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getTriageRecommendationAction, type TriageResult } from "@/app/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bird, Cat, Dog, Rabbit, Loader2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { TriageResultCard } from "./TriageResultCard";

const speciesOptions = [
  { id: "dog", label: "Dog", Icon: Dog },
  { id: "cat", label: "Cat", Icon: Cat },
  { id: "bird", label: "Bird", Icon: Bird },
  { id: "small mammal", label: "Small Mammal", Icon: Rabbit },
];

const initialState = { result: null, error: null };

export function TriageWizard() {
  const [formState, formAction] = useActionState(getTriageRecommendationAction, initialState);
  const [pending, startTransition] = useTransition();
  
  const [species, setSpecies] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [behaviors, setBehaviors] = useState("");
  const [step, setStep] = useState<'species' | 'details' | 'result'>('species');

  const { toast } = useToast();

  useEffect(() => {
    if (formState.error && !pending) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: formState.error,
      });
    }
    if (formState.result && !pending) {
      setStep('result');
    }
  }, [formState, pending, toast]);


  const handleSubmit = (formData: FormData) => {
    if (!image) {
      toast({ variant: "destructive", title: "Image required", description: "Please upload or capture a photo of your pet." });
      return;
    }
    formData.append('photoDataUri', image);
    startTransition(() => {
      formAction(formData);
    });
  };
  
  const handleReset = () => {
    setSpecies(null);
    setImage(null);
    setBehaviors("");
    // A bit of a hack to reset useFormState, but effective for this use case
    formState.result = null;
    formState.error = null;
    setStep('species');
  }

  const isDetailsStepValid = useMemo(() => {
    return image !== null && behaviors.length >= 10;
  }, [image, behaviors]);

  if (step === 'result' && formState.result) {
    return (
      <div className="space-y-4">
        <TriageResultCard result={formState.result as TriageResult} />
        <Button onClick={handleReset} className="w-full" variant="outline">Start New Triage</Button>
      </div>
    );
  }

  return (
    <Card className="w-full transition-all">
      <form action={handleSubmit}>
        {step === 'species' && (
          <>
            <CardHeader>
              <CardTitle>Step 1: Choose your pet's species</CardTitle>
              <CardDescription>This helps our AI provide a more accurate analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={species ?? ''} onValueChange={setSpecies} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {speciesOptions.map(({ id, label, Icon }) => (
                  <Label key={id} htmlFor={id} className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition-colors">
                    <Icon className="h-10 w-10" />
                    <span>{label}</span>
                    <RadioGroupItem value={id} id={id} className="sr-only" />
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep('details')} className="w-full" disabled={!species}>Next</Button>
            </CardFooter>
          </>
        )}

        {(step === 'details') && (
          <>
            <CardHeader>
              <CardTitle>Step 2: Provide Details</CardTitle>
              <CardDescription>Upload a photo and describe your pet's unusual behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Upload photo or video of your pet</Label>
                <ImageUploader image={image} onImageSelect={setImage} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="behaviors">Describe your pet's behavior (min. 10 characters)</Label>
                <Textarea
                  id="behaviors"
                  name="behaviors"
                  placeholder="e.g., My dog has been limping on his back right leg and seems less interested in food..."
                  rows={4}
                  value={behaviors}
                  onChange={(e) => setBehaviors(e.target.value)}
                  disabled={pending}
                />
              </div>
              <input type="hidden" name="species" value={species || ''} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={!isDetailsStepValid || pending}>
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing... Please wait.
                  </>
                ) : 'Get AI Triage'}
              </Button>
            </CardFooter>
          </>
        )}
      </form>
    </Card>
  );
}