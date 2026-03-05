import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";

/* ═══ Layouts ═══ */
const CW = 128, CH = 40;

const desktopNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 86, y: 70, w: CW, h: CH },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", icon: "search", x: 240, y: 70, w: CW + 12, h: CH },
  { title: "Data verwerking", desc: "Extractie & verrijking", icon: "database", x: 394, y: 70, w: CW, h: CH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 240, y: 180, w: CW + 18, h: CH + 4 },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", icon: "mail", x: 240, y: 278, w: CW + 28, h: CH + 4 },
  { title: "Dashboard synchronisatie", desc: "Opslaan van leads", icon: "dashboard", x: 240, y: 376, w: CW + 34, h: CH + 4 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 240, y: 474, w: CW + 18, h: CH + 4 },
];

const desktopSegments: Point[][] = [
  [{ x: 150, y: 70 }, { x: 174, y: 70 }],
  [{ x: 306, y: 70 }, { x: 330, y: 70 }],
  [{ x: 394, y: 90 }, { x: 394, y: 130 }, { x: 240, y: 130 }, { x: 240, y: 158 }],
  [{ x: 240, y: 204 }, { x: 240, y: 256 }],
  [{ x: 240, y: 302 }, { x: 240, y: 354 }],
  [{ x: 240, y: 400 }, { x: 240, y: 452 }],
];

const MW = 198, MH = 40;

const mobileNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 155, y: 48, w: MW, h: MH },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", icon: "search", x: 155, y: 122, w: MW + 8, h: MH },
  { title: "Data verwerking", desc: "Extractie & verrijking", icon: "database", x: 155, y: 196, w: MW, h: MH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 155, y: 270, w: MW, h: MH },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", icon: "mail", x: 155, y: 348, w: MW + 12, h: MH },
  { title: "Dashboard synchronisatie", desc: "Opslaan van leads", icon: "dashboard", x: 155, y: 426, w: MW + 8, h: MH },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 155, y: 504, w: MW, h: MH },
];

const mobileSegments: Point[][] = [
  [{ x: 155, y: 68 }, { x: 155, y: 102 }],
  [{ x: 155, y: 142 }, { x: 155, y: 176 }],
  [{ x: 155, y: 216 }, { x: 155, y: 250 }],
  [{ x: 155, y: 290 }, { x: 155, y: 328 }],
  [{ x: 155, y: 368 }, { x: 155, y: 406 }],
  [{ x: 155, y: 446 }, { x: 155, y: 484 }],
];

const LeadFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 480 520" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 310 545" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default LeadFlowDiagram;
