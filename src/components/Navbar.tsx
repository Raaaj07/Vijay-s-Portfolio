"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState("Home");

  const frame = useRef<number | null>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((label) => document.getElementById(label.toLowerCase()));

    const computeActive = () => {
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

      setActive(current)
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
      {/* Dark translucent pill bar (switches to a light translucent bar over
          the Contact section) with a violet active-tab highlight throughout */}
      <nav className="flex items-center gap-1 rounded-full bg-white px-1.5 py-1.5 border border-black/10 shadow-sm">
  {NAV_LINKS.map((label) => {
  const isActive = active === label;

  return (
    <button
      key={label}
      onClick={() => handleClick(label)}
      className={`relative z-0 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-300 ${
        isActive
          ? "text-white"
          : "text-black/70 hover:text-black"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full z-0"
          style={{ backgroundColor: "#8B6CFF" }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 30,
          }}
        />
      )}

      <span className="relative z-10">
        {label}
      </span>
    </button>
  );
})}
</nav>
    </div>
  );
}