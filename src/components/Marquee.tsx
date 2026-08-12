"use client";

type MarqueeProps = {
  text: string;
  className?: string;
  outline?: boolean;
};

export default function Marquee({ text, className = "", outline = false }: MarqueeProps) {
  const repeated = Array.from({ length: 8 });

  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {repeated.map((_, i) => (
          <span
            key={i}
            className={`shrink-0 leading-none uppercase inline-flex items-center ${outline ? "text-transparent [-webkit-text-stroke:2px_currentColor]" : ""
              }`}
            style={{
              fontFamily: "var(--font-marquee)",
              fontSize: "clamp(6rem, 20vw, 12rem)",
              fontWeight: 400,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
              padding: "0 0.12em",
            }}
          >
            {text.toUpperCase()}
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                lineHeight: 1,
                marginTop : "5em",
                margin: "0 0.25em",
                fontSize: "0.25em",
                verticalAlign: "middle",
                position: "relative",
                top: "10em",
              }}
            >
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
