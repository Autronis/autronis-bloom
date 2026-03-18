import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, ArrowRight, Calendar, Sparkles, HelpCircle, Wrench, DollarSign, Users } from "lucide-react";
import { useLanguage } from "@/i18n/context";
import { Link } from "react-router-dom";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
};

type ChatAction = {
  label: string;
  to: string;
  icon?: "calendar" | "arrow";
};

const t = {
  en: {
    title: "Autronis AI",
    subtitle: "Online now",
    placeholder: "Type your question...",
    greeting:
      "Hi! I'm the Autronis AI assistant. I help you find out how automation can save your business time and money.\n\nWhat can I help you with?",
    poweredBy: "Powered by Autronis AI",
    categories: [
      { icon: "sparkles", label: "Our services", query: "What can you automate?" },
      { icon: "help", label: "How it works", query: "How does the process work?" },
      { icon: "dollar", label: "Pricing", query: "What does it cost?" },
      { icon: "wrench", label: "Integrations", query: "Which tools do you integrate?" },
      { icon: "users", label: "About Autronis", query: "Who is Autronis?" },
      { icon: "calendar", label: "Book a call", query: "I want to schedule a call" },
    ],
  },
  nl: {
    title: "Autronis AI",
    subtitle: "Nu online",
    placeholder: "Typ je vraag...",
    greeting:
      "Hoi! Ik ben de Autronis AI-assistent. Ik help je ontdekken hoe automatisering jouw bedrijf tijd en geld kan besparen.\n\nWaar kan ik je mee helpen?",
    poweredBy: "Powered by Autronis AI",
    categories: [
      { icon: "sparkles", label: "Onze diensten", query: "Wat kunnen jullie automatiseren?" },
      { icon: "help", label: "Hoe het werkt", query: "Hoe werkt het proces?" },
      { icon: "dollar", label: "Prijzen", query: "Wat kost het?" },
      { icon: "wrench", label: "Integraties", query: "Welke tools integreren jullie?" },
      { icon: "users", label: "Over Autronis", query: "Wie is Autronis?" },
      { icon: "calendar", label: "Plan een call", query: "Ik wil een call inplannen" },
    ],
  },
};

const categoryIconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  help: HelpCircle,
  dollar: DollarSign,
  wrench: Wrench,
  users: Users,
  calendar: Calendar,
};

