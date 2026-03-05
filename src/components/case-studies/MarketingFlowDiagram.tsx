import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";

const CW = 112, CH = 35;

const desktopNodes: DiagramNode[] = [
  { title: "Databronnen", desc: "Google, Meta & Analytics", icon: "barChart", x: 86, y: 60, w: CW, h: CH },
  { title: "Verzameling", desc: "Automatisch via API's", icon: "database", x: 225, y: 60, w: CW, h: CH },
  { title: "Verwerking", desc: "Combineren & structureren", icon: "pieChart", x: 364, y: 60, w: CW, h: CH },
  { title: "Analyse", desc: "AI marketinganalyse", icon: "trendingUp", x: 225, y: 140, w: CW, h: CH },
  { title: "Dashboard", desc: "Realtime dashboards", icon: "dashboard", x: 225, y: 200, w: CW, h: CH },
  { title: "Rapportage", desc: "Automatische rapportages", icon: "fileText", x: 225, y: 260, w: CW, h: CH },
  { title: "Inzichten", desc: "Campagne aanbevelingen", icon: "lightbulb", x: 225, y: 320, w: CW, h: CH },
];

const desktopSegments: Point[][] = [
  [{ x: 142, y: 60 }, { x: 169, y: 60 }],
  [{ x: 281, y: 60 }, { x: 308, y: 60 }],
  [{ x: 364, y: 78 }, { x: 364, y: 105 }, { x: 225, y: 105 }, { x: 225, y: 122 }],
  [{ x: 225, y: 158 }, { x: 225, y: 182 }],
  [{ x: 225, y: 218 }, { x: 225, y: 242 }],
  [{ x: 225, y: 278 }, { x: 225, y: 302 }],
];

const MW = 175, MH = 35;

const mobileNodes: DiagramNode[] = [
  { title: "Databronnen", desc: "Google, Meta & Analytics", icon: "barChart", x: 140, y: 42, w: MW, h: MH },
  { title: "Verzameling", desc: "Automatisch via API's", icon: "database", x: 140, y: 96, w: MW, h: MH },
  { title: "Verwerking", desc: "Combineren & structureren", icon: "pieChart", x: 140, y: 150, w: MW, h: MH },
  { title: "Analyse", desc: "AI marketinganalyse", icon: "trendingUp", x: 140, y: 204, w: MW, h: MH },
  { title: "Dashboard", desc: "Realtime dashboards", icon: "dashboard", x: 140, y: 258, w: MW, h: MH },
  { title: "Rapportage", desc: "Automatische rapportages", icon: "fileText", x: 140, y: 312, w: MW, h: MH },
  { title: "Inzichten", desc: "Campagne aanbevelingen", icon: "lightbulb", x: 140, y: 366, w: MW, h: MH },
];

const mobileSegments: Point[][] = [
  [{ x: 140, y: 60 }, { x: 140, y: 78 }],
  [{ x: 140, y: 114 }, { x: 140, y: 132 }],
  [{ x: 140, y: 168 }, { x: 140, y: 186 }],
  [{ x: 140, y: 222 }, { x: 140, y: 240 }],
  [{ x: 140, y: 276 }, { x: 140, y: 294 }],
  [{ x: 140, y: 330 }, { x: 140, y: 348 }],
];

const MarketingFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 450 360" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 280 400" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default MarketingFlowDiagram;
