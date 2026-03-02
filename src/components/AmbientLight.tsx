import { motion } from "framer-motion";

/**
 * Deep ambient light background layer.
 * Two large diffuse radial gradients — top-left and bottom-right —
 * that drift slowly, creating a premium depth effect.
 * No blobs, no contours, no neon. Just deep architectural light.
 */
const AmbientLight = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Top-left glow */}
    <motion.div
      className="absolute"
      style={{
        top: "-20%",
        left: "-15%",
        width: "80%",
        height: "80%",
        background:
          "radial-gradient(ellipse at center, hsl(174 78% 30% / var(--ambient-opacity-1, 0.10)), hsl(174 78% 20% / 0.04) 40%, transparent 70%)",
        filter: "blur(80px)",
        mixBlendMode: "var(--ambient-blend, screen)" as any,
      }}
      animate={{
        x: [0, 30, -10, 0],
        y: [0, 15, -20, 0],
        scale: [1, 1.06, 0.97, 1],
      }}
      transition={{
        duration: 24,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    {/* Bottom-right glow */}
    <motion.div
      className="absolute"
      style={{
        bottom: "-20%",
        right: "-15%",
        width: "75%",
        height: "75%",
        background:
          "radial-gradient(ellipse at center, hsl(174 78% 35% / var(--ambient-opacity-2, 0.08)), hsl(174 78% 22% / 0.03) 45%, transparent 70%)",
        filter: "blur(80px)",
        mixBlendMode: "var(--ambient-blend, screen)" as any,
      }}
      animate={{
        x: [0, -25, 15, 0],
        y: [0, -20, 10, 0],
        scale: [1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 28,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

export default AmbientLight;
