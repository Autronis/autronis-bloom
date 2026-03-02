import { motion } from "framer-motion";

interface BubbleConfig {
  x: string;
  y: string;
  size: number;
  opacity: number;
  delay: number;
  skewX?: number;
  skewY?: number;
  borderRadius?: string;
}

const defaultBubbles: BubbleConfig[] = [
  { x: "8%", y: "20%", size: 260, opacity: 0.12, delay: 0, skewX: 8, borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" },
  { x: "72%", y: "15%", size: 320, opacity: 0.11, delay: 1.2, skewY: -6, borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%" },
  { x: "35%", y: "65%", size: 240, opacity: 0.13, delay: 0.5, skewX: -5, borderRadius: "50% 50% 45% 55% / 60% 40% 55% 45%" },
  { x: "85%", y: "55%", size: 300, opacity: 0.1, delay: 1.8, skewY: 7, borderRadius: "55% 45% 50% 50% / 40% 60% 45% 55%" },
  { x: "22%", y: "80%", size: 220, opacity: 0.12, delay: 2.2, skewX: 10, borderRadius: "40% 60% 50% 50% / 55% 45% 50% 50%" },
  { x: "55%", y: "35%", size: 280, opacity: 0.11, delay: 0.9, skewY: -4, borderRadius: "50% 50% 60% 40% / 45% 55% 50% 50%" },
  { x: "15%", y: "45%", size: 200, opacity: 0.1, delay: 1.5, skewX: -8, borderRadius: "45% 55% 50% 50% / 50% 50% 55% 45%" },
  { x: "65%", y: "80%", size: 250, opacity: 0.12, delay: 2.8, skewY: 5, borderRadius: "55% 45% 45% 55% / 50% 50% 40% 60%" },
  { x: "92%", y: "25%", size: 200, opacity: 0.1, delay: 0.3, skewX: 6, borderRadius: "60% 40% 45% 55% / 45% 55% 50% 50%" },
  { x: "45%", y: "10%", size: 230, opacity: 0.11, delay: 3.1, skewY: -8, borderRadius: "40% 60% 55% 45% / 60% 40% 45% 55%" },
];

const AnimatedBubbles = ({ bubbles = defaultBubbles }: { bubbles?: BubbleConfig[] }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {bubbles.map((b, i) => (
      <motion.div
        key={i}
        className="absolute"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [b.opacity, b.opacity * 1.8, b.opacity],
          rotate: [0, (i % 2 === 0 ? 8 : -8), 0],
        }}
        transition={{
          duration: 5 + i * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: b.delay,
        }}
        style={{
          left: b.x,
          top: b.y,
          width: b.size,
          height: b.size,
          borderRadius: b.borderRadius || "50%",
          background: `radial-gradient(ellipse at 40% 40%, hsl(174 78% 35% / calc(${b.opacity} * var(--bubble-boost, 1))), transparent 70%)`,
          filter: "blur(45px)",
          transform: `translate(-50%, -50%) skewX(${b.skewX || 0}deg) skewY(${b.skewY || 0}deg)`,
        }}
      />
    ))}
  </div>
);

export default AnimatedBubbles;
export type { BubbleConfig };
