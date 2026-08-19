// ─────────────────────────────────────────────────────────────────────────
// ALL EDITABLE CONTENT LIVES HERE. Change text, links, and image paths in
// this one file — components just render whatever is below.
// Anything wrapped as "EDIT ME" is a placeholder pulled from your resume
// where I didn't have a real asset (photo, live demo link, social handle).
// ─────────────────────────────────────────────────────────────────────────

export interface TimelineItem {
  type: "experience" | "education" | "achievement";
  title: string;
  subtitle: string;
  period: string;
  points: string[];
  color: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    type: "education",
    title: "B.Tech, Information Technology",
    subtitle: "K S Rangasamy College of Technology, Tiruchengode",
    period: "2022 — 2026",
    points: ["CGPA 7.45 / 10, 8th Semester"],
    color: "#3fe0d0",
  },
  {
    type: "experience",
    title: "Full Stack Developer Intern",
    subtitle: "KITKAT Software Technologies",
    period: "Sep 2025 — Oct 2025",
    points: [
      "Developed and maintained a Student Admin Portal for a coaching institution using React.js, Supabase, and the Google Meet API.",
      "Collaborated with the team to design, test, and debug code in a live project environment.",
      "Strengthened web development skills through consistent mentor interactions.",
    ],
    color: "#7c5cfc",
  },
  {
    type: "achievement",
    title: "IEEE ICITSIF 2026 Publication",
    subtitle: "Privacy-Preserving Multi-Ranked Search Environment for Encrypted and Compressed Cloud Data",
    period: "2026",
    points: ["Presented original research on cryptographic search over encrypted cloud data."],
    color: "#ffb238",
  },
  {
    type: "achievement",
    title: "Workshop on Android App Development",
    subtitle: "September 2023",
    period: "2023",
    points: ["Hands-on workshop covering the Android development fundamentals."],
    color: "#ffb238",
  },
  {
    type: "achievement",
    title: "Paper Presentation on Datafication",
    subtitle: "Erode Sengunthar College of Engineering",
    period: "2024",
    points: ["Presented a paper exploring the shift toward data-driven systems."],
    color: "#ffb238",
  }
];

export const SITE = {
  name: "Vijay Raj",
  fullName: "Vijay Raj S P",
  tagline: "Full Stack Developer",
  email: "vijayrajvj07@gmail.com",
  phone: "+91 6383462213",
  linkedin: "https://www.linkedin.com/in/vijay-raj-p2004/",
  github: "https://github.com/Raaaj07",
  // EDIT ME — add real profile photo to /public/profile.jpg and it will show automatically
  profileImage: "/profile.webp",
  // EDIT ME — add a real hosted PDF (e.g. /resume.pdf in /public, or a Drive link)
  resumeLink: "https://drive.google.com/file/d/110SbrWYpbpOmeKRPsqlpMr_o0BmnfmaH/view?usp=drive_link",
  bookingLink: "https://calendly.com/vijayrajvj07/30min"
};

export const ROLES = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "React.js Developer",
  "Backend Developer",
];

// Small stat/trust badge shown near the CTA button on the hero (the
// "X+ Happy Clients" style pill). EDIT ME — keep this to something true.
// Ideas if you don't have client numbers yet: "5+ Projects Shipped",
// "1 IEEE Publication", "B.Tech IT · 2026", "Open to Opportunities".
export const TRUST_BADGE = {
  label: "IEEE ICITSIF 2026 Published",
  icon: "🏆",
};

export const BIO = `MERN Stack Developer with hands-on experience building responsive, full-stack web applications using MongoDB, Express.js, React.js, and Node.js. I like turning rough ideas into clean, production-ready dashboards — REST APIs, authentication, and CRUD workflows are my daily bread. Currently finishing my B.Tech in Information Technology, and shipping side projects in between.`;

// Stacked intro cards for the About section — each renders as its own
// tilted card. Keep these short; 2–3 sentences reads best on a card.
type AboutCard = { emoji?: string; lead?: string; text: string };

export const ABOUT_CARDS: AboutCard[] = [
  {
    emoji: "👋",
    lead: "Hey there! I'm Vijay,",
    text: "a full stack developer who likes turning rough ideas into clean, working products. I care as much about how a dashboard feels to use as how the API behind it is structured.",
  },
  {
    text: "My journey started with curiosity about how web apps are actually put together end to end. That grew into a habit of shipping real, working projects — MERN apps, dashboards, and full CRUD systems — rather than just following tutorials.",
  },
  {
    text: "I have a strong foundation in React, Node.js, Express, and MongoDB/MySQL, with hands-on experience in authentication, REST APIs, and responsive UI design using Figma. I'm currently finishing my B.Tech in Information Technology.",
  },
];

