import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  /** Opacity intensity 0-1 (default 0.07) */
  intensity?: number;
  /** Cycle duration in seconds (default 10) */
  speed?: number;
  /** Array of HSL color strings (default: turquoise palette) */
  colors?: string[];
}

const AuroraBackground = ({
  intensity = 0.07,
  speed = 10,
  colors = [
    "hsl(174, 78%, 41%)",
    "hsl(174, 64%, 56%)",
    "hsl(174, 78%, 30%)",
  ],
}: AuroraBackgroundProps) => {
  const blobs = [
    { x: ["0%", "30%", "-10%", "0%"], y: ["0%", "-20%", "15%", "0%"], size: "60%" },
    { x: ["0%", "-25%", "20%", "0%"], y: ["0%", "25%", "-15%", "0%"], size: "50%" },
    { x: ["0%", "15%", "-20%", "0%"], y: ["0%", "-10%", "20%", "0%"], size: "45%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${colors[i % colors.length]}, transparent 70%)`,
            opacity: intensity,
            filter: "blur(80px)",
            top: i === 0 ? "10%" : i === 1 ? "50%" : "30%",
            left: i === 0 ? "60%" : i === 1 ? "10%" : "40%",
          }}
          animate={{
            x: blob.x,
            y: blob.y,
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: speed + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AuroraBackground;
