import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useCallback } from "react";

const TEAL = "hsl(174, 78%, 41%)";
const TEAL_LIGHT = "hsl(174, 64%, 56%)";
const TEAL_DARK = "hsl(174, 40%, 22%)";
const BODY_DARK = "hsl(220, 15%, 20%)";

// Caterpillar faces RIGHT (head on right side)
const CaterpillarGroup = () => (
  <g>
    {[5, 4, 3, 2, 1, 0].map((i) => (
      <motion.ellipse
        key={`seg-${i}`}
        cx={i * 18}
        cy={0}
        rx={10}
        ry={8}
        fill={`hsl(174, ${60 + i * 3}%, ${30 + i * 4}%)`}
        stroke={TEAL}
        strokeWidth={0.8}
        animate={{ cy: [0, -4, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: (5 - i) * 0.08, ease: "easeInOut" }}
      />
    ))}
    {/* Head is rightmost segment (i=5, cx=90) — eye on right */}
    <circle cx={94} cy={-5} r={2.2} fill="hsl(0,0%,96%)" />
    <circle cx={94} cy={-5} r={1} fill={BODY_DARK} />
    {/* Antennae pointing right-forward */}
    <line x1={96} y1={-6} x2={104} y2={-16} stroke={TEAL} strokeWidth={1} strokeLinecap="round" />
    <line x1={92} y1={-8} x2={98} y2={-18} stroke={TEAL} strokeWidth={1} strokeLinecap="round" />
    <circle cx={104} cy={-17} r={1.5} fill={TEAL_LIGHT} />
    <circle cx={98} cy={-19} r={1.5} fill={TEAL_LIGHT} />
    {/* Legs */}
    {[1, 2, 3, 4].map((i) => (
      <motion.line
        key={`leg-${i}`}
        x1={i * 18} y1={7} x2={i * 18} y2={15}
        stroke={TEAL_DARK} strokeWidth={1} strokeLinecap="round"
        animate={{ y2: [15, 12, 15] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08 }}
      />
    ))}
  </g>
);

const ButterflyGroup = () => (
  <g>
    {/* Upper left wing */}
    <motion.path
      d="M0 0 Q-25 -35 -50 -22 Q-56 -8 -38 2 Q-22 6 0 0"
      fill="hsl(174, 78%, 35%)" stroke={TEAL} strokeWidth={0.8}
      animate={{ d: [
        "M0 0 Q-25 -35 -50 -22 Q-56 -8 -38 2 Q-22 6 0 0",
        "M0 0 Q-18 -28 -42 -20 Q-50 -6 -35 3 Q-20 6 0 0",
        "M0 0 Q-25 -35 -50 -22 Q-56 -8 -38 2 Q-22 6 0 0"
      ]}}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Upper right wing */}
    <motion.path
      d="M0 0 Q25 -35 50 -22 Q56 -8 38 2 Q22 6 0 0"
      fill="hsl(174, 78%, 35%)" stroke={TEAL} strokeWidth={0.8}
      animate={{ d: [
        "M0 0 Q25 -35 50 -22 Q56 -8 38 2 Q22 6 0 0",
        "M0 0 Q18 -28 42 -20 Q50 -6 35 3 Q20 6 0 0",
        "M0 0 Q25 -35 50 -22 Q56 -8 38 2 Q22 6 0 0"
      ]}}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Lower wings */}
    <path d="M0 2 Q-20 10 -35 26 Q-36 34 -22 30 Q-10 20 0 10" fill="hsl(174, 64%, 30%)" stroke={TEAL} strokeWidth={0.8} />
    <path d="M0 2 Q20 10 35 26 Q36 34 22 30 Q10 20 0 10" fill="hsl(174, 64%, 30%)" stroke={TEAL} strokeWidth={0.8} />
    {/* Wing spots */}
    <circle cx={-30} cy={-16} r={4} fill={TEAL_LIGHT} opacity={0.4} />
    <circle cx={30} cy={-16} r={4} fill={TEAL_LIGHT} opacity={0.4} />
    {/* Body */}
    <ellipse cx={0} cy={4} rx={2.5} ry={14} fill={BODY_DARK} stroke={TEAL} strokeWidth={0.8} />
    {/* Antennae */}
    <path d="M-2 -9 Q-8 -20 -12 -24" fill="none" stroke={TEAL} strokeWidth={1} strokeLinecap="round" />
    <path d="M2 -9 Q8 -20 12 -24" fill="none" stroke={TEAL} strokeWidth={1} strokeLinecap="round" />
    <circle cx={-12} cy={-25} r={1.8} fill={TEAL_LIGHT} />
    <circle cx={12} cy={-25} r={1.8} fill={TEAL_LIGHT} />
  </g>
);

