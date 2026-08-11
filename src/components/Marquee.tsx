"use client";

type MarqueeProps = {
  text: string;
  className?: string;
  outline?: boolean;
};

export default function Marquee({ text, className = "", outline = false }: MarqueeProps) {
  const repeated = Array.from({ length: 6 });

  return (
    <div className={`w-full overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {repeated.map((_, i) => (
          <span
            key={i}
            className={`font-display font-bold shrink-0 px-6 sm:px-8 leading-none ${
              outline ? "text-transparent [-webkit-text-stroke:1px_currentColor]" : ""
            }`}
            style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)" }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
