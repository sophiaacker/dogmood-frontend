'use client';

import dynamic from 'next/dynamic';

const TriageWizard = dynamic(
  () => import('@/components/pet-assist/TriageWizard').then(mod => mod.TriageWizard),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function TriageWizardClient() {
  return <TriageWizard />;
}
