import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useCallback } from "react";

const TEAL = "hsl(174, 78%, 41%)";
const TEAL_LIGHT = "hsl(174, 64%, 56%)";
const TEAL_DARK = "hsl(174, 40%, 22%)";
const BODY_DARK = "hsl(220, 15%, 20%)";

const MetamorphosisAnimation = () => {
  const caterpillarControls = useAnimationControls();
  const cocoonControls = useAnimationControls();
  const butterflyControls = useAnimationControls();
  const trailControls = useAnimationControls();
  const sparkleControls = useAnimationControls();

  const runCycle = useCallback(async () => {
    // Reset all
    caterpillarControls.set({ opacity: 0, x: 0 });
    cocoonControls.set({ opacity: 0, scale: 0.3 });
    butterflyControls.set({ opacity: 0, x: 0, scale: 0 });
    trailControls.set({ opacity: 0 });
    sparkleControls.set({ opacity: 0 });

    // Phase 1: Caterpillar crawls from left to center (0-4s)
    caterpillarControls.start({ opacity: 1, transition: { duration: 0.5 } });
    trailControls.start({ opacity: 1, transition: { duration: 0.8 } });
    await caterpillarControls.start({
      x: 280,
      transition: { duration: 3.5, ease: "easeInOut" },
    });

    // Phase 2: Caterpillar shrinks into cocoon (4-7s)
    trailControls.start({ opacity: 0, transition: { duration: 1.5 } });
    caterpillarControls.start({
      opacity: 0,
      scale: 0.3,
      transition: { duration: 1 },
    });
    cocoonControls.start({ opacity: 1, scale: 1, transition: { duration: 1 } });
    await new Promise((r) => setTimeout(r, 2000));

    // Phase 3: Butterfly emerges and flies right (7-12s)
    cocoonControls.start({ opacity: 0, scale: 1.3, transition: { duration: 0.8 } });
    await butterflyControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    });
    sparkleControls.start({ opacity: 1, transition: { duration: 0.3 } });
    await butterflyControls.start({
      x: 280,
      transition: { duration: 3, ease: "easeIn" },
    });

    // Fade out everything
    butterflyControls.start({ opacity: 0, transition: { duration: 0.8 } });
    sparkleControls.start({ opacity: 0, transition: { duration: 0.8 } });
    await new Promise((r) => setTimeout(r, 1200));
  }, [caterpillarControls, cocoonControls, butterflyControls, trailControls, sparkleControls]);

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
    <div className="relative w-full max-w-4xl h-32 flex items-center justify-center">
      <svg viewBox="0 0 800 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Trail dots behind caterpillar */}
        <motion.g animate={trailControls}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={`trail-${i}`}
              cx={60 + i * 12}
              cy={60}
              r={3 - i * 0.4}
              fill={TEAL_LIGHT}
              opacity={0.3 - i * 0.06}
            />
          ))}
        </motion.g>

        {/* Caterpillar group */}
        <motion.g animate={caterpillarControls} style={{ originX: "80px", originY: "60px" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.ellipse
              key={`seg-${i}`}
              cx={80 + i * 20}
              cy={60}
              rx={11}
              ry={9}
              fill={`hsl(174, ${60 + i * 3}%, ${30 + i * 4}%)`}
              stroke={TEAL}
              strokeWidth={0.8}
              animate={{ cy: [60, 55, 60] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
            />
          ))}
          {/* Eye */}
          <circle cx={76} cy={54} r={2.5} fill="hsl(0,0%,96%)" />
          <circle cx={76} cy={54} r={1.2} fill={BODY_DARK} />
          {/* Antennae */}
          <line x1={73} y1={50} x2={66} y2={38} stroke={TEAL} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={80} y1={50} x2={77} y2={36} stroke={TEAL} strokeWidth={1.2} strokeLinecap="round" />
          <circle cx={66} cy={37} r={1.8} fill={TEAL_LIGHT} />
          <circle cx={77} cy={35} r={1.8} fill={TEAL_LIGHT} />
          {/* Legs */}
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={`leg-${i}`}
              x1={90 + i * 20} y1={68} x2={90 + i * 20} y2={78}
              stroke={TEAL_DARK} strokeWidth={1.2} strokeLinecap="round"
              animate={{ y2: [78, 75, 78] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </motion.g>

        {/* Cocoon at center */}
        <motion.g animate={cocoonControls} style={{ originX: "400px", originY: "60px" }}>
          <line x1={400} y1={10} x2={400} y2={30} stroke={TEAL} strokeWidth={0.8} />
          <motion.ellipse
            cx={400} cy={65} rx={22} ry={38}
            fill={TEAL_DARK} stroke={TEAL} strokeWidth={1.2}
            animate={{ ry: [38, 36, 38], rx: [22, 23, 22] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Glow pulse */}
          <motion.ellipse
            cx={400} cy={65} rx={18} ry={30}
            fill="none" stroke={TEAL} strokeWidth={0.8}
            animate={{ opacity: [0.1, 0.4, 0.1], rx: [18, 21, 18], ry: [30, 33, 30] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Texture lines */}
          {[0, 1, 2].map((i) => (
            <motion.path
              key={`tex-${i}`}
              d={`M ${384 + i} ${45 + i * 14} Q 400 ${42 + i * 14} ${416 - i} ${45 + i * 14}`}
              fill="none" stroke={TEAL} strokeWidth={0.5} opacity={0.3}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </motion.g>

        {/* Sparkle trail behind butterfly */}
        <motion.g animate={sparkleControls}>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`sparkle-${i}`}
              cx={410 + i * 18}
              cy={55 + (i % 2 === 0 ? -8 : 8)}
              r={2.5 - i * 0.5}
              fill={TEAL_LIGHT}
              animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.g>

        {/* Butterfly group */}
        <motion.g animate={butterflyControls} style={{ originX: "400px", originY: "60px" }}>
          {/* Upper left wing */}
          <motion.path
            d="M400 60 Q370 20 340 35 Q332 50 355 62 Q370 66 400 60"
            fill="hsl(174, 78%, 35%)" stroke={TEAL} strokeWidth={0.8}
            animate={{ d: [
              "M400 60 Q370 20 340 35 Q332 50 355 62 Q370 66 400 60",
              "M400 60 Q378 30 350 38 Q338 52 358 63 Q374 66 400 60",
              "M400 60 Q370 20 340 35 Q332 50 355 62 Q370 66 400 60"
            ]}}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Upper right wing */}
          <motion.path
            d="M400 60 Q430 20 460 35 Q468 50 445 62 Q430 66 400 60"
            fill="hsl(174, 78%, 35%)" stroke={TEAL} strokeWidth={0.8}
            animate={{ d: [
              "M400 60 Q430 20 460 35 Q468 50 445 62 Q430 66 400 60",
              "M400 60 Q422 30 450 38 Q462 52 442 63 Q426 66 400 60",
              "M400 60 Q430 20 460 35 Q468 50 445 62 Q430 66 400 60"
            ]}}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Lower left wing */}
          <motion.path
            d="M400 62 Q375 70 355 88 Q352 98 370 92 Q385 82 400 70"
            fill="hsl(174, 64%, 30%)" stroke={TEAL} strokeWidth={0.8}
          />
          {/* Lower right wing */}
          <motion.path
            d="M400 62 Q425 70 445 88 Q448 98 430 92 Q415 82 400 70"
            fill="hsl(174, 64%, 30%)" stroke={TEAL} strokeWidth={0.8}
          />
          {/* Wing details */}
          <circle cx={365} cy={42} r={5} fill={TEAL_LIGHT} opacity={0.4} />
          <circle cx={435} cy={42} r={5} fill={TEAL_LIGHT} opacity={0.4} />
          {/* Body */}
          <ellipse cx={400} cy={63} rx={3} ry={16} fill={BODY_DARK} stroke={TEAL} strokeWidth={0.8} />
          {/* Antennae */}
          <path d="M398 48 Q392 36 386 32" fill="none" stroke={TEAL} strokeWidth={1.2} strokeLinecap="round" />
          <path d="M402 48 Q408 36 414 32" fill="none" stroke={TEAL} strokeWidth={1.2} strokeLinecap="round" />
          <circle cx={386} cy={31} r={2} fill={TEAL_LIGHT} />
          <circle cx={414} cy={31} r={2} fill={TEAL_LIGHT} />
        </motion.g>
      </svg>
    </div>
  );
};

export default MetamorphosisAnimation;
