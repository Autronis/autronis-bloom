import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";
import { useLanguage } from "@/i18n/context";

const CW = 150, CH = 46;

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
  { x: 100, y: 70 }, { x: 290, y: 70 }, { x: 480, y: 70 },
  { x: 290, y: 175 }, { x: 290, y: 255 }, { x: 290, y: 335 }, { x: 290, y: 415 },
];

const mobilePositions = [
  { x: 170, y: 55 }, { x: 170, y: 138 }, { x: 170, y: 221 },
  { x: 170, y: 304 }, { x: 170, y: 387 }, { x: 170, y: 470 }, { x: 170, y: 553 },
];

const desktopSegments: Point[][] = [
  [{ x: 148, y: 70 }, { x: 242, y: 70 }],
  [{ x: 338, y: 70 }, { x: 408, y: 70 }],
  [{ x: 480, y: 93 }, { x: 480, y: 130 }, { x: 290, y: 130 }, { x: 290, y: 152 }],
  [{ x: 290, y: 198 }, { x: 290, y: 232 }],
  [{ x: 290, y: 278 }, { x: 290, y: 312 }],
  [{ x: 290, y: 358 }, { x: 290, y: 392 }],
];

const mobileSegments: Point[][] = [
  [{ x: 170, y: 83 }, { x: 170, y: 112 }],
  [{ x: 170, y: 166 }, { x: 170, y: 195 }],
  [{ x: 170, y: 249 }, { x: 170, y: 278 }],
  [{ x: 170, y: 332 }, { x: 170, y: 361 }],
  [{ x: 170, y: 415 }, { x: 170, y: 444 }],
  [{ x: 170, y: 498 }, { x: 170, y: 527 }],
];

const MW = 250, MH = 56;

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
        <FlowDiagramSvg viewBox="0 0 600 470" nodes={desktopNodes} segments={desktopSegments} />
      </div>
      <div className="sm:hidden">
        <FlowDiagramSvg viewBox="0 0 345 610" nodes={mobileNodes} segments={mobileSegments} travelDuration={8000} />
      </div>
    </div>
  );
};

export default LeadFlowDiagram;
