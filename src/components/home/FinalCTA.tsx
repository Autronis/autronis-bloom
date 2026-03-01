import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = 400;
    const h = 400;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    let startTime: number | null = null;
    const duration = 3000;
    let animId: number;

    const drawButterfly = (scale: number, opacity: number, wingAngle: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale);
      ctx.globalAlpha = opacity;

      // Glow
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 60);
      glow.addColorStop(0, "hsla(174, 78%, 41%, 0.12)");
      glow.addColorStop(1, "hsla(174, 78%, 41%, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-60, -60, 120, 120);

      // Wings with flapping
      const flapScale = Math.cos(wingAngle);

      // Left wing
      ctx.save();
      ctx.scale(flapScale, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-15, -25, -35, -30, -25, -5);
      ctx.bezierCurveTo(-35, 10, -20, 25, 0, 10);
      ctx.fillStyle = "hsla(174, 78%, 41%, 0.3)";
      ctx.fill();
      // Inner detail
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-8, -15, -20, -18, -14, -3);
      ctx.bezierCurveTo(-18, 5, -10, 12, 0, 5);
      ctx.fillStyle = "hsla(174, 78%, 41%, 0.15)";
      ctx.fill();
      ctx.restore();

      // Right wing
      ctx.save();
      ctx.scale(flapScale, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(15, -25, 35, -30, 25, -5);
      ctx.bezierCurveTo(35, 10, 20, 25, 0, 10);
      ctx.fillStyle = "hsla(174, 78%, 41%, 0.3)";
      ctx.fill();
      // Inner detail
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(8, -15, 20, -18, 14, -3);
      ctx.bezierCurveTo(18, 5, 10, 12, 0, 5);
      ctx.fillStyle = "hsla(174, 78%, 41%, 0.15)";
      ctx.fill();
      ctx.restore();

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 2, 1.5, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(174, 78%, 41%, 0.5)";
      ctx.fill();

      // Antennae
      ctx.beginPath();
      ctx.moveTo(-1, -8);
      ctx.quadraticCurveTo(-5, -18, -7, -20);
      ctx.moveTo(1, -8);
      ctx.quadraticCurveTo(5, -18, 7, -20);
      ctx.strokeStyle = "hsla(174, 78%, 41%, 0.4)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      // Scale from tiny to full
      const scale = 0.3 + eased * 3.5;
      const opacity = Math.min(progress * 2.5, 1);
      const wingAngle = elapsed * 0.008;

      drawButterfly(scale, opacity, wingAngle);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        // Continue wing flapping after growth is done
        const continueFlap = (ts: number) => {
          const wing = ts * 0.005;
          drawButterfly(scale, 1, wing);
          animId = requestAnimationFrame(continueFlap);
        };
        animId = requestAnimationFrame(continueFlap);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 border-t border-border relative overflow-hidden">
      {/* Centered butterfly canvas behind CTA */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-[400px] h-[400px] opacity-80"
          style={{ width: 400, height: 400 }}
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl mx-auto">
          Klaar om uw processen structureel te verbeteren?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Plan een vrijblijvende Automation Scan en ontdek waar de grootste impact ligt
          voor uw organisatie.
        </p>
        <Button asChild size="lg" className="text-base px-10">
          <Link to="/book">
            Plan Automation Scan
            <ArrowRight size={18} />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
