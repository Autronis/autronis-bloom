import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/context";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
};

const t = {
  en: {
    title: "Autronis AI",
    subtitle: "Ask us anything about automation",
    placeholder: "Type your question...",
    greeting:
      "Hi! I'm the Autronis assistant. I can help you with questions about our automation services, integrations, and how we can help your business work smarter. What would you like to know?",
    suggestions: [
      "What can you automate?",
      "How does the process work?",
      "What does it cost?",
      "Which tools do you integrate?",
    ],
  },
  nl: {
    title: "Autronis AI",
    subtitle: "Stel ons alles over automatisering",
    placeholder: "Typ je vraag...",
    greeting:
      "Hoi! Ik ben de Autronis-assistent. Ik kan je helpen met vragen over onze automatiseringsdiensten, integraties en hoe we jouw bedrijf slimmer kunnen laten werken. Wat wil je weten?",
    suggestions: [
      "Wat kunnen jullie automatiseren?",
      "Hoe werkt het proces?",
      "Wat kost het?",
      "Welke tools integreren jullie?",
    ],
  },
};

const knowledgeBase = {
  en: {
    services: `Autronis specializes in three core areas:

1. **Process Automation** — We automate recurring workflows like order processing, approval flows, onboarding, and lead follow-up. Up to 70% less time on repetitive tasks.

2. **System Integrations** — We connect your CRM, accounting, webshop, and other systems via APIs. No more double data entry.

3. **Data & Reporting** — Real-time dashboards and automated reports so you always have insight into your KPIs.`,

    process: `Our process has 6 phases:

1. **Analysis** — We map your current processes and identify automation opportunities
2. **Design** — We architect the solution and define integrations
3. **Build** — We implement the automations and integrations
4. **Test** — Thorough testing and optimization
5. **Go-Live** — Deployment with training and handover
6. **Support** — Continuous monitoring and improvements

We start with a free 30-minute Automation Scan to identify the biggest opportunities.`,

    pricing: `Every project is different, so we work with custom proposals based on your specific needs. We always start with a **free Automation Scan** (30 min call) where we:

- Map your current processes
- Identify automation opportunities
- Estimate time savings and ROI
- Propose a concrete approach

No obligations, no sales pressure. Want to schedule one?`,

    tools: `We integrate with 40+ tools and platforms including:

**Automation**: Make.com, n8n, Zapier
**CRM**: HubSpot, Salesforce, Pipedrive
**Finance**: Exact, Xero, Stripe, Mollie
**E-commerce**: Shopify, WooCommerce, Magento
**Data**: Supabase, PostgreSQL, MongoDB, Power BI
**AI**: OpenAI, Anthropic (Claude), LangChain
**Communication**: Slack, WhatsApp, Email
**Cloud**: AWS, Azure, Google Workspace

If your system has an API, we can almost always integrate it.`,

    booking: `You can schedule a free 30-minute Automation Scan directly on our website. Go to the **Schedule Automation Scan** page or click the button in the navigation bar. We'll discuss your processes and identify the biggest automation opportunities — no obligations.`,

    about: `Autronis is an AI and automation agency that helps growing SMB companies work smarter, faster, and more efficiently. Founded by Sem and Syb, we build workflow automations, AI integrations, system connections, and dashboards. We're based in the Netherlands and work with businesses across Europe.`,
  },
  nl: {
    services: `Autronis is gespecialiseerd in drie kerngebieden:

1. **Procesautomatisering** — We automatiseren terugkerende workflows zoals orderverwerking, goedkeuringsflows, onboarding en lead opvolging. Tot 70% minder tijd aan repetitieve taken.

2. **Systeemintegraties** — We verbinden je CRM, boekhouding, webshop en andere systemen via API's. Geen dubbele data-invoer meer.

3. **Data & Rapportage** — Realtime dashboards en geautomatiseerde rapportages zodat je altijd inzicht hebt in je KPI's.`,

    process: `Ons proces bestaat uit 6 fases:

1. **Analyse** — We brengen je huidige processen in kaart en identificeren automatiseringsmogelijkheden
2. **Ontwerp** — We ontwerpen de oplossing en definiëren integraties
3. **Bouw** — We implementeren de automatiseringen en integraties
4. **Test** — Grondig testen en optimaliseren
5. **Go-Live** — Oplevering met training en overdracht
6. **Support** — Continue monitoring en verbeteringen

We beginnen met een gratis 30 minuten Automation Scan om de grootste kansen te identificeren.`,

    pricing: `Elk project is anders, daarom werken we met maatwerkoffertes op basis van jouw specifieke situatie. We beginnen altijd met een **gratis Automation Scan** (30 min gesprek) waarin we:

- Je huidige processen in kaart brengen
- Automatiseringsmogelijkheden identificeren
- Tijdsbesparing en ROI inschatten
- Een concreet voorstel doen

Vrijblijvend, geen verkoopdruk. Wil je er een inplannen?`,

    tools: `We integreren met 40+ tools en platformen waaronder:

**Automatisering**: Make.com, n8n, Zapier
**CRM**: HubSpot, Salesforce, Pipedrive
**Finance**: Exact, Xero, Stripe, Mollie
**E-commerce**: Shopify, WooCommerce, Magento
**Data**: Supabase, PostgreSQL, MongoDB, Power BI
**AI**: OpenAI, Anthropic (Claude), LangChain
**Communicatie**: Slack, WhatsApp, Email
**Cloud**: AWS, Azure, Google Workspace

Heeft je systeem een API? Dan kunnen we het vrijwel altijd integreren.`,

    booking: `Je kunt direct een gratis 30 minuten Automation Scan inplannen op onze website. Ga naar de **Plan een Automation Scan** pagina of klik op de knop in de navigatiebalk. We bespreken je processen en identificeren de grootste automatiseringskansen — geheel vrijblijvend.`,

    about: `Autronis is een AI- en automatiseringsbureau dat groeiende MKB-bedrijven helpt slimmer, sneller en efficiënter te werken. Opgericht door Sem en Syb, bouwen wij workflow-automatiseringen, AI-integraties, systeemkoppelingen en dashboards. We zijn gevestigd in Nederland en werken met bedrijven door heel Europa.`,
  },
};

