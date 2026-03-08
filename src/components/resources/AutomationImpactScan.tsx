import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    dialogTitle: "Automation Impact Scan",
    dialogDesc: "Answer a few short questions and receive an initial indication of automation opportunities within your organization.",
    questionOf: "Question",
    of: "of",
    prev: "Previous",
    next: "Next",
    viewResult: "View result",
    resultTitle: "Indicative automation impact",
    resultDesc: "Based on your answers, there are likely automation opportunities within your processes.",
    contributes: "Automation can contribute to:",
    benefits: ["Less manual processing", "Fewer errors", "Faster turnaround times", "Better reporting", "Scalable processes"],
    ctaBtn: "Schedule Automation Scan",
    ctaSub: "Receive a concrete analysis of automation opportunities within your organization.",
    questions: [
      { question: "How many hours per week do employees spend on manual processes?", options: ["Less than 10 hours", "10–30 hours", "30–60 hours", "More than 60 hours"] },
      { question: "How many different systems does your organization use daily?", options: ["1–2 systems", "3–5 systems", "6–10 systems", "More than 10 systems"] },
      { question: "How is data processed between systems?", options: ["Fully automatic", "Partially manual", "Mostly manual", "Fully manual"] },
      { question: "How often do records need to be corrected or re-entered?", options: ["Rarely", "Occasionally", "Regularly", "Daily"] },
      { question: "How are reports compiled?", options: ["Fully automatic", "Partially automatic", "Manually in dashboards", "Manually in spreadsheets"] },
    ],
  },
  nl: {
    dialogTitle: "Automation Impact Scan",
    dialogDesc: "Beantwoord een paar korte vragen en ontvang een eerste indicatie van automatiseringsmogelijkheden binnen je organisatie.",
    questionOf: "Vraag",
    of: "van",
    prev: "Vorige",
    next: "Volgende",
    viewResult: "Bekijk resultaat",
    resultTitle: "Indicatieve automatiseringsimpact",
    resultDesc: "Op basis van je antwoorden zijn er waarschijnlijk automatiseringsmogelijkheden binnen je processen.",
    contributes: "Automatisering kan bijdragen aan:",
    benefits: ["Minder handmatige verwerking", "Minder fouten", "Snellere doorlooptijden", "Betere rapportage", "Schaalbare processen"],
    ctaBtn: "Plan een Automation Scan",
    ctaSub: "Ontvang een concrete analyse van automatiseringsmogelijkheden binnen je organisatie.",
    questions: [
      { question: "Hoeveel uur per week besteden medewerkers aan handmatige processen?", options: ["Minder dan 10 uur", "10–30 uur", "30–60 uur", "Meer dan 60 uur"] },
      { question: "Hoeveel verschillende systemen gebruikt je organisatie dagelijks?", options: ["1–2 systemen", "3–5 systemen", "6–10 systemen", "Meer dan 10 systemen"] },
      { question: "Hoe wordt data verwerkt tussen systemen?", options: ["Volledig automatisch", "Gedeeltelijk handmatig", "Grotendeels handmatig", "Volledig handmatig"] },
      { question: "Hoe vaak moeten gegevens gecorrigeerd of opnieuw ingevoerd worden?", options: ["Zelden", "Af en toe", "Regelmatig", "Dagelijks"] },
      { question: "Hoe worden rapporten samengesteld?", options: ["Volledig automatisch", "Gedeeltelijk automatisch", "Handmatig in dashboards", "Handmatig in spreadsheets"] },
    ],
  },
};

interface AutomationImpactScanProps { open: boolean; onOpenChange: (open: boolean) => void; }

const AutomationImpactScan = ({ open, onOpenChange }: AutomationImpactScanProps) => {
  const lang = useLanguage();
  const t = text[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(t.questions.length).fill(null));
  const showResult = step === t.questions.length;

  const selectAnswer = (optionIndex: number) => { const next = [...answers]; next[step] = optionIndex; setAnswers(next); };
  const reset = () => { setStep(0); setAnswers(Array(t.questions.length).fill(null)); };
  const handleOpenChange = (val: boolean) => { if (!val) reset(); onOpenChange(val); };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {!showResult ? (
          <>
            <DialogHeader><DialogTitle>{t.dialogTitle}</DialogTitle><DialogDescription>{t.dialogDesc}</DialogDescription></DialogHeader>
            <div className="flex gap-1.5 mb-2">{t.questions.map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />)}</div>
            <p className="text-xs text-muted-foreground mb-1">{t.questionOf} {step + 1} {t.of} {t.questions.length}</p>
            <h3 className="text-base font-semibold mb-4">{t.questions[step].question}</h3>
            <div className="flex flex-col gap-2">
              {t.questions[step].options.map((option, i) => (
                <button key={i} onClick={() => selectAnswer(i)} className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${answers[step] === i ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/30"}`}>{option}</button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="ghost" size="sm" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft size={14} /> {t.prev}</Button>
              <Button size="sm" onClick={() => setStep(step + 1)} disabled={answers[step] === null}>{step === t.questions.length - 1 ? t.viewResult : t.next} <ArrowRight size={14} /></Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader><DialogTitle>{t.resultTitle}</DialogTitle><DialogDescription>{t.resultDesc}</DialogDescription></DialogHeader>
            <div className="space-y-1 mb-2"><p className="text-sm font-medium text-foreground">{t.contributes}</p></div>
            <ul className="space-y-2 mb-6">{t.benefits.map((b) => <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 size={16} className="text-primary shrink-0" />{b}</li>)}</ul>
            <div className="text-center">
              <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/book">{t.ctaBtn} <ArrowRight size={16} /></Link></Button>
              <p className="text-xs text-muted-foreground mt-3">{t.ctaSub}</p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AutomationImpactScan;
