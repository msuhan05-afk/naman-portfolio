"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    href: "/work",
    label: "Work",
    num: "01",
    tagline: "Selected Projects",
    desc: "Product, HCI and visual design work — case studies and outcomes.",
    accent: "#D6A95F",
  },
  {
    href: "/xr",
    label: "XR / Physical",
    num: "02",
    tagline: "Spatial & Embodied",
    desc: "Extended reality, tangible interfaces and physical computing.",
    accent: "#7EC8C8",
  },
  {
    href: "/playground",
    label: "Playground",
    num: "03",
    tagline: "Experiments & Vibe Code",
    desc: "Creative coding, rapid prototypes and half-baked ideas.",
    accent: "#C87EC8",
  },
  {
    href: "/about",
    label: "About",
    num: "04",
    tagline: "The Journey",
    desc: "Jammu → Delhi → London. The story behind the work.",
    accent: "#7EC87E",
  },
];

function Card({ href, label, num, tagline, desc, accent, index }) {
  const cardRef = useRef(null);

  const onEnter = () => {
    gsap.to(cardRef.current, {
      borderColor: `${accent}55`,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(cardRef.current.querySelector(".card-num"), {
      color: accent,
      duration: 0.3,
    });
    gsap.to(cardRef.current.querySelector(".card-arrow"), {
      x: 6,
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      borderColor: "rgba(237,232,208,0.08)",
      duration: 0.4,
    });
    gsap.to(cardRef.current.querySelector(".card-num"), {
      color: "rgba(237,232,208,0.2)",
      duration: 0.3,
    });
    gsap.to(cardRef.current.querySelector(".card-arrow"), {
      x: 0,
      opacity: 0.4,
      duration: 0.35,
    });
  };

  return (
    <Link
      href={href}
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="section-card group relative flex flex-col justify-between p-7 md:p-8 border rounded-sm transition-colors duration-300"
      style={{ borderColor: "rgba(237,232,208,0.08)", background: "rgba(237,232,208,0.02)" }}
    >
      <div className="flex items-start justify-between mb-12">
        <span
          className="card-num font-display text-[11px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(237,232,208,0.2)" }}
        >
          {num}
        </span>
        <svg
          className="card-arrow w-5 h-5 opacity-40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          style={{ color: "rgb(237,232,208)" }}
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-bone/35 mb-2">{tagline}</p>
        <h3 className="font-display text-2xl md:text-3xl text-bone tracking-tight leading-tight mb-3">
          {label}
        </h3>
        <p className="text-[13px] text-bone/45 leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}

export default function SectionIndex() {
  const ref = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".section-card");
    gsap.set(cards, { opacity: 0, y: 40 });
    ScrollTrigger.batch(cards, {
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
        }),
      start: "top 85%",
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative px-5 md:px-8 py-24 md:py-36 border-t hairline border-t-[1px]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-14 text-[10px] uppercase tracking-[0.3em] text-bone/35">
          <span className="w-8 h-px bg-bone/20" />
          <span>Index — 2022 → 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECTIONS.map((s, i) => (
            <Card key={s.href} {...s} index={i} />
          ))}
        </div>

        <div className="mt-16 flex items-center gap-6 text-[10px] uppercase tracking-[0.28em] text-bone/25">
          <span>London, UK</span>
          <span className="w-4 h-px bg-bone/15" />
          <span>Available for roles</span>
        </div>
      </div>
    </section>
  );
}
