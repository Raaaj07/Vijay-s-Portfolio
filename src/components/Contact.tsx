"use client";

import { motion } from "framer-motion";
import Marquee from "./Marquee";
import ContactCursor from "./ContactCursor";
import { SITE, SOCIALS } from "@/lib/data";

export default function Contact() {
  return (
    <div className="contact-cursor-none relative w-full min-h-screen bg-[var(--bg-light)] text-[var(--text-light)] flex flex-col px-4 pt-20 sm:pt-28 pb-8">
      <ContactCursor />

      <div className="relative z-10 max-w-5xl w-full mx-auto flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-24">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent-violet)]">
              Contact Me
            </span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl">Let&apos;s talk.</h2>
            <div className="mt-6 flex flex-col gap-3 text-sm">
              {/* EDIT ME: swap "#" for a real Calendly / cal.com link */}
              <motion.a
                href="#"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-2 font-medium hover:text-[var(--accent-violet)] transition-colors w-fit"
              >
                Book a Call →
              </motion.a>
              <motion.a
                href={`mailto:${SITE.email}`}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-[var(--text-light-muted)] hover:text-[var(--accent-violet)] transition-colors w-fit"
              >
                {SITE.email}
              </motion.a>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent-violet)]">
              Social
            </span>
            <ul className="mt-3 flex flex-col gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-block font-display text-xl sm:text-2xl font-semibold hover:text-[var(--accent-violet)] transition-colors"
                  >
                    {s.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 text-xs text-[var(--text-light-muted)]">
          © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
        </p>
      </div>

      <div className="relative z-10 mt-10">
        <Marquee text={SITE.name} className="text-[var(--text-light)]" />
      </div>
    </div>
  );
}