const knowledgeBase = {
  en: {
    services: {
      text: `We specialize in three core areas:

**1. Process Automation**
We automate recurring workflows — order processing, approval flows, onboarding, lead follow-up. Up to 70% less time on repetitive tasks.

**2. System Integrations**
We connect your CRM, accounting, webshop, and other systems via APIs. No more double data entry, everything syncs automatically.

**3. Data & Reporting**
Real-time dashboards and automated reports so you always have insight into your KPIs and can make data-driven decisions.

We work with tools like Make.com, n8n, HubSpot, Shopify, Exact, and 40+ other platforms.`,
      actions: [
        { label: "View all services", to: "/services", icon: "arrow" as const },
        { label: "Schedule a free scan", to: "/book", icon: "calendar" as const },
      ],
    },
    process: {
      text: `Our process has 6 clear phases:

**1. Analysis & Architecture**
We map your current processes, identify bottlenecks, and pinpoint automation opportunities.

**2. Design & Structure**
We architect the solution — which systems connect, how data flows, what triggers what.

**3. Build & Implementation**
We build the automations, integrations, and dashboards.

**4. Validation & Testing**
Thorough testing to ensure everything works reliably.

**5. Go-Live & Handover**
Deployment with training so your team knows exactly how everything works.

**6. Continuous Development**
Ongoing monitoring, optimization, and new automations as your business grows.

Everything starts with a **free 30-minute Automation Scan** — no obligations.`,
      actions: [
        { label: "View our process", to: "/process", icon: "arrow" as const },
        { label: "Schedule Automation Scan", to: "/book", icon: "calendar" as const },
      ],
    },
    pricing: {
      text: `Every project is different, so we work with **custom proposals** based on your specific situation.

We always start with a **free Automation Scan** (30 min call) where we:

• Map your current processes
• Identify the biggest automation opportunities
• Estimate time savings and ROI
• Propose a concrete approach with timeline

This gives you a clear picture of what's possible and what it would cost — completely free and without obligations.

Most projects range from quick-win automations (days) to full system overhauls (weeks), depending on complexity.`,
      actions: [
        { label: "Calculate your ROI", to: "/impact-roi", icon: "arrow" as const },
        { label: "Get a free quote", to: "/book", icon: "calendar" as const },
      ],
    },
    tools: {
      text: `We integrate with **40+ tools and platforms**:

**Automation**: Make.com, n8n, Zapier
**CRM**: HubSpot, Salesforce, Pipedrive
**Finance**: Exact, Xero, Stripe, Mollie
**E-commerce**: Shopify, WooCommerce, Magento
**Data**: Supabase, PostgreSQL, MongoDB, Power BI
**AI**: OpenAI, Anthropic (Claude), LangChain
**Communication**: Slack, WhatsApp, Email, Teams
**Cloud**: AWS, Azure, Google Workspace

**Does your system have an API?** Then we can almost always integrate it. Try our interactive tool builder to see what automations are possible with your stack.`,
      actions: [
        { label: "Try the Workflow Builder", to: "/services#workflow-builder", icon: "arrow" as const },
        { label: "Discuss your stack", to: "/book", icon: "calendar" as const },
      ],
    },
    booking: {
      text: `Great choice! You can schedule a **free 30-minute Automation Scan** directly on our website.

During this call we'll:
• Discuss your current processes and pain points
• Identify the biggest automation opportunities
• Give you a concrete roadmap with next steps

**No sales pressure, no obligations** — just a conversation about what's possible for your business.`,
      actions: [
        { label: "Schedule now", to: "/book", icon: "calendar" as const },
        { label: "Send us a message first", to: "/contact", icon: "arrow" as const },
      ],
    },
    about: {
      text: `**Autronis** is an AI and automation agency founded by **Sem** and **Syb**.

We help growing SMB companies work smarter by building:
• Workflow automations
• AI integrations
• System connections
• Real-time dashboards

We're based in the Netherlands and work with businesses across Europe. Our motto: **"Brengt structuur in je groei"** (Bringing structure to your growth).

What sets us apart is that we don't just build — we think along. Every solution is designed to scale with your business.`,
      actions: [
        { label: "Meet the team", to: "/team", icon: "arrow" as const },
        { label: "View case studies", to: "/case-studies", icon: "arrow" as const },
      ],
    },
    cases: {
      text: `Here are some of our results:

**TransFlow (Logistics)**
73% faster order processing, automated routing and invoicing.

**CloudMetrics (SaaS)**
40 hours/week saved by automating onboarding, billing, and reporting.

**StyleDirect (E-commerce)**
2.4x more conversions through automated lead nurturing and personalized flows.

Every case study includes the full context, challenge, solution, and measurable results.`,
      actions: [
        { label: "Read case studies", to: "/case-studies", icon: "arrow" as const },
        { label: "Get similar results", to: "/book", icon: "calendar" as const },
      ],
    },
    roi: {
      text: `We have an interactive **ROI Calculator** where you can estimate your potential savings.

Based on:
• Hours spent on manual tasks per week
• Hourly cost of your team
• Expected automation percentage
• Current error rate

You'll get an instant estimate of monthly and yearly savings. Most of our clients see **ROI within 3-6 months**.`,
      actions: [
        { label: "Try the ROI Calculator", to: "/impact-roi", icon: "arrow" as const },
      ],
    },
  },
  nl: {
    services: {
      text: `We zijn gespecialiseerd in drie kerngebieden:

**1. Procesautomatisering**
We automatiseren terugkerende workflows — orderverwerking, goedkeuringsflows, onboarding, lead opvolging. Tot 70% minder tijd aan repetitieve taken.

**2. Systeemintegraties**
We verbinden je CRM, boekhouding, webshop en andere systemen via API's. Geen dubbele invoer meer, alles synchroniseert automatisch.

**3. Data & Rapportage**
Realtime dashboards en geautomatiseerde rapportages zodat je altijd inzicht hebt in je KPI's en datagedreven beslissingen kunt nemen.

We werken met tools zoals Make.com, n8n, HubSpot, Shopify, Exact en 40+ andere platformen.`,
      actions: [
        { label: "Bekijk alle diensten", to: "/services", icon: "arrow" as const },
        { label: "Plan een gratis scan", to: "/book", icon: "calendar" as const },
      ],
    },
    process: {
      text: `Ons proces bestaat uit 6 duidelijke fases:

**1. Analyse & Architectuur**
We brengen je huidige processen in kaart, identificeren knelpunten en vinden automatiseringskansen.

**2. Ontwerp & Structuur**
We ontwerpen de oplossing — welke systemen verbinden, hoe data stroomt, wat wat triggert.

**3. Bouw & Implementatie**
We bouwen de automatiseringen, integraties en dashboards.

**4. Validatie & Testen**
Grondig testen om te zorgen dat alles betrouwbaar werkt.

**5. Go-Live & Overdracht**
Oplevering met training zodat je team precies weet hoe alles werkt.

**6. Continue Doorontwikkeling**
Doorlopende monitoring, optimalisatie en nieuwe automatiseringen naarmate je bedrijf groeit.

Alles begint met een **gratis 30 minuten Automation Scan** — vrijblijvend.`,
      actions: [
        { label: "Bekijk ons proces", to: "/process", icon: "arrow" as const },
        { label: "Plan Automation Scan", to: "/book", icon: "calendar" as const },
      ],
    },
    pricing: {
      text: `Elk project is anders, daarom werken we met **maatwerkoffertes** op basis van jouw specifieke situatie.

We beginnen altijd met een **gratis Automation Scan** (30 min gesprek) waarin we:

• Je huidige processen in kaart brengen
• De grootste automatiseringskansen identificeren
• Tijdsbesparing en ROI inschatten
• Een concreet voorstel doen met tijdlijn

Dit geeft je een helder beeld van wat mogelijk is en wat het zou kosten — geheel gratis en vrijblijvend.

De meeste projecten variëren van quick-win automatiseringen (dagen) tot volledige systeemoverhauls (weken), afhankelijk van de complexiteit.`,
      actions: [
        { label: "Bereken je ROI", to: "/impact-roi", icon: "arrow" as const },
        { label: "Vraag een gratis offerte aan", to: "/book", icon: "calendar" as const },
      ],
    },
    tools: {
      text: `We integreren met **40+ tools en platformen**:

**Automatisering**: Make.com, n8n, Zapier
**CRM**: HubSpot, Salesforce, Pipedrive
**Finance**: Exact, Xero, Stripe, Mollie
**E-commerce**: Shopify, WooCommerce, Magento
**Data**: Supabase, PostgreSQL, MongoDB, Power BI
**AI**: OpenAI, Anthropic (Claude), LangChain
**Communicatie**: Slack, WhatsApp, Email, Teams
**Cloud**: AWS, Azure, Google Workspace

**Heeft je systeem een API?** Dan kunnen we het vrijwel altijd integreren. Probeer onze interactieve tool builder om te zien welke automatiseringen mogelijk zijn met jouw stack.`,
      actions: [
        { label: "Probeer de Workflow Builder", to: "/services#workflow-builder", icon: "arrow" as const },
        { label: "Bespreek je stack", to: "/book", icon: "calendar" as const },
      ],
    },
    booking: {
      text: `Goede keuze! Je kunt direct een **gratis 30 minuten Automation Scan** inplannen op onze website.

Tijdens dit gesprek:
• Bespreken we je huidige processen en knelpunten
• Identificeren we de grootste automatiseringskansen
• Geven we je een concrete roadmap met vervolgstappen

**Geen verkoopdruk, geen verplichtingen** — gewoon een gesprek over wat mogelijk is voor jouw bedrijf.`,
      actions: [
        { label: "Plan nu in", to: "/book", icon: "calendar" as const },
        { label: "Stuur eerst een bericht", to: "/contact", icon: "arrow" as const },
      ],
    },
    about: {
      text: `**Autronis** is een AI- en automatiseringsbureau opgericht door **Sem** en **Syb**.

We helpen groeiende MKB-bedrijven slimmer werken door het bouwen van:
• Workflow-automatiseringen
• AI-integraties
• Systeemkoppelingen
• Realtime dashboards

We zijn gevestigd in Nederland en werken met bedrijven door heel Europa. Ons motto: **"Brengt structuur in je groei"**.

Wat ons onderscheidt is dat we niet alleen bouwen — we denken mee. Elke oplossing is ontworpen om mee te schalen met je bedrijf.`,
      actions: [
        { label: "Ontmoet het team", to: "/team", icon: "arrow" as const },
        { label: "Bekijk case studies", to: "/case-studies", icon: "arrow" as const },
      ],
    },
    cases: {
      text: `Hier zijn enkele van onze resultaten:

**TransFlow (Logistiek)**
73% snellere orderverwerking, geautomatiseerde routing en facturatie.

**CloudMetrics (SaaS)**
40 uur/week bespaard door automatisering van onboarding, facturatie en rapportage.

**StyleDirect (E-commerce)**
2,4x meer conversies door geautomatiseerde lead nurturing en gepersonaliseerde flows.

Elke case study bevat de volledige context, uitdaging, oplossing en meetbare resultaten.`,
      actions: [
        { label: "Lees case studies", to: "/case-studies", icon: "arrow" as const },
        { label: "Vergelijkbare resultaten behalen", to: "/book", icon: "calendar" as const },
      ],
    },
    roi: {
      text: `We hebben een interactieve **ROI Calculator** waarmee je je potentiële besparing kunt inschatten.

Gebaseerd op:
• Uren besteed aan handmatige taken per week
• Uurtarief van je team
• Verwacht automatiseringspercentage
• Huidig foutenpercentage

Je krijgt direct een schatting van maandelijkse en jaarlijkse besparingen. De meeste klanten zien **ROI binnen 3-6 maanden**.`,
      actions: [
        { label: "Probeer de ROI Calculator", to: "/impact-roi", icon: "arrow" as const },
      ],
    },
  },
};

