"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_COLOR_MODE,
  persistColorMode,
  readStoredColorMode,
  type ColorMode,
} from "@/lib/color-mode";
import { ThemeEnhancements } from "./ThemeEnhancements";
import { ColorModeToggle } from "./ColorModeToggle";

type SiteThemeContextValue = {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  isLight: boolean;
  /** @deprecated use isLight */
  isPeach: boolean;
};

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);

const MODE_COLORS: Record<ColorMode, string> = {
  dark: "#050b1f",
  light: "#ffffff",
};

export function useSiteTheme() {
  const ctx = useContext(SiteThemeContext);
  if (!ctx) {
    throw new Error("useSiteTheme must be used within SiteThemeProvider");
  }
  return ctx;
}

function ThemeBackground() {
  const { colorMode } = useSiteTheme();

  if (colorMode === "light") {
    return (
      <div className="peach-bg-scene light-bg-scene" aria-hidden>
        <div className="peach-bg-blob peach-bg-blob-1" />
        <div className="peach-bg-blob peach-bg-blob-2" />
        <div className="peach-bg-grain" />
      </div>
    );
  }

  return (
    <div className="bg-scene" aria-hidden>
      <div className="bg-mesh" />
      <div className="bg-grid-3d" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
    </div>
  );
}

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [colorMode, setColorModeState] = useState<ColorMode>(DEFAULT_COLOR_MODE);
  const [ready, setReady] = useState(false);

  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    setColorModeState(readStoredColorMode());
    setReady(true);
  }, []);

  const setColorMode = useCallback((next: ColorMode) => {
    setColorModeState(next);
    persistColorMode(next);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.dataset.colorMode = colorMode;
    root.dataset.siteTheme = colorMode === "light" ? "peachweb" : "achoupro";
    document.body.classList.toggle("color-mode-light", colorMode === "light");
    document.body.classList.toggle("color-mode-dark", colorMode === "dark");
    document.body.classList.remove("has-format-bar");

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", MODE_COLORS[colorMode]);
  }, [colorMode, ready]);

  const value = useMemo(
    () => ({
      colorMode,
      setColorMode,
      isLight: colorMode === "light",
      isPeach: colorMode === "light",
    }),
    [colorMode, setColorMode]
  );

  return (
    <SiteThemeContext.Provider value={value}>
      {!isAdmin && <ColorModeToggle />}
      <ThemeBackground />
      <ThemeEnhancements />
      {children}
    </SiteThemeContext.Provider>
  );
}
