"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 35, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 350, damping: 35, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        setHover(true);
        setLabel(el.getAttribute("data-cursor") || "");
      } else {
        setHover(false);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
    >
      <motion.div
        animate={{
          scale: hover ? 3.2 : 1,
          backgroundColor: hover ? "rgba(214,169,95,0.18)" : "rgba(245,242,235,0)",
          borderColor: hover ? "rgba(214,169,95,0.9)" : "rgba(245,242,235,0.75)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border w-6 h-6 flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-bone/90"
      >
        {label && <span className="opacity-90">{label}</span>}
      </motion.div>
      {!hover && (
        <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-bone/80" />
      )}
    </motion.div>
  );
}
