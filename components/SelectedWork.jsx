"use client";
import { useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function Card({ p, i }) {
  const useImage = !!p.coverImage;
  const cardRef = useRef(null);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -10;
    gsap.to(el, { rotateY: x, rotateX: y, scale: 1.015, duration: 0.5, ease: "power2.out", transformPerspective: 900 });
  };
  const onLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.8, ease: "expo.out" });
  };

  return (
    <Link
      href={`/work/${p.slug}`}
      ref={cardRef}
      data-card
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative shrink-0 w-[80vw] md:w-[58vw] lg:w-[44vw] aspect-[16/10] rounded-sm overflow-hidden block bg-[#111] will-change-transform tilt-card"
      style={{ transformStyle: "preserve-3d" }}
    >
      {useImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.coverImage}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-700 ease-cinema group-hover:scale-[1.06]"
        />
      ) : (
        <div
          className="absolute inset-0 scale-[1.02] transition-transform duration-700 ease-cinema group-hover:scale-[1.06]"
          style={{ background: p.cover }}
        />
      )}
      <div
        className="absolute left-5 top-5 w-8 h-px transition-all duration-700 group-hover:w-20"
        style={{ background: p.accent }}
      />
      <div className="absolute left-5 top-5 mt-5 text-[10px] uppercase tracking-[0.3em] text-white/75">
        {p.category}
      </div>
      <div className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55 tabular">
        N°{String(i + 1).padStart(2, "0")} / {p.year}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6">
        <h3 className="font-display text-2xl md:text-4xl leading-[0.95] tracking-tightest text-white max-w-[80%]">
          {p.title}
        </h3>
        <div className="hidden md:flex w-9 h-9 rounded-full border border-white/30 items-center justify-center text-white/80 transition-all duration-700 group-hover:bg-white group-hover:text-black">
          →
        </div>
      </div>
    </Link>
  );
}

export default function SelectedWork({ projects = [] }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!projects.length) return;
      const track = sectionRef.current.querySelector(".track");
      const wrapper = sectionRef.current.querySelector(".pin-wrap");
      if (!track || !wrapper) return;

      const distance = () => track.scrollWidth - window.innerWidth + 40;

      // Single tween, scrub-pinned. Cards no longer get per-element ScrollTriggers.
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative border-t hairline border-t-[1px]"
    >
      <div className="px-5 md:px-8 pt-24 md:pt-32 pb-8">
        <div className="max-w-[1400px] mx-auto flex items-end justify-between">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/45">
            <span className="w-8 h-px bg-bone/30" />
            <span>Selected Work · scroll →</span>
          </div>
          <a
            href="http://namansportfolio.framer.website/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-bone/50 hover:text-bone transition-colors"
          >
            Full archive ↗
          </a>
        </div>
      </div>

      <div className="pin-wrap h-[100svh] overflow-hidden">
        <div className="track flex items-center gap-[6vw] h-full pl-[8vw] pr-[12vw] will-change-transform">
          {projects.map((p, i) => (
            <Card key={p.slug || i} p={p} i={i} />
          ))}
          <div className="shrink-0 w-[20vw] h-full flex items-end pb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bone/40 max-w-[10rem] leading-relaxed">
              End of reel — continue scrolling.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
