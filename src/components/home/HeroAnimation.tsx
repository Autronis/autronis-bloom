import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 145;
const FPS = 24;
const HOLD_DURATION = 3500;

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Wait until page is idle before loading frames
    const start = () => {
      if (cancelled) return;
      const step = 1;
      const frames: (HTMLImageElement | null)[] = Array(TOTAL_FRAMES).fill(null);
      framesRef.current = frames;
      let loaded = 0;

      for (let i = 0; i < TOTAL_FRAMES; i += step) {
        const img = new Image();
        img.src = `/hero-frames-webp/frame_${String(i + 1).padStart(4, "0")}.webp`;
        img.onload = () => {
          if (cancelled) return;
          frames[i] = img;
          loaded++;
          if (loaded >= 8 && !ready) setReady(true);
        };
      }
    };

    // Delay frame loading so the page renders first
    if ("requestIdleCallback" in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(start);
      return () => { cancelled = true; (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id); };
    }
    const timer = setTimeout(start, 1500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameIndex = 0;
    let animationId: number;
    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = () => {
      const img = framesRef.current[frameIndex];
      if (!img) return;
      ctx.clearRect(0, 0, w, h);
      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let dw: number, dh: number, dx: number, dy: number;
      if (imgAspect > canvasAspect) {
        dh = h; dw = dh * imgAspect; dx = (w - dw) / 2; dy = 0;
      } else {
        dw = w; dh = dw / imgAspect; dx = 0; dy = (h - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const interval = 1000 / FPS;
    let holding = false;
    let holdStart = 0;

    const animate = (time: number) => {
      if (holding) {
        if (time - holdStart >= HOLD_DURATION) {
          holding = false;
          frameIndex = 0;
          drawFrame();
          lastTime = time;
        }
      } else if (time - lastTime >= interval) {
        let next = frameIndex + 1;
        while (next < TOTAL_FRAMES && !framesRef.current[next]) next++;
        if (next >= TOTAL_FRAMES) {
          holding = true;
          holdStart = time;
          let last = TOTAL_FRAMES - 1;
          while (last > 0 && !framesRef.current[last]) last--;
          frameIndex = last;
        } else {
          frameIndex = next;
        }
        drawFrame();
        lastTime = time;
      }
      animationId = requestAnimationFrame(animate);
    };

    drawFrame();
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-[16/9]"
      style={{ contain: "layout", mixBlendMode: "multiply" }}
    />
  );
};

export default HeroAnimation;
