"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STACK } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Simple, generic glyphs (not brand logotypes) themed per technology —
// enough to be instantly recognizable without reproducing trademarked marks.
const ICONS: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="4.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2">
        <ellipse cx="24" cy="24" rx="19" ry="7.5" />
        <ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(120 24 24)" />
      </g>
    </svg>
  ),
  node: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 4 42 14v20L24 44 6 34V14z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 15v18M17 19l14 10M31 19l-14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  express: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M14 14 4 24l10 10M34 14l10 10-10 10M28 12l-8 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 4c8 6 12 14 12 22a12 12 0 01-24 0c0-8 4-16 12-22z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 26V44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <ellipse cx="24" cy="12" rx="16" ry="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 12v12c0 3.3 7.2 6 16 6s16-2.7 16-6V12M8 24v12c0 3.3 7.2 6 16 6s16-2.7 16-6V24" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="5" y="5" width="38" height="38" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M18 18v14c0 3-2 4-4.5 3M32 18v11.5c0 3.5-4 4.5-6.5 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  java: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M15 30c-4 3 0 6 8 6 10 0 16-3 16-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 6c-6 6 10 10 2 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="14" y="34" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="30" cy="24" r="6" stroke="currentColor" strokeWidth="2.2" />
      <path d="M18 6h6a6 6 0 010 12h-6zM18 18h6a6 6 0 010 12h-6a6 6 0 010-12zM18 30h6a6 6 0 010 12 6 6 0 01-6-6z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  ),
  canva: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 27c0 5 4 8 8 5 2-1.5 3-4 3.5-7M27 20c1.5-3 5-4 7-1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="14" cy="38" r="4" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="34" cy="24" r="4" stroke="currentColor" strokeWidth="2.2" />
      <path d="M14 14v20M14 24c0-5.5 4.5-9 10-9h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
};

function StackCard({
  name,
  desc,
  icon,
  color,
}: {
  name: string;
  tag: string;
  desc: string;
  icon: string;
  color: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-card-scene h-52 sm:h-56 cursor-pointer group w-full"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`relative w-full h-full flip-card-inner ${flipped ? "is-flipped" : ""}`}>
        {/* Front — solid white card with icon + name */}
        <div className="absolute inset-0 flip-card-face rounded-3xl bg-white shadow-xl flex flex-col items-center justify-center gap-4 px-4 border border-black/5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110" style={{ color }}>
            {ICONS[icon]}
          </div>
          <span className="font-display font-semibold text-base sm:text-lg text-[#17161a] text-center">
            {name}
          </span>
          <span className="absolute bottom-3 right-4 rounded-full bg-[#17161a] text-white text-[10px] px-2.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Hover to flip
          </span>
        </div>
        {/* Back — description on accent color */}
        <div className="absolute inset-0 flip-card-face flip-card-back rounded-3xl bg-[var(--accent-violet)] flex items-center justify-center px-6 text-center shadow-xl">
          <p className="text-sm sm:text-base text-white leading-relaxed font-medium">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Stack() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Group STACK cards into rows of 3
  const rowsData: (typeof STACK)[] = [];
  const columnsCount = 3;
  for (let i = 0; i < STACK.length; i += columnsCount) {
    rowsData.push(STACK.slice(i, i + columnsCount));
  }

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (rows.length === 0) return;

    // Set initial state for all rows: zoomed-out, translated down, and transparent
    rows.forEach((row) => {
      gsap.set(row, { scale: 0.5, opacity: 0, y: 60 });
    });

    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 95%",
            end: "bottom 5%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(row,
          { scale: 0.5, opacity: 0, y: 60 },
          { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "power1.out" }
        )
        .to(row, {
          duration: 0.6, // Hold state while centered
        })
        .to(row, {
          scale: 0.5,
          opacity: 0,
          y: -60,
          duration: 0.7,
          ease: "power1.in",
        });
      });
    }, triggerRef.current ?? undefined);

    return () => ctx.revert();
  }, [rowsData.length]);

  return (
    <div ref={triggerRef} className="relative w-full h-full min-h-screen bg-[var(--bg-dark)] px-4 py-20 sm:py-28 overflow-hidden flex flex-col justify-center">
      {/* Giant slowly-rotating polyhedron floating behind the grid */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] pointer-events-none z-0 animate-spin-slower"
        style={{ perspective: "800px" }}
      >
        <div
          className="w-full h-full opacity-70"
          style={{
            background: "linear-gradient(135deg, #6fe8da 0%, var(--accent-cyan) 45%, #1a7f74 100%)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            filter: "blur(0.5px) drop-shadow(0 0 90px rgba(63,224,208,0.35))",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center flex-1">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-center">My Stack</h2>
        <p className="mt-2 text-center text-sm text-[var(--text-dark-muted)]">
          Hover a card to see what it&apos;s for.
        </p>

        {/* Rows in normal block flow */}
        <div className="w-full flex flex-col gap-14 sm:gap-20 mt-12 sm:mt-16">
          {rowsData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
              className="w-full flex flex-wrap justify-center gap-6 sm:gap-8"
              style={{ transformOrigin: "center center" }}
            >
              {row.map((item) => (
                <div
                  key={item.name}
                  className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-22px)] max-w-sm"
                  style={{ transformOrigin: "center center" }}
                >
                  <StackCard {...item} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
