import { motion } from "framer-motion";

const GRID_SPACING = 50;

interface GridDot {
  axis: "x" | "y";
  lineIndex: number;
  duration: number;
  delay: number;
  reverse?: boolean;
}

const buildLineDots = (): GridDot[] => {
  // Only horizontal dots moving left-to-right across the full width
  // Spread across different grid lines, fewer and faster
  const dots: GridDot[] = [];
  const lines = [3, 5, 7, 9, 11, 13];

  for (const line of lines) {
    dots.push({
      axis: "x",
      lineIndex: line,
      duration: 6 + (line % 3) * 1.2,
      delay: (line * 0.7) % 4,
      reverse: false,
    });
  }

  return dots;
};

const defaultDots: GridDot[] = [];

const GridMovingDots = ({ dots = defaultDots }: { dots?: GridDot[] }) => {
  const allDots = [...buildLineDots(), ...dots];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {allDots.map((dot, i) => {
        const pos = dot.lineIndex * GRID_SPACING;

        return (
          <motion.div
            key={`dot-${dot.lineIndex}-${i}`}
            className="absolute"
            style={{
              width: 3,
              height: 3,
              borderRadius: "9999px",
              background: "hsl(var(--primary) / 0.45)",
              boxShadow: "0 0 4px hsl(var(--primary) / 0.3), 0 0 10px hsl(var(--primary) / 0.12)",
              willChange: "transform, opacity",
              top: pos,
              left: 0,
            }}
            animate={{
              x: ["-4px", "calc(100% + 4px)"],
              opacity: [0, 0.5, 0.5, 0.95, 0.5, 0],
              scale: [0.8, 1, 1, 1.8, 1, 0.8],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.15, 0.45, 0.65, 0.85, 1],
            }}
          />
        );
      })}
    </div>
  );
};

export default GridMovingDots;
export type { GridDot };
