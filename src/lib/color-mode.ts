export type ColorMode = "light" | "dark";

export const COLOR_MODE_STORAGE_KEY = "achoupro-color-mode";
export const LEGACY_THEME_KEY = "achoupro-site-theme";
export const DEFAULT_COLOR_MODE: ColorMode = "dark";

export function isColorMode(value: string | null | undefined): value is ColorMode {
  return value === "light" || value === "dark";
}

/** Lê preferência salva (compatível com chave antiga peachweb/achoupro) */
export function readStoredColorMode(): ColorMode {
  if (typeof window === "undefined") return DEFAULT_COLOR_MODE;
  try {
    const stored = localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    if (isColorMode(stored)) return stored;

    const legacy = localStorage.getItem(LEGACY_THEME_KEY);
    if (legacy === "peachweb") return "light";
    if (legacy === "achoupro") return "dark";
    return DEFAULT_COLOR_MODE;
  } catch {
    return DEFAULT_COLOR_MODE;
  }
}

export function persistColorMode(mode: ColorMode) {
  try {
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}
