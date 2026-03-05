import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";

const CW = 112, CH = 35;

const desktopNodes: DiagramNode[] = [
  { title: "Klantvragen", desc: "Chat, e-mail & formulieren", icon: "messageCircle", x: 86, y: 60, w: CW, h: CH },
  { title: "Analyse", desc: "AI begrijpt de vraag", icon: "brain", x: 225, y: 60, w: CW, h: CH },
  { title: "Context", desc: "Order- & klantgegevens", icon: "database", x: 364, y: 60, w: CW, h: CH },
  { title: "AI antwoord", desc: "Passend antwoord", icon: "bot", x: 225, y: 140, w: CW, h: CH },
  { title: "Reactie", desc: "Chat of e-mail verzending", icon: "reply", x: 225, y: 200, w: CW, h: CH },
  { title: "CRM sync", desc: "Interactie opslaan", icon: "userCheck", x: 225, y: 260, w: CW, h: CH },
  { title: "Escalatie", desc: "Complexe vragen → agent", icon: "alertTriangle", x: 225, y: 320, w: CW, h: CH },
];

const desktopSegments: Point[][] = [
  [{ x: 114, y: 60 }, { x: 169, y: 60 }],
  [{ x: 281, y: 60 }, { x: 308, y: 60 }],
  [{ x: 364, y: 78 }, { x: 364, y: 105 }, { x: 225, y: 105 }, { x: 225, y: 122 }],
  [{ x: 225, y: 158 }, { x: 225, y: 182 }],
  [{ x: 225, y: 218 }, { x: 225, y: 242 }],
  [{ x: 225, y: 278 }, { x: 225, y: 302 }],
];

const MW = 175, MH = 35;

const mobileNodes: DiagramNode[] = [
  { title: "Klantvragen", desc: "Chat, e-mail & formulieren", icon: "messageCircle", x: 140, y: 42, w: MW, h: MH },
  { title: "Analyse", desc: "AI begrijpt de vraag", icon: "brain", x: 140, y: 96, w: MW, h: MH },
  { title: "Context", desc: "Order- & klantgegevens", icon: "database", x: 140, y: 150, w: MW, h: MH },
  { title: "AI antwoord", desc: "Passend antwoord", icon: "bot", x: 140, y: 204, w: MW, h: MH },
  { title: "Reactie", desc: "Chat of e-mail verzending", icon: "reply", x: 140, y: 258, w: MW, h: MH },
  { title: "CRM sync", desc: "Interactie opslaan", icon: "userCheck", x: 140, y: 312, w: MW, h: MH },
  { title: "Escalatie", desc: "Complexe vragen → agent", icon: "alertTriangle", x: 140, y: 366, w: MW, h: MH },
];

const mobileSegments: Point[][] = [
  [{ x: 140, y: 60 }, { x: 140, y: 78 }],
  [{ x: 140, y: 114 }, { x: 140, y: 132 }],
  [{ x: 140, y: 168 }, { x: 140, y: 186 }],
  [{ x: 140, y: 222 }, { x: 140, y: 240 }],
  [{ x: 140, y: 276 }, { x: 140, y: 294 }],
  [{ x: 140, y: 330 }, { x: 140, y: 348 }],
];

const SupportFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 450 360" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 280 400" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default SupportFlowDiagram;
