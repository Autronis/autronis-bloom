import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useCallback } from "react";

const TEAL = "hsl(174, 78%, 41%)";
const TEAL_LIGHT = "hsl(174, 64%, 56%)";
const TEAL_DARK = "hsl(174, 40%, 22%)";
const BODY_DARK = "hsl(220, 15%, 20%)";

const MetamorphosisAnimation = () => {
  const caterpillar = useAnimationControls();
  const cocoon = useAnimationControls();
  const butterfly = useAnimationControls();

  const runCycle = useCallback(async () => {
    // Reset all positions
    caterpillar.set({ x: -150, opacity: 1, scaleX: 1, scaleY: 1 });
    cocoon.set({ opacity: 0, scaleX: 0, scaleY: 0 });
    butterfly.set({ x: 0, y: 0, opacity: 0, scale: 0 });

    // Phase 1: Caterpillar crawls from left to center
    await caterpillar.start({
      x: 0,
      transition: { duration: 4, ease: "linear" },
    });

    // Phase 2: Caterpillar shrinks into cocoon at center
    caterpillar.start({
      scaleX: 0.2,
      scaleY: 0.3,
      opacity: 0,
      transition: { duration: 1 },
    });
    await cocoon.start({
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: { duration: 1, delay: 0.3 },
    });

    // Hold cocoon
    await new Promise((r) => setTimeout(r, 2000));

    // Phase 3: Cocoon cracks open, butterfly emerges
    cocoon.start({
      scaleY: 1.3,
      scaleX: 0.3,
      opacity: 0,
      transition: { duration: 0.6 },
    });
    // Butterfly appears at cocoon position and flies away to the RIGHT off-screen
    await butterfly.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.2 },
    });
    // Fly up and to the right, off screen
    await butterfly.start({
      x: 500,
      y: -60,
      transition: { duration: 3.5, ease: [0.2, 0, 0.8, 1] },
    });

    await new Promise((r) => setTimeout(r, 600));
  }, [caterpillar, cocoon, butterfly]);

  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await runCycle();
      }
    };
    loop();
    return () => { cancelled = true; };
  }, [runCycle]);

  return (
    <div className="relative w-full max-w-4xl h-28 flex items-center justify-center overflow-hidden">
      <svg viewBox="-100 -10 1000 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">

        {/* === CATERPILLAR === positioned at center (400,60), animated via translateX */}
        <motion.g
          animate={caterpillar}
          style={{ translateX: 400, translateY: 60 }}
        >
          {/* Body segments — head is rightmost */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.ellipse
              key={`seg-${i}`}
              cx={-50 + i * 18}
              cy={0}
              rx={10}
              ry={8}
              fill={`hsl(174, ${58 + i * 4}%, ${28 + i * 5}%)`}
              stroke={TEAL}
              strokeWidth={0.8}
              animate={{ cy: [0, -4, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
            />
          ))}
          {/* Eye */}
          <circle cx={46} cy={-5} r={2.5} fill="hsl(0,0%,96%)" />
          <circle cx={46} cy={-5} r={1.2} fill={BODY_DARK} />
          {/* Antennae */}
          <line x1={44} y1={-8} x2={52} y2={-20} stroke={TEAL} strokeWidth={1} strokeLinecap="round" />
          <line x1={48} y1={-8} x2={56} y2={-18} stroke={TEAL} strokeWidth={1} strokeLinecap="round" />
          <circle cx={52} cy={-21} r={1.5} fill={TEAL_LIGHT} />
          <circle cx={56} cy={-19} r={1.5} fill={TEAL_LIGHT} />
          {/* Trail dots behind */}
          {[1, 2, 3].map((i) => (
            <circle
              key={`trail-${i}`}
              cx={-50 - i * 18}
              cy={0}
              r={3 - i * 0.7}
              fill={TEAL_LIGHT}
              opacity={0.2 - i * 0.05}
            />
          ))}
        </motion.g>

        {/* === COCOON === at center */}
        <motion.g
          animate={cocoon}
          style={{ originX: "400px", originY: "60px" }}
        >
          <line x1={400} y1={8} x2={400} y2={28} stroke={TEAL} strokeWidth={0.8} />
          <motion.ellipse
            cx={400} cy={58} rx={18} ry={32}
            fill={TEAL_DARK} stroke={TEAL} strokeWidth={1}
            animate={{ ry: [32, 30, 32], rx: [18, 19, 18] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx={400} cy={58} rx={13} ry={24}
            fill="none" stroke={TEAL_LIGHT} strokeWidth={0.6}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          {/* Crack lines (appear subtly) */}
          <motion.line x1={394} y1={40} x2={390} y2={52} stroke={TEAL_LIGHT} strokeWidth={0.5}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
          />
          <motion.line x1={406} y1={44} x2={410} y2={55} stroke={TEAL_LIGHT} strokeWidth={0.5}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
          />
        </motion.g>

        {/* === BUTTERFLY === front-view with flapping wings */}
        <motion.g
          animate={butterfly}
          style={{ translateX: 400, translateY: 55 }}
        >
          {/* Left wing — front view: flapping = scaleX changing */}
          <motion.g
            animate={{ scaleX: [1, 0.15, 1] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "0px" }}
          >
            <path
              d="M0 0 Q-15 -30 -45 -25 Q-50 -10 -35 5 Q-18 12 0 5"
              fill="hsl(174, 78%, 35%)" stroke={TEAL} strokeWidth={0.8}
            />
            <path
              d="M0 5 Q-18 12 -32 28 Q-30 36 -18 30 Q-8 18 0 10"
              fill="hsl(174, 64%, 30%)" stroke={TEAL} strokeWidth={0.8}
            />
            <circle cx={-28} cy={-14} r={4} fill={TEAL_LIGHT} opacity={0.5} />
          </motion.g>

          {/* Right wing — mirrors left */}
          <motion.g
            animate={{ scaleX: [1, 0.15, 1] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "0px" }}
          >
            <path
              d="M0 0 Q15 -30 45 -25 Q50 -10 35 5 Q18 12 0 5"
              fill="hsl(174, 78%, 35%)" stroke={TEAL} strokeWidth={0.8}
            />
            <path
              d="M0 5 Q18 12 32 28 Q30 36 18 30 Q8 18 0 10"
              fill="hsl(174, 64%, 30%)" stroke={TEAL} strokeWidth={0.8}
            />
            <circle cx={28} cy={-14} r={4} fill={TEAL_LIGHT} opacity={0.5} />
          </motion.g>

          {/* Body (on top of wings) */}
          <ellipse cx={0} cy={4} rx={2.5} ry={14} fill={BODY_DARK} stroke={TEAL} strokeWidth={0.8} />
          {/* Antennae */}
          <path d="M-1 -9 Q-6 -22 -10 -26" fill="none" stroke={TEAL} strokeWidth={1} strokeLinecap="round" />
          <path d="M1 -9 Q6 -22 10 -26" fill="none" stroke={TEAL} strokeWidth={1} strokeLinecap="round" />
          <circle cx={-10} cy={-27} r={1.8} fill={TEAL_LIGHT} />
          <circle cx={10} cy={-27} r={1.8} fill={TEAL_LIGHT} />

          {/* Sparkle trail */}
          {[1, 2, 3].map((i) => (
            <motion.circle
              key={`sp-${i}`}
              cx={-i * 20}
              cy={i * 8}
              r={2.5 - i * 0.5}
              fill={TEAL_LIGHT}
              animate={{ opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default MetamorphosisAnimation;
