"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { NAV_LINKS } from "@/lib/data";

gsap.registerPlugin(ScrollToPlugin);

function getInitialActive() {
  if (typeof window === "undefined") return NAV_LINKS[0];
  const hash = window.location.hash.replace("#", "");
  const match = NAV_LINKS.find((l) => l.toLowerCase() === hash);
  return match ?? NAV_LINKS[0];
}

export default function Navbar() {
  const [active, setActive] = useState(NAV_LINKS[0]);
  const [isLight, setIsLight] = useState(false);
  const frame = useRef<number | null>(null);
  const locked = useRef(false);

  useEffect(() => {
    // Now safe to read window.location — this only runs on the client,
    // after the server-rendered markup has already been hydrated.
    const initial = getInitialActive();
    locked.current = initial !== NAV_LINKS[0];
    setActive(initial);
    setIsLight(initial === "Contact");

    const sections = NAV_LINKS.map((label) => document.getElementById(label.toLowerCase()));

    const computeActive = () => {
      if (locked.current) return; // skip geometry checks while layout is still settling post-jump
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

    // Release the lock once layout has had time to settle (matches
    // ScrollRefresh's own settle window), then let real scroll tracking take over
    const unlock = setTimeout(() => {
      locked.current = false;
      computeActive();
    }, 500);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      clearTimeout(unlock);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  // ...handleClick and the JSX return below stay exactly as they were

  const handleClick = (label: string) => {
  if (label === "Home") {
    gsap.to(window, {
      duration: 0.4,           // was: 1.1
      scrollTo: { y: 0 },
      ease: "power2.out",       // was: power2.inOut
      overwrite: true,
    });
    return;
  }

  const el = document.getElementById(label.toLowerCase());
  if (!el) return;
  gsap.to(window, {
    duration: 0.4,               // was: 1.1
    scrollTo: { y: el, offsetY: 0 },
    ease: "power2.out",           // was: power2.inOut
    overwrite: true,
  });
};

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full bg-white px-1.5 py-1.5 border border-black/10 shadow-sm">
        {NAV_LINKS.map((label) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={`relative z-0 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-300 ${
                isActive ? "text-white" : "text-black/70 hover:text-black"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full z-0"
                  style={{ backgroundColor: "#8B6CFF" }}
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}