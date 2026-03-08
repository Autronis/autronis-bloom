import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";
import { useLanguage } from "@/i18n/context";

const CW = 112, CH = 34;

const nodeText = {
  en: [
    { title: "Data sources", desc: "Google, Meta & Analytics" },
    { title: "Collection", desc: "Automatic via APIs" },
    { title: "Processing", desc: "Combine & structure" },
    { title: "Analysis", desc: "AI marketing analysis" },
    { title: "Dashboard", desc: "Real-time dashboards" },
    { title: "Reporting", desc: "Automatic reports" },
    { title: "Insights", desc: "Campaign recommendations" },
  ],
  nl: [
    { title: "Databronnen", desc: "Google, Meta & Analytics" },
    { title: "Verzameling", desc: "Automatisch via API's" },
    { title: "Verwerking", desc: "Combineren & structureren" },
    { title: "Analyse", desc: "AI marketinganalyse" },
    { title: "Dashboard", desc: "Realtime dashboards" },
    { title: "Rapportage", desc: "Automatische rapportages" },
    { title: "Inzichten", desc: "Campagne aanbevelingen" },
  ],
};

const icons = ["barChart", "database", "pieChart", "trendingUp", "dashboard", "fileText", "lightbulb"];

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

const MarketingFlowDiagram = () => {
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

export default MarketingFlowDiagram;
