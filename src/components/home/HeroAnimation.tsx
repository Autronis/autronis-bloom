import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 145;
const FPS = 24;
const HOLD_DURATION = 3500;
const EXT = "webp";
const DIR = "/hero-frames-webp";
// Start animating after this many frames are loaded
const MIN_FRAMES_TO_START = 10;

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedCountRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Load frames progressively — start animation early
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${DIR}/frame_${String(i).padStart(4, "0")}.${EXT}`;
      img.onload = () => {
        if (cancelled) return;
        framesRef.current[i - 1] = img;
        loadedCountRef.current++;
        if (loadedCountRef.current >= MIN_FRAMES_TO_START && !ready) {
          setReady(true);
        }
      };
    }

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = 1; sampleCanvas.height = 1;
    const sampleCtx = sampleCanvas.getContext("2d")!;

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
        const next = frameIndex + 1;
        // Only advance if the next frame is loaded
        if (next >= TOTAL_FRAMES) {
          holding = true;
          holdStart = time;
          frameIndex = TOTAL_FRAMES - 1;
        } else if (framesRef.current[next]) {
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
      style={{ contain: "layout" }}
    />
  );
};

export default HeroAnimation;
