import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 121;
const FPS = 24;
const HOLD_DURATION = 5000;


const CTAAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const animationRef = useRef<number>(0);
  const frameIndexRef = useRef(0);

  // Preload frames
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/cta-frames/frame_${String(i).padStart(4, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES && !cancelled) {
          framesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }

    return () => { cancelled = true; };
  }, []);

  // Observe visibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Reset to frame 0 and restart when scrolling into view
  useEffect(() => {
    if (!loaded || !visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Parse site background color to RGB once
    const bgHsl = getComputedStyle(document.documentElement).getPropertyValue("--background").trim();
    const bgColor = `hsl(${bgHsl})`;
    const tmp = document.createElement("canvas");
    tmp.width = 1; tmp.height = 1;
    const tmpCtx = tmp.getContext("2d")!;
    tmpCtx.fillStyle = bgColor;
    tmpCtx.fillRect(0, 0, 1, 1);
    const bgPx = tmpCtx.getImageData(0, 0, 1, 1).data;
    const bgR = bgPx[0], bgG = bgPx[1], bgB = bgPx[2];

    const frames = framesRef.current;
    frameIndexRef.current = 0;
    let w = 0;
    let h = 0;

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
      const img = frames[frameIndexRef.current];
      if (!img) return;

      // Fill with site background color first so edges blend perfectly
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgAspect > canvasAspect) {
        drawH = h;
        drawW = drawH * imgAspect;
        drawX = (w - drawW) / 2;
        drawY = 0;
      } else {
        drawW = w;
        drawH = drawW / imgAspect;
        drawX = 0;
        drawY = (h - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Replace near-white/light-gray pixels with site background color
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const brightness = (r + g + b) / 3;
        const saturation = Math.max(r, g, b) - Math.min(r, g, b);
        if (brightness > 170 && saturation < 50) {
          const t = Math.min(1, (brightness - 170) / 85);
          data[i]     = Math.round(r + (bgR - r) * t);
          data[i + 1] = Math.round(g + (bgG - g) * t);
          data[i + 2] = Math.round(b + (bgB - b) * t);
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
          frameIndexRef.current = 0;
          drawFrame();
          lastTime = time;
        }
      } else if (time - lastTime >= interval) {
        frameIndexRef.current++;
        if (frameIndexRef.current >= TOTAL_FRAMES) {
          holding = true;
          holdStart = time;
          frameIndexRef.current = TOTAL_FRAMES - 1;
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
  }, [loaded, visible]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-[16/9]"
      style={{ contain: "layout" }}
    />
  );
};

export default CTAAnimation;
