import { motion } from "framer-motion";

interface GridDot {
  axis: "x" | "y";
  pos: string; // position on the perpendicular axis (e.g. "150px" or "30%")
  duration: number;
  delay: number;
  reverse?: boolean;
}

const defaultDots: GridDot[] = [
  { axis: "x", pos: "150px", duration: 18, delay: 0 },
  { axis: "x", pos: "350px", duration: 22, delay: 3, reverse: true },
  { axis: "x", pos: "500px", duration: 20, delay: 7 },
  { axis: "y", pos: "200px", duration: 24, delay: 1 },
  { axis: "y", pos: "450px", duration: 19, delay: 5, reverse: true },
  { axis: "y", pos: "700px", duration: 21, delay: 2 },
];

const GridMovingDots = ({ dots = defaultDots }: { dots?: GridDot[] }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {dots.map((dot, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "hsl(174 78% 50%)",
          boxShadow: "0 0 8px hsl(174 78% 45% / 0.6), 0 0 20px hsl(174 78% 45% / 0.2)",
          ...(dot.axis === "x"
            ? { top: dot.pos, left: 0 }
            : { left: dot.pos, top: 0 }),
        }}
        animate={
          dot.axis === "x"
            ? { x: dot.reverse ? ["100vw", "-20px"] : ["-20px", "100vw"], opacity: [0, 0.5, 0.5, 0] }
            : { y: dot.reverse ? ["100%", "-20px"] : ["-20px", "100%"], opacity: [0, 0.5, 0.5, 0] }
        }
        transition={{
          duration: dot.duration,
          delay: dot.delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

export default GridMovingDots;
