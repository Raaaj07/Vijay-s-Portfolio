"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Simple CSS-only "3D" shapes, one per service, colored via inline style.
function ServiceShape({ shape, color }: { shape: string; color: string }) {
  const common = "w-20 h-20 sm:w-28 sm:h-28";
  switch (shape) {
    case "pyramid":
      return (
        <div className={`${common} animate-rotate-shape`} style={{ transformStyle: "preserve-3d" }}>
          <div
            className="w-0 h-0 mx-auto"
            style={{
              borderLeft: "40px solid transparent",
              borderRight: "40px solid transparent",
              borderBottom: `70px solid ${color}`,
              filter: `drop-shadow(0 20px 30px ${color}66)`,
            }}
          />
        </div>
      );
    case "sphere":
      return (
        <div
          className={`${common} rounded-full animate-float-a`}
          style={{
            background: `radial-gradient(circle at 32% 28%, #fff8 0%, ${color} 45%, #0006 100%)`,
            boxShadow: `0 25px 50px -12px ${color}88, 0 0 60px -10px ${color}66`,
          }}
        />
      );
    case "diamond":
      return (
        <div className={`${common} animate-spin-slower`}>
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, #ffffffaa 0%, ${color} 50%, #00000066 100%)`,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              filter: `drop-shadow(0 20px 30px ${color}66)`,
            }}
          />
        </div>
      );
    case "cylinder":
    default:
      return (
        <div
          className={`${common} rounded-[40%] animate-float-b`}
          style={{
            background: `linear-gradient(90deg, #fff8 0%, ${color} 50%, #0006 100%)`,
            boxShadow: `0 22px 40px -10px ${color}88`,
          }}
        />
      );
  }
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Register scrolltriggers for each service card
    const ctx = gsap.context(() => {
      SERVICES.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.service-card-${i}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const current = SERVICES[active];

  return (
    <div className="relative w-full bg-[var(--bg-dark)]">
      {/* Section heading — sits above the two-column layout, centered on the
          full page (not just the black column), so it reads as one title. */}
      <div className="pt-20 sm:pt-28 pb-10 sm:pb-14 text-center px-4">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
          Services
        </h2>
      </div>

      {/* Constrained wrapper: max-width + auto margins keeps the white/black
          panel centered with breathing room on both sides instead of
          stretching edge-to-edge. Adjust max-w-6xl to taste (max-w-5xl = narrower). */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={containerRef} className="relative w-full">
          <div className="flex flex-col md:flex-row items-stretch">

            {/* Left Column: Sticky Sidebar — content anchored top-left */}
            <div className="hidden md:flex md:sticky md:top-0 md:h-screen z-10 w-full md:w-[35%] bg-white flex-col items-start px-10 pt-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-[#17161a]"
                >
                  <span className="block font-display font-black leading-none text-[5.5rem] sm:text-[6.5rem] text-black/25">
                    {current.number}
                  </span>
                  <span className="block font-display font-bold text-lg sm:text-xl uppercase -mt-2">
                    {current.title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Vertically stacked scrollable cards */}
            <div className="w-full md:w-[65%] bg-black flex flex-col justify-start">
              <div className="flex flex-col">
                {SERVICES.map((s, i) => (
                  <div
                    key={s.number}
                    className={`service-card-${i} relative bg-black px-8 sm:px-16 lg:px-24 py-20 min-h-[85vh] flex flex-col justify-start pt-24 border-b border-white/5 overflow-hidden`}
                  >
                    {/* Accent glow behind each service block */}
                    <div
                      className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none transition-opacity duration-500"
                      style={{ backgroundColor: s.color }}
                    />

                    {/* Mobile number header - compact centered white card */}
                    <div className="flex items-center justify-center gap-4 md:hidden mb-8 bg-white text-black px-6 py-4 rounded-none w-full max-w-[280px] mx-auto shadow-lg">
                      <span className="font-display font-black text-2xl">
                        {s.number}
                      </span>
                      <span className="w-px h-6 bg-black/15" />
                      <span className="font-display font-bold text-xs uppercase tracking-wider text-center">
                        {s.title}
                      </span>
                    </div>

                    {/* Description text */}
                    <p className="text-[var(--text-dark-muted)] leading-relaxed max-w-xl text-base sm:text-lg lg:text-xl z-10">
                      {s.description}
                    </p>

                    {/* 3D Rotating Shape — lower and right-aligned, matching reference */}
                    <div className="flex items-end justify-end flex-1 mt-12 md:mt-0 pb-8 md:pr-8 z-10">
                      <ServiceShape shape={s.shape} color={s.color} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}