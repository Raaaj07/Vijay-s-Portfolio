"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isLight, setIsLight] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((label) => document.getElementById(label.toLowerCase()));

    const computeActive = () => {
      // Sections use `position: sticky; top: 0`, so each one's rect.top sits
      // at 0 exactly while it's the pinned/active card, positive before it
      // arrives, negative once the next card has covered it. The active
      // section is the last (highest-stacked) one that has reached top.
      let current = NAV_LINKS[0];
      const threshold = window.innerHeight * 0.4;

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = NAV_LINKS[i];
        }
      }

      setActive(current);
      setIsLight(current === "Contact");
    };

    const handleScroll = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(computeActive);
    };

    computeActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const handleClick = (label: string) => {
    const el = document.getElementById(label.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center gap-1 rounded-full px-1.5 py-1.5 backdrop-blur-md border transition-colors duration-500 ${
          isLight
            ? "bg-black/[0.04] border-black/10"
            : "bg-white/[0.06] border-white/10"
        }`}
      >
        {NAV_LINKS.map((label) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={`relative px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-300 ${
                isActive
                  ? isLight
                    ? "text-white"
                    : "text-black"
                  : isLight
                  ? "text-black/60 hover:text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isLight ? "bg-black" : "bg-white"
                  }`}
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              )}
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
