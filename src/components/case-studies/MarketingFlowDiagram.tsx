import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";

const CW = 112, CH = 34;

const desktopNodes: DiagramNode[] = [
  { title: "Databronnen", desc: "Google, Meta & Analytics", icon: "barChart", x: 86, y: 60, w: CW, h: CH, step: 1 },
  { title: "Verzameling", desc: "Automatisch via API's", icon: "database", x: 225, y: 60, w: CW, h: CH, step: 2 },
  { title: "Verwerking", desc: "Combineren & structureren", icon: "pieChart", x: 364, y: 60, w: CW, h: CH, step: 3 },
  { title: "Analyse", desc: "AI marketinganalyse", icon: "trendingUp", x: 225, y: 138, w: CW, h: CH, step: 4 },
  { title: "Dashboard", desc: "Realtime dashboards", icon: "dashboard", x: 225, y: 196, w: CW, h: CH, step: 5 },
  { title: "Rapportage", desc: "Automatische rapportages", icon: "fileText", x: 225, y: 254, w: CW, h: CH, step: 6 },
  { title: "Inzichten", desc: "Campagne aanbevelingen", icon: "lightbulb", x: 225, y: 312, w: CW, h: CH, step: 7 },
];

const desktopSegments: Point[][] = [
  [{ x: 114, y: 60 }, { x: 189, y: 60 }],
  [{ x: 261, y: 60 }, { x: 308, y: 60 }],
  [{ x: 364, y: 77 }, { x: 364, y: 103 }, { x: 225, y: 103 }, { x: 225, y: 121 }],
  [{ x: 225, y: 155 }, { x: 225, y: 179 }],
  [{ x: 225, y: 213 }, { x: 225, y: 237 }],
  [{ x: 225, y: 271 }, { x: 225, y: 295 }],
];

const MW = 175, MH = 34;

const mobileNodes: DiagramNode[] = [
  { title: "Databronnen", desc: "Google, Meta & Analytics", icon: "barChart", x: 140, y: 42, w: MW, h: MH, step: 1 },
  { title: "Verzameling", desc: "Automatisch via API's", icon: "database", x: 140, y: 94, w: MW, h: MH, step: 2 },
  { title: "Verwerking", desc: "Combineren & structureren", icon: "pieChart", x: 140, y: 146, w: MW, h: MH, step: 3 },
  { title: "Analyse", desc: "AI marketinganalyse", icon: "trendingUp", x: 140, y: 198, w: MW, h: MH, step: 4 },
  { title: "Dashboard", desc: "Realtime dashboards", icon: "dashboard", x: 140, y: 250, w: MW, h: MH, step: 5 },
  { title: "Rapportage", desc: "Automatische rapportages", icon: "fileText", x: 140, y: 302, w: MW, h: MH, step: 6 },
  { title: "Inzichten", desc: "Campagne aanbevelingen", icon: "lightbulb", x: 140, y: 354, w: MW, h: MH, step: 7 },
];

const mobileSegments: Point[][] = [
  [{ x: 140, y: 59 }, { x: 140, y: 83 }],
  [{ x: 140, y: 105 }, { x: 140, y: 129 }],
  [{ x: 140, y: 163 }, { x: 140, y: 181 }],
  [{ x: 140, y: 215 }, { x: 140, y: 233 }],
  [{ x: 140, y: 267 }, { x: 140, y: 285 }],
  [{ x: 140, y: 319 }, { x: 140, y: 337 }],
];

const MarketingFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 450 350" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 280 390" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default MarketingFlowDiagram;
