"use client";

import type { ReactNode } from "react";
import { useSiteTheme } from "./SiteThemeProvider";

type ThemeTextProps = {
  achoupro: ReactNode;
  peachweb: ReactNode;
  className?: string;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
};

export function ThemeText({ achoupro, peachweb, className, as: Tag = "span" }: ThemeTextProps) {
  const { isPeach } = useSiteTheme();
  return <Tag className={className}>{isPeach ? peachweb : achoupro}</Tag>;
}
