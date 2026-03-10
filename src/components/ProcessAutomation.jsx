import { useEffect, useRef } from "react";

const TEAL  = "hsl(174, 78%, 41%)";
const TEAL2 = "hsl(174, 64%, 56%)";

export default function ProcessAutomation() {
  const frameRef = useRef(0);
  const rafRef   = useRef(null);
  const svgRef   = useRef(null);

  useEffect(() => {
    const FPS = 60;

    const belt   = svgRef.current?.querySelector("#belt-group");
    const docs   = [0,1,2].map(i => svgRef.current?.querySelector(`#doc-${i}`));
    const gear1  = svgRef.current?.querySelector("#gear1");
    const gear2  = svgRef.current?.querySelector("#gear2");
    const gear3  = svgRef.current?.querySelector("#gear3");
    const clock  = svgRef.current?.querySelector("#clock-hands");
    const stripe = svgRef.current?.querySelector("#belt-stripes");

    // Belt constants
    const BX=360, BY=500, BW=1200, BH=120;
    const r = BH/2;
    const stripeSpacing = (BW - r*2) / 22;
    const stripeTotal   = (BW - r*2) + stripeSpacing;

    const animate = () => {
      const frame = frameRef.current;

      // Belt stripes
      if (stripe) {
        const offset = (frame * 2.5) % stripeTotal;
        const lines = stripe.querySelectorAll("line");
        lines.forEach((line, i) => {
          const sx = BX + r + ((i * stripeSpacing - offset + stripeTotal * 10) % stripeTotal);
          line.setAttribute("x1", sx);
          line.setAttribute("x2", sx);
        });
      }

      // Documents
      docs.forEach((doc, i) => {
        if (!doc) return;
        const travel = (frame * 2.4 + i * (BW / 3.2)) % (BW - BH);
        const x = BX + r + 30 + travel;
        const visible = x > BX + r + 10 && x < BX + BW - r - 30;
        const rotation = Math.sin(frame * 0.05 + i * 1.3) * 2;
        doc.setAttribute("transform", `translate(${x},${BY - 52}) rotate(${rotation})`);
        doc.setAttribute("opacity", visible ? "1" : "0");
      });

      // Gears
      if (gear1) gear1.setAttribute("transform", `rotate(${frame * 1.4} 1680 510)`);
      if (gear2) gear2.setAttribute("transform", `rotate(${-frame * 2.1} 1810 618)`);
      if (gear3) gear3.setAttribute("transform", `rotate(${frame * 0.85} 1578 598)`);

      // Clock hands
      if (clock) {
        const angle     = (frame / FPS) * Math.PI * 2 * 1.2;
        const hourAngle = angle / 10;
        const cx = 1820, cy = 390, cr = 78;
        const minX2  = cx + Math.cos(angle - Math.PI/2) * cr * 0.72;
        const minY2  = cy + Math.sin(angle - Math.PI/2) * cr * 0.72;
        const hourX2 = cx + Math.cos(hourAngle - Math.PI/2) * cr * 0.5;
        const hourY2 = cy + Math.sin(hourAngle - Math.PI/2) * cr * 0.5;
        const minHand  = clock.querySelector("#min-hand");
        const hourHand = clock.querySelector("#hour-hand");
        if (minHand)  { minHand.setAttribute("x2",  minX2);  minHand.setAttribute("y2",  minY2); }
        if (hourHand) { hourHand.setAttribute("x2", hourX2); hourHand.setAttribute("y2", hourY2); }
      }

      frameRef.current += 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Belt constants for initial render
  const BX=360, BY=500, BW=1200, BH=120;
  const r = BH/2;
  const stripeSpacing = (BW - r*2) / 22;
  const stripeCount = 25;

  // Gear teeth helper
  const gearPath = (cx, cy, gr, teeth) => {
    const th = gr * 0.28;
    const pts = [];
    for (let i = 0; i < teeth; i++) {
      const a0 = (i / teeth) * Math.PI * 2;
      const a1 = ((i+0.2)/teeth)*Math.PI*2;
      const a2 = ((i+0.5)/teeth)*Math.PI*2;
      const a3 = ((i+0.7)/teeth)*Math.PI*2;
      pts.push(
        `${cx+Math.cos(a0)*gr},${cy+Math.sin(a0)*gr}`,
        `${cx+Math.cos(a1)*(gr+th)},${cy+Math.sin(a1)*(gr+th)}`,
        `${cx+Math.cos(a2)*(gr+th)},${cy+Math.sin(a2)*(gr+th)}`,
        `${cx+Math.cos(a3)*gr},${cy+Math.sin(a3)*gr}`,
      );
    }
    return pts.join(" ");
  };

  const GearSVG = ({ id, cx, cy, gr, teeth, sw }) => (
    <g id={id} style={{ filter:"drop-shadow(0 0 12px hsla(174,78%,41%,0.55))" }}>
      <polygon points={gearPath(cx,cy,gr,teeth)} fill="none" stroke={TEAL} strokeWidth={sw} strokeLinejoin="round"/>
      <circle cx={cx} cy={cy} r={gr*0.42} fill="none" stroke={TEAL} strokeWidth={sw*0.8}/>
      <circle cx={cx} cy={cy} r={gr*0.13} fill={TEAL} style={{ filter:"drop-shadow(0 0 6px hsl(174,78%,41%))" }}/>
    </g>
  );

  const DocSVG = ({ id }) => {
    const w=70, h=88;
    return (
      <g id={id} opacity="0" style={{ filter:"drop-shadow(0 0 12px hsla(174,78%,41%,0.6))" }}>
        <rect x={-w/2} y={-h/2} width={w} height={h} rx={5}
          fill="hsla(192,30%,8%,0.75)" stroke={TEAL} strokeWidth={2.5}/>
        <path d={`M${w/2-14},${-h/2} L${w/2},${-h/2+14} L${w/2-14},${-h/2+14} Z`}
          fill="none" stroke={TEAL} strokeWidth={2}/>
        <line x1={-w/2+10} y1={-h/2+24} x2={w/2-14} y2={-h/2+24} stroke={TEAL} strokeWidth={2} opacity={0.9}/>
        <line x1={-w/2+10} y1={-h/2+36} x2={w/2-14} y2={-h/2+36} stroke={TEAL} strokeWidth={2} opacity={0.9}/>
        <line x1={-w/2+10} y1={-h/2+48} x2={w/2-22} y2={-h/2+48} stroke={TEAL} strokeWidth={2} opacity={0.55}/>
        <line x1={-w/2+10} y1={-h/2+60} x2={w/2-18} y2={-h/2+60} stroke={TEAL} strokeWidth={2} opacity={0.35}/>
      </g>
    );
  };

  return (
    <div style={{ width:"100%", height:"100%", position:"relative" }}>
      <svg
        ref={svgRef}
        width="100%" height="100%"
        viewBox="0 0 1920 1080"
        style={{ position:"absolute", inset:0 }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="bc">
            <rect x={BX+r} y={BY+3} width={BW-r*2} height={BH-6}/>
          </clipPath>
          <filter id="beltGlow">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── BELT ── */}
        <g id="belt-group" style={{ filter:"drop-shadow(0 0 18px hsla(174,78%,41%,0.4))" }}>
          <rect x={BX} y={BY} width={BW} height={BH} rx={r}
            fill="hsla(192,30%,8%,0.55)" stroke={TEAL} strokeWidth={2.5}/>

          {/* Stripes */}
          <g id="belt-stripes" clipPath="url(#bc)">
            {Array.from({length:stripeCount}).map((_,i)=>(
              <line key={i} x1={BX+r+i*stripeSpacing} y1={BY+5} x2={BX+r+i*stripeSpacing} y2={BY+BH-5}
                stroke={TEAL} strokeWidth={2} opacity={0.2}/>
            ))}
          </g>

          {/* Wheels */}
          {[BX+r, BX+BW-r].map((wx,i)=>(
            <g key={i}>
              <circle cx={wx} cy={BY+r} r={r}
                fill="hsla(192,30%,8%,0.75)" stroke={TEAL} strokeWidth={2.5}/>
              <circle cx={wx} cy={BY+r} r={r*0.35}
                fill={TEAL} opacity={0.7}
                style={{ filter:"drop-shadow(0 0 8px hsl(174,78%,41%))" }}/>
              {Array.from({length:6}).map((_,j)=>{
                const a=(j/6)*Math.PI*2;
                return <line key={j}
                  x1={wx+Math.cos(a)*r*0.35} y1={BY+r+Math.sin(a)*r*0.35}
                  x2={wx+Math.cos(a)*r*0.8}  y2={BY+r+Math.sin(a)*r*0.8}
                  stroke={TEAL} strokeWidth={1.5} opacity={0.4}/>;
              })}
            </g>
          ))}

          {/* Legs */}
          {[[BX+BW*0.28, BX+BW*0.22],[BX+BW*0.72, BX+BW*0.78]].map(([tx,bx],i)=>(
            <g key={i}>
              <line x1={tx} y1={BY+BH} x2={bx} y2={BY+BH+70} stroke={TEAL} strokeWidth={3}/>
              <line x1={bx-30} y1={BY+BH+70} x2={bx+30} y2={BY+BH+70} stroke={TEAL} strokeWidth={3}/>
            </g>
          ))}
        </g>

        {/* ── DOCUMENTS ── */}
        <DocSVG id="doc-0"/>
        <DocSVG id="doc-1"/>
        <DocSVG id="doc-2"/>

        {/* ── GEARS ── */}
        <GearSVG id="gear1" cx={1680} cy={510} gr={95} teeth={12} sw={3}/>
        <GearSVG id="gear2" cx={1810} cy={618} gr={52} teeth={8}  sw={2.5}/>
        <g opacity={0.5}><GearSVG id="gear3" cx={1578} cy={598} gr={34} teeth={6} sw={2}/></g>

        {/* ── CLOCK ── */}
        <g style={{ filter:"drop-shadow(0 0 12px hsla(174,78%,41%,0.55))" }}>
          <circle cx={1820} cy={390} r={78} fill="none" stroke={TEAL} strokeWidth={2.5}/>
          {Array.from({length:12}).map((_,i)=>{
            const a=(i/12)*Math.PI*2-Math.PI/2;
            const main=i%3===0;
            return <line key={i}
              x1={1820+Math.cos(a)*(78-(main?10:5))} y1={390+Math.sin(a)*(78-(main?10:5))}
              x2={1820+Math.cos(a)*76}               y2={390+Math.sin(a)*76}
              stroke={TEAL} strokeWidth={main?2.5:1.2} opacity={main?0.9:0.4}/>;
          })}
          <g id="clock-hands">
            <line id="hour-hand" x1={1820} y1={390} x2={1820} y2={351}
              stroke={TEAL} strokeWidth={3.5} strokeLinecap="round"/>
            <line id="min-hand"  x1={1820} y1={390} x2={1820} y2={334}
              stroke={TEAL2} strokeWidth={2} strokeLinecap="round"/>
          </g>
          <circle cx={1820} cy={390} r={5} fill={TEAL}/>
        </g>

      </svg>
    </div>
  );
}