"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    // Sync Lenis with the GSAP ticker so ScrollTrigger stays perfectly in step.
    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Make sure ScrollTriggers re-measure after fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const fontsReady = document.fonts?.ready;
    if (fontsReady) fontsReady.then(refresh);

    return () => {
      gsap.ticker.remove(tickerFn);
      window.removeEventListener("load", refresh);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
