"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyClient({ project, sections }) {
  const [active, setActive] = useState(sections[0].key);
  const ref = useRef(null);
  const heroRef = useRef(null);

  useGSAP(
    () => {
      // Lightweight hero parallax — yPercent only
      gsap.to(".cs-hero-media", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".cs-hero-text > *", {
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
      });

      // Simple body / figure reveals
      gsap.utils.toArray(".cs-section").forEach((s) => {
        gsap.from(s.querySelector(".cs-body"), {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: s, start: "top 80%" },
        });
        const fig = s.querySelector(".cs-figure");
        if (fig) {
          gsap.from(fig, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: fig, start: "top 85%" },
          });
        }
      });
    },
    { scope: ref, dependencies: [project.slug] }
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.key);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <main ref={ref} className="relative">
      <Link
        href="/#work"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-bone/60 hover:text-bone transition-colors backdrop-blur-md bg-ink/40 border hairline rounded-full px-4 py-2"
      >
        ← Index
      </Link>

      <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-[#111] persp">
        <div className="cs-hero-media absolute inset-[-6%] will-change-transform">
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ background: project.cover }} />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        <div className="cs-hero-text absolute inset-x-5 md:inset-x-8 bottom-[12vh] max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/70 mb-8">
            <span>{project.category}</span>
            <span className="w-8 h-px bg-white/30" />
            <span>{project.year}</span>
          </div>
          <h1 className="font-display text-[10vw] md:text-[6.5vw] leading-[0.95] tracking-tightest text-white max-w-5xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-xl text-white/75 text-lg leading-relaxed">
            {project.blurb}
          </p>
        </div>
      </section>

      <div className="relative px-6 md:px-10 py-24 md:py-32 max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10">
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-32">
            <div className="text-[10px] uppercase tracking-[0.3em] text-bone/40 mb-6">Case Study</div>
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.key}>
                  <a
                    href={`#${s.key}`}
                    className={`flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                      active === s.key ? "text-bone" : "text-bone/40 hover:text-bone/70"
                    }`}
                  >
                    <span className={`h-px transition-all duration-500 ${active === s.key ? "w-10 bg-amber" : "w-4 bg-bone/30"}`} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="md:col-span-9 space-y-32 md:space-y-44 persp">
          {sections.map((s, i) => (
            <article id={s.key} key={s.key} className="cs-section scroll-mt-32 preserve-3d">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/40 mb-6">
                <span className="tabular">0{i + 1}</span>
                <span>{s.label}</span>
              </div>
              <p className="cs-body font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-bone max-w-3xl will-change-transform">
                {s.body}
              </p>
              {i % 2 === 0 && (
                <div className="cs-figure mt-12 aspect-[16/10] rounded-sm overflow-hidden relative bg-[#111] will-change-transform"
                     style={project.coverImage ? undefined : { background: project.cover }}>
                  {project.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                  )}
                  <div className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0,rgba(0,0,0,0.18)_1px,transparent_1px,transparent_3px)]" />
                  <div className="absolute left-5 bottom-4 text-[10px] uppercase tracking-[0.3em] text-white/65">
                    Fig. {String(i + 1).padStart(2, "0")} — process still
                  </div>
                </div>
              )}
            </article>
          ))}

          <div className="pt-16 border-t hairline border-t-[1px] flex items-center justify-between">
            <Link href="/#work" className="text-bone/60 hover:text-bone transition-colors text-[11px] uppercase tracking-[0.25em]">
              ← Back to index
            </Link>
            <span className="text-[11px] uppercase tracking-[0.25em] text-bone/40">
              End · {project.title}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
