"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type StackSectionProps = {
  id: string;
  index: number;
  children: ReactNode;
  className?: string;
  glow?: string; // CSS color used for the ambient glow
  overflowHidden?: boolean;
  minHeight?: string; // override e.g. "min-h-fit" to remove forced full-screen height
};

export default function StackSection({ id, children, className = "", overflowHidden = true, minHeight = "min-h-screen" }: StackSectionProps) {
  return (
    <section
      id={id}
      className={`relative ${minHeight} flex items-stretch w-full`}
    >
      <motion.div
        initial={{ opacity: 0.85, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full ${overflowHidden ? "overflow-hidden" : ""} ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
}