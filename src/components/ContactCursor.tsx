// src/components/ContactCursor.tsx
import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}
function getServerSnapshot() {
  return false;
}

export default function ContactCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false); // keep this one, it's fine — it's driven by real DOM events
  const pointerFine = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.5 });

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
