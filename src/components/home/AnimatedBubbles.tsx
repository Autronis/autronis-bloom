import { motion } from "framer-motion";

const defaultBubbles = [
  { x: "8%", y: "20%", size: 220, opacity: 0.1, delay: 0 },
  { x: "72%", y: "15%", size: 280, opacity: 0.09, delay: 1.2 },
  { x: "35%", y: "65%", size: 200, opacity: 0.11, delay: 0.5 },
  { x: "85%", y: "55%", size: 260, opacity: 0.08, delay: 1.8 },
  { x: "22%", y: "80%", size: 180, opacity: 0.1, delay: 2.2 },
  { x: "55%", y: "35%", size: 240, opacity: 0.09, delay: 0.9 },
];

const AnimatedBubbles = ({ bubbles = defaultBubbles }: { bubbles?: typeof defaultBubbles }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {bubbles.map((b, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [b.opacity, b.opacity * 1.8, b.opacity],
        }}
        transition={{
          duration: 4 + i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: b.delay,
        }}
        style={{
          left: b.x,
          top: b.y,
          width: b.size,
          height: b.size,
          background: `radial-gradient(circle, hsl(174 78% 35% / calc(${b.opacity} * var(--bubble-boost, 1))), transparent 70%)`,
          filter: "blur(50px)",
          transform: "translate(-50%, -50%)",
        }}
      />
    ))}
  </div>
);

export default AnimatedBubbles;
