"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FALLBACK_GRADS = [
  "linear-gradient(135deg,#1c1c1c,#3a3a3a)",
  "linear-gradient(160deg,#0e0e0e,#2a2a2a)",
  "linear-gradient(120deg,#171717,#2e2e2e)",
  "linear-gradient(135deg,#2a2a2a,#444444)",
  "linear-gradient(150deg,#191919,#333)",
  "linear-gradient(135deg,#222,#3a3a3a)",
  "linear-gradient(160deg,#111,#2c2c2c)",
  "linear-gradient(120deg,#181818,#363636)",
];

const isVideo = (url) => /\.(mp4|mov|webm|m4v)$/i.test(url || "");

export default function Archive({ stills = [] }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!stills.length) return;
      // Single batched entrance — no per-tile scrub triggers
      gsap.from(".archive-tile", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: { each: 0.05, from: "start" },
        scrollTrigger: { trigger: ".archive-grid", start: "top 85%" },
      });
    },
    { scope: ref, dependencies: [stills.length] }
  );

  if (!stills.length) return null;
  return (
    <section
      id="archive"
      ref={ref}
      className="relative px-5 md:px-8 py-28 md:py-40 border-t hairline border-t-[1px] persp"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/45 mb-5">
              <span className="w-8 h-px bg-bone/30" />
              <span>Visual Research & Observation</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-[1] tracking-tightest text-bone">
              Film & <span className="editorial text-bone/80">photography</span> archive
            </h2>
          </div>
          <p className="hidden md:block max-w-xs text-right text-bone/40 text-[13px] leading-relaxed">
            A slow library of stills — captured to remember how light behaved that afternoon.
          </p>
        </div>

        <div className="archive-grid grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 preserve-3d">
          {stills.map((s, i) => (
            <button
              key={s.id || i}
              onClick={() => setActive(s)}
              className={`archive-tile group relative overflow-hidden rounded-sm border hairline bg-[#111] will-change-transform preserve-3d ${
                i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-[4/5]"
              }`}
              aria-label={s.caption}
            >
              <div className="archive-media absolute inset-[-8%] w-[116%] h-[116%]">
                {s.image ? (
                  isVideo(s.image) ? (
                    <video
                      src={s.image}
                      className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[1400ms] ease-cinema group-hover:scale-110 grayscale group-hover:grayscale-0"
                      muted loop playsInline
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.image}
                      alt={s.caption}
                      className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[1400ms] ease-cinema group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                  )
                ) : (
                  <div
                    className="absolute inset-0 scale-105 transition-transform duration-[1400ms] ease-cinema group-hover:scale-110 grayscale"
                    style={{ background: FALLBACK_GRADS[i % FALLBACK_GRADS.length] }}
                  />
                )}
              </div>
              <div className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_3px)] mix-blend-multiply opacity-40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between text-[10px] uppercase tracking-[0.25em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span>{s.caption}</span>
                <span className="text-white/50 tabular">/{String(s.id ?? i + 1).toString().padStart(2, "0")}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-md flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-[16/10] bg-[#111]"
            >
              {active.image ? (
                isVideo(active.image) ? (
                  <video src={active.image} className="absolute inset-0 w-full h-full object-contain" controls autoPlay />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={active.image} alt={active.caption} className="absolute inset-0 w-full h-full object-contain" />
                )
              ) : (
                <div className="absolute inset-0 grayscale" style={{ background: FALLBACK_GRADS[0] }} />
              )}
              <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-bone/70">
                <span>{active.caption}</span>
                <span>Esc / Click to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
