"use client";
import { useRef, useState, useEffect, useCallback } from "react";

const isVideo = (url) => /\.(mp4|mov|webm|m4v)$/i.test(url || "");

function ProgressBar({ videoRef, hasVideo }) {
  const [pct, setPct] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setPct(v.duration ? v.currentTime / v.duration : 0);
    const onMeta = () => setDur(v.duration || 0);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
    };
  }, [videoRef]);

  useEffect(() => {
    if (hasVideo) return;
    setPct(0);
    const id = setInterval(() => setPct((p) => (p >= 1 ? 0 : p + 0.0008)), 50);
    return () => clearInterval(id);
  }, [hasVideo]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
  };

  return (
    <div className="flex items-center gap-3 w-full select-none">
      <span className="text-[10px] tabular text-white/40 w-8 shrink-0">{fmt(pct * dur)}</span>
      <div className="flex-1 h-[3px] bg-white/10 rounded-full cursor-pointer group relative" onClick={seek}>
        <div className="absolute inset-y-0 left-0 rounded-full bg-[#FF0000]" style={{ width: `${pct * 100}%` }} />
      </div>
      <span className="text-[10px] tabular text-white/40 w-8 text-right shrink-0">{fmt(dur || 240)}</span>
    </div>
  );
}

function QueueItem({ item, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors duration-300 ${
        isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
      }`}
    >
      <div className="w-10 h-10 rounded-[3px] shrink-0 relative overflow-hidden" style={{ background: item.swatch }}>
        {isActive && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><span className="text-[8px] text-white/90">▶</span></div>}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className={`text-[12px] font-display tracking-tight truncate ${isActive ? "text-white" : "text-white/55 group-hover:text-white/80"}`}>
          {item.title}
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 truncate mt-0.5">
          {(item.kind || "").split("·")[0].trim()}
        </p>
      </div>
    </button>
  );
}

export default function VibeCode({ items = [] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const p = items[Math.min(active, items.length - 1)];
  const hasVideo = isVideo(p?.media);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  useEffect(() => {
    setPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  }, [active]);

  if (!items.length) return null;

  return (
    <section id="vibeCode" className="relative px-5 md:px-8 py-28 md:py-40 border-t hairline border-t-[1px]" style={{ background: "#0C090B" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span className="w-8 h-px bg-white/20" />
            <span>Vibe Code · Demo Reel</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
              <span className="text-[#FF0000]">Live</span>
            </span>
          </div>
          <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-white/25 tabular">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-stretch">
          <div className="md:col-span-8 relative aspect-video rounded-sm overflow-hidden" style={{ background: "#282828" }}>
            {hasVideo ? (
              <video ref={videoRef} src={p.media} className="absolute inset-0 w-full h-full object-cover" loop playsInline onClick={togglePlay} />
            ) : (
              <div className="absolute inset-0" style={{ background: p.swatch }} onClick={togglePlay} />
            )}
            <div className="absolute inset-0 pointer-events-none [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_4px)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
            <div className="absolute inset-x-5 top-5 flex items-center justify-between z-10 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">{p.kind}</span>
              <span className="text-[10px] tabular text-white/50">{p.year}</span>
            </div>
            <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center z-10 group" aria-label={playing ? "Pause" : "Play"}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-white/30 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                {playing ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                ) : (
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z" /></svg>
                )}
              </div>
            </button>
            <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4 pt-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-1">{p.kind}</p>
              <p className="font-display text-xl md:text-2xl text-white tracking-tight mb-3 leading-tight">{p.title}</p>
              <div className="pointer-events-auto"><ProgressBar videoRef={videoRef} hasVideo={hasVideo} /></div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-sm flex flex-col overflow-hidden" style={{ background: "#282828" }}>
            <div className="p-5 border-b border-white/[0.06]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 mb-3">{p.kind} · {p.year}</p>
              <h2 className="font-display text-2xl md:text-3xl leading-tight tracking-tight text-white mb-2">{p.title}</h2>
              {p.tagline && <p className="editorial text-white/60 text-base italic leading-snug mb-4">"{p.tagline}"</p>}
              {p.body && <p className="text-white/50 text-[13px] leading-relaxed mb-4">{p.body}</p>}
              <div className="flex flex-wrap gap-1.5">
                {(p.tags || []).map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-3 pt-3 pb-1"><span className="text-[9px] uppercase tracking-[0.3em] text-white/25">Queue</span></div>
              <ul className="px-2 pb-3">
                {items.map((item, i) => (
                  <li key={item.id || i}>
                    <QueueItem item={item} isActive={i === active} onClick={() => setActive(i)} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/20">
          <span>Interactive · No headphones required</span>
          <span className="tabular">{items.length} projects in queue</span>
        </div>
      </div>
    </section>
  );
}
