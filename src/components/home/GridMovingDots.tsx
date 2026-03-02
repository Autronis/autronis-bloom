import { motion } from "framer-motion";

const GRID_SPACING = 50;

interface GridDot {
  axis: "x" | "y" | "diagonal";
  lineIndex: number;
  duration: number;
  delay: number;
  reverse?: boolean;
  endLineIndex?: number; // for diagonal: which perpendicular line to end on
}

const defaultDots: GridDot[] = [
  { axis: "x", lineIndex: 3, duration: 16, delay: 0 },
  { axis: "x", lineIndex: 7, duration: 20, delay: 2, reverse: true },
  { axis: "x", lineIndex: 10, duration: 18, delay: 5 },
  { axis: "x", lineIndex: 5, duration: 22, delay: 8, reverse: true },
  { axis: "y", lineIndex: 4, duration: 20, delay: 1 },
  { axis: "y", lineIndex: 9, duration: 17, delay: 4, reverse: true },
  { axis: "y", lineIndex: 14, duration: 19, delay: 3 },
  { axis: "y", lineIndex: 2, duration: 21, delay: 6, reverse: true },
  { axis: "diagonal", lineIndex: 2, endLineIndex: 8, duration: 14, delay: 0 },
  { axis: "diagonal", lineIndex: 10, endLineIndex: 3, duration: 16, delay: 4, reverse: true },
  { axis: "diagonal", lineIndex: 6, endLineIndex: 12, duration: 18, delay: 7 },
];

const GridMovingDots = ({ dots = defaultDots }: { dots?: GridDot[] }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {dots.map((dot, i) => {
      const pos = dot.lineIndex * GRID_SPACING;

      if (dot.axis === "diagonal") {
        const startX = dot.reverse ? "100%" : "0%";
        const endX = dot.reverse ? "0%" : "100%";
        const startY = pos;
        const endY = (dot.endLineIndex || dot.lineIndex) * GRID_SPACING;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "hsl(174 78% 45% / 0.3)",
              boxShadow: "0 0 6px hsl(174 78% 45% / 0.2), 0 0 12px hsl(174 78% 45% / 0.08)",
              left: 0,
              top: 0,
            }}
            animate={{
              x: [startX, endX],
              y: [startY, endY],
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      }

      return (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "hsl(174 78% 45% / 0.3)",
            boxShadow: "0 0 6px hsl(174 78% 45% / 0.2), 0 0 12px hsl(174 78% 45% / 0.08)",
            ...(dot.axis === "x"
              ? { top: pos, left: 0 }
              : { left: pos, top: 0 }),
          }}
          animate={
            dot.axis === "x"
              ? { x: dot.reverse ? ["100vw", "-10px"] : ["-10px", "100vw"], opacity: [0, 0.5, 0.5, 0] }
              : { y: dot.reverse ? ["100%", "-10px"] : ["-10px", "100%"], opacity: [0, 0.5, 0.5, 0] }
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
