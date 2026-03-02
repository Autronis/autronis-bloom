import { motion } from "framer-motion";

const GRID_SPACING = 50;

interface GridDot {
  axis: "x" | "y" | "diagonal";
  lineIndex: number;
  duration: number;
  delay: number;
  reverse?: boolean;
  endLineIndex?: number;
}

const defaultDots: GridDot[] = [
  // Horizontal
  { axis: "x", lineIndex: 2, duration: 14, delay: 0 },
  { axis: "x", lineIndex: 4, duration: 18, delay: 2, reverse: true },
  { axis: "x", lineIndex: 6, duration: 16, delay: 5 },
  { axis: "x", lineIndex: 8, duration: 20, delay: 1, reverse: true },
  { axis: "x", lineIndex: 10, duration: 15, delay: 7 },
  { axis: "x", lineIndex: 12, duration: 22, delay: 3, reverse: true },
  { axis: "x", lineIndex: 3, duration: 19, delay: 9 },
  // Vertical
  { axis: "y", lineIndex: 3, duration: 18, delay: 1 },
  { axis: "y", lineIndex: 6, duration: 15, delay: 4, reverse: true },
  { axis: "y", lineIndex: 9, duration: 20, delay: 2 },
  { axis: "y", lineIndex: 12, duration: 17, delay: 6, reverse: true },
  { axis: "y", lineIndex: 15, duration: 19, delay: 0 },
  { axis: "y", lineIndex: 2, duration: 21, delay: 8, reverse: true },
  { axis: "y", lineIndex: 18, duration: 16, delay: 3 },
  // Diagonal
  { axis: "diagonal", lineIndex: 1, endLineIndex: 7, duration: 12, delay: 0 },
  { axis: "diagonal", lineIndex: 8, endLineIndex: 2, duration: 14, delay: 3, reverse: true },
  { axis: "diagonal", lineIndex: 4, endLineIndex: 10, duration: 16, delay: 6 },
  { axis: "diagonal", lineIndex: 12, endLineIndex: 5, duration: 13, delay: 9, reverse: true },
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
              width: 3.5,
              height: 3.5,
              borderRadius: "50%",
              background: "hsl(174 78% 45% / 0.25)",
              boxShadow: "0 0 5px hsl(174 78% 45% / 0.15), 0 0 10px hsl(174 78% 45% / 0.06)",
              left: 0,
              top: 0,
            }}
            animate={{
              x: [startX, endX],
              y: [startY, endY],
              opacity: [0, 0.45, 0.45, 0],
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
            width: 3.5,
            height: 3.5,
            borderRadius: "50%",
            background: "hsl(174 78% 45% / 0.25)",
            boxShadow: "0 0 5px hsl(174 78% 45% / 0.15), 0 0 10px hsl(174 78% 45% / 0.06)",
            ...(dot.axis === "x"
              ? { top: pos, left: 0 }
              : { left: pos, top: 0 }),
          }}
          animate={
            dot.axis === "x"
              ? { x: dot.reverse ? ["100vw", "-10px"] : ["-10px", "100vw"], opacity: [0, 0.45, 0.45, 0] }
              : { y: dot.reverse ? ["100%", "-10px"] : ["-10px", "100%"], opacity: [0, 0.45, 0.45, 0] }
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
