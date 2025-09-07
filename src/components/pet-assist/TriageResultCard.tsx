import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// The TriageResult type might need to be updated to reflect the new API response shape.
// For now, we will handle the data dynamically.
import type { TriageResult } from "@/app/actions";
import { AlertTriangle, CheckCircle2, ShieldAlert, Lightbulb, List, ShoppingBag, PawPrint, Star } from "lucide-react";

const recommendationConfig = {
  'urgent care': {
    label: 'Urgent Care Recommended',
    className: 'text-red-600 border-red-200 bg-red-50',
    Icon: ShieldAlert,
    description: 'Based on the analysis, your pet may require immediate attention. Please contact a veterinarian or an emergency pet hospital as soon as possible.',
  },
  'routine visit': {
    label: 'Routine Visit Recommended',
    className: 'text-yellow-600 border-yellow-200 bg-yellow-50',
    Icon: AlertTriangle,
    description: 'The symptoms suggest a non-emergency issue. We recommend scheduling a routine visit with your veterinarian to get a professional diagnosis.',
  },
  'monitor': {
    label: 'Monitor at Home',
    className: 'text-green-600 border-green-200 bg-green-50',
    Icon: CheckCircle2,
    description: 'The symptoms do not appear to be urgent. Please monitor your pet closely and contact your vet if symptoms worsen or new ones appear.',
  }
};

// Type for the keys of recommendationConfig
type RecommendationKey = keyof typeof recommendationConfig;

// Type guard to check if a string is a valid RecommendationKey
function isRecommendationKey(key: any): key is RecommendationKey {
  return key in recommendationConfig;
}

export function TriageResultCard({ result }: { result: any }) {
  if (!result) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center items-center">
          <CardTitle className="text-2xl font-bold">Error</CardTitle>
          <CardDescription className="text-base max-w-md">No result data received.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const recommendation = result.recommendation ? result.recommendation.toLowerCase() : null;
  const config = isRecommendationKey(recommendation) ? recommendationConfig[recommendation] : null;

  // Support for new and old API fields
  const { suggestion, reason, imageAnalysis, behavioralAnalysis, products } = result;

  const analysisDetails = [];
  if (imageAnalysis) {
    analysisDetails.push({ title: 'Image Analysis Summary', content: imageAnalysis });
  }
  if (behavioralAnalysis) {
    analysisDetails.push({ title: 'Behavioral Analysis Summary', content: behavioralAnalysis });
  }

  return (
    <Card className="w-full">
      {config && (
        <CardHeader className="text-center items-center">
          <div className={`p-3 rounded-full ${config.className}`}>
              <config.Icon className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold">{config.label}</CardTitle>
          <CardDescription className="text-base max-w-md">{config.description}</CardDescription>
        </CardHeader>
      )}

      {/* Fallback title if no recommendation is present but other data is */}
      {!config && (suggestion || reason) && (
          <CardHeader>
              <CardTitle className="text-2xl font-bold">AI Analysis Result</CardTitle>
          </CardHeader>
      )}

      <CardContent className="space-y-4 px-4 sm:px-6 pb-6">
        {suggestion && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center"><Lightbulb className="h-5 w-5 mr-2" /> Suggestion</h3>
              <p className="text-sm text-foreground/80">{suggestion}</p>
            </div>
        )}
        {reason && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center"><List className="h-5 w-5 mr-2" /> Rationale</h3>
              <p className="text-sm text-foreground/80">{reason}</p>
            </div>
        )}
        {products && products.length > 0 && (
            <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-4 flex items-center"><ShoppingBag className="h-5 w-5 mr-2" /> Recommended Products</h3>
                <div className="space-y-2">
                    {products.map((product: string, index: number) => (
                        <div key={index} className={`flex items-center p-2 border rounded-lg ${index === 0 ? 'border-yellow-400' : ''}`}>
                            <PawPrint className="h-5 w-5 mr-3 text-green-500" />
                            <span className="text-sm text-foreground/80">{product}</span>
                            {index === 0 && (
                                <Star className="ml-auto h-5 w-5 text-yellow-400 fill-yellow-400" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        <Accordion type="single" collapsible className="w-full">
          {analysisDetails.length > 0 && (
            <AccordionItem value="details">
              <AccordionTrigger>View Detailed AI Analysis</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {analysisDetails.map((detail, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-card">
                    <h4 className="font-semibold mb-1">{detail.title}</h4>
                    <p className="text-sm text-foreground/80">{detail.content}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
          <AccordionItem value="raw-output">
            <AccordionTrigger>View Raw Backend Output</AccordionTrigger>
            <AccordionContent>
              <pre className="p-4 border rounded-lg bg-card text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
