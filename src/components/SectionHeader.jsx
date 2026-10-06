import React from "react";

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false,
  theme = "light", // "light" | "dark"
  className = ""
}) {
  const isDark = theme === "dark";

  return (
    <div className={`${centered ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}>
      {badge && (
        <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-gold mb-3">
          {badge}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] ${
          isDark ? "text-white" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? "text-gray-300 font-light" : "text-charcoal/80"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
