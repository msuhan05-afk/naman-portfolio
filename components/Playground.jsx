"use client";
import { useEffect, useRef } from "react";

function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    const mouse = { x: w / 2, y: h / 2, active: false };
    const N = 110;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4,
    }));

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * devicePixelRatio;
      mouse.y = (e.clientY - r.top) * devicePixelRatio;
      mouse.active = true;
    };
    const onLeave = () => (mouse.active = false);
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.fillStyle = "rgba(14,14,14,0.18)";
      ctx.fillRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 180 * devicePixelRatio;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 0.6;
            p.vx += (dx / d) * f * 0.4;
            p.vy += (dy / d) * f * 0.4;
          }
        }
        p.vx *= 0.96;
        p.vy *= 0.96;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = "rgba(245,242,235,0.7)";
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      // links
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = particles[i],
            b = particles[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const L = 110 * devicePixelRatio;
          if (d2 < L * L) {
            const o = 1 - Math.sqrt(d2) / L;
            ctx.strokeStyle = `rgba(214,169,95,${o * 0.18})`;
            ctx.lineWidth = devicePixelRatio * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <canvas ref={ref} className="w-full h-full block" />;
}

function GenerativeGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let raf;
    let t = 0;
    const resize = () => {
      c.width = c.offsetWidth * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const w = c.width,
        h = c.height;
      ctx.clearRect(0, 0, w, h);
      const step = 28 * devicePixelRatio;
      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const a =
            Math.sin(x * 0.012 + t) * Math.cos(y * 0.012 - t * 0.7);
          ctx.save();
          ctx.translate(x + step / 2, y + step / 2);
          ctx.rotate(a * 1.2);
          ctx.strokeStyle = `rgba(245,242,235,${0.12 + a * 0.18})`;
          ctx.lineWidth = devicePixelRatio;
          ctx.beginPath();
          ctx.moveTo(-step / 2.6, 0);
          ctx.lineTo(step / 2.6, 0);
          ctx.stroke();
          ctx.restore();
        }
      }
      t += 0.008;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="w-full h-full block" />;
}

function MagneticBlob() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `translate3d(${x * 40}px, ${y * 40}px, 0) scale(${
        1 + Math.hypot(x, y) * 0.2
      })`;
    };
    const onLeave = () => (el.style.transform = "translate3d(0,0,0)");
    const parent = el.parentElement;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="w-40 h-40 rounded-full transition-transform duration-700 ease-cinema"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #D6A95F, #6B705C 60%, #1A1A1A 100%)",
        boxShadow: "0 30px 80px -20px rgba(214,169,95,0.35)",
      }}
    />
  );
}

const experiments = [
  {
    title: "Field of attention",
    note: "particles · cursor force",
    Component: ParticleField,
  },
  {
    title: "Generative weave",
    note: "noise · vector grid",
    Component: GenerativeGrid,
  },
];

export default function Playground() {
  return (
    <section id="playground" className="relative px-6 md:px-10 py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/40 mb-6">
              <span className="w-8 h-px bg-bone/30" />
              <span>Experimental Playground</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-bone max-w-2xl">
              Things I make to <span className="editorial text-amber/90">think</span>.
            </h2>
          </div>
          <p className="hidden md:block max-w-[14rem] text-right text-bone/40 text-[13px] leading-relaxed">
            Move the cursor across each frame.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {experiments.map((e, i) => (
            <figure
              key={i}
              className="relative aspect-[4/5] overflow-hidden rounded-sm border hairline bg-[#0e0e0e] text-[#f5f2eb]"
            >
              <e.Component />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between text-[10px] uppercase tracking-[0.25em] text-white/60">
                <span>{e.title}</span>
                <span className="text-white/30">{e.note}</span>
              </figcaption>
            </figure>
          ))}
          <figure
            className="relative aspect-[4/5] overflow-hidden rounded-sm border hairline bg-[#0e0e0e] text-[#f5f2eb] flex items-center justify-center"
          >
            <MagneticBlob />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between text-[10px] uppercase tracking-[0.25em] text-white/60">
              <span>Magnetic mass</span>
              <span className="text-white/30">pointer · physics</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