const MetamorphosisAnimation = () => {
  const caterpillar = useAnimationControls();
  const cocoon = useAnimationControls();
  const butterfly = useAnimationControls();
  const trail = useAnimationControls();
  const sparkles = useAnimationControls();

  const runCycle = useCallback(async () => {
    // Reset
    caterpillar.set({ x: -120, opacity: 1 });
    cocoon.set({ opacity: 0, scale: 0.2 });
    butterfly.set({ x: 0, opacity: 0, scale: 0 });
    trail.set({ opacity: 0 });
    sparkles.set({ opacity: 0 });

    // Phase 1: Caterpillar enters from left, crawls to center
    trail.start({ opacity: 0.6, transition: { duration: 1 } });
    await caterpillar.start({
      x: 350,
      transition: { duration: 4, ease: "linear" },
    });

    // Phase 2: Caterpillar morphs into cocoon
    trail.start({ opacity: 0, transition: { duration: 1 } });
    caterpillar.start({ opacity: 0, transition: { duration: 0.8 } });
    await cocoon.start({ opacity: 1, scale: 1, transition: { duration: 0.8 } });
    // Cocoon holds
    await new Promise((r) => setTimeout(r, 2200));

    // Phase 3: Butterfly emerges and flies off right
    cocoon.start({ opacity: 0, scale: 1.4, transition: { duration: 0.6 } });
    await butterfly.start({ opacity: 1, scale: 1, transition: { duration: 0.8 } });
    sparkles.start({ opacity: 1, transition: { duration: 0.3 } });
    await butterfly.start({
      x: 500,
      transition: { duration: 3, ease: [0.4, 0, 1, 1] },
    });
    // Butterfly exits screen
    sparkles.start({ opacity: 0, transition: { duration: 0.5 } });

    await new Promise((r) => setTimeout(r, 800));
  }, [caterpillar, cocoon, butterfly, trail, sparkles]);

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

  // viewBox: 800 wide. Center = 400. Caterpillar starts off-screen left, ends center ~400.
  // Butterfly starts at center ~400, flies to ~900 (off-screen right).
  return (
    <div className="relative w-full max-w-4xl h-28 flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 800 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Trail behind caterpillar */}
        <motion.g animate={trail}>
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={`t-${i}`}
              cx={40 + i * 14}
              cy={50}
              r={2.5 - i * 0.5}
              fill={TEAL_LIGHT}
              opacity={0.25 - i * 0.05}
            />
          ))}
        </motion.g>

        {/* Caterpillar — translate moves the whole group */}
        <motion.g animate={caterpillar} style={{ translateY: 50 }}>
          <CaterpillarGroup />
        </motion.g>

        {/* Cocoon at center (cx=400) */}
        <motion.g animate={cocoon} style={{ originX: "400px", originY: "50px" }}>
          <line x1={400} y1={5} x2={400} y2={22} stroke={TEAL} strokeWidth={0.8} />
          <motion.ellipse
            cx={400} cy={52} rx={18} ry={32}
            fill={TEAL_DARK} stroke={TEAL} strokeWidth={1}
            animate={{ ry: [32, 30, 32], rx: [18, 19, 18] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx={400} cy={52} rx={14} ry={26}
            fill="none" stroke={TEAL} strokeWidth={0.6}
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>

        {/* Sparkle trail behind butterfly */}
        <motion.g animate={sparkles}>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`s-${i}`}
              cx={390 - i * 16}
              cy={45 + (i % 2 === 0 ? -6 : 6)}
              r={2 - i * 0.4}
              fill={TEAL_LIGHT}
              animate={{ opacity: [0.4, 0, 0.4], r: [2 - i * 0.4, 3.5 - i * 0.4, 2 - i * 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </motion.g>

        {/* Butterfly — starts at center (400), flies right */}
        <motion.g animate={butterfly} style={{ translateX: 400, translateY: 50 }}>
          <ButterflyGroup />
        </motion.g>
      </svg>
    </div>
  );
};

export default MetamorphosisAnimation;
