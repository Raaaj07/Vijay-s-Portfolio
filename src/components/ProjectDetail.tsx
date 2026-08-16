"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

type Project = (typeof PROJECTS)[number];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      delay,
    },
  };
}

export default function ProjectDetail({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  return (
    <main className="relative min-h-screen bg-[var(--bg-dark)] text-[var(--text-dark)] overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
        style={{ background: project.accent }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* Back button */}
        <motion.div {...fadeUp(0)}>
          <Link
            href="/#projects"
            scroll={false}
            className="inline-flex items-center gap-2 text-sm text-[var(--text-dark-muted)] hover:text-[var(--text-dark)] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M15 19 8 12l7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Back to projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div {...fadeUp(0.05)} className="mt-8">
          {/* Category */}
          <span
            className="text-[11px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full border"
            style={{
              color: project.accent,
              borderColor: `${project.accent}55`,
              background: `${project.accent}14`,
            }}
          >
            {project.category}
          </span>

          {/* Title */}
          <h1 className="mt-4 font-display font-bold text-3xl sm:text-5xl leading-tight">
            {project.title}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-[var(--text-dark-muted)] text-base sm:text-lg leading-relaxed">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {/* Live Website */}
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black pl-5 pr-2 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Visit Live Site

                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black text-white">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M17 7 7 17M7 11V17H13"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            )}

            {/* GitHub */}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 text-[var(--text-dark)] pl-5 pr-5 py-2 text-sm font-semibold hover:bg-white/[0.06] transition-colors"
              >
                View Code
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Screenshot */}
        <motion.div
          {...fadeUp(0.1)}
          className="mt-14"
          style={{ perspective: "1400px" }}
        >
          <div className="relative w-full max-w-3xl mx-auto">
            {/* Laptop Screen */}
            <div
              className="relative aspect-[16/10] rounded-t-xl border-[8px] border-b-0 overflow-hidden shadow-2xl"
              style={{
                borderColor: "#2a2a2e",
                background: "#111114",
              }}
            >
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 768px) 95vw, 768px"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Laptop Base */}
            <div className="h-3 rounded-b-xl bg-gradient-to-b from-[#3a3a3e] to-[#1c1c1f]" />

            {/* Laptop Front Edge */}
            <div className="mx-auto h-1.5 w-1/4 rounded-b-md bg-[#0a0a0c]" />
          </div>
        </motion.div>

        {/* Project Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Overview + Features */}
          <motion.div {...fadeUp(0.15)} className="md:col-span-2">
            {/* Overview */}
            <h2 className="font-display font-semibold text-xl mb-4">
              Overview
            </h2>

            <p className="text-[var(--text-dark-muted)] leading-relaxed">
              {project.longDescription}
            </p>

            {/* Key Features */}
            <h2 className="font-display font-semibold text-xl mt-10 mb-4">
              Key Features
            </h2>

            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-1 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full"
                    style={{
                      background: `${project.accent}22`,
                      color: project.accent,
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        d="M20 6 9 17l-5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span className="text-[var(--text-dark-muted)] leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* How It Works — only renders for projects that define techHighlights */}
            {project.techHighlights && project.techHighlights.length > 0 && (
              <>
                <h2 className="font-display font-semibold text-xl mt-10 mb-4">
                  How It Works
                </h2>

                <ol className="space-y-4">
                  {project.techHighlights.map((h, i) => (
                    <li key={h.step} className="flex gap-4">
                      <span
                        className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                        style={{
                          background: `${project.accent}22`,
                          color: project.accent,
                        }}
                      >
                        {i + 1}
                      </span>

                      <span className="text-[var(--text-dark-muted)] leading-relaxed">
                        <span className="text-[var(--text-dark)] font-semibold">
                          {h.step}:
                        </span>{" "}
                        {h.detail}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </motion.div>

          {/* Tech Stack */}
          <motion.div {...fadeUp(0.2)}>
            <h2 className="font-display font-semibold text-xl mb-4">
              Tech Stack
            </h2>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[var(--text-dark)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Next Project */}
        <motion.div
          {...fadeUp(0.25)}
          className="mt-24 border-t border-white/10 pt-10"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--text-dark-muted)]">
            Next project
          </span>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group mt-3 flex items-center justify-between gap-4"
          >
            <h3 className="font-display font-bold text-2xl sm:text-3xl group-hover:text-[var(--accent-cyan)] transition-colors">
              {nextProject.title}
            </h3>

            <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/15 group-hover:bg-white group-hover:text-black transition-colors flex-shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}