type KBEntry = { text: string; actions: ChatAction[] };

function findAnswer(question: string, lang: "en" | "nl"): KBEntry {
  const q = question.toLowerCase();
  const kb = knowledgeBase[lang];

  if (q.includes("case") || q.includes("result") || q.includes("klant") || q.includes("client") || q.includes("voorbeeld")) {
    return kb.cases;
  }
  if (q.includes("roi") || q.includes("besparing") || q.includes("saving") || q.includes("calculator") || q.includes("bereken")) {
    return kb.roi;
  }
  if (q.includes("automat") || q.includes("dienst") || q.includes("service") || q.includes("wat doen") || q.includes("what do") || q.includes("wat kunnen")) {
    return kb.services;
  }
  if (q.includes("proces") || q.includes("process") || q.includes("hoe werk") || q.includes("how does") || q.includes("stappen") || q.includes("steps") || q.includes("fase")) {
    return kb.process;
  }
  if (q.includes("kost") || q.includes("cost") || q.includes("prijs") || q.includes("price") || q.includes("tarief") || q.includes("rate") || q.includes("budget")) {
    return kb.pricing;
  }
  if (q.includes("tool") || q.includes("integr") || q.includes("systeem") || q.includes("system") || q.includes("software") || q.includes("platform") || q.includes("crm") || q.includes("erp")) {
    return kb.tools;
  }
  if (q.includes("book") || q.includes("plan") || q.includes("afspraak") || q.includes("call") || q.includes("scan") || q.includes("gesprek") || q.includes("schedul") || q.includes("inplan")) {
    return kb.booking;
  }
  if (q.includes("wie") || q.includes("who") || q.includes("about") || q.includes("over") || q.includes("team") || q.includes("autronis") || q.includes("oprichter") || q.includes("founder")) {
    return kb.about;
  }

  return {
    text: lang === "nl"
      ? `Goede vraag! Ik kan je helpen met vragen over:\n\n• **Onze diensten** — automatisering, integraties, data\n• **Werkwijze** — hoe we projecten aanpakken\n• **Prijzen** — wat het kost\n• **Tools** — welke systemen we koppelen\n• **Case studies** — resultaten bij andere klanten\n• **ROI** — bereken je besparing\n\nOf plan direct een gratis Automation Scan in!`
      : `Great question! I can help you with:\n\n• **Our services** — automation, integrations, data\n• **Process** — how we approach projects\n• **Pricing** — what it costs\n• **Tools** — which systems we connect\n• **Case studies** — results for other clients\n• **ROI** — calculate your savings\n\nOr schedule a free Automation Scan directly!`,
    actions: [
      { label: lang === "nl" ? "Plan een Automation Scan" : "Schedule Automation Scan", to: "/book", icon: "calendar" as const },
    ],
  };
}

