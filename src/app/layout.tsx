import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/data";
import { MouseParallaxProvider } from "@/lib/mouse-parallax";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: `Portfolio of ${SITE.fullName}, ${SITE.tagline}.`,
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
