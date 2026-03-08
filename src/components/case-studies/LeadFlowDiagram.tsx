import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";

const CW = 112, CH = 34;

const desktopNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 86, y: 60, w: CW, h: CH, step: 1 },
  { title: "Verzameling", desc: "Automatisch verzamelen", icon: "search", x: 225, y: 60, w: CW, h: CH, step: 2 },
  { title: "Verwerking", desc: "Extractie & verrijking", icon: "database", x: 364, y: 60, w: CW, h: CH, step: 3 },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 225, y: 138, w: CW, h: CH, step: 4 },
  { title: "Outreach", desc: "Persoonlijke e-mails", icon: "mail", x: 225, y: 196, w: CW, h: CH, step: 5 },
  { title: "Dashboard", desc: "Opslaan van leads", icon: "dashboard", x: 225, y: 254, w: CW, h: CH, step: 6 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 225, y: 312, w: CW, h: CH, step: 7 },
];

const desktopSegments: Point[][] = [
  [{ x: 114, y: 60 }, { x: 189, y: 60 }],
  [{ x: 261, y: 60 }, { x: 308, y: 60 }],
  [{ x: 364, y: 77 }, { x: 364, y: 103 }, { x: 225, y: 103 }, { x: 225, y: 121 }],
  [{ x: 225, y: 155 }, { x: 225, y: 179 }],
  [{ x: 225, y: 213 }, { x: 225, y: 237 }],
  [{ x: 225, y: 271 }, { x: 225, y: 295 }],
];

const MW = 235, MH = 48;

const mobileNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 170, y: 55, w: MW, h: MH, step: 1 },
  { title: "Verzameling", desc: "Automatisch verzamelen", icon: "search", x: 170, y: 128, w: MW, h: MH, step: 2 },
  { title: "Verwerking", desc: "Extractie & verrijking", icon: "database", x: 170, y: 201, w: MW, h: MH, step: 3 },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 170, y: 274, w: MW, h: MH, step: 4 },
  { title: "Outreach", desc: "Persoonlijke e-mails", icon: "mail", x: 170, y: 347, w: MW, h: MH, step: 5 },
  { title: "Dashboard", desc: "Opslaan van leads", icon: "dashboard", x: 170, y: 420, w: MW, h: MH, step: 6 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 170, y: 493, w: MW, h: MH, step: 7 },
];

const mobileSegments: Point[][] = [
  [{ x: 170, y: 79 }, { x: 170, y: 104 }],
  [{ x: 170, y: 152 }, { x: 170, y: 177 }],
  [{ x: 170, y: 225 }, { x: 170, y: 250 }],
  [{ x: 170, y: 298 }, { x: 170, y: 323 }],
  [{ x: 170, y: 371 }, { x: 170, y: 396 }],
  [{ x: 170, y: 444 }, { x: 170, y: 469 }],
];

const LeadFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 450 365" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 345 545" nodes={mobileNodes} segments={mobileSegments} travelDuration={8000} />
    </div>
  </div>
);

export default LeadFlowDiagram;
