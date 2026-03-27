import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 121;
const HOLD_DURATION = 5000;
const EXT = "webp";
const DIR = "/cta-frames-webp";

const CTAAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedCountRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const frameStep = isMobile ? 3 : 1;
  const fps = isMobile ? 12 : 24;
  const minToStart = isMobile ? 5 : 10;
  const animationRef = useRef<number>(0);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "200px" },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Only start loading frames when near viewport
  useEffect(() => {
    if (!visible) return;
    if (loadedCountRef.current > 0) return; // already loading

    let cancelled = false;
    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      const img = new Image();
      img.src = `${DIR}/frame_${String(i).padStart(4, "0")}.${EXT}`;
      img.onload = () => {
        if (cancelled) return;
        framesRef.current[i - 1] = img;
        loadedCountRef.current++;
        if (loadedCountRef.current >= minToStart && !ready) {
          setReady(true);
        }
      };
    }
    return () => { cancelled = true; };
  }, [visible]);

  useEffect(() => {
    if (!ready || !visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = 1; sampleCanvas.height = 1;
    const sampleCtx = sampleCanvas.getContext("2d")!;

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

      sampleCtx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
      const [fBgR, fBgG, fBgB] = sampleCtx.getImageData(0, 0, 1, 1).data;

      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let dw: number, dh: number, dx: number, dy: number;
      if (imgAspect > canvasAspect) {
        dh = h; dw = dh * imgAspect; dx = (w - dw) / 2; dy = 0;
      } else {
        dw = w; dh = dw / imgAspect; dx = 0; dy = (h - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);

      const cw = canvas.width, ch = canvas.height;
      const imageData = ctx.getImageData(0, 0, cw, ch);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const dr = data[i] - fBgR, dg = data[i + 1] - fBgG, db = data[i + 2] - fBgB;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        if (dist < 40) {
          data[i + 3] = 0;
        } else if (dist < 80) {
          data[i + 3] = Math.round(255 * ((dist - 40) / 40));
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const interval = 1000 / fps;
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
        const next = frameIndexRef.current + 1;
        if (next >= TOTAL_FRAMES) {
          holding = true;
          holdStart = time;
          frameIndexRef.current = TOTAL_FRAMES - 1;
        } else if (framesRef.current[next]) {
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
      style={{ contain: "layout" }}
    />
  );
};

export default CTAAnimation;
