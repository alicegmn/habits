import { useEffect, useState } from "react";

function getInitialTheme(): boolean {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  } catch {
    return false;
  }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle theme"
      onClick={() => setDark((v) => !v)}
      className={[
        "relative inline-grid h-9 w-32 grid-cols-2 items-center rounded-full p-1",
        "transition-colors border shadow-sm",
        "border-[color:color-mix(in_oklch,var(--color-border),transparent_10%)]",
        "bg-[color:color-mix(in_oklch,var(--color-card),var(--color-border)_20%)]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute inset-y-1 left-1 w-1/2 rounded-full",
          "transition-transform duration-200",
          // modern primär-gradient
          "bg-[linear-gradient(135deg,var(--color-brand-600),var(--color-brand-500))]",
          "shadow-[0_6px_16px_color-mix(in_oklch,var(--color-brand-600),transparent_80%)]",
        ].join(" ")}
        style={{ transform: dark ? "translateX(100%)" : "translateX(0%)" }}
        aria-hidden
      />

      {/* LIGHT */}
      <span
        className={[
          "relative z-10 text-xs font-medium text-center select-none",
          dark ? "text-[var(--color-muted)]" : "text-white",
        ].join(" ")}
      >
        Light
      </span>

      {/* DARK */}
      <span
        className={[
          "relative z-10 text-xs font-medium text-center select-none",
          dark ? "text-white" : "text-[var(--color-muted)]",
        ].join(" ")}
      >
        Dark
      </span>
    </button>
  );
}
