"use client";

export default function LoadingAnimation() {
  return (
    <>
      <style>{`
        @keyframes fazer1 { 0% { left: 0; } 100% { left: -80px; opacity: 0; } }
        @keyframes fazer2 { 0% { left: 0; } 100% { left: -100px; opacity: 0; } }
        @keyframes fazer3 { 0% { left: 0; } 100% { left: -50px; opacity: 0; } }
        @keyframes fazer4 { 0% { left: 0; } 100% { left: -150px; opacity: 0; } }
        @keyframes speeder {
          0%, 100% { transform: translate(2px, 1px) rotate(0deg); }
          25%      { transform: translate(-2px, -2px) rotate(-1deg); }
          50%      { transform: translate(-1px, 2px) rotate(1deg); }
          75%      { transform: translate(2px, -1px) rotate(-1deg); }
        }
        @keyframes lf { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes progress {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(50%); }
          100% { transform: translateX(200%); }
        }

        .ld-wrap { position: relative; width: 100%; height: 100%; }
        .loader { position: absolute; top: 50%; left: 50%; margin-left: -50px; animation: speeder 0.4s linear infinite; z-index: 10; }
        .loader > span { height: 5px; width: 35px; background: #ede8d0; position: absolute; top: -19px; left: 60px; border-radius: 2px 10px 1px 0; }
        .base span { position: absolute; width: 0; height: 0; border-top: 6px solid transparent; border-right: 100px solid #ede8d0; border-bottom: 6px solid transparent; }
        .base span:before { content: ""; height: 22px; width: 22px; border-radius: 50%; background: #ede8d0; position: absolute; right: -110px; top: -16px; }
        .base span:after { content: ""; position: absolute; width: 0; height: 0; border-right: 55px solid #ede8d0; border-bottom: 16px solid transparent; top: -16px; right: -98px; }
        .face { position: absolute; height: 12px; width: 20px; background: #ede8d0; border-radius: 20px 20px 0 0; transform: rotate(-40deg); right: -125px; top: -15px; }
        .face:after { content: ""; height: 12px; width: 12px; background: #ede8d0; right: 4px; top: 7px; position: absolute; transform: rotate(40deg); border-radius: 0 0 0 2px; }
        .loader > span > span { width: 30px; height: 1px; background: #ede8d0; position: absolute; }
        .loader > span > span:nth-child(1) { animation: fazer1 0.2s linear infinite; }
        .loader > span > span:nth-child(2) { top: 3px; animation: fazer2 0.4s linear infinite; }
        .loader > span > span:nth-child(3) { top: 1px; animation: fazer3 0.4s linear infinite; animation-delay: -1s; }
        .loader > span > span:nth-child(4) { top: 4px; animation: fazer4 1s linear infinite; animation-delay: -1s; }
        .longfazers { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .longfazers span { position: absolute; height: 2px; width: 20%; background: #ede8d0; opacity: 0.12; }
        .longfazers span:nth-child(1) { top: 20%; animation: lf 0.6s linear infinite; animation-delay: -5s; }
        .longfazers span:nth-child(2) { top: 40%; animation: lf 0.8s linear infinite; animation-delay: -1s; }
        .longfazers span:nth-child(3) { top: 60%; animation: lf 0.6s linear infinite; }
        .longfazers span:nth-child(4) { top: 80%; animation: lf 0.5s linear infinite; animation-delay: -3s; }
      `}</style>

      <div className="min-h-screen w-full flex flex-col items-center justify-center" style={{ background: "#0a0a0a", color: "#ede8d0" }}>
        <div className="relative w-full max-w-2xl h-[300px]">
          <div className="longfazers">
            <span></span><span></span><span></span><span></span>
          </div>
          <div className="loader">
            <span>
              <span></span><span></span><span></span><span></span>
            </span>
            <div className="base">
              <span></span>
              <div className="face"></div>
            </div>
          </div>
        </div>

        <div className="z-20 text-center mt-8 space-y-3">
          <h1 className="font-display text-2xl md:text-3xl tracking-tight uppercase" style={{ color: "#ede8d0" }}>
            Naman Mehra
          </h1>
          <p className="text-[10px] uppercase tracking-[0.35em] opacity-60">Loading portfolio</p>
          <div className="w-64 h-[2px] mx-auto mt-8 overflow-hidden relative" style={{ background: "rgba(237,232,208,0.15)" }}>
            <div className="h-full w-1/3 absolute" style={{ background: "#D6A95F", animation: "progress 3s ease-in-out infinite" }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
