"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function FieldNotes({ notes = [] }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!notes.length) return;
      // One trigger, batched stagger — no per-row scrubs
      gsap.from(".note-row", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".note-list", start: "top 80%" },
      });
      gsap.from(".notes-eyebrow", {
        x: -30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".notes-eyebrow", start: "top 90%" },
      });
    },
    { scope: ref, dependencies: [notes.length] }
  );

  if (!notes.length) return null;
  return (
    <section
      id="notes"
      ref={ref}
      className="relative px-5 md:px-8 py-28 md:py-40 border-t hairline border-t-[1px] persp"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div className="notes-eyebrow flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/45">
            <span className="w-8 h-px bg-bone/30" />
            <span>Field Notes · from the notebook</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-bone/30 hidden md:block">Ongoing</span>
        </div>

        <ul className="note-list divide-y divide-bone/[0.07] border-y border-bone/[0.07]">
          {notes.map((note, i) => (
            <li
              key={i}
              className="note-row grid grid-cols-12 gap-4 py-5 md:py-7 items-baseline will-change-transform preserve-3d"
            >
              <span className="col-span-2 md:col-span-1 text-[10px] uppercase tracking-[0.3em] text-bone/30 tabular">{note.n}</span>
              <p className="col-span-10 md:col-span-9 text-bone/90 text-xl md:text-2xl leading-snug editorial font-normal">“{note.text}”</p>
              <span className="hidden md:block col-span-2 text-right text-[10px] uppercase tracking-[0.3em] text-bone/30 tabular">{note.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
