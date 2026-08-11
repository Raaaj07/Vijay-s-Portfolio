"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ContactCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Slightly loose spring so the dot visibly lags behind the real pointer,
  // matching the reference site's trailing-dot cursor.
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.5 });

  useEffect(() => {
    setPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el || !pointerFine) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [pointerFine, x, y]);

  if (!pointerFine) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Small solid trailing dot — matches the reference site's minimal cursor */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 16,
          height: 16,
          background: "var(--accent-coral)",
          boxShadow: "0 0 0 6px rgba(255,107,107,0.15)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />
    </div>
  );
}
