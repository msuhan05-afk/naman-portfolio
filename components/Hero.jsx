"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuroraAvatar from "./AuroraAvatar";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const DEFAULTS = {
  name: "Naman Mehra",
  title: "HCI Designer · Creative Technologist",
  headline: ["Designing", "for", "human", "behaviour"],
  italicWord: "human",
  subtitle: "HCI designer working across product, XR and physical interfaces.",
  indexLine: "Index — Selected Works",
  location: "London, UK",
  currentlyLabel: "Currently",
  currently: "Open to roles.",
};

export default function Hero({ data }) {
  const h = { ...DEFAULTS, ...(data || {}) };
  const ref = useRef(null);

  useGSAP(() => {
    // ── Entrance animation ──────────────────────────────────────
    const words = gsap.utils.toArray(".hero-word");
    gsap.set(words,       { rotateX: -90, yPercent: 110, opacity: 0, transformOrigin: "50% 100% -50px" });
    gsap.set(".hero-meta",{ opacity: 0, y: 20 });
    gsap.set(".hero-sub", { opacity: 0, y: 30 });
    gsap.set(".hero-side",{ opacity: 0, y: 20 });
    gsap.set(".hero-scroll",{ opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(".hero-meta",  { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.1)
      .to(words,         { rotateX: 0, yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.08 }, 0.25)
      .to(".hero-sub",   { opacity: 1, y: 0, duration: 1.2 }, 0.7)
      .to(".hero-side",  { opacity: 1, y: 0, duration: 1.2 }, 0.85)
      .to(".hero-scroll",{ opacity: 1, duration: 1 }, 1.1);

    // ── Scroll fade-out ─────────────────────────────────────────
    gsap.to(".hero-3d-stage", {
      yPercent: -8, opacity: 0.2, ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top top", end: "bottom top", scrub: 0.6,
      },
    });

    // ── Neon blob parallax ──────────────────────────────────────
    gsap.to(".hero-blob-a", {
      yPercent: -30, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to(".hero-blob-b", {
      yPercent: -20, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.5 },
    });

    // ── Magnetic headline words ─────────────────────────────────
    // Each word gently follows cursor within its own bounding box
    words.forEach((word) => {
      const onMove = (e) => {
        const r = word.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top  + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        const reach = Math.max(r.width, r.height) * 2.5;
        if (dist < reach) {
          gsap.to(word, {
            x: dx * 8, y: dy * 5,
            duration: 0.6, ease: "power2.out", overwrite: "auto",
          });
        }
      };
      const onLeave = () => {
        gsap.to(word, { x: 0, y: 0, duration: 1, ease: "expo.out", overwrite: "auto" });
      };
      ref.current.addEventListener("mousemove", onMove);
      ref.current.addEventListener("mouseleave", onLeave);
    });

    // ── Subtitle letter-spacing hover ──────────────────────────
    const sub = ref.current.querySelector(".hero-sub");
    if (sub) {
      sub.addEventListener("mouseenter", () =>
        gsap.to(sub, { letterSpacing: "0.02em", duration: 0.5, ease: "power2.out" })
      );
      sub.addEventListener("mouseleave", () =>
        gsap.to(sub, { letterSpacing: "normal", duration: 0.5, ease: "power2.out" })
      );
    }
  }, { scope: ref });

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden flex flex-col justify-end persp"
    >
      {/* ── Ambient blobs ────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ background: "#0e0e0e" }}>
        {/* soft white glow — top left */}
        <div className="hero-blob-a absolute -left-24 top-[15%] w-[42vw] h-[42vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,242,235,0.08) 0%, transparent 70%)", filter: "blur(70px)" }} />
        {/* subtle off-white blob — bottom right */}
        <div className="hero-blob-b absolute -right-20 bottom-[-5%] w-[48vw] h-[48vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(237,232,208,0.06) 0%, transparent 70%)", filter: "blur(90px)" }} />
        {/* faint highlight — top right */}
        <div className="absolute right-[10%] top-[8%] w-[22vw] h-[22vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* ── Top meta bar ─────────────────────────────────────── */}
      <div className="hero-meta absolute top-20 left-5 md:left-8 right-5 md:right-8 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/50">
        <span>{h.indexLine}</span>
        <span className="hidden md:block">{h.location}</span>
      </div>

      {/* ── Main stage ───────────────────────────────────────── */}
      <div className="hero-3d-stage preserve-3d will-change-transform px-5 md:px-8 pb-[12vh] max-w-[1500px] w-full mx-auto">
        <div className="hero-meta flex items-baseline gap-3 mb-6 text-[10px] uppercase tracking-[0.3em] text-white/60">
          <span>{h.name}</span>
          <span className="w-6 h-px bg-white/30" />
          <span>{h.title}</span>
        </div>

        {/* Headline — Space Grotesk, magnetic words */}
        <h1 className="persp-tight font-display font-semibold leading-[0.92] tracking-tightest text-bone text-[13vw] md:text-[8.5vw] lg:text-[7.2vw]">
          {h.headline.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.16em] align-bottom">
              <span className="hero-word inline-block will-change-transform preserve-3d">
                {w.toLowerCase() === (h.italicWord || "").toLowerCase() ? (
                  <span className="editorial" style={{
                    background: "linear-gradient(135deg, #ede8d0 0%, #D6A95F 55%, #ede8d0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 24px rgba(214,169,95,0.5))",
                  }}>{w}</span>
                ) : w}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid md:grid-cols-12 gap-6 items-end">
          <p className="hero-sub md:col-span-5 text-bone/60 text-base md:text-lg leading-relaxed max-w-md cursor-default">
            {h.subtitle}
          </p>
          <div className="hero-side md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-bone/40 flex flex-col gap-1">
            <span>{h.currentlyLabel || "Currently"}</span>
            <span className="text-bone/75">{h.currently}</span>
          </div>
          <div className="hidden md:flex md:col-span-4 justify-center items-center">
            <AuroraAvatar />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div className="hero-scroll opacity-0 absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span>Scroll</span>
        <div className="w-px h-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
