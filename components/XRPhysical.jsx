"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const isVideo = (url) => /\.(mp4|mov|webm|m4v)$/i.test(url || "");

export default function XRPhysical({ items = [] }) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useGSAP(
    () => {
      if (!items.length) return;

      // Title 3D entrance
      gsap.from(".xr-eyebrow, .xr-title", {
        rotateX: -40,
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".xr-head", start: "top 80%" },
      });

      // List rows stagger reveal with 3D
      gsap.from(".xr-row", {
        rotateY: 25,
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".xr-grid", start: "top 70%" },
      });

    },
    { scope: sectionRef, dependencies: [items.length] }
  );

  // Animate swatch swap on active change
  useGSAP(
    () => {
      gsap.fromTo(
        ".xr-swatch",
        { rotateY: 25, opacity: 0, scale: 1.04 },
        { rotateY: 0, opacity: 1, scale: 1, duration: 0.9, ease: "expo.out" }
      );
      gsap.fromTo(
        ".xr-cap",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".xr-body-anim",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.15 }
      );
    },
    { scope: sectionRef, dependencies: [active] }
  );

  if (!items.length) return null;
  const p = items[Math.min(active, items.length - 1)];

  return (
    <section
      id="xr"
      ref={sectionRef}
      className="relative px-5 md:px-8 py-28 md:py-40 border-t hairline border-t-[1px] persp"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="xr-head flex items-end justify-between mb-12">
          <div>
            <div className="xr-eyebrow flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/45 mb-5">
              <span className="w-8 h-px bg-bone/30" />
              <span>XR & Physical Products</span>
            </div>
            <h2 className="xr-title font-display text-3xl md:text-5xl leading-[1] tracking-tightest text-bone max-w-2xl preserve-3d">
              Interfaces with a <span className="editorial text-amber">body</span> — objects, rooms, headsets.
            </h2>
          </div>
          <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-bone/35 tabular">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>

        <div className="xr-grid grid md:grid-cols-12 gap-6 md:gap-10 items-stretch persp">
          <div
            ref={stageRef}
            className="md:col-span-7 relative aspect-[4/3] md:aspect-[16/11] rounded-sm overflow-hidden border hairline bg-[#0e0e0e] preserve-3d will-change-transform"
          >
            <div className="xr-swatch absolute inset-0 preserve-3d will-change-transform" style={{ background: p.swatch }}>
              {p.media ? (
                isVideo(p.media) ? (
                  <video src={p.media} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.media} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                )
              ) : null}
              <div className="absolute inset-0 [background-image:linear-gradient(transparent_95%,rgba(255,255,255,0.05)_95%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.05)_95%)] [background-size:36px_36px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
            </div>

            <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/70 z-10">
              <span>{p.kind}</span>
              <span className="tabular">{p.year}</span>
            </div>

            <div className="xr-cap absolute inset-x-5 bottom-5 max-w-md z-10">
              <p className="font-display editorial text-white/95 text-xl md:text-3xl leading-snug">
                “{p.tagline}”
              </p>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col">
            <ul className="flex-1 divide-y divide-bone/[0.08] border-y border-bone/[0.08]">
              {items.map((x, i) => {
                const isActive = i === active;
                return (
                  <li key={x.id || i} className="xr-row">
                    <button
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="group w-full text-left py-4 md:py-5 grid grid-cols-12 gap-3 items-baseline transition-colors"
                    >
                      <span className="col-span-2 text-[10px] uppercase tracking-[0.25em] text-bone/35 tabular">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="col-span-7 md:col-span-7">
                        <span className={`block font-display text-xl md:text-2xl tracking-tight transition-colors duration-500 ${isActive ? "text-bone" : "text-bone/50 group-hover:text-bone/80"}`}>
                          {x.title}
                        </span>
                      </span>
                      <span className="col-span-3 md:col-span-3 text-right text-[10px] uppercase tracking-[0.2em] text-bone/35">
                        {(x.kind || "").split("·")[0].trim()}
                      </span>
                      <span
                        className={`col-span-12 mt-1 h-px transition-all duration-700 ${isActive ? "bg-amber/80" : "bg-bone/10"}`}
                        style={{ width: isActive ? "100%" : "20%" }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="xr-body-anim mt-6">
              <p className="text-bone/65 leading-relaxed text-[14.5px] max-w-md">{p.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(p.tags || []).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-bone/65 border hairline rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
