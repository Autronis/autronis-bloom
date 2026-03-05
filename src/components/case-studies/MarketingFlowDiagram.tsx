import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";

/* ═══ Marketing & Rapportage — Desktop layout ═══
   Top row: Databronnen → Data verzameling → Data verwerking
   Then vertical: Performance analyse → Dashboard generatie → Rapport automatisering → Optimalisatie inzichten
*/
const CW = 128, CH = 40;

const desktopNodes: DiagramNode[] = [
  { title: "Marketing databronnen", desc: "Google, Meta & Analytics", icon: "barChart", x: 86, y: 70, w: CW + 16, h: CH },
  { title: "Data verzameling", desc: "Automatisch via API's", icon: "database", x: 240, y: 70, w: CW + 4, h: CH },
  { title: "Data verwerking", desc: "Combineren & structureren", icon: "pieChart", x: 394, y: 70, w: CW, h: CH },
  { title: "Performance analyse", desc: "AI marketinganalyse", icon: "trendingUp", x: 240, y: 180, w: CW + 22, h: CH + 4 },
  { title: "Dashboard generatie", desc: "Realtime dashboards", icon: "dashboard", x: 240, y: 278, w: CW + 22, h: CH + 4 },
  { title: "Rapport automatisering", desc: "Automatische rapportages", icon: "fileText", x: 240, y: 376, w: CW + 28, h: CH + 4 },
  { title: "Optimalisatie inzichten", desc: "Campagne aanbevelingen", icon: "lightbulb", x: 240, y: 474, w: CW + 24, h: CH + 4 },
];

const desktopSegments: Point[][] = [
  [{ x: 152, y: 70 }, { x: 174, y: 70 }],
  [{ x: 306, y: 70 }, { x: 330, y: 70 }],
  [{ x: 394, y: 90 }, { x: 394, y: 130 }, { x: 240, y: 130 }, { x: 240, y: 158 }],
  [{ x: 240, y: 204 }, { x: 240, y: 256 }],
  [{ x: 240, y: 302 }, { x: 240, y: 354 }],
  [{ x: 240, y: 400 }, { x: 240, y: 452 }],
];

/* ═══ Mobile layout ═══ */
const MW = 198, MH = 40;

const mobileNodes: DiagramNode[] = [
  { title: "Marketing databronnen", desc: "Google, Meta & Analytics", icon: "barChart", x: 155, y: 48, w: MW + 12, h: MH },
  { title: "Data verzameling", desc: "Automatisch via API's", icon: "database", x: 155, y: 122, w: MW, h: MH },
  { title: "Data verwerking", desc: "Combineren & structureren", icon: "pieChart", x: 155, y: 196, w: MW, h: MH },
  { title: "Performance analyse", desc: "AI marketinganalyse", icon: "trendingUp", x: 155, y: 270, w: MW, h: MH },
  { title: "Dashboard generatie", desc: "Realtime dashboards", icon: "dashboard", x: 155, y: 348, w: MW, h: MH },
  { title: "Rapport automatisering", desc: "Automatische rapportages", icon: "fileText", x: 155, y: 426, w: MW + 8, h: MH },
  { title: "Optimalisatie inzichten", desc: "Campagne aanbevelingen", icon: "lightbulb", x: 155, y: 504, w: MW + 8, h: MH },
];

const mobileSegments: Point[][] = [
  [{ x: 155, y: 68 }, { x: 155, y: 102 }],
  [{ x: 155, y: 142 }, { x: 155, y: 176 }],
  [{ x: 155, y: 216 }, { x: 155, y: 250 }],
  [{ x: 155, y: 290 }, { x: 155, y: 328 }],
  [{ x: 155, y: 368 }, { x: 155, y: 406 }],
  [{ x: 155, y: 446 }, { x: 155, y: 484 }],
];

const MarketingFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 480 520" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 310 545" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default MarketingFlowDiagram;
