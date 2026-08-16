"use client";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export function ScrollRefresh() {
  useLayoutEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // Hide the page for one frame so the browser never paints Home
      // at scroll-top before we jump straight to the target section.
      document.documentElement.style.visibility = "hidden";
    }

    const jumpToHash = () => {
      if (!hash) return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;
      // "auto" = instant, no animation, no visible scroll-through
      window.scrollTo({ top: el.offsetTop, behavior: "auto" });
    };

    ScrollTrigger.refresh();
    jumpToHash();

    // Reveal on the next frame, after the jump has already applied
    requestAnimationFrame(() => {
      document.documentElement.style.visibility = "visible";
    });

    // Layout can still shift slightly once images/fonts finish loading —
    // re-settle once more shortly after, silently, no visible motion
    const settle = setTimeout(() => {
      ScrollTrigger.refresh();
      jumpToHash();

      // The hash has now done its job (scrolled us to the right section).
      // Strip it from the URL so a plain refresh later doesn't keep
      // snapping back here — refresh should land on Home by default.
      if (hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }, 400);

    return () => clearTimeout(settle);
  }, []);

  return null;
}