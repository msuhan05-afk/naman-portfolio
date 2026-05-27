"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PALETTE = {
  sunsetTop: "#D9824A", sunsetMid: "#E8A56B", sunsetGlow: "#F2C58A",
  mauve: "#7A5A7A", purple: "#4D3A6A",
  navy: "#1F2D4F", deepNavy: "#162042",
  sun: "#F5C77B", star: "#E8E2D0",
  text: "#F0EBD8", textDim: "#F0EBD8AA",
  wood: "#3D2818", woodLight: "#5C3A2A",
  signWood: "#3D2A1A", signWoodLight: "#5C3F26",
  silSunset: "#5A2F40", silTrans: "#3A2A4A", silNight: "#0F1A35",
};

const MILES = [
  { year: "2000",        label: ["Born in", "Jammu"],            icon: "person", x: 7  },
  { year: "2005",        label: ["Moved to", "Delhi"],           icon: "gate",   x: 20 },
  { year: "2008 – 2012", label: ["B.Tech in", "Delhi"],          icon: "cap",    x: 33 },
  { year: "2017",        label: ["Started", "Checkae Studio"],   icon: "studio", x: 50 },
  { year: "2019",        label: ["Crossed over", "the Waters"],  icon: "waves",  x: 65 },
  { year: "2020 – Now",  label: ["London · HCI", "Masters"],     icon: "rocket", x: 80 },
  { year: "Now",         label: ["Building", "Products"],        icon: "rocket", x: 92 },
];

function MileIcon({ kind, size = 22, color = PALETTE.text }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.7, strokeLinecap: "round" };
  if (kind === "person") return (<svg {...props}><circle cx="12" cy="6" r="3"/><line x1="12" y1="9" x2="12" y2="16"/><line x1="12" y1="11" x2="8" y2="14"/><line x1="12" y1="11" x2="16" y2="14"/><line x1="12" y1="16" x2="9" y2="20"/><line x1="12" y1="16" x2="15" y2="20"/></svg>);
  if (kind === "gate")   return (<svg {...props}><path d="M5 20 L5 9 Q5 4 12 4 Q19 4 19 9 L19 20"/><line x1="5" y1="11" x2="19" y2="11"/></svg>);
  if (kind === "cap")    return (<svg {...props}><path d="M2 10 L12 5 L22 10 L12 15 Z"/><path d="M6 12 L6 17 Q12 21 18 17 L18 12"/></svg>);
  if (kind === "studio") return (<svg {...props}><circle cx="12" cy="12" r="8"/><path d="M16 8 Q12 6 9 9 Q6 12 9 15"/></svg>);
  if (kind === "waves")  return (<svg {...props}><path d="M2 9 Q6 6 10 9 T18 9 T22 9"/><path d="M2 14 Q6 11 10 14 T18 14 T22 14"/></svg>);
  if (kind === "rocket") return (<svg {...props}><path d="M12 2 Q16 6 16 12 L16 16 L8 16 L8 12 Q8 6 12 2 Z"/><circle cx="12" cy="10" r="1.5"/></svg>);
  return null;
}

function Sign({ year, label, icon, postHeight = 90 }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative px-4 py-2.5 rounded flex items-center gap-3" style={{
        background: `linear-gradient(to bottom, ${PALETTE.signWoodLight}, ${PALETTE.signWood})`,
        boxShadow: `0 4px 0 ${PALETTE.wood}, 0 10px 20px rgba(0,0,0,0.4)`,
        minWidth: "150px",
      }}>
        <MileIcon kind={icon} size={22} color={PALETTE.text} />
        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/70">{year}</p>
          {label.map((l, i) => (<p key={i} className="text-[11px] font-display leading-tight whitespace-nowrap text-white">{l}</p>))}
        </div>
      </div>
      <div style={{ width: 3, height: postHeight, background: PALETTE.wood }} />
    </div>
  );
}

function Character() {
  return (
    <svg width="32" height="50" viewBox="0 0 32 50" fill="none" stroke={PALETTE.text} strokeWidth="2" strokeLinecap="round">
      <circle cx="16" cy="8" r="5" />
      <line x1="16" y1="13" x2="16" y2="30" />
      <line x1="16" y1="18" x2="10" y2="24" />
      <line x1="16" y1="18" x2="22" y2="24" />
      <line x1="16" y1="30" x2="11" y2="44" />
      <line x1="16" y1="30" x2="21" y2="44" />
    </svg>
  );
}

