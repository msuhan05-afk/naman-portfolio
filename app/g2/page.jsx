"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    n: "01",
    title: "Google Maps",
    desc: "Redesigning spatial navigation for 2B+ users across 220 countries.",
    year: "2024",
    role: "Lead Product Designer",
    color: "#1a1a1a",
  },
  {
    n: "02",
    title: "Material You",
    desc: "A dynamic colour system that adapts to every Android user's wallpaper.",
    year: "2023",
    role: "Design Systems",
    color: "#1a1a1a",
  },
  {
    n: "03",
    title: "Google Search",
    desc: "Rethinking the results page for an AI-first generation of users.",
    year: "2023",
    role: "Interaction Design",
    color: "#1a1a1a",
  },
];

const CAPABILITIES = [
  "Product Design",
  "Interaction Design",
  "Design Systems",
  "User Research",
  "Prototyping",
  "Motion & Animation",
  "Accessibility",
  "HCI Research",
];

/* ─── Page ─────────────────────────────────────────────── */
export default function G2() {
  const root = useRef(null);

  useGSAP(() => {
    // Hero entrance
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(".g2-line", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.1 }, 0)
      .fromTo(".g2-meta", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 }, 0.4)
      .fromTo(".g2-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, 0);

    // Project rows reveal
    gsap.utils.toArray(".g2-row").forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        }
      );
    });

    // About section
    gsap.fromTo(
      [".g2-about-h", ".g2-about-p", ".g2-cap"],
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".g2-about-h", start: "top 85%", once: true },
      }
    );
  }, { scope: root });

  return (
    <div
      ref={root}
      style={{
        background: "#f7f5f0",
        color: "#111",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* ── Hero ─────────────────────────────────── */}
      <section
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(1.5rem,3vw,3rem) clamp(1.5rem,5vw,5rem)",
          paddingTop: "calc(clamp(1.5rem,3vw,3rem) + 64px)",
        }}
      >
        {/* Top bar */}
        <div
          className="g2-rule"
          style={{
            height: 1,
            background: "#111",
            transformOrigin: "left",
            marginBottom: "2rem",
          }}
        />

        {/* Name + role row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: "auto" }}>
          <div className="g2-meta" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#888", lineHeight: 1.6 }}>
            Naman Mehra<br />
            <span style={{ color: "#111" }}>Product Designer · Google</span>
          </div>
          <div className="g2-meta" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#888", textAlign: "right" }}>
            London, UK<br />
            <span style={{ color: "#111" }}>Available for work</span>
          </div>
        </div>

        {/* Big headline */}
        <div style={{ marginTop: "auto", paddingTop: "10vh" }}>
          {["Designing", "at the", "intersection"].map((line, i) => (
            <div key={i} style={{ overflow: "hidden", lineHeight: 0.9 }}>
              <span
                className="g2-line"
                style={{
                  display: "block",
                  fontFamily: "'MuseoModerno', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(3.5rem, 10.5vw, 11rem)",
                  letterSpacing: "-0.03em",
                  color: i === 2 ? "transparent" : "#111",
                  WebkitTextStroke: i === 2 ? "1.5px #111" : "none",
                  lineHeight: 0.92,
                  paddingBottom: "0.04em",
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            flexWrap: "wrap", gap: 16, paddingTop: "4vh",
          }}
        >
          <p
            className="g2-meta"
            style={{
              fontSize: "clamp(0.875rem,1.1vw,1rem)", color: "#555", lineHeight: 1.7,
              maxWidth: 360,
            }}
          >
            HCI research meets product at scale. I build for billions of people, one decision at a time.
          </p>
          <div className="g2-meta" style={{ display: "flex", gap: 32 }}>
            {[["2B+", "Users"], ["6", "Years at Google"], ["MSc", "HCI, UCA"]].map(([n, l]) => (
              <div key={n} style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'MuseoModerno', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem,2.5vw,2rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work ─────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid #111",
          padding: "clamp(3rem,6vw,6rem) clamp(1.5rem,5vw,5rem)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3rem", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888" }}>
            Selected Work
          </span>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>
            2023 — 2024
          </span>
        </div>

        <div>
          {PROJECTS.map((p) => (
            <div
              key={p.n}
              className="g2-row"
              style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr auto",
                gap: "clamp(1rem,3vw,3rem)",
                alignItems: "baseline",
                padding: "clamp(1.25rem,2.5vw,2rem) 0",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                cursor: "default",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums", paddingTop: 2 }}>
                {p.n}
              </span>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(1rem,2vw,2rem)", flexWrap: "wrap" }}>
                  <h3 style={{
                    fontFamily: "'MuseoModerno', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.4rem,3.5vw,3rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: "#111",
                  }}>
                    {p.title}
                  </h3>
                  <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888" }}>
                    {p.role}
                  </span>
                </div>
                <p style={{ fontSize: "clamp(0.8rem,1vw,0.9rem)", color: "#666", marginTop: "0.6rem", lineHeight: 1.6, maxWidth: 480 }}>
                  {p.desc}
                </p>
              </div>
              <span style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                {p.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid #111",
          padding: "clamp(3rem,6vw,6rem) clamp(1.5rem,5vw,5rem)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,6vw,6rem)", alignItems: "start" }}>
          <div>
            <span className="g2-about-h" style={{ display: "block", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", marginBottom: "1.5rem" }}>
              About
            </span>
            <h2
              className="g2-about-h"
              style={{
                fontFamily: "'MuseoModerno', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem,3.5vw,2.75rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "#111",
              }}
            >
              Research-led design at planetary scale
            </h2>
          </div>

          <div>
            <p className="g2-about-p" style={{ fontSize: "clamp(0.875rem,1.1vw,1rem)", color: "#555", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              I work at the intersection of HCI research and product design, building features used by billions of people every day. At Google, I have shipped work across Maps, Android, and Search.
            </p>
            <p className="g2-about-p" style={{ fontSize: "clamp(0.875rem,1.1vw,1rem)", color: "#555", lineHeight: 1.85 }}>
              My academic background in Human-Computer Interaction at UCA London keeps my practice grounded in evidence and behaviour — not assumption.
            </p>
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <span style={{ display: "block", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", marginBottom: "1.5rem" }}>
            Capabilities
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {CAPABILITIES.map((c) => (
              <span
                key={c}
                className="g2-cap"
                style={{
                  fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "8px 16px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: 2,
                  color: "#444",
                  background: "transparent",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid #111",
          padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "3rem" }}>
          <h2
            style={{
              fontFamily: "'MuseoModerno', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem,7vw,6.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "#111",
              maxWidth: "12ch",
            }}
          >
            Say hello.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end" }}>
            <a
              href="mailto:naman@google.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontSize: "clamp(0.875rem,1.2vw,1rem)", color: "#111", textDecoration: "none",
                borderBottom: "1px solid #111", paddingBottom: 2,
                letterSpacing: "0.05em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              naman@google.com
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa" }}>
              London · Google UK
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.1)",
          padding: "1.5rem clamp(1.5rem,5vw,5rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#bbb" }}>
          Naman Mehra
        </span>
        <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#ccc" }}>
          2024
        </span>
      </footer>
    </div>
  );
}
