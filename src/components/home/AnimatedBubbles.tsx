import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  { x: "8%", y: "20%", size: 360, opacity: 0.08, delay: 0, skewX: 12, borderRadius: "62% 38% 52% 48% / 48% 58% 42% 52%" },
  { x: "72%", y: "12%", size: 420, opacity: 0.07, delay: 1.2, skewY: -10, borderRadius: "42% 58% 38% 62% / 56% 44% 62% 38%" },
  { x: "35%", y: "65%", size: 340, opacity: 0.09, delay: 0.5, skewX: -8, borderRadius: "53% 47% 42% 58% / 62% 38% 56% 44%" },
  { x: "88%", y: "52%", size: 400, opacity: 0.06, delay: 1.8, skewY: 12, borderRadius: "58% 42% 48% 52% / 38% 62% 44% 56%" },
  { x: "20%", y: "82%", size: 300, opacity: 0.08, delay: 2.2, skewX: 15, borderRadius: "38% 62% 52% 48% / 56% 44% 48% 52%" },
  { x: "55%", y: "35%", size: 380, opacity: 0.07, delay: 0.9, skewY: -7, borderRadius: "48% 52% 62% 38% / 44% 56% 52% 48%" },
  { x: "12%", y: "45%", size: 280, opacity: 0.06, delay: 1.5, skewX: -12, borderRadius: "44% 56% 48% 52% / 52% 48% 58% 42%" },
  { x: "68%", y: "78%", size: 350, opacity: 0.08, delay: 2.8, skewY: 8, borderRadius: "56% 44% 44% 56% / 48% 52% 38% 62%" },
  { x: "92%", y: "22%", size: 260, opacity: 0.06, delay: 0.3, skewX: 10, borderRadius: "62% 38% 42% 58% / 44% 56% 52% 48%" },
  { x: "42%", y: "8%", size: 320, opacity: 0.07, delay: 3.1, skewY: -14, borderRadius: "38% 62% 58% 42% / 62% 38% 44% 56%" },
  { x: "78%", y: "42%", size: 300, opacity: 0.07, delay: 2.0, skewX: -6, borderRadius: "52% 48% 56% 44% / 42% 58% 48% 52%" },
  { x: "5%", y: "70%", size: 340, opacity: 0.06, delay: 3.5, skewY: 9, borderRadius: "46% 54% 40% 60% / 58% 42% 54% 46%" },
];

const AnimatedBubbles = ({ bubbles = defaultBubbles }: { bubbles?: BubbleConfig[] }) => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [b.opacity, b.opacity * 1.5, b.opacity],
            rotate: [0, (i % 2 === 0 ? 6 : -6), 0],
          }}
          transition={{
            duration: 7 + i * 0.6,
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
            background: `radial-gradient(ellipse at 40% 40%, hsl(174 78% 35% / calc(${b.opacity} * var(--bubble-boost, 1))), transparent 65%)`,
            filter: "blur(60px)",
            transform: `translate(-50%, -50%) skewX(${b.skewX || 0}deg) skewY(${b.skewY || 0}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBubbles;
export type { BubbleConfig };
