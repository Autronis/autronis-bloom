import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";

/* ═══ Layouts ═══ */
const CW = 128, CH = 40;

const desktopNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 86, y: 70, w: CW, h: CH },
  { title: "Verzameling", desc: "Automatisch verzamelen", icon: "search", x: 240, y: 70, w: CW, h: CH },
  { title: "Verwerking", desc: "Extractie & verrijking", icon: "database", x: 394, y: 70, w: CW, h: CH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 240, y: 165, w: CW + 10, h: CH + 4 },
  { title: "Outreach", desc: "Persoonlijke e-mails", icon: "mail", x: 240, y: 240, w: CW + 10, h: CH + 4 },
  { title: "Dashboard", desc: "Opslaan van leads", icon: "dashboard", x: 240, y: 315, w: CW + 10, h: CH + 4 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 240, y: 390, w: CW + 10, h: CH + 4 },
];

const desktopSegments: Point[][] = [
  [{ x: 150, y: 70 }, { x: 176, y: 70 }],
  [{ x: 304, y: 70 }, { x: 330, y: 70 }],
  [{ x: 394, y: 90 }, { x: 394, y: 125 }, { x: 240, y: 125 }, { x: 240, y: 143 }],
  [{ x: 240, y: 189 }, { x: 240, y: 218 }],
  [{ x: 240, y: 264 }, { x: 240, y: 293 }],
  [{ x: 240, y: 339 }, { x: 240, y: 368 }],
];

const MW = 198, MH = 40;

const mobileNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 155, y: 48, w: MW, h: MH },
  { title: "Verzameling", desc: "Automatisch verzamelen", icon: "search", x: 155, y: 110, w: MW, h: MH },
  { title: "Verwerking", desc: "Extractie & verrijking", icon: "database", x: 155, y: 172, w: MW, h: MH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 155, y: 234, w: MW, h: MH },
  { title: "Outreach", desc: "Persoonlijke e-mails", icon: "mail", x: 155, y: 296, w: MW, h: MH },
  { title: "Dashboard", desc: "Opslaan van leads", icon: "dashboard", x: 155, y: 358, w: MW, h: MH },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 155, y: 420, w: MW, h: MH },
];

const mobileSegments: Point[][] = [
  [{ x: 155, y: 68 }, { x: 155, y: 90 }],
  [{ x: 155, y: 130 }, { x: 155, y: 152 }],
  [{ x: 155, y: 192 }, { x: 155, y: 214 }],
  [{ x: 155, y: 254 }, { x: 155, y: 276 }],
  [{ x: 155, y: 316 }, { x: 155, y: 338 }],
  [{ x: 155, y: 378 }, { x: 155, y: 400 }],
];

const LeadFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 480 435" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 310 460" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default LeadFlowDiagram;
