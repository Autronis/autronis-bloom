import { FlowDiagramSvg, type DiagramNode, type Point } from "./FlowDiagramEngine";

const CW = 112, CH = 34;

const desktopNodes: DiagramNode[] = [
  { title: "Klantvragen", desc: "Chat, e-mail & formulieren", icon: "messageCircle", x: 86, y: 60, w: CW, h: CH, step: 1 },
  { title: "Analyse", desc: "AI begrijpt de vraag", icon: "brain", x: 225, y: 60, w: CW, h: CH, step: 2 },
  { title: "Context", desc: "Order- & klantgegevens", icon: "database", x: 364, y: 60, w: CW, h: CH, step: 3 },
  { title: "AI antwoord", desc: "Passend antwoord", icon: "bot", x: 225, y: 138, w: CW, h: CH, step: 4 },
  { title: "Reactie", desc: "Chat of e-mail verzending", icon: "reply", x: 225, y: 196, w: CW, h: CH, step: 5 },
  { title: "CRM sync", desc: "Interactie opslaan", icon: "userCheck", x: 225, y: 254, w: CW, h: CH, step: 6 },
  { title: "Escalatie", desc: "Complexe vragen → agent", icon: "alertTriangle", x: 225, y: 312, w: CW, h: CH, step: 7 },
];

const desktopSegments: Point[][] = [
  [{ x: 114, y: 60 }, { x: 189, y: 60 }],
  [{ x: 261, y: 60 }, { x: 308, y: 60 }],
  [{ x: 364, y: 77 }, { x: 364, y: 103 }, { x: 225, y: 103 }, { x: 225, y: 121 }],
  [{ x: 225, y: 155 }, { x: 225, y: 179 }],
  [{ x: 225, y: 213 }, { x: 225, y: 237 }],
  [{ x: 225, y: 271 }, { x: 225, y: 295 }],
];

const MW = 215, MH = 42;

const mobileNodes: DiagramNode[] = [
  { title: "Klantvragen", desc: "Chat, e-mail & formulieren", icon: "messageCircle", x: 165, y: 52, w: MW, h: MH, step: 1 },
  { title: "Analyse", desc: "AI begrijpt de vraag", icon: "brain", x: 165, y: 118, w: MW, h: MH, step: 2 },
  { title: "Context", desc: "Order- & klantgegevens", icon: "database", x: 165, y: 184, w: MW, h: MH, step: 3 },
  { title: "AI antwoord", desc: "Passend antwoord", icon: "bot", x: 165, y: 250, w: MW, h: MH, step: 4 },
  { title: "Reactie", desc: "Chat of e-mail verzending", icon: "reply", x: 165, y: 316, w: MW, h: MH, step: 5 },
  { title: "CRM sync", desc: "Interactie opslaan", icon: "userCheck", x: 165, y: 382, w: MW, h: MH, step: 6 },
  { title: "Escalatie", desc: "Complexe vragen → agent", icon: "alertTriangle", x: 165, y: 448, w: MW, h: MH, step: 7 },
];

const mobileSegments: Point[][] = [
  [{ x: 165, y: 73 }, { x: 165, y: 97 }],
  [{ x: 165, y: 139 }, { x: 165, y: 163 }],
  [{ x: 165, y: 205 }, { x: 165, y: 229 }],
  [{ x: 165, y: 271 }, { x: 165, y: 295 }],
  [{ x: 165, y: 337 }, { x: 165, y: 361 }],
  [{ x: 165, y: 403 }, { x: 165, y: 427 }],
];

const SupportFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 450 365" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 335 500" nodes={mobileNodes} segments={mobileSegments} travelDuration={8000} />
    </div>
  </div>
);

export default SupportFlowDiagram;
