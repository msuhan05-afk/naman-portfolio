"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import gsap from "gsap";

const links = [
  { href: "/work",        label: "Work" },
  { href: "/xr",          label: "XR / Physical" },
  { href: "/playground",  label: "Playground" },
  { href: "/about",       label: "About" },
  { href: "/about#contact", label: "Contact" },
];

// ── Magnetic nav link ────────────────────────────────────────────────────────
function MagLink({ href, children }) {
  const ref = useRef(null);
  const dot = useRef(null);

  const onEnter = () => {
    gsap.to(ref.current, { color: "rgb(var(--bone))", duration: 0.3, ease: "power2.out" });
    gsap.fromTo(dot.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.4, ease: "expo.out" }
    );
  };
  const onLeave = () => {
    gsap.to(ref.current, { color: "rgba(var(--bone)/0.5)", duration: 0.4, ease: "power2.out" });
    gsap.to(dot.current, { scaleX: 0, opacity: 0, duration: 0.35, ease: "expo.in" });
  };
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    gsap.to(ref.current, {
      x: (e.clientX - cx) * 0.22,
      y: (e.clientY - cy) * 0.22,
      duration: 0.5, ease: "power2.out",
    });
  };
  const onReset = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "expo.out" });
  };

  return (
    <Link
      href={href}
      ref={ref}
      className="relative inline-block text-bone/55"
      onMouseEnter={onEnter}
      onMouseLeave={(e) => { onLeave(); onReset(); }}
      onMouseMove={onMove}
    >
      {children}
      {/* animated underline dot */}
      <span
        ref={dot}
        className="absolute -bottom-1 left-0 w-full h-px origin-left"
        style={{ background: "rgb(var(--amber))", transform: "scaleX(0)", opacity: 0 }}
      />
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const dotRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pulse the logo dot on mount
  useEffect(() => {
    if (!dotRef.current) return;
    gsap.fromTo(dotRef.current,
      { scale: 1 },
      { scale: 1.6, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 }
    );
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md bg-ink/60 border-b hairline border-b-[1px]"
          />
        )}
      </AnimatePresence>

      <nav className="relative flex items-center justify-between px-5 md:px-8 py-4 text-[11px] uppercase tracking-[0.22em]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            ref={dotRef}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "rgb(var(--amber))", boxShadow: "0 0 8px rgba(214,169,95,0.6)" }}
          />
          <span className="font-display font-medium text-bone tracking-wide">Naman Mehra</span>
        </Link>

        {/* Nav links with magnetic micro-interactions */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <MagLink href={l.href}>{l.label}</MagLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <MagLink href="/admin">Admin</MagLink>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
