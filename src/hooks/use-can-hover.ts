import { useState, useEffect } from "react";

/** Returns true only on devices that support hover (desktop with mouse) */
const useCanHover = (): boolean => {
  const [canHover, setCanHover] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return canHover;
};

export default useCanHover;
