"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function About({ data }) {
  const a = data || {};
  const skills = a.skills || {};
  const timeline = a.timeline || [];
  const ref = useRef(null);

  useGSAP(
    () => {
      // 3D headline reveal
      gsap.from(".about-title", {
        rotateX: -25,
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-title", start: "top 85%" },
      });

      gsap.from(".about-p", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-text", start: "top 80%" },
      });

      gsap.from(".about-skill", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-skills", start: "top 85%" },
      });

      // Timeline rows with rotateY entrance
      gsap.from(".timeline-row", {
        rotateY: -20,
        x: -40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: ".timeline", start: "top 85%" },
      });

      gsap.from(".about-meta-row", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-meta", start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-5 md:px-8 py-28 md:py-40 border-t hairline border-t-[1px] persp"
    >
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/45">
            <span className="w-8 h-px bg-bone/30" />
            <span>About</span>
          </div>
          <div className="about-meta mt-10 space-y-4 text-[12px] uppercase tracking-[0.2em] text-bone/55">
            {[
              ["Based", a.based],
              ["Studying", a.studying],
              ["Previously", a.previously],
              ["Open to", a.openTo],
            ].map(([k, v]) => (
              <div key={k} className="about-meta-row">
                <div className="text-bone/35">{k}</div>
                <div className="mt-1 text-bone/85 normal-case tracking-normal text-base">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-8">
          <h2 className="about-title font-display text-3xl md:text-5xl leading-[1.05] tracking-tightest text-bone preserve-3d">
            HCI designer and creative technologist — working at the seam of
            <span className="editorial text-amber"> behaviour</span>,
            <span className="editorial text-dust"> screens</span> and
            <span className="editorial text-olive"> objects</span>.
          </h2>

          <div className="about-text mt-8 grid md:grid-cols-2 gap-x-10 gap-y-5 text-bone/65 leading-relaxed text-[15px]">
            <p className="about-p">{a.paragraph1}</p>
            <p className="about-p">{a.paragraph2}</p>
          </div>

          <div className="about-skills mt-12 grid md:grid-cols-3 gap-6 border-y border-bone/[0.08] py-6">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="about-skill">
                <div className="text-[10px] uppercase tracking-[0.3em] text-bone/35 mb-2">{k}</div>
                <div className="text-bone/80 text-[14px] leading-relaxed">{v}</div>
              </div>
            ))}
          </div>

          <ul className="timeline mt-12 space-y-5 preserve-3d">
            {timeline.map((row, i) => (
              <li
                key={i}
                className="timeline-row grid grid-cols-12 gap-3 items-baseline will-change-transform"
              >
                <span className="col-span-3 md:col-span-2 text-[10px] uppercase tracking-[0.25em] text-bone/35 tabular">{row.y}</span>
                <span className="col-span-9 md:col-span-10">
                  <span className="text-bone/90">{row.t}</span>
                  <span className="text-bone/45"> — {row.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
