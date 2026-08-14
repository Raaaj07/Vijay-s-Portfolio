"use client";

import { ReactNode } from "react";
import { useMouseParallax } from "@/lib/mouse-parallax";

function ParallaxLayer({ depth, children, className }: { depth: number; children: ReactNode; className: string }) {
  const { x, y } = useMouseParallax();
  return (
    <div
      className={className}
      style={{
        transform: `translate3d(${x * depth}px, ${y * depth}px, 0)`,
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {/* Sphere */}
      <ParallaxLayer depth={-26} className="absolute top-[14%] left-[6%]">
        <div
          className="w-16 h-16 sm:w-28 sm:h-28 rounded-full animate-float-a"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #b9a6ff 0%, var(--accent-violet) 45%, #3b2a99 100%)",
            boxShadow:
              "0 25px 50px -12px rgba(124,92,252,0.55), 0 0 60px -10px rgba(124,92,252,0.45), inset -8px -10px 20px rgba(0,0,0,0.35)",
          }}
        />
      </ParallaxLayer>

      {/* Rounded cube 1 */}
      <ParallaxLayer depth={34} className="absolute top-[8%] right-[10%]">
        <div
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl animate-float-b"
          style={{
            background: "linear-gradient(135deg, #6fe8da 0%, var(--accent-cyan) 55%, #1a7f74 100%)",
            boxShadow:
              "0 20px 40px -10px rgba(63,224,208,0.5), 0 0 50px -8px rgba(63,224,208,0.4), inset -6px -8px 16px rgba(0,0,0,0.3)",
          }}
        />
      </ParallaxLayer>

      {/* Pyramid */}
      <ParallaxLayer depth={-18} className="absolute top-[46%] left-[2%] sm:left-[4%]">
        <div className="animate-float-c">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "34px solid transparent",
              borderRight: "34px solid transparent",
              borderBottom: "58px solid var(--accent-coral)",
              filter: "drop-shadow(0 18px 22px rgba(255,107,107,0.45)) drop-shadow(0 0 24px rgba(255,107,107,0.35))",
            }}
          />
        </div>
      </ParallaxLayer>

      {/* Cylinder */}
      <ParallaxLayer depth={22} className="absolute bottom-[16%] left-[10%] sm:left-[14%]">
        <div
          className="w-14 h-24 sm:w-16 sm:h-28 rounded-full animate-float-a"
          style={{
            background: "linear-gradient(90deg, #ffdca0 0%, var(--accent-amber) 50%, #b3730a 100%)",
            boxShadow: "0 22px 40px -10px rgba(255,178,56,0.5), 0 0 46px -8px rgba(255,178,56,0.4)",
          }}
        />
      </ParallaxLayer>

      {/* 4-point star / blob */}
      <ParallaxLayer depth={-30} className="absolute top-[10%] right-[28%] sm:right-[32%]">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 animate-spin-slow"
          style={{
            background: "linear-gradient(135deg, #8fb4ff 0%, var(--accent-blue) 60%, #1c4fbf 100%)",
            clipPath:
              "polygon(50% 0%, 63% 37%, 100% 50%, 63% 63%, 50% 100%, 37% 63%, 0% 50%, 37% 37%)",
            filter: "drop-shadow(0 16px 24px rgba(76,141,255,0.45)) drop-shadow(0 0 22px rgba(76,141,255,0.35))",
          }}
        />
      </ParallaxLayer>

      {/* Rounded cube 2 */}
      <ParallaxLayer depth={20} className="absolute bottom-[10%] right-[8%]">
        <div
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl animate-float-b"
          style={{
            background: "linear-gradient(135deg, #ffb3d9 0%, var(--accent-pink) 55%, #99205e 100%)",
            boxShadow:
              "0 20px 40px -10px rgba(255,95,168,0.5), 0 0 50px -8px rgba(255,95,168,0.4), inset -6px -8px 16px rgba(0,0,0,0.3)",
          }}
        />
      </ParallaxLayer>
    </div>
  );
}