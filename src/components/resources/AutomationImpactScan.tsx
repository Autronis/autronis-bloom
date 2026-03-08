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
    question: "How many hours per week do employees spend on manual processes?",
    options: ["Less than 10 hours", "10–30 hours", "30–60 hours", "More than 60 hours"],
  },
  {
    question: "How many different systems does your organization use daily?",
    options: ["1–2 systems", "3–5 systems", "6–10 systems", "More than 10 systems"],
  },
  {
    question: "How is data processed between systems?",
    options: ["Fully automatic", "Partially manual", "Mostly manual", "Fully manual"],
  },
  {
    question: "How often do records need to be corrected or re-entered?",
    options: ["Rarely", "Occasionally", "Regularly", "Daily"],
  },
  {
    question: "How are reports compiled?",
    options: ["Fully automatic", "Partially automatic", "Manually in dashboards", "Manually in spreadsheets"],
  },
];

const benefits = [
  "Less manual processing",
  "Fewer errors",
  "Faster turnaround times",
  "Better reporting",
  "Scalable processes",
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
                Answer a few short questions and receive an initial indication of automation opportunities within your organization.
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
              Question {step + 1} of {questions.length}
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
                <ArrowLeft size={14} /> Previous
              </Button>
              <Button
                size="sm"
                onClick={() => setStep(step + 1)}
                disabled={answers[step] === null}
              >
                {step === questions.length - 1 ? "View result" : "Next"} <ArrowRight size={14} />
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Indicative automation impact</DialogTitle>
              <DialogDescription>
                Based on your answers, there are likely automation opportunities within your processes.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1 mb-2">
              <p className="text-sm font-medium text-foreground">Automation can contribute to:</p>
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
                  Schedule Automation Scan <ArrowRight size={16} />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Receive a concrete analysis of automation opportunities within your organization.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AutomationImpactScan;
