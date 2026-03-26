import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 121;
const FPS = 24;
const HOLD_DURATION = 5000;
const WHITE_THRESHOLD = 180;

const CTAAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const frames = framesRef.current;
    let frameIndex = 0;
    let animationId: number;
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
      const img = frames[frameIndex];
      if (!img) return;

      ctx.clearRect(0, 0, w, h);

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

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;
        const saturation = Math.max(r, g, b) - Math.min(r, g, b);
        if (brightness > WHITE_THRESHOLD && saturation < 60) {
          const fade = Math.min(1, (brightness - WHITE_THRESHOLD) / (255 - WHITE_THRESHOLD));
          data[i + 3] = Math.round(255 * (1 - fade * fade));
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
        frameIndex++;
        if (frameIndex >= TOTAL_FRAMES) {
          holding = true;
          holdStart = time;
          frameIndex = TOTAL_FRAMES - 1;
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
  }, [loaded]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-[16/9]"
      style={{ contain: "layout" }}
    />
  );
};

export default CTAAnimation;
