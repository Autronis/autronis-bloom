import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const VIEW_WIDTH = 1200;
const VIEW_HEIGHT = 180;
const CENTER_X = VIEW_WIDTH / 2;

const PRIMARY = "hsl(var(--primary))";
const PRIMARY_SOFT = "hsl(var(--primary) / 0.55)";
const PRIMARY_FAINT = "hsl(var(--primary) / 0.22)";
const BODY = "hsl(var(--foreground) / 0.9)";

const Caterpillar = () => (
  <g>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <motion.ellipse
        key={`seg-${i}`}
        cx={-54 + i * 20}
        cy={0}
        rx={11}
        ry={9}
        fill={PRIMARY_SOFT}
        stroke={PRIMARY}
        strokeWidth={1}
        animate={{ cy: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
      />
    ))}

    <circle cx={49} cy={-6} r={2.3} fill="hsl(var(--background))" />
    <circle cx={49} cy={-6} r={1.1} fill={BODY} />

    <line x1={47} y1={-10} x2={56} y2={-23} stroke={PRIMARY} strokeWidth={1.2} strokeLinecap="round" />
    <line x1={51} y1={-10} x2={60} y2={-22} stroke={PRIMARY} strokeWidth={1.2} strokeLinecap="round" />
    <circle cx={56} cy={-24} r={1.7} fill={PRIMARY_SOFT} />
    <circle cx={60} cy={-23} r={1.7} fill={PRIMARY_SOFT} />

    {[0, 1, 2, 3].map((i) => (
      <motion.line
        key={`leg-${i}`}
        x1={-24 + i * 20}
        y1={9}
        x2={-24 + i * 20}
        y2={17}
        stroke={PRIMARY}
        strokeWidth={1}
        strokeLinecap="round"
        animate={{ y2: [17, 14, 17] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
      />
    ))}

    {[1, 2, 3, 4].map((i) => (
      <circle
        key={`trail-${i}`}
        cx={-70 - i * 14}
        cy={0}
        r={3 - i * 0.5}
        fill={PRIMARY}
        opacity={0.2 - i * 0.03}
      />
    ))}
  </g>
);

const Cocoon = () => (
  <g>
    <line x1={0} y1={-64} x2={0} y2={-36} stroke={PRIMARY} strokeWidth={1.1} />

    <motion.ellipse
      cx={0}
      cy={0}
      rx={20}
      ry={38}
      fill={PRIMARY_FAINT}
      stroke={PRIMARY}
      strokeWidth={1.2}
      animate={{ rx: [20, 21, 20], ry: [38, 36, 38] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.ellipse
      cx={0}
      cy={0}
      rx={15}
      ry={29}
      fill="none"
      stroke={PRIMARY}
      strokeWidth={0.8}
      animate={{ opacity: [0.12, 0.35, 0.12] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </g>
);

const FLAP_DURATION = 0.4;
const FLAP_TRANSITION = { duration: FLAP_DURATION, repeat: Infinity, ease: "easeInOut" as const };

const Butterfly = () => (
  <g>
    {/* Left upper wing — path morph for flap, always starts at M0 (attached to body) */}
    <motion.path
      fill={PRIMARY_SOFT}
      stroke={PRIMARY}
      strokeWidth={1}
      animate={{
        d: [
          "M0 2 Q-16 -32 -50 -28 Q-58 -8 -38 7 Q-20 16 0 10",
          "M0 2 Q-3 -30 -8 -26 Q-10 -6 -6 7 Q-3 14 0 10",
          "M0 2 Q-16 -32 -50 -28 Q-58 -8 -38 7 Q-20 16 0 10",
        ],
      }}
      transition={FLAP_TRANSITION}
    />
    {/* Left lower wing */}
    <motion.path
      fill={PRIMARY_FAINT}
      stroke={PRIMARY}
      strokeWidth={1}
      animate={{
        d: [
          "M0 10 Q-18 18 -33 34 Q-30 45 -16 38 Q-6 24 0 14",
          "M0 10 Q-3 16 -5 30 Q-4 40 -2 34 Q-1 22 0 14",
          "M0 10 Q-18 18 -33 34 Q-30 45 -16 38 Q-6 24 0 14",
        ],
      }}
      transition={FLAP_TRANSITION}
    />
    {/* Left wing spot */}
    <motion.circle
      fill={PRIMARY}
      opacity={0.35}
      animate={{ cx: [-29, -5, -29], cy: [-13, -12, -13], r: [4, 1, 4] }}
      transition={FLAP_TRANSITION}
    />

    {/* Right upper wing */}
    <motion.path
      fill={PRIMARY_SOFT}
      stroke={PRIMARY}
      strokeWidth={1}
      animate={{
        d: [
          "M0 2 Q16 -32 50 -28 Q58 -8 38 7 Q20 16 0 10",
          "M0 2 Q3 -30 8 -26 Q10 -6 6 7 Q3 14 0 10",
          "M0 2 Q16 -32 50 -28 Q58 -8 38 7 Q20 16 0 10",
        ],
      }}
      transition={FLAP_TRANSITION}
    />
    {/* Right lower wing */}
    <motion.path
      fill={PRIMARY_FAINT}
      stroke={PRIMARY}
      strokeWidth={1}
      animate={{
        d: [
          "M0 10 Q18 18 33 34 Q30 45 16 38 Q6 24 0 14",
          "M0 10 Q3 16 5 30 Q4 40 2 34 Q1 22 0 14",
          "M0 10 Q18 18 33 34 Q30 45 16 38 Q6 24 0 14",
        ],
      }}
      transition={FLAP_TRANSITION}
    />
    {/* Right wing spot */}
    <motion.circle
      fill={PRIMARY}
      opacity={0.35}
      animate={{ cx: [29, 5, 29], cy: [-13, -12, -13], r: [4, 1, 4] }}
      transition={FLAP_TRANSITION}
    />

    <ellipse cx={0} cy={6} rx={2.8} ry={16} fill={BODY} stroke={PRIMARY} strokeWidth={1} />
    <path d="M-1 -8 Q-7 -22 -12 -28" fill="none" stroke={PRIMARY} strokeWidth={1.1} strokeLinecap="round" />
    <path d="M1 -8 Q7 -22 12 -28" fill="none" stroke={PRIMARY} strokeWidth={1.1} strokeLinecap="round" />
    <circle cx={-12} cy={-29} r={1.8} fill={PRIMARY_SOFT} />
    <circle cx={12} cy={-29} r={1.8} fill={PRIMARY_SOFT} />

    {[1, 2, 3].map((i) => (
      <motion.circle
        key={`spark-${i}`}
        cx={-i * 20}
        cy={i * 6}
        r={2.5 - i * 0.5}
        fill={PRIMARY}
        animate={{ opacity: [0.45, 0, 0.45], scale: [1, 1.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </g>
);

const MetamorphosisAnimation = () => {
  const prefersReducedMotion = useReducedMotion();

  const caterpillarControls = useAnimationControls();
  const cocoonControls = useAnimationControls();
  const butterflyControls = useAnimationControls();
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  const runCycle = useCallback(async () => {
    caterpillarControls.set({ x: -230, y: 112, opacity: 1, scaleX: 1, scaleY: 1 });
    cocoonControls.set({ x: CENTER_X, y: 102, opacity: 0, scaleX: 0.4, scaleY: 0.4 });
    butterflyControls.set({ x: CENTER_X, y: 102, opacity: 0, scale: 0.1, rotate: -4 });
    setPhase(0);

    // 1) Rups kruipt van links naar midden
    await caterpillarControls.start({
      x: CENTER_X - 22,
      y: 112,
      transition: { duration: 4.2, ease: "linear" },
    });

    // 2) Rups trekt samen terwijl cocon vormt
    setPhase(1);
    await Promise.all([
      caterpillarControls.start({
        x: CENTER_X,
        y: 104,
        scaleX: 0.18,
        scaleY: 1.28,
        opacity: 0.12,
        transition: { duration: 1.15, ease: "easeInOut" },
      }),
      cocoonControls.start({
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        transition: { duration: 1.15, ease: "easeOut" },
      }),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 1800));

    // 3) Vlinder komt uit cocon en vliegt weg
    setPhase(2);
    await Promise.all([
      cocoonControls.start({
        opacity: 0,
        scaleX: 0.55,
        scaleY: 1.35,
        transition: { duration: 0.65, ease: "easeIn" },
      }),
      butterflyControls.start({
        opacity: 1,
        scale: 1,
        y: 90,
        transition: { duration: 0.8, ease: "easeOut" },
      }),
    ]);

    await butterflyControls.start({
      x: VIEW_WIDTH + 260,
      y: -18,
      scale: 0.72,
      rotate: 10,
      opacity: 0,
      transition: {
        duration: 3.2,
        ease: [0.25, 0.1, 0.8, 1],
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 700));
  }, [butterflyControls, caterpillarControls, cocoonControls]);

  useEffect(() => {
    if (prefersReducedMotion) {
      caterpillarControls.set({ x: CENTER_X - 200, y: 112, opacity: 0.35 });
      cocoonControls.set({ x: CENTER_X, y: 102, opacity: 0.5, scaleX: 1, scaleY: 1 });
      butterflyControls.set({ x: CENTER_X + 180, y: 84, opacity: 0.35, scale: 0.9 });
      return;
    }

    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await runCycle();
      }
    };
    loop();

    return () => {
      cancelled = true;
    };
  }, [butterflyControls, caterpillarControls, cocoonControls, prefersReducedMotion, runCycle]);

  const labels = ["Analyse", "Ontwikkeling", "Transformatie"];

  return (
    <div className="relative w-full h-36 sm:h-40 overflow-hidden">
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="w-full h-full" preserveAspectRatio="none" overflow="hidden" style={{ overflow: "hidden" }}>
        <motion.g animate={caterpillarControls}>
          <Caterpillar />
        </motion.g>

        <motion.g animate={cocoonControls}>
          <Cocoon />
        </motion.g>

        <motion.g animate={butterflyControls}>
          <Butterfly />
        </motion.g>
      </svg>

      {/* Phase label — centered, subtle */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <motion.p
          key={phase}
          className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {labels[phase]}
        </motion.p>
      </div>
    </div>
  );
};

export default MetamorphosisAnimation;
