import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const faqs = [
  {
    q: "What does an automation project cost?",
    a: "The investment depends on the complexity of the processes, the number of systems and the desired automations. After the Automation Scan you'll receive a transparent proposal with a clear scope and timeline. We don't work with standard packages; you only invest in what's actually needed.",
  },
  {
    q: "How long does an average project take?",
    a: "Most implementations take between 2 and 8 weeks, depending on scope and complexity. After the Automation Scan you'll receive a realistic timeline with clear phases and delivery milestones.",
  },
  {
    q: "Are you tied to specific tools?",
    a: "No. We work tool-agnostic. This means we connect to your existing systems and only deploy technology that fits your situation and scale.",
  },
  {
    q: "Do I need to replace my current systems?",
    a: "No. In most cases we connect existing systems so data is exchanged automatically. Only when a system has clear limitations do we recommend an alternative.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. We work with encrypted connections and follow applicable privacy legislation (GDPR). System access is limited to what's needed for the automation and we don't use business data for AI training.",
  },
  {
    q: "Who owns the built solution?",
    a: "You remain the owner of the automations, configurations and integrations developed for your organization. The solution is documented to ensure transferability.",
  },
  {
    q: "What if I already have existing systems and processes?",
    a: "That's actually our starting point. Our approach is integration-first: we build on existing systems and connect them where needed, rather than replacing everything.",
  },
  {
    q: "How do you ensure security and data quality?",
    a: "Security and data quality are built in from the design phase. We work with minimal access rights, logging and monitoring, and provide clear documentation of architecture and data flows.",
    link: { text: "View our quality standard", href: "/services#kwaliteitsnorm" },
  },
  {
    q: "What does automation deliver financially?",
    a: "The impact varies by organization, but automation often leads to less manual work, fewer errors and faster processes. During the Automation Scan we create an indicative business case so you get upfront insight into potential savings and payback period.",
  },
  {
    q: "Isn't automation risky for our processes?",
    a: "Not when it's designed properly. We analyze processes upfront and test automations before they go live. This keeps processes stable and prevents errors.",
  },
  {
    q: "Do you offer support after delivery?",
    a: "Yes. After implementation we can continue to monitor and optimize automations. Depending on your needs we offer support for maintenance, extensions and further automation.",
  },
  {
    q: "How do we start a collaboration?",
    a: "The collaboration starts with an Automation Scan. In it we analyze processes, systems and automation opportunities. Based on this you receive a concrete proposal with impact, timeline and investment.",
  },
  {
    q: "What type of organizations is this best suited for?",
    a: "Our solutions are especially valuable for growing SMB organizations (10–500 employees) that want to scale processes without staffing pressure increasing proportionally.",
  },
];

const extraFaqs = [
  {
    q: "What if automation ultimately doesn't work well?",
    a: "Automations are tested first before being fully deployed. Additionally, existing processes remain available as a fallback until the new workflow runs stably.",
  },
  {
    q: "Does my team need to be technical to work with this?",
    a: "No. Automations are set up to be easy to use within existing tools. Where needed we provide clear instructions or documentation for the team.",
  },
  {
    q: "How much time does this require from our internal team?",
    a: "We try to keep the burden on your team as limited as possible. During implementation we usually need a few short sessions to understand and test processes. The rest of the work happens on our end.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently asked questions</h2>
              <p className="text-muted-foreground">
                Answers to the most important questions about our approach, process and collaboration.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.06}>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <ScrollRevealItem key={i}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="border border-border bg-card rounded-lg px-5 data-[state=open]:border-primary/30 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_20px_hsl(174_78%_41%/0.06)]"
                  >
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline hover:text-primary transition-colors duration-200">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/80 leading-relaxed">
                      {faq.a}
                      {"link" in faq && faq.link && (
                        <Link to={faq.link.href} className="group flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-primary/70 transition-colors mt-3">
                          {faq.link.text}
                          <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollRevealItem>
              ))}
            </Accordion>
          </ScrollReveal>

          {/* Extra questions */}
          <ScrollReveal className="mt-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase text-center">
                Additional questions to address concerns
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.06}>
            <Accordion type="single" collapsible className="space-y-2">
              {extraFaqs.map((faq, i) => (
                <ScrollRevealItem key={`extra-${i}`}>
                  <AccordionItem
                    value={`extra-faq-${i}`}
                    className="border border-border bg-card rounded-lg px-5 data-[state=open]:border-primary/30 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_20px_hsl(174_78%_41%/0.06)]"
                  >
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline hover:text-primary transition-colors duration-200">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/80 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollRevealItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
