"use client";

export default function AuroraAvatar() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      <style>{`
        @keyframes aurora-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-12px) scale(1.02); }
        }
        @keyframes aurora-glow {
          0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 20px rgba(214,169,95,0.35)); }
          50%      { opacity: 1;    filter: drop-shadow(0 0 40px rgba(214,169,95,0.55)); }
        }
        .aurora-sphere {
          animation: aurora-float 4s ease-in-out infinite, aurora-glow 3s ease-in-out infinite;
        }
      `}</style>
      <svg viewBox="0 0 200 200" className="aurora-sphere w-full h-full">
        <defs>
          <radialGradient id="auroraGrad" cx="35%" cy="35%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
            <stop offset="35%"  stopColor="rgba(0,229,255,0.45)" />
            <stop offset="65%"  stopColor="rgba(167,107,207,0.4)" />
            <stop offset="100%" stopColor="rgba(100,150,255,0.15)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="85" fill="url(#auroraGrad)" />
        <g stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* eyebrows */}
          <path d="M 70 80 Q 75 70 85 75" />
          <path d="M 130 80 Q 125 70 115 75" />
          {/* eyes */}
          <circle cx="80" cy="95" r="3.5" fill="#fff" />
          <circle cx="120" cy="95" r="3.5" fill="#fff" />
          {/* L-shaped nose */}
          <path d="M 100 90 L 100 112 L 110 112" />
          {/* gentle mouth */}
          <path d="M 85 128 Q 100 138 115 128" />
        </g>
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>
    </div>
  );
}
