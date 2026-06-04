"use client";

import { useSiteTheme } from "./SiteThemeProvider";

export function ColorModeToggle() {
  const { colorMode, setColorMode } = useSiteTheme();
  const isLight = colorMode === "light";

  return (
    <div
      className={`color-mode-toggle${isLight ? " is-light" : " is-dark"}`}
      role="group"
      aria-label="Alternar tema claro ou escuro"
    >
      <button
        type="button"
        className="color-mode-icon-btn"
        onClick={() => setColorMode("light")}
        aria-pressed={isLight}
        aria-label="Tema claro (branco)"
        title="Tema claro"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </button>
      <button
        type="button"
        className="color-mode-icon-btn"
        onClick={() => setColorMode("dark")}
        aria-pressed={!isLight}
        aria-label="Tema escuro"
        title="Tema escuro"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
      <span className="color-mode-thumb" aria-hidden />
    </div>
  );
}
