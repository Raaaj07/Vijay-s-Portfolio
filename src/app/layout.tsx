import type { Metadata } from "next";
import Script from "next/script";
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
    <html lang="en" className="antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full">
        {/* Take over scroll positioning ourselves. beforeInteractive runs
            before hydration, only once per real page load — not on every
            client-side (soft) navigation — otherwise the browser's own
            scroll-restoration puts you back at the old pixel offset from
            before refresh, which lands on the wrong section once layout
            has shifted (fonts/images/ScrollTrigger). */}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`
            if ("scrollRestoration" in window.history) {
              window.history.scrollRestoration = "manual";
            }
            if (!window.location.hash) {
              window.scrollTo(0, 0);
            }
          `}
        </Script>
        <MouseParallaxProvider>{children}</MouseParallaxProvider>
      </body>
    </html>
  );
}