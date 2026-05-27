"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    if (!audioRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 110;
      lfo.frequency.value = 0.12;
      lfoGain.gain.value = 0.012;
      lfo.connect(lfoGain).connect(gain.gain);
      gain.gain.value = 0.025;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      lfo.start();
      audioRef.current = { ctx, gain };
      setOn(true);
      return;
    }
    const { ctx, gain } = audioRef.current;
    if (on) {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setOn(false);
    } else {
      gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.4);
      setOn(true);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      aria-pressed={on}
      data-cursor={on ? "mute" : "sound"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full border hairline bg-ink/40 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-bone/70 hover:text-bone transition-colors"
    >
      <span className="relative flex w-2 h-2">
        <span
          className={`absolute inset-0 rounded-full ${
            on ? "bg-amber animate-ping" : "bg-bone/30"
          }`}
        />
        <span
          className={`relative rounded-full w-2 h-2 ${on ? "bg-amber" : "bg-bone/40"}`}
        />
      </span>
      Ambient {on ? "On" : "Off"}
    </motion.button>
  );
}
