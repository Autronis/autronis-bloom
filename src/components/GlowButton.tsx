import { useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
  onClick?: () => void;
}

const GlowButton = ({
  children,
  className,
  variant = "default",
  size = "default",
  asChild,
  onClick,
}: GlowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const isPrimary = variant === "default";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Outer glow */}
      <AnimatePresence>
        {isHovered && isPrimary && (
          <motion.div
            className="absolute -inset-[2px] rounded-lg bg-primary/20 blur-md pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Shimmer sweep */}
      <AnimatePresence>
        {isHovered && isPrimary && (
          <motion.div
            className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-y-0 w-[60%]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "250%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles */}
      <AnimatePresence>
        {isHovered && isPrimary && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/60 pointer-events-none"
                style={{
                  left: mousePos.x + (Math.random() - 0.5) * 40,
                  top: mousePos.y + (Math.random() - 0.5) * 20,
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.5],
                  y: -20 - Math.random() * 15,
                  x: (Math.random() - 0.5) * 20,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 + Math.random() * 0.3, delay: i * 0.06 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <Button
        variant={variant}
        size={size}
        asChild={asChild}
        onClick={onClick}
        className={cn(
          "relative z-10 transition-all duration-200",
          isHovered && isPrimary && "shadow-[0_0_20px_rgba(35,198,183,0.25)] scale-[1.02]",
          isHovered && !isPrimary && "scale-[1.02]",
          className,
        )}
      >
        {children}
      </Button>
    </div>
  );
};

export default GlowButton;
