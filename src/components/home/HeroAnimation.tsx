import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 145;
const FPS = 24;
const HOLD_DURATION = 3500;

/** Read exact rendered page bg color */
function getPageBgRgb(): [number, number, number] {
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;width:0;height:0;background:hsl(var(--background));pointer-events:none";
  document.body.appendChild(probe);
  const bg = getComputedStyle(probe).backgroundColor;
  document.body.removeChild(probe);
  const m = bg.match(/(\d+)/g);
  if (m && m.length >= 3) return [+m[0], +m[1], +m[2]];
  return [236, 228, 213];
}

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/hero-frames/frame_${String(i).padStart(4, "0")}.jpg`;
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

    const [bgR, bgG, bgB] = getPageBgRgb();
    const frames = framesRef.current;
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
      const img = frames[frameIndex];
      if (!img) return;

      // Fill with exact page bg first
      ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
      ctx.fillRect(0, 0, w, h);

      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let dw: number, dh: number, dx: number, dy: number;
      if (imgAspect > canvasAspect) {
        dh = h; dw = dh * imgAspect; dx = (w - dw) / 2; dy = 0;
      } else {
        dw = w; dh = dw / imgAspect; dx = 0; dy = (h - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);

      // Replace all non-butterfly pixels with exact page bg color
      const cw = canvas.width, ch = canvas.height;
      const imageData = ctx.getImageData(0, 0, cw, ch);
      const data = imageData.data;
      const stride = cw * 4;

      // Vertical fade: bottom 30% fades to bg (removes floor/shadow)
      const fadeStart = ch * 0.62;
      const fadeEnd = ch * 0.78;

      for (let y = 0; y < ch; y++) {
        let vFade = 0;
        if (y > fadeEnd) vFade = 1;
        else if (y > fadeStart) vFade = (y - fadeStart) / (fadeEnd - fadeStart);

        for (let x = 0; x < cw; x++) {
          const i = y * stride + x * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];

          if (vFade >= 1) {
            data[i] = bgR; data[i + 1] = bgG; data[i + 2] = bgB;
            continue;
          }

          const brightness = (r + g + b) / 3;
          const sat = Math.max(r, g, b) - Math.min(r, g, b);

          // Butterfly: dark parts or colorful parts
          const isButterfly = brightness < 100 || sat > 55 || (brightness < 140 && sat > 25);

          if (isButterfly && vFade < 1) {
            // Keep butterfly but apply vertical fade
            if (vFade > 0) {
              data[i]     = Math.round(r + (bgR - r) * vFade);
              data[i + 1] = Math.round(g + (bgG - g) * vFade);
              data[i + 2] = Math.round(b + (bgB - b) * vFade);
            }
          } else {
            // Not butterfly → exact bg
            data[i] = bgR; data[i + 1] = bgG; data[i + 2] = bgB;
          }
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

export default HeroAnimation;
