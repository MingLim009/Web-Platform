"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SPLASH_KEY = "achoupro_splash_done";

/** Splash só na primeira visita da sessão — não bloqueia navegação. */
export function StartupLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_KEY) === "1") {
        setVisible(false);
        return;
      }
    } catch {
      setVisible(false);
      return;
    }

    setVisible(true);
    const minMs = 600;
    const start = Date.now();

    const hide = () => {
      const wait = Math.max(0, minMs - (Date.now() - start));
      window.setTimeout(() => {
        setVisible(false);
        try {
          sessionStorage.setItem(SPLASH_KEY, "1");
        } catch {
          /* ignore */
        }
      }, wait);
    };

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });

    const fallback = window.setTimeout(hide, 2000);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="startup-loader" role="status" aria-live="polite" aria-busy="true">
      <div className="startup-loader-card">
        <div className="startup-loader-spinner" aria-hidden />
        <img src="/logo.svg" alt="" className="startup-loader-logo" />
        <h2>Carregando AchouPro</h2>
        <p>Preparando a melhor experiência para você. Aguarde um instante…</p>
      </div>
    </div>
  );
}
