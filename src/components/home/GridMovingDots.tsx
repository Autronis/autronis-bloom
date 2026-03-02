import { motion } from "framer-motion";

const GRID_SPACING = 50;
const HORIZONTAL_LINE_COUNT = 14;
const VERTICAL_LINE_COUNT = 24;

interface GridDot {
  axis: "x" | "y";
  lineIndex: number;
  duration: number;
  delay: number;
  reverse?: boolean;
}

const buildDenseLineDots = (): GridDot[] => {
  const horizontalDots: GridDot[] = Array.from(
    { length: HORIZONTAL_LINE_COUNT },
    (_, i): GridDot[] => [
      {
        axis: "x",
        lineIndex: i + 1,
        duration: 10 + (i % 4) * 1.4,
        delay: (i * 0.55) % 4.5,
        reverse: i % 2 === 0,
      },
      {
        axis: "x",
        lineIndex: i + 1,
        duration: 12 + (i % 3) * 1.6,
        delay: ((i * 0.55) + 1.8) % 6,
        reverse: i % 2 !== 0,
      },
    ]
  ).flat();

  const verticalDots: GridDot[] = Array.from(
    { length: VERTICAL_LINE_COUNT },
    (_, i): GridDot[] => [
      {
        axis: "y",
        lineIndex: i + 1,
        duration: 9 + (i % 5) * 1.3,
        delay: (i * 0.45) % 4,
        reverse: i % 2 !== 0,
      },
      {
        axis: "y",
        lineIndex: i + 1,
        duration: 11 + (i % 4) * 1.5,
        delay: ((i * 0.45) + 1.2) % 5.8,
        reverse: i % 2 === 0,
      },
    ]
  ).flat();

  return [...horizontalDots, ...verticalDots];
};

const defaultDots: GridDot[] = [];

const GridMovingDots = ({ dots = defaultDots }: { dots?: GridDot[] }) => {
  const allDots = [...buildDenseLineDots(), ...dots];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {allDots.map((dot, i) => {
        const pos = dot.lineIndex * GRID_SPACING;

        return (
          <motion.div
            key={`line-${dot.axis}-${dot.lineIndex}-${i}`}
            className="absolute"
            style={{
              width: 3,
              height: 3,
              borderRadius: "9999px",
              background: "hsl(var(--primary) / 0.4)",
              boxShadow: "0 0 4px hsl(var(--primary) / 0.25), 0 0 12px hsl(var(--primary) / 0.12)",
              willChange: "transform, opacity",
              ...(dot.axis === "x" ? { top: pos, left: 0 } : { left: pos, top: 0 }),
            }}
            animate={
              dot.axis === "x"
                ? {
                    x: dot.reverse ? ["calc(100% + 8px)", "-8px"] : ["-8px", "calc(100% + 8px)"],
                    opacity: [0, 0.35, 0.35, 0.9, 0.35, 0],
                    scale: [0.8, 1, 1, 1.9, 1, 0.8],
                  }
                : {
                    y: dot.reverse ? ["calc(100% + 8px)", "-8px"] : ["-8px", "calc(100% + 8px)"],
                    opacity: [0, 0.35, 0.35, 0.9, 0.35, 0],
                    scale: [0.8, 1, 1, 1.9, 1, 0.8],
                  }
            }
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.2, 0.48, 0.7, 0.86, 1],
            }}
          />
        );
      })}
    </div>
  );
};

export default GridMovingDots;
export type { GridDot };
