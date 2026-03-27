import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 121;
const FPS = 24;
const HOLD_DURATION = 5000;

const CTAAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const animationRef = useRef<number>(0);
  const frameIndexRef = useRef(0);

  // Only start loading when near viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "300px" },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || framesRef.current.length > 0) return;
    let cancelled = false;
    const frames: (HTMLImageElement | null)[] = Array(TOTAL_FRAMES).fill(null);
    framesRef.current = frames;
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/cta-frames-webp/frame_${String(i + 1).padStart(4, "0")}.webp`;
      img.onload = () => {
        if (cancelled) return;
        frames[i] = img;
        loaded++;
        if (loaded >= 8 && !ready) setReady(true);
      };
    }
    return () => { cancelled = true; };
  }, [visible]);

  useEffect(() => {
    if (!ready || !visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    frameIndexRef.current = 0;
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
      const img = framesRef.current[frameIndexRef.current];
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
          frameIndexRef.current = 0;
          drawFrame();
          lastTime = time;
        }
      } else if (time - lastTime >= interval) {
        let next = frameIndexRef.current + 1;
        while (next < TOTAL_FRAMES && !framesRef.current[next]) next++;
        if (next >= TOTAL_FRAMES) {
          holding = true;
          holdStart = time;
          let last = TOTAL_FRAMES - 1;
          while (last > 0 && !framesRef.current[last]) last--;
          frameIndexRef.current = last;
        } else {
          frameIndexRef.current = next;
        }
        drawFrame();
        lastTime = time;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    drawFrame();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [ready, visible]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-[16/9]"
      style={{ contain: "layout", mixBlendMode: "multiply" }}
    />
  );
};

export default CTAAnimation;
