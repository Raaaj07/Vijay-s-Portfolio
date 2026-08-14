"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Marquee from "./Marquee";
import FloatingShapes from "./FloatingShapes";
import { SITE, ROLES } from "@/lib/data";
import { useMouseParallax } from "@/lib/mouse-parallax";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { x, y } = useMouseParallax();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-fit bg-[var(--bg-dark)] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background marquee — scrolls behind profile photo */}
      <div
        className="absolute left-0 right-0 top-1/2 z-0 text-[var(--text-dark)] overflow-hidden"
        style={{
          transform: `translate3d(${x * 14}px, calc(-50% + ${y * 10}px), 0)`,
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          maskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <Marquee text={SITE.name} />
      </div>

      <FloatingShapes />

      {/* Foreground content — subtle tilt toward the cursor */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{
          transform: `translate3d(${x * 8}px, ${y * 6}px, 0)`,
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <h1 className="font-display font-bold text-[clamp(2rem,6vw,3.75rem)] leading-tight">
          Hi, I&apos;m {SITE.name}!
        </h1>

        <div className="mt-4 h-10 flex items-center justify-center">
          <div className="relative overflow-hidden rounded-full bg-white shadow-md shadow-black/20 px-5 py-2 min-w-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-sm font-semibold text-black whitespace-nowrap"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Profile flip card */}
        <div
          className="mt-8 flip-card-scene w-56 h-56 sm:w-72 sm:h-72 cursor-pointer group"
          onClick={() => setFlipped((f) => !f)}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
        >
          <div className={`relative w-full h-full flip-card-inner ${flipped ? "is-flipped" : ""}`}>
            {/* Front: white header bar + photo below it */}
            <div className="absolute inset-0 flip-card-face rounded-3xl overflow-hidden border border-white/10 flex flex-col">
        
            
              {/* Photo fills the rest of the card */}
              <div className="relative flex-1">
                <Image
                  src="/profile.webp"
                  alt="Vijay Raj — profile photo"
                  fill
                  sizes="(max-width: 640px) 224px, 288px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Back: circular badge, curved rotating text + bouncing arrow */}
            <div className="absolute inset-0 flip-card-face flip-card-back rounded-full overflow-hidden bg-[var(--accent-violet)] flex items-center justify-center">
              <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
                    />
                  </defs>
                  <text fill="white" fontSize="11" letterSpacing="2" className="font-display uppercase">
                    <textPath href="#circlePath" startOffset="0%">
                      SCROLL DOWN AND KNOW ME BETTER • SCROLL DOWN AND KNOW ME BETTER •
                    </textPath>
                  </text>
                </svg>
              </div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>


        {/* Trust badge — same visual slot as "50+ Happy Clients" in the
            reference, but wired to something real from data.ts */}
        {/* <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white shadow-md shadow-black/20 px-4 py-2">
          <span className="text-base leading-none">{TRUST_BADGE.icon}</span>
          <span className="text-xs sm:text-sm font-semibold text-black">
            {TRUST_BADGE.label}
          </span>
        </div> */}

        <a
          href="#contact"
          className="mt-15 inline-flex items-center gap-2 rounded-full bg-white text-black px-15 py-3 text-l font-semibold hover:bg-[var(--accent-violet)] hover:text-white transition-colors duration-300"
        >
          Let&apos;s Work Together!
        </a>
      </div>
    </div>
  );
}