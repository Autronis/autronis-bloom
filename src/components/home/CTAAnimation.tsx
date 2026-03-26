import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 121;
const FPS = 24;
const HOLD_DURATION = 5000;
const BUTTERFLY_OPACITY = 0.35;

/** Read the exact rendered page background color */
function getPageBgRgb(): [number, number, number] {
  // Create a temporary element with the bg color class, measure its actual RGB
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;width:0;height:0;background:hsl(var(--background));pointer-events:none";
  document.body.appendChild(probe);
  const bg = getComputedStyle(probe).backgroundColor;
  document.body.removeChild(probe);
  const m = bg.match(/(\d+)/g);
  if (m && m.length >= 3) return [+m[0], +m[1], +m[2]];
  return [236, 228, 213];
}

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

    // Read the EXACT background color the browser is actually rendering
    const [bgR, bgG, bgB] = getPageBgRgb();

    const frames = framesRef.current;
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
      const img = frames[frameIndexRef.current];
      if (!img) return;

      // Fill with exact section bg
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

      const cw = canvas.width, ch = canvas.height;
      const imageData = ctx.getImageData(0, 0, cw, ch);
      const data = imageData.data;
      const stride = cw * 4;

      // Bottom fade: below 60% of canvas height, fade everything to bg.
      // This removes the floor, shadow, and any artifacts at the bottom.
      const fadeStart = ch * 0.58;
      const fadeEnd = ch * 0.72;

      for (let y = 0; y < ch; y++) {
        // How much to force toward bg based on vertical position
        let vFade = 0; // 0 = no forced fade, 1 = fully bg
        if (y > fadeEnd) {
          vFade = 1;
        } else if (y > fadeStart) {
          vFade = (y - fadeStart) / (fadeEnd - fadeStart);
        }

        for (let x = 0; x < cw; x++) {
          const i = y * stride + x * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];

          if (vFade >= 1) {
            // Below fade zone → always bg
            data[i] = bgR; data[i + 1] = bgG; data[i + 2] = bgB;
            continue;
          }

          const brightness = (r + g + b) / 3;
          const sat = Math.max(r, g, b) - Math.min(r, g, b);
          const isButterfly = brightness < 100 || sat > 55 || (brightness < 140 && sat > 25);

          if (isButterfly && vFade < 1) {
            // Blend butterfly toward bg (subtlety + vertical fade)
            const opacity = BUTTERFLY_OPACITY * (1 - vFade);
            data[i]     = Math.round(bgR + (r - bgR) * opacity);
            data[i + 1] = Math.round(bgG + (g - bgG) * opacity);
            data[i + 2] = Math.round(bgB + (b - bgB) * opacity);
          } else {
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
