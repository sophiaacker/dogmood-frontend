import { PawPrintIcon } from "@/components/icons";
import { TriageWizard } from "@/components/pet-assist/TriageWizard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
             <PawPrintIcon className="h-10 w-10 text-primary-foreground bg-primary p-2 rounded-full" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-headline">
              PetAssist AI
            </h1>
          </div>
          <p className="max-w-xl text-lg text-foreground/80">
            Get instant AI-powered triage advice for your pet. Just a few steps to understand if your pet needs immediate care.
          </p>
        </header>
        <TriageWizard />
      </div>
    </main>
  );
}