export default function JourneyHero() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const PANO = 280;

  useGSAP(() => {
    if (!rootRef.current) return;
    const distance = ((PANO - 100) / 100) * window.innerWidth;
    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: `+=${distance * 1.1}`,
      pin: true,
      scrub: 0.7,
      onUpdate: (self) => gsap.set(trackRef.current, { x: -self.progress * distance }),
    });
    return () => st.kill();
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      id="journey"
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: `linear-gradient(to right,
          ${PALETTE.sunsetTop} 0%, ${PALETTE.sunsetMid} 20%, ${PALETTE.sunsetGlow} 35%,
          ${PALETTE.mauve} 50%, ${PALETTE.purple} 60%, ${PALETTE.navy} 80%, ${PALETTE.deepNavy} 100%)`,
      }}
    >
      <div className="absolute top-8 left-8 z-30 pointer-events-none">
        <h2 className="font-display leading-none tracking-tightest" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: PALETTE.text }}>
          A Journey
        </h2>
        <p className="mt-2 text-sm tracking-wide italic" style={{ color: PALETTE.textDim, fontFamily: "var(--font-instrument), serif" }}>
          Jammu · Delhi · London · Now
        </p>
      </div>

      <div ref={trackRef} className="absolute inset-0 will-change-transform" style={{ width: `${PANO}vw` }}>
        {/* Sun */}
        <div className="absolute rounded-full" style={{
          left: "16%", top: "12%", width: 200, height: 200,
          background: `radial-gradient(circle, ${PALETTE.sun} 0%, ${PALETTE.sun}cc 35%, ${PALETTE.sunsetGlow}55 60%, transparent 75%)`,
          boxShadow: `0 0 140px ${PALETTE.sun}88`,
        }} />
        {/* Moon */}
        <div className="absolute rounded-full" style={{
          left: "78%", top: "10%", width: 120, height: 120,
          background: PALETTE.star, opacity: 0.85,
          boxShadow: `0 0 80px ${PALETTE.star}55`,
        }} />

        {/* Panoramic silhouettes */}
        <svg viewBox="0 0 4000 600" className="absolute inset-x-0 bottom-0 w-full h-full" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#2A3F6F" stopOpacity="0.85" />
              <stop offset="60%"  stopColor={PALETTE.deepNavy} stopOpacity="0.96" />
              <stop offset="100%" stopColor="#0C1020" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="waterShimmer" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={PALETTE.star} stopOpacity="0" />
              <stop offset="40%"  stopColor={PALETTE.star} stopOpacity="0.25" />
              <stop offset="60%"  stopColor={PALETTE.star} stopOpacity="0.25" />
              <stop offset="100%" stopColor={PALETTE.star} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={PALETTE.sunsetGlow} stopOpacity="0.5" />
              <stop offset="100%" stopColor={PALETTE.sunsetMid}  stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ── Scattered stars (right sky, navy portion) ────────── */}
          {[
            [2100,80],[2250,40],[2380,110],[2500,55],[2640,90],[2760,35],[2900,70],
            [3050,50],[3200,100],[3350,42],[3500,78],[3650,55],[3800,88],[3920,45],
            [2180,150],[2440,170],[2700,135],[2950,165],[3150,140],[3400,175],[3700,150],
            [2060,200],[2320,220],[2580,195],[2840,215],[3100,200],[3360,218],[3600,195],[3860,210],
          ].map(([sx, sy], i) => (
            <circle key={`star-${i}`} cx={sx} cy={sy} r={i%5===0 ? 1.8 : i%3===0 ? 1.2 : 0.8}
              fill={PALETTE.star} opacity={0.4 + (i%4)*0.15} />
          ))}

          {/* ── Clouds (sunset side warm, night side cool) ───────── */}
          {/* warm puff clouds — Jammu/Delhi belt */}
          {[[120,90,160,28],[300,70,200,22],[550,100,180,26],[850,80,220,30],[1100,65,170,25]].map(([cx,cy,rw,rh],i)=>(
            <ellipse key={`cwarm-${i}`} cx={cx} cy={cy} rx={rw} ry={rh}
              fill={PALETTE.sunsetGlow} opacity={0.18 - i*0.01} />
          ))}
          {/* cool/silver clouds — London belt */}
          {[[2950,100,190,24],[3200,75,160,20],[3500,90,200,26],[3750,68,150,22]].map(([cx,cy,rw,rh],i)=>(
            <ellipse key={`ccool-${i}`} cx={cx} cy={cy} rx={rw} ry={rh}
              fill={PALETTE.star} opacity={0.09 + i*0.01} />
          ))}

          {/* ── Jammu — layered Himalayan mountains ─────────────── */}
          {/* far snow-capped peaks */}
          <g opacity="0.45">
            <path d="M0 380 L60 220 L130 310 L230 180 L330 280 L440 210 L540 295 L640 248 L740 320 L0 600 Z" fill={PALETTE.mauve} />
            {/* snow caps */}
            <path d="M52 232 L60 220 L68 232 L60 242 Z" fill={PALETTE.star} opacity="0.9" />
            <path d="M222 192 L230 180 L238 192 L230 200 Z" fill={PALETTE.star} opacity="0.9" />
            <path d="M432 222 L440 210 L448 222 L440 230 Z" fill={PALETTE.star} opacity="0.9" />
            {/* snowy flanks */}
            <path d="M52 232 L60 220 L75 238 Z" fill={PALETTE.star} opacity="0.4" />
            <path d="M222 192 L230 180 L248 200 Z" fill={PALETTE.star} opacity="0.4" />
          </g>
          {/* mid-range mountains */}
          <g opacity="0.7">
            <path d="M0 460 L110 335 L250 420 L390 308 L510 410 L640 348 L760 428 L0 600 Z" fill={PALETTE.silSunset} />
            {/* snow highlights */}
            <path d="M104 343 L110 335 L116 343 L110 350 Z" fill={PALETTE.sunsetGlow} opacity="0.7" />
            <path d="M384 316 L390 308 L396 316 L390 322 Z" fill={PALETTE.sunsetGlow} opacity="0.7" />
          </g>
          {/* foothills / near ground */}
          <g opacity="0.8">
            <path d="M0 520 L90 470 L200 510 L320 458 L450 500 L580 468 L700 508 L760 490 L0 600 Z" fill="#3D1F2D" />
          </g>

          {/* Jammu temple — Raghunath style */}
          <g fill="#2A1520" transform="translate(200, 375)">
            {/* main shikhara */}
            <rect x="10" y="30" width="34" height="55" />
            <path d="M5 30 L27 -5 L49 30 Z" />
            <rect x="25" y="-26" width="4" height="23" />
            {/* mandap */}
            <rect x="0" y="55" width="54" height="18" />
            <path d="M-3 55 L27 42 L57 55 Z" />
            {/* steps */}
            <rect x="16" y="73" width="22" height="12" />
          </g>

          {/* pine trees — Jammu hillside */}
          {[370, 405, 445, 490, 535, 590, 635].map((x, i) => (
            <g key={`pine-${i}`} transform={`translate(${x}, ${462 - (i%3)*5})`}>
              <path d="M0 -4 L-7 16 L-3 16 L-8 32 L-4 32 L-10 50 L10 50 L4 32 L8 32 L3 16 L7 16 Z"
                fill="#1A1015" opacity="0.88" />
              <rect x="-2" y="50" width="4" height="7" fill="#1A1015" />
            </g>
          ))}

          {/* ── Road: Jammu → Delhi (winding highway) ───────────── */}
          {/* road bed */}
          <path d="M680 558 Q800 548 940 542 Q1100 538 1280 544 Q1450 548 1600 540"
            stroke="#1A1010" strokeWidth="18" fill="none" opacity="0.65" strokeLinecap="round" />
          {/* road surface */}
          <path d="M680 558 Q800 548 940 542 Q1100 538 1280 544 Q1450 548 1600 540"
            stroke="#2A1818" strokeWidth="14" fill="none" opacity="0.9" strokeLinecap="round" />
          {/* centre dashes */}
          {[690,750,810,870,930,990,1050,1110,1170,1230,1290,1350,1410,1480,1550].map((rx,i)=>(
            <line key={`dash-${i}`} x1={rx} y1={544+(i%3)} x2={rx+28} y2={544+(i%3)}
              stroke={PALETTE.sunsetGlow} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
          ))}

          {/* ── Bus on road ──────────────────────────────────────── */}
          <g transform="translate(1040, 516)">
            {/* body */}
            <rect x="0" y="0" width="72" height="28" rx="4" fill="#8B2020" stroke="#C04040" strokeWidth="1.2" />
            {/* front nose */}
            <path d="M72 0 Q84 4 84 14 Q84 24 72 28 Z" fill="#8B2020" stroke="#C04040" strokeWidth="1" />
            {/* windows */}
            {[6,22,38,54].map((wx)=>(
              <rect key={wx} x={wx} y="5" width="12" height="10" rx="1.5"
                fill={PALETTE.sunsetGlow} opacity="0.7" />
            ))}
            {/* headlight */}
            <circle cx="82" cy="14" r="3" fill={PALETTE.sun} opacity="0.9" />
            {/* wheels */}
            <circle cx="14" cy="29" r="7" fill="#111" stroke="#444" strokeWidth="1.5" />
            <circle cx="14" cy="29" r="3" fill="#333" />
            <circle cx="62" cy="29" r="7" fill="#111" stroke="#444" strokeWidth="1.5" />
            <circle cx="62" cy="29" r="3" fill="#333" />
            {/* destination board */}
            <rect x="4" y="1" width="22" height="5" rx="1" fill="#222" />
            <text x="5" y="5.5" fontSize="3.5" fill={PALETTE.sunsetGlow} fontFamily="monospace">NEW DELHI</text>
          </g>

          {/* Delhi skyline */}
          <g opacity="0.7">
            {/* background haze buildings */}
            {[760,820,890,950,1030,1095,1175,1250,1320,1390].map((bx,i)=>(
              <rect key={`del-${i}`} x={bx} y={390+(i%4)*18} width={48+(i%3)*16} height={210-(i%4)*15}
                fill={PALETTE.silSunset} opacity={0.55 + (i%2)*0.1} />
            ))}
            {/* Qutub Minar */}
            <g fill={PALETTE.silSunset} transform="translate(1430, 300)">
              <path d="M20 0 Q26 30 28 80 L18 80 Q14 30 12 0 Z" />
              <rect x="10" y="78" width="20" height="12" />
              <path d="M8 90 Q20 96 32 90 L32 105 L8 105 Z" />
              <rect x="5" y="103" width="30" height="100" />
            </g>
            {/* India Gate arch */}
            <g fill={PALETTE.silTrans} transform="translate(1560, 385)">
              <rect x="0" y="0" width="12" height="110" />
              <rect x="48" y="0" width="12" height="110" />
              <path d="M0 0 Q30 -35 60 0" fill="none" stroke={PALETTE.silTrans} strokeWidth="10" />
              <rect x="8" y="-12" width="44" height="10" />
            </g>
          </g>

          {/* Office buildings — B.Tech / Checkae era */}
          <g fill={PALETTE.silTrans} opacity="0.65">
            <rect x="1680" y="360" width="90" height="240" />
            <rect x="1780" y="380" width="70" height="220" />
            <rect x="1860" y="350" width="110" height="250" />
            <rect x="1980" y="370" width="80" height="230" />
            {Array.from({length:8}).map((_,r)=>Array.from({length:5}).map((_,c)=>(
              <rect key={`w-${r}-${c}`} x={1692+c*16} y={372+r*26} width="10" height="14"
                fill={PALETTE.sun} opacity={(r+c)%3===0 ? 0.55 : 0.12} />
            )))}
          </g>
          {/* Studio era */}
          <g fill={PALETTE.silTrans} opacity="0.55">
            <rect x="2000" y="418" width="88" height="182" />
            <rect x="2098" y="398" width="98" height="202" />
            {/* signage glow */}
            <rect x="2018" y="425" width="52" height="8" fill={PALETTE.sun} opacity="0.2" />
          </g>

          {/* ── Ocean / Waters crossing ──────────────────────────── */}
          {/* deep water body */}
          <rect x="2190" y="438" width="720" height="162" fill="url(#waterGrad)" />
          {/* horizon shimmer */}
          <rect x="2190" y="440" width="720" height="8" fill="url(#waterShimmer)" opacity="0.8" />
          {/* moon column reflection */}
          <rect x="2546" y="440" width="8" height="160" fill={PALETTE.star} opacity="0.06" />
          <ellipse cx="2550" cy="456" rx="70" ry="5" fill={PALETTE.star} opacity="0.3" />
          <ellipse cx="2550" cy="476" rx="48" ry="3.5" fill={PALETTE.star} opacity="0.22" />
          <ellipse cx="2550" cy="492" rx="32" ry="2.5" fill={PALETTE.star} opacity="0.14" />
          {/* distant shore / horizon mist */}
          <path d="M2190 445 Q2350 435 2550 442 Q2750 448 2910 440" stroke={PALETTE.star}
            strokeWidth="1" fill="none" opacity="0.12" />
          {/* layered waves */}
          <g fill="none" strokeLinecap="round">
            <path d="M2190 466 Q2270 455 2360 466 T2530 466 T2700 466 T2870 466 T2910 466"
              stroke={PALETTE.star} strokeWidth="1.6" opacity="0.5" />
            <path d="M2190 486 Q2285 475 2385 486 T2575 486 T2765 486 T2910 486"
              stroke="#6080B0" strokeWidth="1.3" opacity="0.55" />
            <path d="M2190 510 Q2300 499 2410 510 T2620 510 T2830 510 T2910 510"
              stroke="#4A6090" strokeWidth="1.1" opacity="0.45" />
            <path d="M2190 538 Q2315 527 2440 538 T2670 538 T2900 538"
              stroke="#3A5080" strokeWidth="0.9" opacity="0.35" />
          </g>
          {/* sailboat */}
          <g transform="translate(2545, 445)">
            <line x1="0" y1="0" x2="0" y2="-40" stroke={PALETTE.text} strokeWidth="1.8" />
            <path d="M2 -38 Q28 -20 2 -2 Z" fill={PALETTE.text} opacity="0.9" />
            <path d="M-2 -36 Q-20 -22 -2 -4 Z" fill={PALETTE.text} opacity="0.5" />
            <path d="M-22 4 Q0 18 30 14 Q36 14 38 6 Z" fill={PALETTE.woodLight} stroke={PALETTE.text} strokeWidth="1.2" />
            <path d="M-36 20 q12-3 24 0 t24 0 t24 0" stroke={PALETTE.text} strokeWidth="0.9" fill="none" opacity="0.35" />
          </g>
          {/* second distant ship */}
          <g transform="translate(2760, 452)" opacity="0.45">
            <line x1="0" y1="0" x2="0" y2="-22" stroke={PALETTE.text} strokeWidth="1.2" />
            <path d="M1 -20 Q14 -11 1 -2 Z" fill={PALETTE.text} />
            <path d="M-12 3 Q0 10 16 8 Q20 8 22 4 Z" fill={PALETTE.woodLight} stroke={PALETTE.text} strokeWidth="1" />
          </g>
          {/* fog banks */}
          <ellipse cx="2380" cy="440" rx="150" ry="10" fill={PALETTE.text} opacity="0.04" />
          <ellipse cx="2620" cy="436" rx="180" ry="12" fill={PALETTE.text} opacity="0.05" />
          <ellipse cx="2820" cy="442" rx="120" ry="9" fill={PALETTE.text} opacity="0.04" />

          {/* ── London landmarks ─────────────────────────────────── */}
          {/* Thames river */}
          <rect x="2900" y="520" width="480" height="80" fill="#0F1928" opacity="0.7" />
          <path d="M2900 520 Q3140 510 3380 522" stroke="#1E3050" strokeWidth="2" fill="none" opacity="0.6" />
          {/* Big Ben */}
          <g fill={PALETTE.silNight} transform="translate(2920, 278)">
            <rect x="0" y="0" width="42" height="244" />
            <rect x="-5" y="0" width="52" height="20" />
            {/* clock face */}
            <circle cx="21" cy="52" r="15" fill={PALETTE.star} opacity="0.88" />
            <line x1="21" y1="52" x2="21" y2="44" stroke={PALETTE.silNight} strokeWidth="2.5" />
            <line x1="21" y1="52" x2="28" y2="55" stroke={PALETTE.silNight} strokeWidth="2" />
            {/* spire base & spire */}
            <path d="M-6 -2 L21 -52 L48 -2 Z" />
            <line x1="21" y1="-52" x2="21" y2="-70" stroke={PALETTE.silNight} strokeWidth="3" />
            {/* windows */}
            {[100,140,180,210].map((wy)=>(<rect key={wy} x="16" y={wy} width="10" height="14" fill={PALETTE.sun} opacity="0.35" />))}
          </g>
          {/* Westminster Bridge */}
          <rect x="2905" y="516" width="480" height="10" fill={PALETTE.silNight} opacity="0.6" />
          {[2940,2980,3020,3060,3100,3140,3180,3220,3260,3300,3340].map((bx)=>(
            <rect key={bx} x={bx} y="510" width="8" height="18" fill={PALETTE.silNight} opacity="0.5" />
          ))}
          {/* London Eye */}
          <g transform="translate(3120, 360)" fill="none" stroke={PALETTE.silNight} strokeWidth="3" opacity="0.85">
            <circle cx="0" cy="0" r="72" />
            {Array.from({length:12}).map((_,i)=>{
              const a=(i/12)*Math.PI*2;
              return <line key={i} x1="0" y1="0" x2={Math.cos(a)*72} y2={Math.sin(a)*72} strokeWidth="1.5" />;
            })}
            {/* gondolas */}
            {Array.from({length:12}).map((_,i)=>{
              const a=(i/12)*Math.PI*2;
              return <circle key={`g${i}`} cx={Math.cos(a)*72} cy={Math.sin(a)*72} r="4"
                fill={PALETTE.silNight} stroke={PALETTE.text} strokeWidth="1" opacity="0.6" />;
            })}
            <line x1="0" y1="72" x2="0" y2="100" strokeWidth="4" />
            <rect x="-18" y="96" width="36" height="12" fill={PALETTE.silNight} />
          </g>
          {/* Shard */}
          <path d="M3380 520 L3398 220 L3410 520 Z" fill={PALETTE.silNight} opacity="0.8" />
          <path d="M3398 220 L3402 320 L3410 520 Z" fill="#1A2840" opacity="0.5" />
          {/* Night-time window glow on Shard */}
          {[420,460,490,510].map((sy)=>(
            <rect key={sy} x="3392" y={sy} width="5" height="6" fill={PALETTE.sun} opacity="0.3" />
          ))}

          {/* ── Rocket / Future ───────────────────────────────────── */}
          <g transform="translate(3720, 175)" filter="url(#glow)">
            <ellipse cx="30" cy="310" rx="22" ry="90" fill={PALETTE.sun} opacity="0.15" />
            <path d="M30 0 Q44 22 44 64 L44 96 L16 96 L16 64 Q16 22 30 0 Z"
              fill={PALETTE.silNight} stroke={PALETTE.text} strokeWidth="1.5" />
            <circle cx="30" cy="42" r="5" fill={PALETTE.sun} opacity="0.9" />
            {/* fins */}
            <path d="M16 80 L6 96 L16 96 Z" fill={PALETTE.silNight} stroke={PALETTE.text} strokeWidth="1" />
            <path d="M44 80 L54 96 L44 96 Z" fill={PALETTE.silNight} stroke={PALETTE.text} strokeWidth="1" />
            {/* flame */}
            <path d="M22 96 Q30 128 38 96 Z" fill={PALETTE.sun} opacity="0.9" />
            <path d="M25 96 Q30 118 35 96 Z" fill={PALETTE.sunsetGlow} opacity="0.8" />
          </g>
        </svg>

        {/* Continuous platform */}
        <div className="absolute inset-x-0 bottom-0" style={{
          height: "20%",
          background: `linear-gradient(to bottom, ${PALETTE.woodLight} 0%, ${PALETTE.wood} 100%)`,
          borderTop: `2px solid ${PALETTE.woodLight}`,
        }} />

        {/* Milestones */}
        {MILES.map((m, i) => (
          <div key={i} className="absolute" style={{ left: `${m.x}%`, bottom: "20%", transform: "translateX(-50%)" }}>
            <div className="absolute" style={{ bottom: "60px", left: "50%", transform: "translateX(-50%)" }}>
              <Sign year={m.year} label={m.label} icon={m.icon} />
            </div>
            <div className="flex justify-center">
              <Character />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
