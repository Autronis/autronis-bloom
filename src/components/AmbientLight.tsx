/**
 * Deep ambient light background layer using pure CSS animations.
 * Two large diffuse radial gradients — top-left and bottom-right —
 * that drift very slowly with GPU-accelerated transforms.
 * No framer-motion keyframes — pure CSS for buttery smooth movement.
 */
const AmbientLight = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="ambient-glow ambient-glow-1" />
    <div className="ambient-glow ambient-glow-2" />
  </div>
);

export default AmbientLight;
