import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 145;
const FPS = 24;
const HOLD_DURATION = 3500;

/** Fast bg removal — uses squared distance (no sqrt) */
function makeTransparent(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);
  const corner = ctx.getImageData(0, 0, 1, 1).data;
  const bgR = corner[0], bgG = corner[1], bgB = corner[2];
  const imageData = ctx.getImageData(0, 0, c.width, c.height);
  const data = imageData.data;
  const innerSq = 45 * 45;
  const outerSq = 90 * 90;
  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - bgR, dg = data[i + 1] - bgG, db = data[i + 2] - bgB;
    const distSq = dr * dr + dg * dg + db * db;
    if (distSq < innerSq) {
      data[i + 3] = 0;
    } else if (distSq < outerSq) {
      const t = (Math.sqrt(distSq) - 45) / 45;
      data[i + 3] = (255 * t) | 0;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return c;
}

/** Quick canvas from image — no pixel processing, just draw */
function quickCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  c.getContext("2d")!.drawImage(img, 0, 0);
  return c;
}

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLCanvasElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [blendMode, setBlendMode] = useState<"multiply" | "normal">("multiply");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const frameStep = isMobile ? 3 : 1;
  const fps = isMobile ? 10 : FPS;

  useEffect(() => {
    let cancelled = false;
    const frames: (HTMLCanvasElement | null)[] = Array(TOTAL_FRAMES).fill(null);
    framesRef.current = frames;

    // Phase 1: Load first batch WITHOUT transparency processing (instant)
    // Use mix-blend-mode: multiply as fallback for white bg
    const fastBatch = Math.min(20, TOTAL_FRAMES);
    let fastLoaded = 0;

    for (let i = 0; i < fastBatch; i += frameStep) {
      const img = new Image();
      img.src = `/hero-frames-webp/frame_${String(i + 1).padStart(4, "0")}.webp`;
      img.onload = () => {
        if (cancelled) return;
        frames[i] = quickCanvas(img);
        fastLoaded++;
        if (fastLoaded >= 1 && !ready) setReady(true);
      };
    }

    // Phase 2: After 200ms, load remaining frames WITH transparency
    // AND re-process the fast batch frames with transparency
    const timer = setTimeout(() => {
      if (cancelled) return;

      // Re-process fast batch with proper transparency
      for (let i = 0; i < fastBatch; i += frameStep) {
        const img = new Image();
        img.src = `/hero-frames-webp/frame_${String(i + 1).padStart(4, "0")}.webp`;
        img.onload = () => {
          if (cancelled) return;
          frames[i] = makeTransparent(img);
        };
      }

      // Load rest with transparency
      for (let i = fastBatch; i < TOTAL_FRAMES; i += frameStep) {
        const img = new Image();
        img.src = `/hero-frames-webp/frame_${String(i + 1).padStart(4, "0")}.webp`;
        img.onload = () => {
          if (cancelled) return;
          frames[i] = makeTransparent(img);
        };
      }

      // Switch to normal blend mode once transparent frames are ready
      setTimeout(() => {
        if (!cancelled) setBlendMode("normal");
      }, 1500);
    }, 200);

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
      const frame = framesRef.current[frameIndex];
      if (!frame) return;
      ctx.clearRect(0, 0, w, h);
      const imgAspect = frame.width / frame.height;
      const canvasAspect = w / h;
      let dw: number, dh: number, dx: number, dy: number;
      if (imgAspect > canvasAspect) {
        dh = h; dw = dh * imgAspect; dx = (w - dw) / 2; dy = 0;
      } else {
        dw = w; dh = dw / imgAspect; dx = 0; dy = (h - dh) / 2;
      }
      ctx.drawImage(frame, dx, dy, dw, dh);
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
      style={{ contain: "layout", mixBlendMode: blendMode }}
    />
  );
};

export default HeroAnimation;
