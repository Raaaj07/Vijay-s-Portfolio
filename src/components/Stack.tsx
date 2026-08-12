"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STACK } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

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
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative w-full max-w-[400px] mx-auto aspect-[9/10]">
      {/* Hint shown on hover — click/tap is what actually flips the card */}
      <span className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 z-20 rounded-full bg-white text-[#17161a] text-xs font-semibold px-4 py-1.5 shadow-lg opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-2">
        Tap to flip
      </span>

      <div
        className="flip-card-scene h-full w-full cursor-pointer"
        onClick={() => setFlipped((f) => !f)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div className={`relative w-full h-full flip-card-inner ${flipped ? "is-flipped" : ""}`}>
          {/* Front — solid white card with real brand icon + name */}
          <div className="absolute inset-0 flip-card-face rounded-[1.75rem] bg-white flex flex-col items-center justify-center gap-4 px-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.65)]">
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">              {!imgError ? (
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${icon}.svg`}
                  alt={name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-full h-full rounded-2xl flex items-center justify-center text-3xl font-display font-bold text-white"
                  style={{ background: color }}
                >
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <span className="font-display font-semibold text-xl sm:text-2xl text-[#17161a] text-center">
              {name}
            </span>
          </div>

          {/* Back — description on accent color */}
          <div className="absolute inset-0 flip-card-face flip-card-back rounded-[1.75rem] bg-[var(--accent-violet)] flex items-center justify-center px-6 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)]">
            <p className="text-sm sm:text-base text-white leading-relaxed font-medium">{desc}</p>
          </div>
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
                  className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-22px)] max-w-md"
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
