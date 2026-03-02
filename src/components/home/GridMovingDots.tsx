import { motion } from "framer-motion";

const GRID_SPACING = 50;

interface GridDot {
  axis: "x" | "y";
  lineIndex: number; // which grid line (0, 1, 2...) → position = lineIndex * 50px
  duration: number;
  delay: number;
  reverse?: boolean;
}

const defaultDots: GridDot[] = [
  { axis: "x", lineIndex: 3, duration: 18, delay: 0 },
  { axis: "x", lineIndex: 7, duration: 22, delay: 3, reverse: true },
  { axis: "x", lineIndex: 10, duration: 20, delay: 7 },
  { axis: "y", lineIndex: 4, duration: 24, delay: 1 },
  { axis: "y", lineIndex: 9, duration: 19, delay: 5, reverse: true },
  { axis: "y", lineIndex: 14, duration: 21, delay: 2 },
];

const GridMovingDots = ({ dots = defaultDots }: { dots?: GridDot[] }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {dots.map((dot, i) => {
      const pos = dot.lineIndex * GRID_SPACING;
      return (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "hsl(174 78% 45% / 0.35)",
            boxShadow: "0 0 6px hsl(174 78% 45% / 0.25), 0 0 14px hsl(174 78% 45% / 0.1)",
            ...(dot.axis === "x"
              ? { top: pos, left: 0 }
              : { left: pos, top: 0 }),
          }}
          animate={
            dot.axis === "x"
              ? { x: dot.reverse ? ["100vw", "-10px"] : ["-10px", "100vw"], opacity: [0, 0.6, 0.6, 0] }
              : { y: dot.reverse ? ["100%", "-10px"] : ["-10px", "100%"], opacity: [0, 0.6, 0.6, 0] }
          }
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      );
    })}
  </div>
);

export default GridMovingDots;
export type { GridDot };