export const STACK = [
  { name: "React.js", tag: "Frontend", desc: "Component-driven UIs, hooks, and state management for fast, interactive frontends.", icon: "react", color: "#61DAFB" },
  { name: "Node.js", tag: "Backend", desc: "Server-side JavaScript runtime powering REST APIs and backend services.", icon: "nodedotjs", color: "#339933" },
  { name: "Express.js", tag: "Backend", desc: "Minimal routing and middleware layer for building REST APIs quickly.", icon: "express", color: "#000000" },
  { name: "MongoDB", tag: "Database", desc: "Document database used for flexible, schema-driven CRUD workflows.", icon: "mongodb", color: "#47A248" },
  { name: "MySQL", tag: "Database", desc: "Relational database for structured, query-heavy application data.", icon: "mysql", color: "#4479A1" },
  { name: "JavaScript", tag: "Language", desc: "Core language for everything from UI logic to API handlers.", icon: "javascript", color: "#F7DF1E" },
  { name: "Java", tag: "Language", desc: "OOP fundamentals and backend logic, from coursework to coding practice.", icon: "openjdk", color: "#437291" },
  { name: "Figma", tag: "Design", desc: "Interface design and prototyping for responsive, user-friendly layouts.", icon: "figma", color: "#F24E1E" },
  { name: "Canva", tag: "Design", desc: "Quick visual assets and mockups for design-first project pitches.", icon: "canva", color: "#00C4CC" },
  { name: "Git & GitHub", tag: "Tooling", desc: "Version control and collaboration across every team project.", icon: "git", color: "#F05032" },
  { name: "HTML5", tag: "Markup", desc: "Semantic, accessible markup structuring every page and component.", icon: "html5", color: "#E34F26" },
  { name: "CSS3", tag: "Styling", desc: "Responsive layouts, animations, and design systems built with modern CSS.", icon: "css3", color: "#1572B6" },
];

export const SERVICES = [
  {
    number: "01",
    title: "Full Stack Web Development",
    description:
      "End-to-end MERN applications — from database schema to a responsive React dashboard — built with authentication, CRUD workflows, and clean, production-ready code.",
    icon: "cube",
    shape: "pyramid",
    color: "#FF6B6B",
  },
  {
    number: "02",
    title: "REST API Development",
    description:
      "Authenticated, well-structured REST APIs with Node.js and Express, designed around real CRUD workflows rather than generic boilerplate.",
    icon: "api",
    shape: "cylinder",
    color: "#4C8DFF",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Responsive, intuitive interfaces designed in Figma and Canva, focused on cross-device usability over decoration for its own sake.",
    icon: "design",
    shape: "sphere",
    color: "#7C5CFC",
  },
  {
    number: "04",
    title: "Database Design",
    description:
      "MongoDB and MySQL schema design for applications that need to track tenants, rooms, bookings, listings, or whatever your data model actually is.",
    icon: "db",
    shape: "diamond",
    color: "#FF5FA8",
  },
];

