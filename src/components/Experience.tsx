// src/components/Experience.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const ICONS = { experience: "💼", education: "🎓", achievement: "🏆" };
const LABELS = { experience: "Experience", education: "Education", achievement: "Achievement" };

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const comet = cometRef.current;
    if (!section || !line || !comet) return;

    const ctx = gsap.context(() => {
      // Line fill still tracks overall scroll progress through the section
      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
    gsap.to(line, {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
        trigger: timelineWrapRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true, // was: scrub: 0.3
    },
    });

      // Idle "breathing" pulse on the center dot so it feels alive even
      // when scroll is momentarily still — purely decorative, not scroll-tied.
      gsap.to(comet, {
        scale: 1.25,
        boxShadow: "0 0 30px 10px var(--accent-violet), 0 0 8px 3px white",
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      TIMELINE.forEach((item, i) => {
        const card = cardRefs.current[i];
        const node = nodeRefs.current[i];
        const ring = ringRefs.current[i];
        if (!card || !node) return;

        const fromX = i % 2 === 0 ? 60 : -60;
        gsap.set(card, { opacity: 0, x: fromX, rotateY: i % 2 === 0 ? -18 : 18, rotateX: 8 });
        gsap.set(node, { scale: 0 });

        // Reveal completes exactly when the card reaches the fixed center
        // dot — tied to scroll position, not a timer, so it snaps at
        // whatever speed you're scrolling.
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "center center",
            scrub: 0.25,
          },
        })
          .to(node, { scale: 1, ease: "back.out(3)" }, 0)
          .to(card, { opacity: 1, x: 0, rotateY: 0, rotateX: 0, ease: "power3.out" }, 0);

        // Once the card passes the center dot, it recedes slightly —
        // keeps visual focus on whichever card currently sits at the dot.
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "center center",
            end: "top 15%",
            scrub: 0.25,
          },
        }).to(card, { opacity: 0.45, scale: 0.96, ease: "none" }, 0);

        // Active-card glow while it spans the center dot
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () =>
            gsap.to(card, {
              boxShadow: `0 0 0 3px ${item.color}, 0 20px 60px -10px ${item.color}88`,
              duration: 0.3,
            }),
          onLeave: () =>
            gsap.to(card, { boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)", duration: 0.3 }),
          onEnterBack: () =>
            gsap.to(card, {
              boxShadow: `0 0 0 3px ${item.color}, 0 20px 60px -10px ${item.color}88`,
              duration: 0.3,
            }),
          onLeaveBack: () =>
            gsap.to(card, { boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)", duration: 0.3 }),
        });

        // One-shot pulse ring on the node right as it crosses the dot
        if (ring) {
          ScrollTrigger.create({
            trigger: card,
            start: "top center",
            onEnter: () =>
              gsap.fromTo(
                ring,
                { scale: 0.6, opacity: 0.6 },
                { scale: 2.2, opacity: 0, duration: 0.8, ease: "power2.out" }
              ),
            onEnterBack: () =>
              gsap.fromTo(
                ring,
                { scale: 0.6, opacity: 0.6 },
                { scale: 2.2, opacity: 0, duration: 0.8, ease: "power2.out" }
              ),
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
  <div
    ref={sectionRef}
    className="relative w-full min-h-screen bg-[var(--bg-dark)] px-4 py-16 sm:py-24"
  >
    {/* Clipping isolated to just this layer — keeps the glows contained
        without breaking position:sticky for the timeline dot below */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -left-32 top-1/4 w-96 h-96 rounded-full blur-[120px] opacity-[0.08] bg-[var(--accent-violet)]" />
      <div className="absolute -right-32 bottom-1/4 w-96 h-96 rounded-full blur-[120px] opacity-[0.08] bg-[var(--accent-cyan)]" />
    </div>

    <span className="block text-center text-xs font-semibold tracking-widest uppercase text-[var(--accent-violet)] mb-3">
      Journey
    </span>
    <h2 className="font-display font-bold text-3xl sm:text-4xl text-center mb-16 sm:mb-24">
      Experience &amp; Milestones
    </h2>

      <div ref={timelineWrapRef} className="relative max-w-3xl mx-auto" style={{ perspective: "1400px" }}>
        {/* Static dim track */}
        <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />
        {/* Growing gradient fill */}
        <div
          ref={lineRef}
          className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent-violet), var(--accent-cyan), var(--accent-amber))",
          }}
        />

       {/* Sticky playhead — locks to viewport center while you scroll
            through this section, then releases naturally at the edges */}
        <div className="sticky top-[50vh] h-0 z-[5] pointer-events-none">
          <div
            ref={cometRef}
            className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
            style={{
              background: "var(--accent-violet)",
              boxShadow: "0 0 22px 6px var(--accent-violet), 0 0 6px 2px white",
            }}
          />
        </div>

        <div className="flex flex-col gap-14 sm:gap-16">
          {TIMELINE.map((item, i) => {
            const isRight = i % 2 === 0;
            return (
              <div
                key={item.title}
                className={`relative flex items-start md:items-center ${
                  isRight ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: `radial-gradient(circle at 32% 28%, ${item.color}ee 0%, ${item.color} 70%)`,
                    boxShadow: `0 0 0 4px var(--bg-dark), 0 8px 20px -4px ${item.color}aa`,
                  }}
                >
                  <div
                    ref={(el) => {
                      ringRefs.current[i] = el;
                    }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: `2px solid ${item.color}`, opacity: 0 }}
                  />
                  {ICONS[item.type]}
                </div>

                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`ml-16 md:ml-0 w-full md:w-[calc(50%-3rem)] rounded-2xl bg-white text-[#17161a] px-6 py-6 sm:px-7 sm:py-7 shadow-2xl transition-transform duration-300 hover:scale-[1.015] ${
                    isRight ? "md:mr-auto" : "md:ml-auto"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span
                    className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3"
                    style={{ background: `${item.color}22`, color: item.color }}
                  >
                    {LABELS[item.type]} · {item.period}
                  </span>
                  <h3 className="font-display font-semibold text-lg leading-snug">{item.title}</h3>
                  <p className="text-sm text-[#5c5b60] mt-0.5 mb-3">{item.subtitle}</p>
                  <ul className="flex flex-col gap-1.5">
                    {item.points.map((p) => (
                      <li key={p} className="text-sm text-[#3a393e] leading-relaxed">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}