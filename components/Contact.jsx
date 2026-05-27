"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Contact({ data }) {
  const c = data || {};
  const links = c.links || [];
  const ref = useRef(null);

  useGSAP(
    () => {
      // Headline reveal — single triggered tween, no scrub
      gsap.from(".contact-line", {
        yPercent: 100,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".contact-headline", start: "top 80%" },
      });

      gsap.from(".contact-link", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact-list", start: "top 85%" },
      });

      gsap.from(".contact-side", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact-side", start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-5 md:px-8 pt-28 md:pt-40 pb-12 border-t hairline border-t-[1px] persp"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/45 mb-10">
          <span className="w-8 h-px bg-bone/30" />
          <span>Contact</span>
        </div>

        <h2 className="contact-headline font-display text-[12vw] md:text-[8vw] leading-[0.9] tracking-tightest text-bone preserve-3d">
          <span className="block overflow-hidden">
            <span className="contact-line inline-block will-change-transform">Let’s make&nbsp;<span className="editorial text-amber">something</span></span>
          </span>
          <span className="block overflow-hidden">
            <span className="contact-line inline-block will-change-transform">worth lingering on.</span>
          </span>
        </h2>

        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <ul className="contact-list divide-y divide-bone/[0.08] border-y border-bone/[0.08]">
            {links.map((l, i) => (
              <li key={i} className="contact-link will-change-transform">
                <a
                  href={l.href}
                  target={l.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 text-bone/70 hover:text-bone transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-[0.25em] text-bone/40 w-24">{l.label}</span>
                  <span className="flex-1 ml-6 text-lg md:text-xl font-display tracking-tight">{l.value}</span>
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="contact-side text-bone/55 leading-relaxed max-w-md text-[15px]">
            <p>{c.footnote}</p>
            <p className="mt-5 editorial text-bone/85 text-lg">The good ones usually start with a long email.</p>
            {c.phone && (
              <p className="mt-5 text-[12px] uppercase tracking-[0.25em] text-bone/40">{c.phone}</p>
            )}
          </div>
        </div>

        <footer className="mt-24 pt-6 border-t hairline border-t-[1px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-bone/40">
          <span>© Naman Mehra · MMXXVI</span>
          <span>Built with Next · Lenis · GSAP</span>
          <span className="tabular">London — Index of Works</span>
        </footer>
      </div>
    </section>
  );
}
