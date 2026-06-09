"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─── Story chapters ─────────────────────────────────────────── */
const CHAPTERS = [
  {
    year: "New Delhi — Origin",
    headline: "I was making things before I had words for it.",
    body: "Growing up in Delhi, I filled every notebook with sketches. I didn't know what design was — I just couldn't stop rearranging how things looked and felt. That instinct never left.",
    stat: null,
  },
  {
    year: "2022 — Education",
    headline: "HCI taught me to\ndesign for people,\nnot for screens.",
    body: "Studying MSc Human-Computer Interaction at the University for the Creative Arts, London reshaped how I saw the world. Research methods, cognitive psychology, tangible interfaces — design became a rigorous practice, not just a visual one.",
    stat: { n: "MSc", l: "HCI · UCA London" },
  },
  {
    year: "2023 — First Steps",
    headline: "Real users humbled me quickly.",
    body: "Freelancing across UX, branding, and XR projects taught me the gap between designer intent and actual behaviour. Every assumption I made got tested. Most of them failed. That's where the real learning happened.",
    stat: null,
  },
  {
    year: "2024 — Building",
    headline: "Product, XR, and physical — all at once.",
    body: "Working across product design, extended reality, and physical interface projects, I developed a practice that moves between digital and tangible. Spatial computing, interaction design, and systems thinking became my tools.",
    stat: { n: "XR", l: "· Product · Physical" },
  },
  {
    year: "Now — Open",
    headline: "Ready for what's next.",
    body: "I'm an HCI designer and creative technologist looking for the right team — one that cares about craft, moves with intention, and builds things that matter to real people.",
    stat: { n: "Open", l: "to new roles" },
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */
const SF = `"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, sans-serif`;

export default function Growth() {
  const videoRef   = useRef(null);
  const wrapperRef = useRef(null);
  const lineRef    = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);

  /* suppress root Nav / Grain / Splash */
  useEffect(() => {
    sessionStorage.setItem("splash-played", "1");
    const els = [];
    document.querySelectorAll(".fixed.top-0.left-0.right-0, .grain").forEach((el) => {
      el.style.display = "none";
      els.push(el);
    });
    return () => els.forEach((el) => (el.style.display = ""));
  }, []);

  /* video scrub — plays / reverses / pauses with scroll */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    let didSetup = false;
    let pending = null;
    let seeking = false;

    const onSeeked = () => {
      seeking = false;
      if (pending !== null) { const t = pending; pending = null; video.currentTime = t; seeking = true; }
    };
    video.addEventListener("seeked", onSeeked);

    const seek = (t) => {
      if (seeking) { pending = t; return; }
      seeking = true;
      video.currentTime = t;
    };

    const setup = () => {
      if (didSetup) return;
      if (!video.duration || !isFinite(video.duration)) return;
      didSetup = true;

      const dur = video.duration;
      video.currentTime = 0;

      const proxy = { t: dur };
      gsap.to(proxy, {
        t: 0,
        ease: "none",
        onUpdate() { seek(proxy.t); },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      /* chapter active state */
      CHAPTERS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.chapter-${i}`,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveChapter(i),
          onEnterBack: () => setActiveChapter(i),
        });
      });

      /* SVG line draw */
      if (lineRef.current) {
        const len = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: wrapperRef.current, start: "top top", end: "bottom bottom", scrub: true },
        });
      }

      /* text reveals */
      CHAPTERS.forEach((_, i) => {
        gsap.fromTo(
          `.chapter-${i} .ch-content`,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: `.chapter-${i}`, start: "top 72%", once: true } }
        );
      });
    };

    /* attach listeners FIRST, then load — prevents race on cached video */
    video.addEventListener("loadedmetadata", setup);
    video.addEventListener("canplay", setup);
    video.load();

    /* handle already-cached video */
    if (video.readyState >= 1) setup();

    return () => {
      video.removeEventListener("loadedmetadata", setup);
      video.removeEventListener("canplay", setup);
      video.removeEventListener("seeked", onSeeked);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ background: "#F6F6F6", color: "#1a1a1a", fontFamily: SF, overflowX: "hidden" }}>

      {/* ── Minimal nav ───────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px clamp(1.5rem,4vw,4.5rem)",
        background: "rgba(246,246,246,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        <a href="/" style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", textDecoration: "none", letterSpacing: "-0.01em" }}>
          Naman Mehra
        </a>
        <span style={{ fontSize: 12, color: "#999", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          My Growth
        </span>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{
        minHeight: "100svh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(1.5rem,4vw,4.5rem) clamp(3rem,6vh,5rem)",
        paddingTop: 80,
      }}>
        <p style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#999", marginBottom: "1.25rem" }}>
          How I became me
        </p>
        <h1 style={{
          fontFamily: SF, fontWeight: 300,
          fontSize: "clamp(2.75rem,7.5vw,7rem)",
          letterSpacing: "-0.04em", lineHeight: 1.04,
          color: "#1a1a1a", margin: "0 0 2rem",
          maxWidth: "16ch",
        }}>
          A story in five chapters.
        </h1>
        <p style={{ fontSize: "clamp(0.9rem,1.15vw,1.05rem)", color: "#777", lineHeight: 1.8, maxWidth: 380, margin: 0 }}>
          From drawing on walls in Delhi to designing products for two billion people. Scroll to read.
        </p>
        {/* Scroll indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "3rem" }}>
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
            <rect x="1" y="1" width="14" height="26" rx="7" stroke="#bbb" strokeWidth="1.2"/>
            <circle cx="8" cy="8" r="2.5" fill="#bbb">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="1.8s" repeatCount="indefinite"/>
            </circle>
          </svg>
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#bbb" }}>Scroll</span>
        </div>
      </section>

      {/* ── Two-column story ──────────────────────────── */}
      <div ref={wrapperRef} style={{ position: "relative" }}>

        {/* LEFT: scrolling story — constrained to 55% so fixed panel never overlaps */}
        <div style={{ width: "55%", paddingLeft: "clamp(1.5rem,4vw,4.5rem)", paddingRight: "clamp(1.5rem,3vw,3rem)", paddingTop: "5vh", paddingBottom: "20vh", position: "relative" }}>

          {/* Vertical timeline line */}
          <div style={{ position: "absolute", left: "clamp(1.5rem,4vw,4.5rem)", top: 0, bottom: 0, width: 1, pointerEvents: "none" }}>
            <svg
              width="2"
              height="100%"
              viewBox="0 0 2 1000"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              {/* Track */}
              <line x1="1" y1="0" x2="1" y2="1000" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
              {/* Fill */}
              <line
                ref={lineRef}
                x1="1" y1="0" x2="1" y2="1000"
                stroke="#1a1a1a"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Chapter dots + content */}
          {CHAPTERS.map((ch, i) => (
            <div
              key={i}
              className={`chapter-${i}`}
              style={{
                minHeight: "160vh",
                display: "flex",
                alignItems: "center",
                paddingLeft: "clamp(2rem,4vw,4rem)",
                position: "relative",
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: "absolute",
                left: -5,
                top: "50%",
                transform: "translateY(-50%)",
                width: 10, height: 10,
                borderRadius: "50%",
                background: activeChapter === i ? "#1a1a1a" : "#F6F6F6",
                border: `1.5px solid ${activeChapter === i ? "#1a1a1a" : "rgba(0,0,0,0.25)"}`,
                transition: "background 0.4s ease, border-color 0.4s ease",
                zIndex: 2,
              }} />

              <div className="ch-content" style={{ maxWidth: 480, opacity: 0 }}>
                {/* Year label */}
                <span style={{
                  display: "block", fontSize: 11,
                  letterSpacing: "0.26em", textTransform: "uppercase",
                  color: activeChapter === i ? "#1a1a1a" : "#aaa",
                  marginBottom: "1.5rem",
                  transition: "color 0.5s ease",
                }}>
                  {ch.year}
                </span>

                {/* Headline */}
                <h2 style={{
                  fontFamily: SF, fontWeight: 300,
                  fontSize: "clamp(1.75rem,3.8vw,3.25rem)",
                  letterSpacing: "-0.03em", lineHeight: 1.15,
                  color: "#1a1a1a",
                  margin: "0 0 1.5rem",
                  whiteSpace: "pre-line",
                }}>
                  {ch.headline}
                </h2>

                {/* Body */}
                <p style={{
                  fontSize: "clamp(0.9rem,1.1vw,1rem)",
                  color: "#666", lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 400,
                }}>
                  {ch.body}
                </p>

                {/* Stat */}
                {ch.stat && (
                  <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span style={{
                      fontFamily: SF, fontWeight: 300,
                      fontSize: "clamp(2rem,4vw,3.5rem)",
                      letterSpacing: "-0.04em", lineHeight: 1,
                      color: "#1a1a1a",
                    }}>{ch.stat.n}</span>
                    <span style={{ fontSize: 12, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {ch.stat.l}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: fixed video — stays in place while left scrolls */}
        <div style={{
          width: "45%",
          position: "fixed",
          top: 0,
          right: 0,
          height: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(2rem,4vw,4rem) clamp(1.5rem,3vw,3rem) clamp(2rem,4vw,4rem) 0",
          background: "#F6F6F6",
          pointerEvents: "none",
          zIndex: 10,
        }}>
          <div style={{ width: "100%", height: "88%", position: "relative" }}>
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                mixBlendMode: "normal",
              }}
            >
              <source src="/gg_poly.webm" type="video/webm" />
              <source src="/gg_poly.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Chapter progress pills */}
          <div style={{
            position: "absolute",
            bottom: "clamp(2rem,4vw,3.5rem)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 6,
          }}>
            {CHAPTERS.map((_, i) => (
              <div key={i} style={{
                height: 2,
                width: i === activeChapter ? 28 : 10,
                borderRadius: 2,
                background: i === activeChapter ? "#1a1a1a" : "rgba(0,0,0,0.18)",
                transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Closing section ─────────────────────────── */}
      <section style={{
        minHeight: "60vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,4.5rem)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}>
        <p style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#aaa", marginBottom: "1.5rem" }}>
          What's next
        </p>
        <h2 style={{
          fontFamily: SF, fontWeight: 300,
          fontSize: "clamp(2rem,6vw,5.5rem)",
          letterSpacing: "-0.04em", lineHeight: 1.08,
          color: "#1a1a1a", margin: "0 0 2.5rem",
          maxWidth: "18ch",
        }}>
          The story isn't finished yet.
        </h2>
        <a
          href="mailto:naman@google.com"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontSize: 14, color: "#1a1a1a", textDecoration: "none",
            letterSpacing: "-0.01em",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            paddingBottom: 3,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Let's write the next chapter together
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </section>

    </div>
  );
}
