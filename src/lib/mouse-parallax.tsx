"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

type MousePos = { x: number; y: number };

// x and y are normalized to roughly -0.5..0.5 (0 = viewport center)
const MouseParallaxContext = createContext<MousePos>({ x: 0, y: 0 });

export function MouseParallaxProvider({ children }: { children: ReactNode }) {
  const [pos, setPos] = useState<MousePos>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setPos({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return <MouseParallaxContext.Provider value={pos}>{children}</MouseParallaxContext.Provider>;
}

export function useMouseParallax() {
  return useContext(MouseParallaxContext);
}
