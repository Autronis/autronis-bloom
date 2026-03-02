/**
 * Premium ambient light background — 7 distributed glows with slow breathe animations.
 * Pure CSS for GPU-friendly performance (transform + opacity only).
 * Includes subtle noise overlay to prevent gradient banding.
 */
const AmbientLight = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="ambient-glow ag-1" />
    <div className="ambient-glow ag-2" />
    <div className="ambient-glow ag-3" />
    <div className="ambient-glow ag-4" />
    <div className="ambient-glow ag-5" />
    <div className="ambient-glow ag-6" />
    <div className="ambient-glow ag-7" />
    <div className="ambient-noise" />
  </div>
);

export default AmbientLight;
