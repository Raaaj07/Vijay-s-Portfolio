import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/data";
import { MouseParallaxProvider } from "@/lib/mouse-parallax";

// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // set once you deploy
  title: `${SITE.name} — ${SITE.tagline}`,
  description: `Portfolio of ${SITE.fullName}, ${SITE.tagline}.`,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: `Portfolio of ${SITE.fullName}, ${SITE.tagline}.`,
    url: "https://your-domain.com",
    siteName: SITE.name,
    images: ["/og-image.png"], // 1200x630, add to /public
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: `Portfolio of ${SITE.fullName}, ${SITE.tagline}.`,
    images: ["/og-image.png"],
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-full">
        <MouseParallaxProvider>{children}</MouseParallaxProvider>
      </body>
    </html>
  );
}
