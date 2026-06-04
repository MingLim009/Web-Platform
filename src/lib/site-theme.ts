export type SiteTheme = "achoupro" | "peachweb";

export const SITE_THEME_STORAGE_KEY = "achoupro-site-theme";
export const DEFAULT_SITE_THEME: SiteTheme = "achoupro";

export const SITE_THEME_LABELS: Record<SiteTheme, string> = {
  achoupro: "AchouPro (marca oficial)",
  peachweb: "PeachWeb (referência cliente)",
};

export function isSiteTheme(value: string | null | undefined): value is SiteTheme {
  return value === "achoupro" || value === "peachweb";
}

export function readStoredSiteTheme(): SiteTheme {
  if (typeof window === "undefined") return DEFAULT_SITE_THEME;
  try {
    const stored = localStorage.getItem(SITE_THEME_STORAGE_KEY);
    return isSiteTheme(stored) ? stored : DEFAULT_SITE_THEME;
  } catch {
    return DEFAULT_SITE_THEME;
  }
}
