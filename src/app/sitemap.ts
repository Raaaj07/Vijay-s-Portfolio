// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-domain.com";
  return [
    { url: base, lastModified: new Date() },
    ...PROJECTS.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() })),
  ];
}