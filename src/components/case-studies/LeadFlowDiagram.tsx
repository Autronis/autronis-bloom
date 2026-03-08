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

const MW = 205, MH = 40;

const mobileNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 160, y: 50, w: MW, h: MH, step: 1 },
  { title: "Verzameling", desc: "Automatisch verzamelen", icon: "search", x: 160, y: 112, w: MW, h: MH, step: 2 },
  { title: "Verwerking", desc: "Extractie & verrijking", icon: "database", x: 160, y: 174, w: MW, h: MH, step: 3 },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 160, y: 236, w: MW, h: MH, step: 4 },
  { title: "Outreach", desc: "Persoonlijke e-mails", icon: "mail", x: 160, y: 298, w: MW, h: MH, step: 5 },
  { title: "Dashboard", desc: "Opslaan van leads", icon: "dashboard", x: 160, y: 360, w: MW, h: MH, step: 6 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 160, y: 422, w: MW, h: MH, step: 7 },
];

const mobileSegments: Point[][] = [
  [{ x: 160, y: 70 }, { x: 160, y: 92 }],
  [{ x: 160, y: 132 }, { x: 160, y: 154 }],
  [{ x: 160, y: 194 }, { x: 160, y: 216 }],
  [{ x: 160, y: 256 }, { x: 160, y: 278 }],
  [{ x: 160, y: 318 }, { x: 160, y: 340 }],
  [{ x: 160, y: 380 }, { x: 160, y: 402 }],
];

const LeadFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 450 365" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 320 475" nodes={mobileNodes} segments={mobileSegments} travelDuration={6000} />
    </div>
  </div>
);

export default LeadFlowDiagram;
