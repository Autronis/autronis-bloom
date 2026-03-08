import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";
import { useLanguage } from "@/i18n/context";

const CW = 112, CH = 34;

const nodeText = {
  en: [
    { title: "Customer queries", desc: "Chat, email & forms" },
    { title: "Analysis", desc: "AI understands the query" },
    { title: "Context", desc: "Order & customer data" },
    { title: "AI response", desc: "Matching answer" },
    { title: "Reply", desc: "Chat or email delivery" },
    { title: "CRM sync", desc: "Store interaction" },
    { title: "Escalation", desc: "Complex queries → agent" },
  ],
  nl: [
    { title: "Klantvragen", desc: "Chat, e-mail & formulieren" },
    { title: "Analyse", desc: "AI begrijpt de vraag" },
    { title: "Context", desc: "Order- & klantgegevens" },
    { title: "AI antwoord", desc: "Passend antwoord" },
    { title: "Reactie", desc: "Chat of e-mail verzending" },
    { title: "CRM sync", desc: "Interactie opslaan" },
    { title: "Escalatie", desc: "Complexe vragen → agent" },
  ],
};

const icons = ["messageCircle", "brain", "database", "bot", "reply", "userCheck", "alertTriangle"];

const desktopPositions = [
  { x: 86, y: 60 }, { x: 225, y: 60 }, { x: 364, y: 60 },
  { x: 225, y: 138 }, { x: 225, y: 196 }, { x: 225, y: 254 }, { x: 225, y: 312 },
];

const mobilePositions = [
  { x: 170, y: 55 }, { x: 170, y: 128 }, { x: 170, y: 201 },
  { x: 170, y: 274 }, { x: 170, y: 347 }, { x: 170, y: 420 }, { x: 170, y: 493 },
];

const desktopSegments: Point[][] = [
  [{ x: 114, y: 60 }, { x: 189, y: 60 }],
  [{ x: 261, y: 60 }, { x: 308, y: 60 }],
  [{ x: 364, y: 77 }, { x: 364, y: 103 }, { x: 225, y: 103 }, { x: 225, y: 121 }],
  [{ x: 225, y: 155 }, { x: 225, y: 179 }],
  [{ x: 225, y: 213 }, { x: 225, y: 237 }],
  [{ x: 225, y: 271 }, { x: 225, y: 295 }],
];

const mobileSegments: Point[][] = [
  [{ x: 170, y: 79 }, { x: 170, y: 104 }],
  [{ x: 170, y: 152 }, { x: 170, y: 177 }],
  [{ x: 170, y: 225 }, { x: 170, y: 250 }],
  [{ x: 170, y: 298 }, { x: 170, y: 323 }],
  [{ x: 170, y: 371 }, { x: 170, y: 396 }],
  [{ x: 170, y: 444 }, { x: 170, y: 469 }],
];

const MW = 235, MH = 48;

const SupportFlowDiagram = () => {
  const lang = useLanguage();
  const t = nodeText[lang];

  const desktopNodes: DiagramNode[] = t.map((n, i) => ({
    ...n, icon: icons[i], ...desktopPositions[i], w: CW, h: CH, step: i + 1,
  }));

  const mobileNodes: DiagramNode[] = t.map((n, i) => ({
    ...n, icon: icons[i], ...mobilePositions[i], w: MW, h: MH, step: i + 1,
  }));

  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <FlowDiagramSvg viewBox="0 0 450 365" nodes={desktopNodes} segments={desktopSegments} />
      </div>
      <div className="sm:hidden">
        <FlowDiagramSvg viewBox="0 0 345 545" nodes={mobileNodes} segments={mobileSegments} travelDuration={8000} />
      </div>
    </div>
  );
};

export default SupportFlowDiagram;
