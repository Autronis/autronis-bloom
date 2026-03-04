import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const questions = [
  {
    question: "Hoeveel tijd besteden medewerkers per week aan handmatige processen?",
    options: ["Minder dan 10 uur", "10–30 uur", "30–60 uur", "Meer dan 60 uur"],
  },
  {
    question: "Hoeveel verschillende systemen gebruikt uw organisatie dagelijks?",
    options: ["1–2 systemen", "3–5 systemen", "6–10 systemen", "Meer dan 10 systemen"],
  },
  {
    question: "Hoe wordt data tussen systemen verwerkt?",
    options: ["Volledig automatisch", "Gedeeltelijk handmatig", "Meestal handmatig", "Volledig handmatig"],
  },
  {
    question: "Hoe vaak moeten gegevens worden gecorrigeerd of opnieuw ingevoerd?",
    options: ["Zelden", "Af en toe", "Regelmatig", "Dagelijks"],
  },
  {
    question: "Hoe worden rapportages opgesteld?",
    options: ["Volledig automatisch", "Gedeeltelijk automatisch", "Handmatig in dashboards", "Handmatig in spreadsheets"],
  },
];

const benefits = [
  "Minder handmatige verwerking",
  "Minder fouten",
  "Snellere doorlooptijden",
  "Betere rapportage",
  "Schaalbare processen",
];

interface AutomationImpactScanProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AutomationImpactScan = ({ open, onOpenChange }: AutomationImpactScanProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const showResult = step === questions.length;

  const selectAnswer = (optionIndex: number) => {
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);
  };

  const reset = () => {
    setStep(0);
    setAnswers(Array(questions.length).fill(null));
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {!showResult ? (
          <>
            <DialogHeader>
              <DialogTitle>Automation Impact Scan</DialogTitle>
              <DialogDescription>
                Beantwoord een paar korte vragen en ontvang een eerste indicatie van automatiseringskansen binnen uw organisatie.
              </DialogDescription>
            </DialogHeader>

            {/* Progress */}
            <div className="flex gap-1.5 mb-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-muted-foreground mb-1">
              Vraag {step + 1} van {questions.length}
            </p>
            <h3 className="text-base font-semibold mb-4">{questions[step].question}</h3>

            <div className="flex flex-col gap-2">
              {questions[step].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${
                    answers[step] === i
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                <ArrowLeft size={14} /> Vorige
              </Button>
              <Button
                size="sm"
                onClick={() => setStep(step + 1)}
                disabled={answers[step] === null}
              >
                {step === questions.length - 1 ? "Bekijk resultaat" : "Volgende"} <ArrowRight size={14} />
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Indicatieve automatiseringsimpact</DialogTitle>
              <DialogDescription>
                Op basis van uw antwoorden zijn er waarschijnlijk kansen voor automatisering binnen uw processen.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1 mb-2">
              <p className="text-sm font-medium text-foreground">Automatisering kan bijdragen aan:</p>
            </div>
            <ul className="space-y-2 mb-6">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="text-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/book">
                  Plan Automation Scan <ArrowRight size={16} />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Ontvang een concrete analyse van automatiseringskansen binnen uw organisatie.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AutomationImpactScan;
