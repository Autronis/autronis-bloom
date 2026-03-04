import { useRef, useState, useCallback, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  isAnyHovered: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  /** Disable scale/translateY on hover */
  noScale?: boolean;
}

const GlowCard = ({
  children,
  className = "",
  isAnyHovered,
  isHovered,
  onHover,
  onLeave,
  noScale = false,
}: GlowCardProps) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden transition-all duration-200 ease-out ${className}`}
      style={{
        transform: isHovered && !noScale ? "scale(1.015) translateY(-2px)" : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined,
        boxShadow: isHovered ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlowCard;