const ChatWidget = () => {
  const lang = useLanguage();
  const tx = t[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Stop pulse after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setShowPulse(false);
    if (!hasInteracted) {
      setHasInteracted(true);
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: tx.greeting,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 600)
    );

    const result = findAnswer(text, lang);

    const assistantMsg: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: result.text,
      timestamp: new Date(),
      actions: result.actions,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {boldMatch[1]}
          </strong>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a key={i} href={linkMatch[2]} className="text-primary underline hover:text-primary/80 transition-colors">
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chat button with logo */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            aria-label="Open chat"
          >
            {showPulse && (
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
            )}
            <img src="/logo.png" alt="Autronis" className="w-8 h-8 object-contain relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-card to-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <img src="/logo.png" alt="Autronis" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{tx.title}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[11px] text-muted-foreground">{tx.subtitle}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <img src="/logo.png" alt="" className="w-4 h-4 object-contain" />
                      </div>
                    )}
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <User size={14} className="text-muted-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "assistant"
                          ? "bg-muted/50 text-foreground rounded-tl-md"
                          : "bg-primary text-primary-foreground rounded-tr-md"
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {renderContent(msg.content)}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 pl-10">
                      {msg.actions.map((action) => (
                        <Link
                          key={action.to + action.label}
                          to={action.to}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                        >
                          {action.icon === "calendar" ? <Calendar size={12} /> : <ArrowRight size={12} />}
                          {action.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <img src="/logo.png" alt="" className="w-4 h-4 object-contain" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              {/* Category buttons (after greeting) */}
              {messages.length === 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-2 pl-10"
                >
                  {tx.categories.map((cat) => {
                    const Icon = categoryIconMap[cat.icon];
                    return (
                      <button
                        key={cat.label}
                        onClick={() => sendMessage(cat.query)}
                        className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 text-foreground transition-all duration-200 text-left"
                      >
                        <Icon size={14} className="text-primary shrink-0" />
                        <span className="font-medium">{cat.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border">
              <form onSubmit={handleSubmit} className="px-4 py-3 flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={tx.placeholder}
                  className="flex-1 bg-muted/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="text-[10px] text-muted-foreground/50 text-center pb-2">{tx.poweredBy}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
