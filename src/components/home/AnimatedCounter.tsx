import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

interface AnimatedCounterProps {
  /** Target number to count to */
  target: number;
  /** Animation duration in ms (default 2000) */
  duration?: number;
  /** Suffix like "+" or "%" (default "") */
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({
  target,
  duration = 2000,
  suffix = "",
  className = "",
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return <motion.span ref={ref} className={className}>0{suffix}</motion.span>;
};

export default AnimatedCounter;
