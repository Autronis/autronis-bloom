import { motion } from "framer-motion";

/**
 * Deep ambient light background layer.
 * Two large diffuse radial gradients — top-left and bottom-right —
 * that drift very slowly, creating a premium depth effect.
 * Feels like light beneath the page surface, not decorative blobs.
 */
const AmbientLight = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Top-left ambient glow */}
    <motion.div
      className="absolute"
      style={{
        top: "-30%",
        left: "-20%",
        width: "85%",
        height: "85%",
        background:
          "radial-gradient(ellipse at center, hsl(174 78% 28% / var(--ambient-opacity-1, 0.10)), hsl(174 78% 20% / 0.03) 50%, transparent 75%)",
        filter: "blur(100px)",
        mixBlendMode: "var(--ambient-blend, screen)" as any,
      }}
      animate={{
        x: [0, 20, -15, 0],
        y: [0, 12, -18, 0],
        scale: [1, 1.04, 0.98, 1],
      }}
      transition={{
        duration: 26,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    {/* Bottom-right ambient glow */}
    <motion.div
      className="absolute"
      style={{
        bottom: "-30%",
        right: "-20%",
        width: "80%",
        height: "80%",
        background:
          "radial-gradient(ellipse at center, hsl(174 78% 32% / var(--ambient-opacity-2, 0.08)), hsl(174 78% 22% / 0.02) 50%, transparent 75%)",
        filter: "blur(100px)",
        mixBlendMode: "var(--ambient-blend, screen)" as any,
      }}
      animate={{
        x: [0, -18, 12, 0],
        y: [0, -15, 8, 0],
        scale: [1, 0.97, 1.03, 1],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

export default AmbientLight;
