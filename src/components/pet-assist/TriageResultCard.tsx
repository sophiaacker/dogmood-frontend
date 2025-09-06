import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { TriageResult } from "@/app/actions";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

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

export function TriageResultCard({ result }: { result: TriageResult }) {
  const config = recommendationConfig[result.recommendation.toLowerCase()];

  return (
    <Card className="w-full">
      <CardHeader className="text-center items-center">
        <div className={`p-3 rounded-full ${config.className}`}>
            <config.Icon className="h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-bold">{config.label}</CardTitle>
        <CardDescription className="text-base max-w-md">{config.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6 pb-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">AI-Generated Triage Rationale</h3>
          <p className="text-sm text-foreground/80">{result.reason}</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger>View Detailed AI Analysis</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="p-4 border rounded-lg bg-card">
                <h4 className="font-semibold mb-1">Image Analysis Summary</h4>
                <p className="text-sm text-foreground/80">{result.imageAnalysis}</p>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <h4 className="font-semibold mb-1">Behavioral Analysis Summary</h4>
                <p className="text-sm text-foreground/80">{result.behavioralAnalysis}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
