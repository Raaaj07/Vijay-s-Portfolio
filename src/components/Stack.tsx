"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  desc: string;
  icon: string;
  color: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Tooltip position
  const tipX = useMotionValue(0);
  const tipY = useMotionValue(0);

  const springX = useSpring(tipX, {
    stiffness: 300,
    damping: 26,
    mass: 0.4,
  });

  const springY = useSpring(tipY, {
    stiffness: 300,
    damping: 26,
    mass: 0.4,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    tipX.set(e.clientX - rect.left);
    tipY.set(e.clientY - rect.top);
  };

  return (
    <div className="group relative w-full max-w-[440px] mx-auto aspect-[9/10]">
      {/* Cursor tooltip */}
      <motion.span
        className="
          pointer-events-none
          absolute
          z-20
          rounded-full
          bg-white
          text-[#17161a]
          text-xs
          font-semibold
          px-4
          py-1.5
          shadow-lg
          whitespace-nowrap
        "
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-140%",
        }}
        animate={{
          opacity: hovering ? 1 : 0,
          scale: hovering ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
      >
        Tap to flip
      </motion.span>

      {/* Card scene */}
      <div
        ref={cardRef}
        className="flip-card-scene h-full w-full cursor-pointer"
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHovering(false);
          setFlipped(false);
        }}
      >
        {/* Card inner */}
        <div
          className={`relative w-full h-full flip-card-inner ${
            flipped ? "is-flipped" : ""
          }`}
        >
          {/* =========================
              FRONT OF CARD
             ========================= */}
          <div
            className="
              absolute
              inset-0
              flip-card-face
              rounded-[1.75rem]
              bg-white
              flex
              flex-col
              items-center
              justify-center
              gap-5
              px-4
              shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)]
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.65)]
            "
          >
            {/* Icon badge */}
            <div
              className="
                w-28
                h-28
                sm:w-32
                sm:h-32
                rounded-3xl
                flex
                items-center
                justify-center
                p-6
                transition-transform
                duration-300
                group-hover:scale-110
              "
              style={{
                background: `radial-gradient(
                  circle at 32% 28%,
                  ${color}ee 0%,
                  ${color} 55%,
                  ${color}aa 100%
                )`,
                boxShadow: `
                  0 20px 40px -12px ${color}88,
                  inset -6px -8px 16px rgba(0,0,0,0.15)
                `,
              }}
            >
              {!imgError ? (
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${icon}.svg`}
                  alt={name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              ) : (
                <span className="text-4xl font-display font-bold text-white">
                  {name.charAt(0)}
                </span>
              )}
            </div>

            {/* Technology name */}
            <span
              className="
                font-display
                font-semibold
                text-xl
                sm:text-2xl
                text-[#17161a]
                text-center
              "
            >
              {name}
            </span>
          </div>

          {/* =========================
              BACK OF CARD
             ========================= */}
          <div
            className="
              absolute
              inset-0
              flip-card-face
              flip-card-back
              rounded-[1.75rem]
              bg-[var(--accent-violet)]
              flex
              items-center
              justify-center
              px-6
              text-center
              shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)]
            "
          >
            <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
              {desc}
            </p>
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
    const rows = rowRefs.current.filter(
      Boolean
    ) as HTMLDivElement[];

    if (rows.length === 0) return;

    /*
     * IMPORTANT:
     * No opacity animation.
     *
     * Cards stay completely opaque / pure white.
     * Only scale and Y position are animated.
     */
    rows.forEach((row) => {
      gsap.set(row, {
        scale: 0.5,
        opacity: 1,
        y: 60,
      });
    });

    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 95%",
              end: "bottom 5%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })

          // =========================
          // ENTER
          // =========================
          .fromTo(
            row,
            {
              scale: 0.5,
              opacity: 1,
              y: 60,
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power1.out",
            }
          )

          // =========================
          // HOLD
          // =========================
          .to(row, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
          })

          // =========================
          // EXIT
          // =========================
          .to(row, {
            scale: 0.5,
            opacity: 1,
            y: -60,
            duration: 0.7,
            ease: "power1.in",
          });
      });
    }, triggerRef.current ?? undefined);

    return () => {
      ctx.revert();
    };
  }, [rowsData.length]);

  return (
    <div
      ref={triggerRef}
      className="
        relative
        w-full
        h-full
        min-h-screen
        bg-[var(--bg-dark)]
        px-4
        py-20
        sm:py-28
        overflow-hidden
        flex
        flex-col
        justify-center
      "
    >
      {/* =========================
          BACKGROUND POLYHEDRON
         ========================= */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[340px]
          h-[340px]
          sm:w-[460px]
          sm:h-[460px]
          pointer-events-none
          z-0
          animate-spin-slower
        "
        style={{
          perspective: "800px",
        }}
      >
        <div
          className="w-full h-full opacity-70"
          style={{
            background:
              "linear-gradient(135deg, #6fe8da 0%, var(--accent-cyan) 45%, #1a7f74 100%)",
            clipPath:
              "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            filter:
              "blur(0.5px) drop-shadow(0 0 90px rgba(63,224,208,0.35))",
          }}
        />
      </div>

      {/* =========================
          CONTENT
         ========================= */}
      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          w-full
          flex
          flex-col
          items-center
          justify-center
          flex-1
        "
      >
        {/* Heading */}
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-center">
          My Stack
        </h2>

        <p className="mt-2 text-center text-sm text-[var(--text-dark-muted)]">
          Hover a card to see what it&apos;s for.
        </p>

        {/* =========================
            STACK ROWS
           ========================= */}
        <div
          className="
            w-full
            flex
            flex-col
            gap-14
            sm:gap-20
            mt-12
            sm:mt-16
          "
        >
          {rowsData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
              className="
                w-full
                flex
                flex-wrap
                justify-center
                gap-6
                sm:gap-8
              "
              style={{
                transformOrigin: "center center",
              }}
            >
              {row.map((item) => (
                <div
                  key={item.name}
                  className="
                    w-full
                    sm:w-[calc(50%-16px)]
                    md:w-[calc(33.33%-22px)]
                    max-w-md
                  "
                  style={{
                    transformOrigin: "center center",
                  }}
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