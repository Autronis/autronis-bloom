import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface GlowCTAProps {
  to: string;
  children: string;
  size?: "default" | "lg";
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const GlowCTA = ({ to, children, size = "lg" }: GlowCTAProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  // Generate particles on hover
  useEffect(() => {
    if (!isHovered) {
      setParticles([]);
      return;
    }
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: 2 + Math.random() * 3,
      duration: 1 + Math.random() * 1.5,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, [isHovered]);

  const h = size === "lg" ? "h-14" : "h-11";
  const px = size === "lg" ? "px-10" : "px-6";
  const textSize = size === "lg" ? "text-base" : "text-sm";

  return (
    <motion.div
      className="relative inline-block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: "radial-gradient(circle, hsl(174 78% 41% / 0.4), transparent 70%)",
        }}
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Border glow ring */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, hsl(174 78% 41% / 0.6), hsl(174 78% 41% / 0.1), hsl(174 78% 41% / 0.6))",
          backgroundSize: "200% 200%",
        }}
        animate={isHovered ? {
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Main button */}
      <Link
        ref={ref}
        to={to}
        onMouseMove={handleMouseMove}
        className={`relative ${h} ${px} ${textSize} font-semibold rounded-xl bg-primary text-primary-foreground inline-flex items-center gap-2.5 overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(174_78%_41%/0.35)] active:scale-[0.97]`}
      >
        {/* Mouse-following spotlight */}
        {isHovered && (
          <motion.div
            className="absolute pointer-events-none w-32 h-32 -translate-x-1/2 -translate-y-1/2"
            style={{
              x: glowX,
              y: glowY,
              background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 60%)",
            }}
          />
        )}

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/60 pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              left: p.x,
              top: p.y,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20 - Math.random() * 20],
              x: [0, (Math.random() - 0.5) * 15],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.12) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={isHovered ? {
            backgroundPosition: ["-100% 0%", "200% 0%"],
          } : { backgroundPosition: "-100% 0%" }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />

        <span className="relative z-10">{children}</span>
        <motion.span
          className="relative z-10"
          animate={isHovered ? { x: [0, 4, 0] } : { x: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ArrowRight size={size === "lg" ? 20 : 16} />
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default GlowCTA;
