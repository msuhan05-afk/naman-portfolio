"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const initial = stored || prefers;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-bone/55 hover:text-bone transition-colors duration-500"
    >
      <span className="relative inline-flex w-7 h-3.5 rounded-full border border-bone/30 items-center px-0.5">
        <span
          className="block w-2.5 h-2.5 rounded-full bg-bone/80 transition-transform duration-500 ease-cinema"
          style={{ transform: theme === "dark" ? "translateX(0)" : "translateX(14px)" }}
        />
      </span>
      <span className="hidden md:inline">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
