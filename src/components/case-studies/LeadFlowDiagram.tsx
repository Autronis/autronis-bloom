import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";
import { useLanguage } from "@/i18n/context";

const CW = 140, CH = 44;

const nodeText = {
  en: [
    { title: "Lead sources", desc: "Directories & databases" },
    { title: "Collection", desc: "Automatic collection" },
    { title: "Processing", desc: "Extraction & enrichment" },
    { title: "AI Analysis", desc: "Website & pain points" },
    { title: "Outreach", desc: "Personalized emails" },
    { title: "Dashboard", desc: "Lead storage" },
    { title: "Sales follow-up", desc: "Conversations & pipeline" },
  ],
  nl: [
    { title: "Leadbronnen", desc: "Gidsen & databases" },
    { title: "Verzameling", desc: "Automatisch verzamelen" },
    { title: "Verwerking", desc: "Extractie & verrijking" },
    { title: "AI Analyse", desc: "Website & pijnpunten" },
    { title: "Outreach", desc: "Persoonlijke e-mails" },
    { title: "Dashboard", desc: "Opslaan van leads" },
    { title: "Sales opvolging", desc: "Gesprekken & pipeline" },
  ],
};

const icons = ["globe", "search", "database", "bot", "mail", "dashboard", "phone"];

const desktopPositions = [
  { x: 90, y: 55 }, { x: 240, y: 55 }, { x: 390, y: 55 },
  { x: 240, y: 145 }, { x: 240, y: 215 }, { x: 240, y: 285 }, { x: 240, y: 355 },
];

const mobilePositions = [
  { x: 170, y: 50 }, { x: 170, y: 125 }, { x: 170, y: 200 },
  { x: 170, y: 275 }, { x: 170, y: 350 }, { x: 170, y: 425 }, { x: 170, y: 500 },
];

const desktopSegments: Point[][] = [
  [{ x: 133, y: 55 }, { x: 197, y: 55 }],
  [{ x: 283, y: 55 }, { x: 347, y: 55 }],
  [{ x: 390, y: 77 }, { x: 390, y: 105 }, { x: 240, y: 105 }, { x: 240, y: 123 }],
  [{ x: 240, y: 167 }, { x: 240, y: 193 }],
  [{ x: 240, y: 237 }, { x: 240, y: 263 }],
  [{ x: 240, y: 307 }, { x: 240, y: 333 }],
];

const mobileSegments: Point[][] = [
  [{ x: 170, y: 76 }, { x: 170, y: 99 }],
  [{ x: 170, y: 151 }, { x: 170, y: 174 }],
  [{ x: 170, y: 226 }, { x: 170, y: 249 }],
  [{ x: 170, y: 301 }, { x: 170, y: 324 }],
  [{ x: 170, y: 376 }, { x: 170, y: 399 }],
  [{ x: 170, y: 451 }, { x: 170, y: 474 }],
];

const MW = 250, MH = 52;

const LeadFlowDiagram = () => {
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
        <FlowDiagramSvg viewBox="0 0 480 400" nodes={desktopNodes} segments={desktopSegments} />
      </div>
      <div className="sm:hidden">
        <FlowDiagramSvg viewBox="0 0 345 550" nodes={mobileNodes} segments={mobileSegments} travelDuration={8000} />
      </div>
    </div>
  );
};

export default LeadFlowDiagram;
