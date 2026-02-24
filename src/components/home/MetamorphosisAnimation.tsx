import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MetamorphosisAnimation = () => {
  const [stage, setStage] = useState(0); // 0=rups, 1=cocon, 2=vlinder

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl h-32 sm:h-40 flex items-center justify-center">
      {/* Subtle glow behind */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-[60px]" />

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.svg
            key="caterpillar"
            viewBox="0 0 200 100"
            className="w-full h-auto"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            {/* Rups - segmented body */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.ellipse
                key={i}
                cx={40 + i * 24}
                cy={55}
                rx={14}
                ry={12}
                fill={`hsl(174, ${60 + i * 3}%, ${30 + i * 4}%)`}
                stroke="hsl(174, 78%, 41%)"
                strokeWidth={1}
                initial={{ cy: 55 }}
                animate={{ cy: [55, 50, 55] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Oogjes */}
            <circle cx={34} cy={48} r={3} fill="hsl(0, 0%, 96%)" />
            <circle cx={34} cy={48} r={1.5} fill="hsl(220, 15%, 13%)" />
            {/* Antennes */}
            <line x1={30} y1={43} x2={22} y2={30} stroke="hsl(174, 78%, 41%)" strokeWidth={1.5} strokeLinecap="round" />
            <line x1={38} y1={43} x2={34} y2={28} stroke="hsl(174, 78%, 41%)" strokeWidth={1.5} strokeLinecap="round" />
            <circle cx={22} cy={29} r={2} fill="hsl(174, 64%, 56%)" />
            <circle cx={34} cy={27} r={2} fill="hsl(174, 64%, 56%)" />
            {/* Pootjes */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.line
                key={`leg-${i}`}
                x1={50 + i * 24}
                y1={65}
                x2={50 + i * 24}
                y2={78}
                stroke="hsl(174, 78%, 35%)"
                strokeWidth={1.5}
                strokeLinecap="round"
                animate={{ y2: [78, 75, 78] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.svg>
        )}

        {stage === 1 && (
          <motion.svg
            key="cocoon"
            viewBox="0 0 120 180"
            className="w-32 sm:w-40 h-auto"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          >
            {/* Draad */}
            <line x1={60} y1={0} x2={60} y2={40} stroke="hsl(174, 78%, 41%)" strokeWidth={1} />
            {/* Cocon body */}
            <motion.ellipse
              cx={60}
              cy={105}
              rx={30}
              ry={55}
              fill="hsl(174, 40%, 22%)"
              stroke="hsl(174, 78%, 41%)"
              strokeWidth={1.5}
              animate={{ ry: [55, 53, 55], rx: [30, 31, 30] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Textuur lijnen */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.path
                key={`tex-${i}`}
                d={`M ${38 + i * 2} ${70 + i * 15} Q 60 ${65 + i * 15} ${82 - i * 2} ${70 + i * 15}`}
                fill="none"
                stroke="hsl(174, 78%, 41%)"
                strokeWidth={0.7}
                opacity={0.4}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
            {/* Glow puls */}
            <motion.ellipse
              cx={60}
              cy={105}
              rx={25}
              ry={45}
              fill="none"
              stroke="hsl(174, 78%, 41%)"
              strokeWidth={1}
              opacity={0.2}
              animate={{ opacity: [0.1, 0.4, 0.1], rx: [25, 28, 25], ry: [45, 48, 45] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.svg>
        )}

        {stage === 2 && (
          <motion.svg
            key="butterfly"
            viewBox="0 0 200 180"
            className="w-full h-auto"
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {/* Linker bovenvleugel */}
            <motion.path
              d="M100 90 Q60 20 20 40 Q10 60 40 80 Q60 90 100 90"
              fill="hsl(174, 78%, 35%)"
              stroke="hsl(174, 78%, 41%)"
              strokeWidth={1}
              animate={{ d: [
                "M100 90 Q60 20 20 40 Q10 60 40 80 Q60 90 100 90",
                "M100 90 Q70 30 30 45 Q15 62 45 82 Q65 90 100 90",
                "M100 90 Q60 20 20 40 Q10 60 40 80 Q60 90 100 90"
              ]}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Rechter bovenvleugel */}
            <motion.path
              d="M100 90 Q140 20 180 40 Q190 60 160 80 Q140 90 100 90"
              fill="hsl(174, 78%, 35%)"
              stroke="hsl(174, 78%, 41%)"
              strokeWidth={1}
              animate={{ d: [
                "M100 90 Q140 20 180 40 Q190 60 160 80 Q140 90 100 90",
                "M100 90 Q130 30 170 45 Q185 62 155 82 Q135 90 100 90",
                "M100 90 Q140 20 180 40 Q190 60 160 80 Q140 90 100 90"
              ]}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Linker ondervleugel */}
            <motion.path
              d="M100 90 Q60 100 30 130 Q25 150 60 140 Q80 120 100 100"
              fill="hsl(174, 64%, 30%)"
              stroke="hsl(174, 78%, 41%)"
              strokeWidth={1}
              animate={{ d: [
                "M100 90 Q60 100 30 130 Q25 150 60 140 Q80 120 100 100",
                "M100 90 Q65 102 38 128 Q30 148 62 138 Q82 120 100 100",
                "M100 90 Q60 100 30 130 Q25 150 60 140 Q80 120 100 100"
              ]}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Rechter ondervleugel */}
            <motion.path
              d="M100 90 Q140 100 170 130 Q175 150 140 140 Q120 120 100 100"
              fill="hsl(174, 64%, 30%)"
              stroke="hsl(174, 78%, 41%)"
              strokeWidth={1}
              animate={{ d: [
                "M100 90 Q140 100 170 130 Q175 150 140 140 Q120 120 100 100",
                "M100 90 Q135 102 162 128 Q170 148 138 138 Q118 120 100 100",
                "M100 90 Q140 100 170 130 Q175 150 140 140 Q120 120 100 100"
              ]}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Vleugeldetails */}
            <circle cx={65} cy={55} r={8} fill="hsl(174, 64%, 56%)" opacity={0.5} />
            <circle cx={135} cy={55} r={8} fill="hsl(174, 64%, 56%)" opacity={0.5} />
            <circle cx={55} cy={125} r={5} fill="hsl(174, 64%, 56%)" opacity={0.4} />
            <circle cx={145} cy={125} r={5} fill="hsl(174, 64%, 56%)" opacity={0.4} />
            {/* Lichaam */}
            <ellipse cx={100} cy={95} rx={4} ry={25} fill="hsl(220, 15%, 20%)" stroke="hsl(174, 78%, 41%)" strokeWidth={1} />
            {/* Antennes */}
            <path d="M98 72 Q90 55 82 48" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth={1.5} strokeLinecap="round" />
            <path d="M102 72 Q110 55 118 48" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth={1.5} strokeLinecap="round" />
            <circle cx={82} cy={47} r={2.5} fill="hsl(174, 64%, 56%)" />
            <circle cx={118} cy={47} r={2.5} fill="hsl(174, 64%, 56%)" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Stage label */}
      <motion.p
        key={stage}
        className="absolute -bottom-6 text-xs text-muted-foreground tracking-widest uppercase"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {stage === 0 ? "Analyse" : stage === 1 ? "Ontwikkeling" : "Transformatie"}
      </motion.p>
    </div>
  );
};

export default MetamorphosisAnimation;
