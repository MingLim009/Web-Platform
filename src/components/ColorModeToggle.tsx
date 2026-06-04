"use client";

import { useSiteTheme } from "./SiteThemeProvider";

/** Single floating button that toggles theme. Shows the icon you'll get next. */
export function ColorModeToggle() {
  const { colorMode, setColorMode } = useSiteTheme();
  const isLight = colorMode === "light";
  const nextMode = isLight ? "dark" : "light";

  return (
    <button
      type="button"
      className={`color-mode-toggle is-${colorMode}`}
      onClick={() => setColorMode(nextMode)}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="color-mode-thumb" aria-hidden />
      <span className="color-mode-icon" aria-hidden>
        {isLight ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </span>
    </button>
  );
}
