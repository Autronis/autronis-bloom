import { motion } from "framer-motion";

const GRID_SPACING = 50;
const HORIZONTAL_LINE_COUNT = 14;
const VERTICAL_LINE_COUNT = 24;

interface GridDot {
  axis: "x" | "y" | "diagonal";
  lineIndex: number;
  duration: number;
  delay: number;
  reverse?: boolean;
  endLineIndex?: number;
}

const defaultDots: GridDot[] = [
  // Extra horizontale bewegers
  { axis: "x", lineIndex: 2, duration: 14, delay: 0 },
  { axis: "x", lineIndex: 4, duration: 18, delay: 2, reverse: true },
  { axis: "x", lineIndex: 6, duration: 16, delay: 5 },
  { axis: "x", lineIndex: 8, duration: 20, delay: 1, reverse: true },
  { axis: "x", lineIndex: 10, duration: 15, delay: 7 },
  { axis: "x", lineIndex: 12, duration: 22, delay: 3, reverse: true },
  { axis: "x", lineIndex: 3, duration: 19, delay: 9 },
  // Extra verticale bewegers
  { axis: "y", lineIndex: 3, duration: 18, delay: 1 },
  { axis: "y", lineIndex: 6, duration: 15, delay: 4, reverse: true },
  { axis: "y", lineIndex: 9, duration: 20, delay: 2 },
  { axis: "y", lineIndex: 12, duration: 17, delay: 6, reverse: true },
  { axis: "y", lineIndex: 15, duration: 19, delay: 0 },
  { axis: "y", lineIndex: 2, duration: 21, delay: 8, reverse: true },
  { axis: "y", lineIndex: 18, duration: 16, delay: 3 },
  // Diagonale accenten
  { axis: "diagonal", lineIndex: 1, endLineIndex: 7, duration: 12, delay: 0 },
  { axis: "diagonal", lineIndex: 8, endLineIndex: 2, duration: 14, delay: 3, reverse: true },
  { axis: "diagonal", lineIndex: 4, endLineIndex: 10, duration: 16, delay: 6 },
  { axis: "diagonal", lineIndex: 12, endLineIndex: 5, duration: 13, delay: 9, reverse: true },
];

const buildLineDots = (): GridDot[] => {
  const horizontalDots: GridDot[] = Array.from({ length: HORIZONTAL_LINE_COUNT }, (_, i) => ({
    axis: "x",
    lineIndex: i + 1,
    duration: 18 + (i % 4) * 2,
    delay: (i * 0.9) % 7,
    reverse: i % 2 === 0,
  }));

  const verticalDots: GridDot[] = Array.from({ length: VERTICAL_LINE_COUNT }, (_, i) => ({
    axis: "y",
    lineIndex: i + 1,
    duration: 16 + (i % 5) * 2,
    delay: (i * 0.7) % 6,
    reverse: i % 2 !== 0,
  }));

  return [...horizontalDots, ...verticalDots];
};

const GridMovingDots = ({ dots = defaultDots }: { dots?: GridDot[] }) => {
  const allDots = [...buildLineDots(), ...dots];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {allDots.map((dot, i) => {
        const pos = dot.lineIndex * GRID_SPACING;

        if (dot.axis === "diagonal") {
          const startX = dot.reverse ? "calc(100% + 12px)" : "-12px";
          const endX = dot.reverse ? "-12px" : "calc(100% + 12px)";
          const startY = pos;
          const endY = (dot.endLineIndex || dot.lineIndex) * GRID_SPACING;

          return (
            <motion.div
              key={`diag-${i}`}
              className="absolute"
              style={{
                width: 3.5,
                height: 3.5,
                borderRadius: "50%",
                background: "hsl(var(--primary) / 0.35)",
                boxShadow: "0 0 5px hsl(var(--primary) / 0.2), 0 0 12px hsl(var(--primary) / 0.08)",
                left: 0,
                top: 0,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                x: [startX, endX],
                y: [startY, endY],
                opacity: [0, 0.35, 0.35, 0.85, 0.4, 0],
                scale: [0.8, 1, 1, 1.7, 1, 0.8],
              }}
              transition={{
                duration: dot.duration,
                delay: dot.delay,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.2, 0.5, 0.72, 0.86, 1],
              }}
            />
          );
        }

        return (
          <motion.div
            key={`line-${i}`}
            className="absolute"
            style={{
              width: 3.5,
              height: 3.5,
              borderRadius: "50%",
              background: "hsl(var(--primary) / 0.35)",
              boxShadow: "0 0 5px hsl(var(--primary) / 0.2), 0 0 12px hsl(var(--primary) / 0.08)",
              ...(dot.axis === "x"
                ? { top: pos, left: 0 }
                : { left: pos, top: 0 }),
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              dot.axis === "x"
                ? {
                    x: dot.reverse ? ["calc(100% + 12px)", "-12px"] : ["-12px", "calc(100% + 12px)"],
                    opacity: [0, 0.35, 0.35, 0.85, 0.4, 0],
                    scale: [0.8, 1, 1, 1.7, 1, 0.8],
                  }
                : {
                    y: dot.reverse ? ["calc(100% + 12px)", "-12px"] : ["-12px", "calc(100% + 12px)"],
                    opacity: [0, 0.35, 0.35, 0.85, 0.4, 0],
                    scale: [0.8, 1, 1, 1.7, 1, 0.8],
                  }
            }
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.2, 0.5, 0.72, 0.86, 1],
            }}
          />
        );
      })}
    </div>
  );
};

export default GridMovingDots;
export type { GridDot };
