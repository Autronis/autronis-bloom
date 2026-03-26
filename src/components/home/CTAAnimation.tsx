import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 121;
const FPS = 24;
const HOLD_DURATION = 5000;

// Site background: hsl(38, 38%, 88%) → RGB(236, 228, 213)
const SITE_BG_R = 236;
const SITE_BG_G = 228;
const SITE_BG_B = 213;

const CTAAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const animationRef = useRef<number>(0);
  const frameIndexRef = useRef(0);

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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!loaded || !visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

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

      // Fill entire canvas with exact site background color
      ctx.fillStyle = `rgb(${SITE_BG_R},${SITE_BG_G},${SITE_BG_B})`;
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

      // Now replace every pixel that isn't clearly "butterfly" with
      // the exact site background color. The butterfly has dark parts
      // (brightness < 100) and turquoise parts (high saturation).
      // Everything else → site bg color, no exceptions.
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const brightness = (r + g + b) / 3;
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        const sat = mx - mn;

        // Dark pixel → butterfly body/traces → keep
        if (brightness < 100) continue;

        // Saturated pixel → turquoise/teal → keep
        if (sat > 55) continue;

        // Medium-dark with some detail (100-140 brightness, some sat)
        // Could be wing edge or circuit trace → blend
        if (brightness < 140 && sat > 25) {
          const t = (brightness - 100) / 40; // 0 at 100, 1 at 140
          data[i]     = Math.round(r + (SITE_BG_R - r) * t);
          data[i + 1] = Math.round(g + (SITE_BG_G - g) * t);
          data[i + 2] = Math.round(b + (SITE_BG_B - b) * t);
          continue;
        }

        // Everything else: white bg, gray floor, shadow, cubes, light areas
        // → replace with EXACT site background color
        data[i]     = SITE_BG_R;
        data[i + 1] = SITE_BG_G;
        data[i + 2] = SITE_BG_B;
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
