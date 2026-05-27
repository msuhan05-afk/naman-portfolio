"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LETTERS = "NAMAN MEHRA".split("");

export default function Splash() {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only play once per browser session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("splash-played") === "1") {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted) return;
      const letters = gsap.utils.toArray(".sp-letter");
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          sessionStorage.setItem("splash-played", "1");
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      gsap.set(".sp-rule", { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(".sp-label", { opacity: 0, y: 14 });
      gsap.set(letters, { yPercent: 110, opacity: 0 });
      gsap.set(".sp-shutter", { yPercent: 0 });

      tl.to(".sp-rule", { scaleX: 1, duration: 1.0 }, 0.05)
        .to(".sp-label", { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.15)
        .to(
          letters,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: { each: 0.05, from: "start" },
          },
          0.45
        )
        .to({}, { duration: 0.6 }) // hold
        .to(
          letters,
          {
            yPercent: -110,
            opacity: 0,
            duration: 0.9,
            ease: "expo.in",
            stagger: { each: 0.025, from: "end" },
          },
          ">-0.2"
        )
        .to(
          ".sp-rule, .sp-label",
          { opacity: 0, duration: 0.5 },
          "<"
        )
        .to(
          ".sp-shutter",
          {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
          },
          "<+0.1"
        );
    },
    { scope: ref, dependencies: [mounted] }
  );

  if (done) return null;
  if (!mounted) {
    // SSR / first paint blocker — solid background so the page doesn't flash
    return <div className="fixed inset-0 z-[100] bg-ink" aria-hidden="true" />;
  }

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden="true"
    >
      {/* Shutter — exits upward to reveal the site */}
      <div className="sp-shutter absolute inset-0 bg-ink overflow-hidden will-change-transform">
        {/* Top meta line */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-bone/55">
          <span className="sp-label">Index ’26 — Loading</span>
          <span className="sp-label hidden md:inline tabular">N°01 / 01</span>
        </div>

        {/* Big block letters */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            aria-label="Naman Mehra"
            className="select-none font-display font-light leading-[0.85] tracking-tightest text-bone text-center text-[18vw] md:text-[15vw] lg:text-[13vw]"
          >
            <span className="block overflow-hidden">
              {LETTERS.map((ch, i) => (
                <span
                  key={i}
                  className="sp-letter inline-block will-change-transform"
                  style={{ minWidth: ch === " " ? "0.35em" : undefined }}
                >
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Bottom rule + label */}
        <div className="absolute left-6 right-6 bottom-6">
          <div className="sp-rule h-px bg-bone/40 mb-3 origin-left" />
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-bone/55">
            <span className="sp-label">HCI Designer · Creative Technologist</span>
            <span className="sp-label">London — 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