export interface ProjectHighlight {
  step: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  accent: string;
  techStack: string[];
  features: string[];
  // Optional: a short "how it works" pipeline. Great for technical/backend-heavy
  // projects (like PMRSE). Leave it off for simpler projects — it's optional.
  techHighlights?: ProjectHighlight[];
  live: string;
  github: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "pg-management-system",
    title: "PG Management System",
    category: "MERN STACK",
    description:
      "Authentication, tenant management, room allocation, and rent tracking with a responsive admin dashboard.",
    longDescription:
      "A full-stack PG (paying-guest accommodation) management system built to replace spreadsheet-based tracking with a proper admin dashboard. Handles tenant onboarding, room allocation across multiple properties, monthly rent tracking with payment history, and role-based authentication so owners and staff see only what they need.",
    image: "/pg-management.webp",
    accent: "#7c5cfc",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Tailwind CSS"],
    features: [
      "Role-based authentication for owners, staff, and tenants",
      "Room allocation with live vacancy tracking across properties",
      "Rent tracking with monthly payment history per tenant",
      "Responsive admin dashboard for day-to-day operations",
    ],
    live: "https://pg-management-ecru.vercel.app/", // EDIT ME — no live deploy found on your repo. Deploy this (Render/Vercel) and drop the URL here, or leave "#" to hide the button.
    github: "https://github.com/Raaaj07/PG-Management",
  },
  {
    slug: "industrial-waste-management",
    title: "Industrial Waste Management",
    category: "NEXT.JS / SUPABASE",
    description:
      "Full-stack waste exchange platform connecting industries with recyclers via role-based auth and Google Maps-based discovery.",
    longDescription:
      "A waste-exchange marketplace connecting industries that generate waste with recyclers who can process it. Industries list waste materials, recyclers discover nearby listings through Google Maps integration, and role-based authentication keeps each side of the marketplace scoped to their own workflows.",
    image: "/waste-management.webp",
    accent: "#3fe0d0",
    techStack: ["Next.js", "Supabase", "PostgreSQL", "Google Maps API", "Tailwind CSS"],
    features: [
      "Role-based auth separating industries from recyclers",
      "Google Maps-based discovery of nearby waste listings",
      "Real-time listing status via Supabase",
      "Responsive UI across desktop and mobile",
    ],
    live: "https://waste-management-nine-sable.vercel.app",
    github: "https://github.com/Raaaj07/waste-management",
  },
  {
    slug: "privacy-preserving-multi-ranked-search",
    title: "P-MRSE — Privacy-Preserving Multi-Ranked Search",
    category: "RESEARCH / SECURITY",
    description:
      "Secure cloud storage and search system where files are encrypted at rest and searched via cryptographic trapdoors — the server never sees plaintext. Presented at IEEE ICITSIF 2026.",
    longDescription:
      "P-MRSE is a secure cloud storage and search system built around zero plaintext leakage: files are compressed and AES-256 encrypted before storage, and users search across them without the server ever decrypting the content, seeing plaintext keywords, or logging search queries. Search works by hashing keywords into HMAC-SHA256 trapdoors and matching them against an encrypted index, then ranking results with a custom ATEES algorithm (Adaptive TF-IDF + Exponential Freshness Score). Integrity is verified end-to-end with RSA-2048 signatures and MD5 checksums, and accounts are protected with TOTP-based two-factor authentication. Presented at IEEE ICITSIF 2026.",
    image: "/secure-search.webp",
    accent: "#4c8dff",
    techStack: [
      "React + Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js / Express",
      "MongoDB",
      "AES-256-CBC",
      "RSA-2048",
      "HMAC-SHA256",
      "Speakeasy TOTP",
    ],
    features: [
      "Zero plaintext leakage — server only ever touches hashes and AES-encrypted blobs",
      "Cryptographic trapdoor search: keywords hashed to HMAC-SHA256 trapdoors, never sent or logged in plaintext",
      "Custom ATEES ranking algorithm (TF-IDF weighted 0.85 + freshness boost weighted 0.15) for relevance-ranked Top-K results",
      "Optional fuzzy search via Levenshtein distance matching against a keyword shadow map",
      "End-to-end integrity: RSA-2048 signed checksums + MD5 verification on every download",
      "TOTP-based two-factor authentication (Speakeasy) and per-user RSA key pairs generated at registration",
    ],
    // How the request actually flows through the system — great for a "system design" section.
    techHighlights: [
      { step: "Upload", detail: "Extract keywords → compress (zlib) → AES-256-CBC encrypt → RSA-2048 sign checksum → store blob + HMAC trapdoors in MongoDB." },
      { step: "Search", detail: "Query keywords hashed to HMAC-SHA256 trapdoors server-side (never logged) → matched against the encrypted index → ranked by the ATEES algorithm." },
      { step: "Download", detail: "Permission check → AES-256 decrypt → zlib decompress → MD5 integrity verification → stream plaintext back to the client." },
    ],
    live: "https://pmrse-final-project.onrender.com", // EDIT ME — add a hosted demo URL if you deploy this, or link the IEEE paper here instead
    github: "https://github.com/Raaaj07/PMRSE-FINAL-PROJECT",
  },
  {
    slug: "turf-registration-system",
    title: "Turf Registration System",
    category: "WEB APP",
    description:
      "Full CRUD turf booking app with slot availability and validation to prevent duplicate reservations, backed by MongoDB.",
    longDescription:
      "A turf (sports ground) booking application with full CRUD workflows. Users browse slot availability in real time and book a turf, while server-side validation prevents double-booking the same slot — the core reliability problem this project was built to solve.",
    image: "/turf-registration.webp",
    accent: "#ffb238",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Real-time slot availability per turf",
      "Server-side validation to prevent duplicate reservations",
      "Full CRUD booking management",
      "Clean, mobile-friendly booking flow",
    ],
    live: "#", // EDIT ME — add live demo / hosted URL
    github: "#", // EDIT ME — I couldn't find a public repo for this on github.com/Raaaj07. Push it (even a snapshot) and link it here, or this card will look unfinished next to the others.
  },
  {
    slug: "brew-right",
    title: "BREW-RIGHT",
    category: "UI DESIGN",
    description:
      "Interactive coffee ordering interface with dynamic product listing, cart functionality, and responsive layout.",
    longDescription:
      "An interactive coffee ordering interface designed and built as a UI-focused project. Features a dynamic product listing, a working cart with quantity management, and a fully responsive layout tuned for a smooth ordering experience on any device.",
    image: "/brew-right.webp",
    accent: "#ff6b6b",
    techStack: ["React.js", "Figma", "CSS3", "Responsive Design"],
    features: [
      "Dynamic product listing with category filtering",
      "Working cart with quantity and total management",
      "Fully responsive layout, mobile to desktop",
      "Designed in Figma before implementation",
    ],
    live: "#", // EDIT ME — add live demo / hosted URL
    github: "#", // EDIT ME — same here, no public repo found under github.com/Raaaj07. Push it or swap this project out.
  },
];

export const SOCIALS = [
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "GitHub", href: SITE.github },
 // EDIT ME — not on resume, add if you have one
 // EDIT ME — not on resume, add if you have one
];

// src/lib/data.ts
export const NAV_LINKS = ["Home", "About", "Experience", "Stack", "Services", "Projects", "Contact"]; 