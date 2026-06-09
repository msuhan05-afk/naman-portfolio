"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const F = ({ children, style, ...p }) => (
  <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", ...style }} {...p}>
    {children}
  </span>
);

export default function V() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  /* suppress root layout chrome (Nav, Splash, Grain) on this page */
  useEffect(() => {
    sessionStorage.setItem("splash-played", "1");
    const hide = [];
    // Nav: fixed header
    document.querySelectorAll(".fixed.top-0.left-0.right-0").forEach((el) => {
      el.style.display = "none";
      hide.push(el);
    });
    // Grain
    document.querySelectorAll(".grain").forEach((el) => {
      el.style.display = "none";
      hide.push(el);
    });
    return () => hide.forEach((el) => (el.style.display = ""));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.load();

    let didSetup = false;
    const setup = () => {
      if (didSetup) return;
      const dur = video.duration;
      if (!dur || !isFinite(dur)) return;
      didSetup = true;

      /* ── Pinned video scrub — scroll distance = 5× vh so full video plays ── */
      const scrollMult = 5;
      ScrollTrigger.create({
        trigger: ".v-pin-wrap",
        start: "top top",
        end: () => `+=${window.innerHeight * scrollMult}`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          if (dur && isFinite(dur)) {
            video.currentTime = self.progress * dur;
          }
        },
      });

      /* ── Video container grows from inset to full-bleed ── */
      gsap.fromTo(
        ".v-video-frame",
        { borderRadius: "clamp(12px,2.5vw,28px)", margin: "0 clamp(1.5rem,4vw,4rem)", marginTop: "clamp(1.5rem,3vh,3rem)", marginBottom: "clamp(1.5rem,3vh,3rem)" },
        {
          borderRadius: "0px", margin: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: ".v-pin-wrap",
            start: "top top",
            end: () => `+=${window.innerHeight * 0.8}`,
            scrub: true,
          },
        }
      );

      /* ── Overlay text fade in mid-scrub ── */
      gsap.fromTo(
        ".v-overlay-text",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: {
            trigger: ".v-pin-wrap",
            start: () => `top+=${window.innerHeight * 1} top`,
            end: () => `top+=${window.innerHeight * 2} top`,
            scrub: true,
          },
        }
      );

      /* ── Overlay fade out near end ── */
      gsap.fromTo(
        ".v-overlay-text",
        { opacity: 1 },
        {
          opacity: 0, ease: "none",
          scrollTrigger: {
            trigger: ".v-pin-wrap",
            start: () => `top+=${window.innerHeight * 3.8} top`,
            end: () => `top+=${window.innerHeight * 5} top`,
            scrub: true,
          },
        }
      );

      /* ── Sections below video ── */
      gsap.utils.toArray(".v-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      });
    };

    // loadedmetadata fires as soon as duration is known — enough for scrubbing
    const onMeta = () => setup();
    video.addEventListener("loadedmetadata", onMeta);
    // canplaythrough / loadeddata as extra catches
    video.addEventListener("canplaythrough", setup);
    video.addEventListener("loadeddata", setup);
    // If metadata already available (cached video)
    if (video.readyState >= 1) setup();

    /* ── Nav hide on scroll ── */
    ScrollTrigger.create({
      trigger: "body",
      start: "top -60px",
      onEnter: () => gsap.to(".v-nav", { y: -80, duration: 0.4, ease: "power2.in" }),
      onLeaveBack: () => gsap.to(".v-nav", { y: 0, duration: 0.5, ease: "power3.out" }),
    });

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("canplaythrough", setup);
      video.removeEventListener("loadeddata", setup);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ── Hero entrance ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(".v-nav", { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0)
      .fromTo(".v-hero-tag", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
      .fromTo(".v-hero-word", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.07 }, 0.4)
      .fromTo(".v-hero-sub", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.9)
      .fromTo(".v-scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4);
  }, []);

  return (
    <div style={{ background: "#f5f3ee", color: "#111", overflowX: "hidden" }}>

      {/* ── Nav ───────────────────────────────────────── */}
      <nav
        className="v-nav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px clamp(1.5rem,4vw,4rem)",
          mixBlendMode: "multiply",
        }}
      >
        <span style={{ fontFamily: "'MuseoModerno', system-ui", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", color: "#111" }}>
          Naman Mehra
        </span>
        <div style={{ display: "flex", gap: "clamp(1.5rem,3vw,3rem)", alignItems: "center" }}>
          {["Work", "About", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#555", textDecoration: "none" }}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero (above pin) ──────────────────────────── */}
      <section
        style={{
          minHeight: "100svh", display: "flex", flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(1.5rem,4vw,4rem) clamp(2.5rem,5vh,4rem)",
        }}
      >
        <div className="v-hero-tag" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: "1.5rem" }}>
          Product Designer · Google
        </div>

        <h1 style={{ margin: 0, lineHeight: 0.88 }}>
          {["Crafting", "experiences", "at scale"].map((w, i) => (
            <div key={i} style={{ overflow: "hidden", display: "block" }}>
              <span
                className="v-hero-word"
                style={{
                  display: "block",
                  fontFamily: "'MuseoModerno', system-ui",
                  fontWeight: 800,
                  fontSize: "clamp(3.5rem,10vw,10.5rem)",
                  letterSpacing: "-0.03em",
                  color: i === 1 ? "transparent" : "#111",
                  WebkitTextStroke: i === 1 ? "1.5px #111" : "none",
                  lineHeight: 0.92,
                  paddingBottom: "0.04em",
                }}
              >
                {i === 2 ? <><F>at</F> scale</> : w}
              </span>
            </div>
          ))}
        </h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "3rem", flexWrap: "wrap", gap: 16 }}>
          <p className="v-hero-sub" style={{ fontSize: "clamp(0.875rem,1.1vw,1rem)", color: "#666", lineHeight: 1.75, maxWidth: 340, margin: 0 }}>
            HCI research meets product design. I build things billions of people use every day.
          </p>
          <div className="v-scroll-cue" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 1, background: "#aaa" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa" }}>
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ── Pinned video scrub ────────────────────────── */}
      <div
        className="v-pin-wrap"
        style={{
          height: "100svh",
          background: "#f5f3ee",   /* same cream — no black box */
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* Frame: starts inset+rounded, expands to full-bleed via GSAP */}
        <div
          className="v-video-frame"
          style={{
            position: "relative",
            flex: 1,
            overflow: "hidden",
            borderRadius: "clamp(12px,2.5vw,28px)",
            margin: "0 clamp(1.5rem,4vw,4rem)",
            marginTop: "clamp(1.5rem,3vh,3rem)",
            marginBottom: "clamp(1.5rem,3vh,3rem)",
            willChange: "border-radius, margin",
            /* solid centre, feather starts at 70% and fades to transparent at edges */
            WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 70%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 70%, transparent 100%)",
          }}
        >
          <video
            ref={videoRef}
            className="v-video"
            src="/3d.mp4"
            muted
            playsInline
            preload="auto"
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Bottom vignette for text legibility */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)",
            pointerEvents: "none",
          }} />

          {/* Overlay text */}
          <div
            className="v-overlay-text"
            style={{
              position: "absolute", bottom: "clamp(1.5rem,4vh,3rem)",
              left: "clamp(1.5rem,3vw,3rem)", right: "clamp(1.5rem,3vw,3rem)",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              flexWrap: "wrap", gap: 16,
              opacity: 0,
            }}
          >
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 8px" }}>
                Currently
              </p>
              <p style={{ fontFamily: "'MuseoModerno', system-ui", fontWeight: 700, fontSize: "clamp(1.4rem,2.8vw,2.4rem)", color: "#fff", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1 }}>
                Product Designer<br />
                <F style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>at Google</F>
              </p>
            </div>
            <div style={{ display: "flex", gap: "clamp(1.5rem,3.5vw,3.5rem)" }}>
              {[["2B+", "Users reached"], ["6", "Years at Google"], ["MSc", "HCI, UCA London"]].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontFamily: "'MuseoModerno', system-ui", fontWeight: 700, fontSize: "clamp(1.1rem,2.2vw,1.8rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Work ─────────────────────────────────────── */}
      <section id="work" style={{ padding: "clamp(5rem,10vh,9rem) clamp(1.5rem,4vw,4rem)" }}>
        <div className="v-reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3.5rem", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#999" }}>Selected Work</span>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#bbb" }}>2023 — 2024</span>
        </div>

        {[
          { n: "01", title: "Google Maps", role: "Lead Product Design", year: "2024", desc: "Redesigning spatial navigation for 2B+ users across 220 countries." },
          { n: "02", title: "Material You", role: "Design Systems", year: "2023", desc: "A dynamic colour system that adapts to every Android user's wallpaper." },
          { n: "03", title: "Google Search", role: "Interaction Design", year: "2023", desc: "Rethinking the results page for an AI-first generation of users." },
        ].map((p) => (
          <div
            key={p.n}
            className="v-reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "2.5rem 1fr auto",
              gap: "clamp(1rem,2.5vw,2.5rem)",
              alignItems: "baseline",
              padding: "clamp(1.25rem,2.5vw,2rem) 0",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              cursor: "default",
              transition: "background 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.025)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: 11, color: "#bbb", letterSpacing: "0.08em" }}>{p.n}</span>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(1rem,2vw,2rem)", flexWrap: "wrap" }}>
                <h3 style={{ fontFamily: "'MuseoModerno', system-ui", fontWeight: 700, fontSize: "clamp(1.4rem,3.5vw,3rem)", letterSpacing: "-0.02em", lineHeight: 1, color: "#111", margin: 0 }}>
                  {p.title}
                </h3>
                <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999" }}>{p.role}</span>
              </div>
              <p style={{ fontSize: "clamp(0.8rem,1vw,0.875rem)", color: "#777", marginTop: 8, lineHeight: 1.65, maxWidth: 500 }}>{p.desc}</p>
            </div>
            <span style={{ fontSize: 11, color: "#bbb", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{p.year}</span>
          </div>
        ))}
      </section>

      {/* ── About ────────────────────────────────────── */}
      <section
        id="about"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.1)",
          padding: "clamp(5rem,10vh,9rem) clamp(1.5rem,4vw,4rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,440px),1fr))",
          gap: "clamp(3rem,6vw,6rem)",
          alignItems: "start",
        }}
      >
        <div>
          <h2 className="v-reveal" style={{ fontFamily: "'MuseoModerno', system-ui", fontWeight: 700, fontSize: "clamp(2rem,5vw,4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#111", margin: "0 0 2rem" }}>
            Research-led design at planetary scale
          </h2>
          <a
            href="#contact"
            className="v-reveal"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#111", textDecoration: "none",
              borderBottom: "1px solid #111", paddingBottom: 2,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get in touch
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="v-reveal">
          <p style={{ fontSize: "clamp(0.875rem,1.1vw,1rem)", color: "#555", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            I work at the intersection of HCI research and product design, shipping features used by billions every day. At Google I have led design across Maps, Android, and Search.
          </p>
          <p style={{ fontSize: "clamp(0.875rem,1.1vw,1rem)", color: "#555", lineHeight: 1.9, marginBottom: "2.5rem" }}>
            My MSc in Human-Computer Interaction from UCA London keeps my practice grounded in evidence and human behaviour, not assumption.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Product Design", "HCI Research", "Design Systems", "Prototyping", "Motion Design", "Accessibility"].map((c) => (
              <span key={c} style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", padding: "7px 14px", border: "1px solid rgba(0,0,0,0.2)", borderRadius: 2, color: "#555" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section
        id="contact"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.1)",
          padding: "clamp(5rem,10vh,9rem) clamp(1.5rem,4vw,4rem)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "3rem",
        }}
      >
        <h2 className="v-reveal" style={{ fontFamily: "'MuseoModerno', system-ui", fontWeight: 800, fontSize: "clamp(2.5rem,8vw,7.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#111", margin: 0, maxWidth: "10ch" }}>
          Say hello.
        </h2>
        <div className="v-reveal" style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-end" }}>
          <a
            href="mailto:naman@google.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontSize: "clamp(0.875rem,1.2vw,1.1rem)", color: "#111", textDecoration: "none",
              borderBottom: "1px solid #111", paddingBottom: 3, letterSpacing: "0.04em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            naman@google.com
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#bbb" }}>
            London · Google UK
          </span>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.08)", padding: "1.5rem clamp(1.5rem,4vw,4rem)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ccc" }}>Naman Mehra</span>
        <span style={{ fontSize: 11, color: "#ccc", letterSpacing: "0.1em" }}>2024</span>
      </footer>

    </div>
  );
}
