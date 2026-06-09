"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────── */
const WORK = [
  {
    title: "Google Maps",
    sub: "Redesigning navigation for 2 billion users",
    year: "2024",
    tag: "Product Design",
    accent: "#4285F4",
    span: "large",
  },
  {
    title: "Material You",
    sub: "Dynamic colour system across Android",
    year: "2023",
    tag: "Design Systems",
    accent: "#34A853",
    span: "small",
  },
  {
    title: "Google Search",
    sub: "AI-powered results at scale",
    year: "2023",
    tag: "AI + UX",
    accent: "#EA4335",
    span: "small",
  },
];

const FACTS = [
  { n: "2B+", l: "users impacted" },
  { n: "6", l: "years at Google" },
  { n: "4", l: "product launches" },
  { n: "MSc", l: "HCI, UCA London" },
];

/* ─── Helpers ────────────────────────────────────────────────────── */
function reveal(selector, opts = {}) {
  return gsap.fromTo(
    selector,
    { y: 36, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: selector, start: "top 88%", once: true },
      ...opts,
    }
  );
}

/* ─── Sections ───────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(".g-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9 }, 0)
      .fromTo(".g-name span", { yPercent: 115 }, { yPercent: 0, duration: 1.15, stagger: 0.06 }, 0.15)
      .fromTo(".g-role", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.6)
      .fromTo(".g-sub", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.75)
      .fromTo(".g-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, 0.1)
      .fromTo(".g-meta", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.9);
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative h-[100svh] flex flex-col overflow-hidden"
      style={{ background: "#060606" }}
    >
      {/* Top bar */}
      <div className="g-eyebrow flex justify-between items-center px-6 md:px-12 pt-8 pb-0">
        <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
          Naman Mehra
        </span>
        <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
          Portfolio 2024
        </span>
      </div>

      {/* Rule */}
      <div
        className="g-rule mx-6 md:mx-12 mt-5"
        style={{ height: 1, background: "rgba(255,255,255,0.08)", transformOrigin: "left" }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-16">
        {/* Role pill */}
        <div className="g-role flex items-center gap-3 mb-8">
          <span
            style={{
              fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase",
              color: "#4285F4", fontFamily: "SF Mono, ui-monospace, monospace",
            }}
          >
            Product Designer
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="3" fill="#4285F4" opacity="0.7" />
          </svg>
          <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            Google
          </span>
        </div>

        {/* Name */}
        <h1
          className="g-name font-display font-bold leading-none tracking-tighter select-none"
          style={{ fontSize: "clamp(3.8rem, 11.5vw, 12.5rem)", color: "#f5f5f5" }}
        >
          {["Naman", "Mehra"].map((word, i) => (
            <span key={i} className="block overflow-hidden" style={{ lineHeight: 0.92 }}>
              <span className="inline-block will-change-transform">{word}</span>
            </span>
          ))}
        </h1>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-0">
          <p
            className="g-sub md:max-w-xs"
            style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.65, color: "rgba(245,245,245,0.45)" }}
          >
            Crafting experiences that reach billions. HCI research meets product at scale.
          </p>

          <div className="g-meta flex gap-8 md:ml-auto">
            {FACTS.slice(0, 2).map((f) => (
              <div key={f.n}>
                <div
                  className="font-display font-bold"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#f5f5f5", letterSpacing: "-0.03em" }}
                >
                  {f.n}
                </div>
                <div style={{ fontSize: 11, color: "rgba(245,245,245,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {f.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const ref = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".g-card", ref.current);
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: i * 0.08,
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        }
      );
    });
  }, { scope: ref });

  const large = WORK[0];
  const smalls = WORK.slice(1);

  return (
    <section ref={ref} className="px-6 md:px-12 py-24 md:py-32" style={{ background: "#060606" }}>
      {/* Section label */}
      <div className="flex items-center gap-4 mb-14">
        <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
          Selected Work
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* Asymmetric grid */}
      <div className="grid md:grid-cols-12 gap-4">
        {/* Large card */}
        <div className="g-card md:col-span-7">
          <WorkCard {...large} />
        </div>

        {/* Two stacked smalls */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {smalls.map((w) => (
            <div key={w.title} className="g-card flex-1">
              <WorkCard {...w} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ title, sub, year, tag, accent, span }) {
  const isLarge = span === "large";
  return (
    <div
      className="group relative overflow-hidden cursor-pointer"
      style={{
        borderRadius: 4,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#0c0c0c",
        minHeight: isLarge ? "clamp(280px,38vw,480px)" : "clamp(130px,17vw,220px)",
        padding: isLarge ? "clamp(1.5rem,3vw,2.5rem)" : "clamp(1.25rem,2.5vw,2rem)",
        transition: "border-color 0.4s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent}40`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
    >
      {/* Accent glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 20% 80%, ${accent}0d 0%, transparent 60%)`,
          transition: "opacity 0.5s ease",
        }}
      />

      <div className="relative flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <span
            style={{
              fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
              color: accent, opacity: 0.8,
            }}
          >
            {tag}
          </span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
            {year}
          </span>
        </div>

        <div>
          <h3
            className="font-display font-bold leading-tight"
            style={{
              fontSize: isLarge ? "clamp(1.6rem,3.5vw,3rem)" : "clamp(1.1rem,2vw,1.75rem)",
              color: "#f5f5f5", letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: "clamp(0.8rem,1vw,0.9rem)", color: "rgba(245,245,245,0.4)", lineHeight: 1.5 }}>
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}

function About() {
  const ref = useRef(null);

  useGSAP(() => {
    reveal(".g-about-left", { scrollTrigger: { trigger: ".g-about-left", start: "top 85%", once: true } });
    gsap.fromTo(
      ".g-fact",
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: ".g-fact", start: "top 85%", once: true },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="px-6 md:px-12 py-24 md:py-32 border-t" style={{ background: "#060606", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="grid md:grid-cols-12 gap-12 md:gap-6 items-start">
        {/* Left: statement */}
        <div className="g-about-left md:col-span-6 lg:col-span-5">
          <div className="flex items-center gap-4 mb-10">
            <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
              About
            </span>
            <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.1)" }} />
          </div>

          <h2
            className="font-display font-bold leading-tight mb-8"
            style={{ fontSize: "clamp(1.75rem,4vw,3.25rem)", color: "#f5f5f5", letterSpacing: "-0.025em" }}
          >
            Design at the intersection of research and scale
          </h2>

          <div style={{ fontSize: "clamp(0.875rem,1.1vw,1rem)", lineHeight: 1.8, color: "rgba(245,245,245,0.45)" }} className="space-y-4">
            <p>
              I work on Google products that billions of people use daily. My practice spans user research, interaction design, and design systems — always with an eye toward behaviour at scale.
            </p>
            <p>
              Before Google, I studied Human-Computer Interaction at UCA London, where I developed a rigorous approach to evidence-based design.
            </p>
          </div>

          <a
            href="mailto:naman@google.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: "2.5rem", fontSize: 13, letterSpacing: "0.08em",
              color: "#4285F4", textDecoration: "none",
              borderBottom: "1px solid rgba(66,133,244,0.3)", paddingBottom: 2,
              transition: "border-color 0.2s",
            }}
          >
            Get in touch
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="#4285F4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right: stat grid */}
        <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-px" style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
          {FACTS.map((f, i) => (
            <div
              key={f.n}
              className="g-fact"
              style={{
                padding: "clamp(1.25rem,2.5vw,2rem)",
                background: "#0c0c0c",
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <div
                className="font-display font-bold"
                style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)", color: "#f5f5f5", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                {f.n}
              </div>
              <div style={{ fontSize: 11, color: "rgba(245,245,245,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8 }}>
                {f.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const skills = [
    "Product Design", "Interaction Design", "Design Systems",
    "User Research", "Prototyping", "Motion Design",
    "HCI", "Accessibility", "Design Thinking", "Figma",
  ];
  const doubled = [...skills, ...skills];

  return (
    <div
      className="overflow-hidden py-5 border-t border-b"
      style={{ background: "#060606", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: "marqueeSlide 28s linear infinite", width: "max-content" }}
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}
          >
            {s}
            <span style={{ marginLeft: 32, color: "rgba(255,255,255,0.07)" }}>·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeSlide { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

function Contact() {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      [".g-cta-headline", ".g-cta-sub", ".g-cta-link"],
      { y: 32, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="px-6 md:px-12 py-28 md:py-40" style={{ background: "#060606" }}>
      <div className="max-w-2xl">
        <h2
          className="g-cta-headline font-display font-bold leading-tight"
          style={{ fontSize: "clamp(2.25rem,6vw,5.5rem)", color: "#f5f5f5", letterSpacing: "-0.03em" }}
        >
          Let's build something together
        </h2>
        <p
          className="g-cta-sub mt-5"
          style={{ fontSize: "clamp(0.875rem,1.2vw,1rem)", color: "rgba(245,245,245,0.4)", lineHeight: 1.7 }}
        >
          Open to collaborations, speaking, and consulting.
        </p>
        <a
          href="mailto:naman@google.com"
          className="g-cta-link"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginTop: "2.5rem",
            padding: "14px 28px", borderRadius: 4,
            background: "#4285F4", color: "#fff",
            fontSize: 13, letterSpacing: "0.06em", fontWeight: 500, textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          naman@google.com
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="px-6 md:px-12 py-8 flex justify-between items-center border-t"
      style={{ background: "#060606", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Naman Mehra
      </span>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em" }}>
        2024
      </span>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function GooglePortfolio() {
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif" }}>
      <Hero />
      <Work />
      <About />
      <Marquee />
      <Contact />
      <Footer />
    </div>
  );
}
