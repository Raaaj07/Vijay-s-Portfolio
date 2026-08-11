"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group block"
    >
      <div style={{ perspective: "1200px" }}>
        <motion.div
          variants={{
            rest: { rotateX: 8, rotateY: -10, scale: 0.98 },
            hover: { rotateX: 0, rotateY: 0, scale: 1 },
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-[6%] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Laptop-style mockup frame around the screenshot */}
          <div className="relative w-full max-w-[88%]">
            {/* Screen */}
            <div className="relative aspect-[16/10] rounded-t-lg border-[6px] border-b-0 border-[#2a2a2e] bg-[#111114] overflow-hidden shadow-2xl">
              {/* EDIT ME: swap this placeholder for a real screenshot via next/image */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4 text-[10px] sm:text-xs text-[var(--text-dark-muted)]">
                {project.image} <br /> (placeholder — add screenshot)
              </div>
            </div>
            {/* Base / hinge */}
            <div className="h-2 rounded-b-lg bg-gradient-to-b from-[#3a3a3e] to-[#1c1c1f]" />
            <div className="mx-auto h-1 w-1/3 rounded-b-md bg-[#0a0a0c]" />
          </div>

          <motion.div
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white text-black pl-5 pr-2 py-2 text-sm font-semibold">
              View Project
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black text-white">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 7 7 17M7 11V17H13" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-4">
        <span className="text-[10px] tracking-widest uppercase text-[var(--accent-cyan)] font-semibold">
          {project.category}
        </span>
        <h3 className="mt-1 font-display font-semibold text-lg">{project.title}</h3>
        <p className="mt-1 text-sm text-[var(--text-dark-muted)] leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <div className="relative w-full min-h-screen bg-[var(--bg-dark)] px-4 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-center mb-10 sm:mb-16">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
