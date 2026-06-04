"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const RELOAD_KEY = "achoupro_style_reload";

/** Recarrega se o CSS do layout não carregou (comum após HMR quebrado no dev). */
export function StyleRecovery() {
  const pathname = usePathname();
  const checked = useRef(false);

  useEffect(() => {
    checked.current = false;

    const verify = () => {
      if (checked.current) return;
      checked.current = true;

      const links = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
      );
      const hasBrokenSheet = links.some((link) => {
        if (!link.href || link.href.startsWith("data:")) return false;
        try {
          return link.sheet === null;
        } catch {
          return true;
        }
      });

      const nav = document.querySelector("header.navbar");
      const navPosition = nav ? getComputedStyle(nav).position : "";
      const cssMissing = nav && navPosition !== "sticky" && navPosition !== "fixed";

      if (hasBrokenSheet || cssMissing) {
        const last = sessionStorage.getItem(RELOAD_KEY);
        const now = String(Date.now());
        if (last && Date.now() - Number(last) < 8000) return;
        sessionStorage.setItem(RELOAD_KEY, now);
        window.location.reload();
      }
    };

    const t = window.setTimeout(verify, 80);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
