// ─────────────────────────────────────────────────────────────────────────
// ALL EDITABLE CONTENT LIVES HERE. Change text, links, and image paths in
// this one file — components just render whatever is below.
// Anything wrapped as "EDIT ME" is a placeholder pulled from your resume
// where I didn't have a real asset (photo, live demo link, social handle).
// ─────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Vijay Raj",
  fullName: "Vijay Raj S P",
  tagline: "Full Stack Developer",
  email: "vijayrajvj07@gmail.com",
  phone: "+91 6383462213",
  linkedin: "https://www.linkedin.com/in/vijay-raj-p2004/",
  github: "https://github.com/Raaaj07",
  // EDIT ME — add real profile photo to /public/profile.jpg and it will show automatically
  profileImage: "portfolio\public\profile.jpg",
  // EDIT ME — add a real hosted PDF (e.g. /resume.pdf in /public, or a Drive link)
  resumeLink: "#",
};

export const ROLES = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "React.js Developer",
  "UI/UX Designer",
];

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

export const PROJECTS = [
  {
    title: "PG Management System",
    category: "MERN STACK",
    description:
      "Authentication, tenant management, room allocation, and rent tracking with a responsive admin dashboard.",
    // EDIT ME — replace with a real screenshot in /public/projects/
    image: "/projects/pg-management.jpg",
    link: "#", // EDIT ME — add live demo URL
  },
  {
    title: "Industrial Waste Management",
    category: "NEXT.JS / SUPABASE",
    description:
      "Full-stack waste exchange platform connecting industries with recyclers via role-based auth and Google Maps-based discovery.",
    image: "/projects/waste-management.jpg",
    link: "#", // EDIT ME — add live demo URL
  },
  {
    title: "Privacy-Preserving Multi-Ranked Search",
    category: "RESEARCH / CLOUD",
    description:
      "Secure multi-ranked search over encrypted cloud data using ATEES/ATS encrypted indexing — presented at IEEE ICITSIF 2026.",
    image: "/projects/secure-search.jpg",
    link: "#",
  },
  {
    title: "Turf Registration System",
    category: "WEB APP",
    description:
      "Full CRUD turf booking app with slot availability and validation to prevent duplicate reservations, backed by MongoDB.",
    image: "/projects/turf-registration.jpg",
    link: "#",
  },
  {
    title: "BREW-RIGHT",
    category: "UI DESIGN",
    description:
      "Interactive coffee ordering interface with dynamic product listing, cart functionality, and responsive layout.",
    image: "/projects/brew-right.jpg",
    link: "#",
  },
];

export const SOCIALS = [
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "GitHub", href: SITE.github },
  { label: "Behance", href: "#" }, // EDIT ME — not on resume, add if you have one
  { label: "Instagram", href: "#" }, // EDIT ME — not on resume, add if you have one
];

export const NAV_LINKS = ["Home", "About", "Stack", "Services", "Projects", "Contact"];
