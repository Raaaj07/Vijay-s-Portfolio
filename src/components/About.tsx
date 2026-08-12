"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_CARDS, SITE } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Alternating tilt + horizontal drift per card so the stack reads as
// hand-placed rather than perfectly aligned.
const ROTATIONS = [-2.5, 2, -1.5];
const SHIFTS = [0, 10, -8];
const GLOWS = [
  "radial-gradient(circle, rgba(124,92,252,0.6) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(76,141,255,0.55) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(63,224,208,0.55) 0%, transparent 70%)",
];

export default function About() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const button = buttonRef.current;
    if (!trigger || cards.length === 0) return;

    // Reset initial positions for GSAP
    cards.forEach((card) => {
      gsap.set(card, { y: "85vh", opacity: 0 });
    });
    if (button) {
      gsap.set(button, { y: 40, opacity: 0 });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=220%", // Scroll distance pinned
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Card 1 animates in
      tl.to(cards[0], {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });

      // Card 2 animates in, stacking over Card 1
      tl.to(cards[1], {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }, "+=0.25");

      // Card 3 animates in, stacking over Card 2
      tl.to(cards[2], {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }, "+=0.25");

      // Button animates in
      if (button) {
        tl.to(button, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }, "+=0.15");
      }
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={triggerRef}
      className="relative w-full min-h-screen bg-[var(--bg-dark)] flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-widest uppercase text-[var(--accent-violet)] mb-3"
      >
        About
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-display font-bold text-3xl sm:text-4xl text-center mb-10"
      >
        About Me
      </motion.h2>

      {/* Container for absolute stacked cards */}
      <div className="relative w-full max-w-2xl h-[330px] sm:h-[280px] mt-6 flex items-center justify-center">
        {ABOUT_CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ zIndex: i + 1 }}
          >
            {/* Ambient glow — sibling behind the card, not a child of it */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] blur-3xl opacity-40"
              style={{ background: GLOWS[i % GLOWS.length] }}
            />
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full rounded-[2rem] bg-white text-[#17161a] px-7 py-8 sm:px-11 sm:py-10 shadow-2xl cursor-default flex flex-col justify-center"
              style={{
                transformOrigin: "center center",
                rotate: ROTATIONS[i % ROTATIONS.length],
                x: SHIFTS[i % SHIFTS.length],
              }}
            >
              <p className="text-base sm:text-lg leading-relaxed text-center">
                {card.emoji && <span className="mr-1">{card.emoji}</span>}
                {card.lead && <span className="font-semibold">{card.lead} </span>}
                {card.text}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      <a
        ref={buttonRef}
        href={SITE.resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-14 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-[var(--accent-violet)] hover:text-white transition-colors duration-300 relative z-20"
      >
        Read My CV
      </a>
    </div>
  );
}