function findAnswer(question: string, lang: "en" | "nl"): string {
  const q = question.toLowerCase();
  const kb = knowledgeBase[lang];

  // Service related
  if (
    q.includes("automat") ||
    q.includes("dienst") ||
    q.includes("service") ||
    q.includes("wat doen") ||
    q.includes("what do") ||
    q.includes("wat kunnen")
  ) {
    return kb.services;
  }

  // Process related
  if (
    q.includes("proces") ||
    q.includes("process") ||
    q.includes("hoe werk") ||
    q.includes("how does") ||
    q.includes("stappen") ||
    q.includes("steps") ||
    q.includes("fase")
  ) {
    return kb.process;
  }

  // Pricing related
  if (
    q.includes("kost") ||
    q.includes("cost") ||
    q.includes("prijs") ||
    q.includes("price") ||
    q.includes("tarief") ||
    q.includes("rate") ||
    q.includes("budget")
  ) {
    return kb.pricing;
  }

  // Tools related
  if (
    q.includes("tool") ||
    q.includes("integr") ||
    q.includes("systeem") ||
    q.includes("system") ||
    q.includes("software") ||
    q.includes("platform") ||
    q.includes("crm") ||
    q.includes("erp")
  ) {
    return kb.tools;
  }

  // Booking related
  if (
    q.includes("book") ||
    q.includes("plan") ||
    q.includes("afspraak") ||
    q.includes("call") ||
    q.includes("scan") ||
    q.includes("gesprek") ||
    q.includes("schedul")
  ) {
    return kb.booking;
  }

  // About
  if (
    q.includes("wie") ||
    q.includes("who") ||
    q.includes("about") ||
    q.includes("over") ||
    q.includes("team") ||
    q.includes("autronis")
  ) {
    return kb.about;
  }

  // Fallback
  return lang === "nl"
    ? `Goede vraag! Ik kan je het beste helpen met vragen over onze **diensten**, **integraties**, **werkwijze** en **prijzen**. Voor specifiekere vragen kun je het beste een [gratis Automation Scan inplannen](/book) — dan bespreken we je situatie persoonlijk.`
    : `Great question! I can best help you with questions about our **services**, **integrations**, **process**, and **pricing**. For more specific questions, you might want to [schedule a free Automation Scan](/book) — we'll discuss your situation personally.`;
}

const ChatWidget = () => {
  const lang = useLanguage();
  const tx = t[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
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

  const handleOpen = () => {
    setIsOpen(true);
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

    // Simulate typing delay for natural feel
    await new Promise((resolve) =>
      setTimeout(resolve, 600 + Math.random() * 800)
    );

    const answer = findAnswer(text, lang);

    const assistantMsg: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: answer,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  // Simple markdown-like rendering for bold text and links
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
          <a
            key={i}
            href={linkMatch[2]}
            className="text-primary underline hover:text-primary/80 transition-colors"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chat button */}
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
            <MessageCircle size={24} />
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
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[540px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {tx.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {tx.subtitle}
                  </p>
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
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "assistant"
                        ? "bg-primary/10"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={14} className="text-primary" />
                    ) : (
                      <User size={14} className="text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-muted/50 text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {renderContent(msg.content)}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl px-4 py-3 flex items-center gap-1">
                    <Loader2
                      size={14}
                      className="text-primary animate-spin"
                    />
                  </div>
                </motion.div>
              )}

              {/* Suggestions (only after greeting) */}
              {messages.length === 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pl-10"
                >
                  {tx.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-border flex gap-2"
            >
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
