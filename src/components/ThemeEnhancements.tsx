"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSiteTheme } from "./SiteThemeProvider";

function revealVisibleElements() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add("is-visible");
    }
  });
}

function revealAllImmediately() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    el.classList.add("is-visible");
  });
}

/** Scroll reveal — reexecuta a cada navegação */
export function ThemeEnhancements() {
  const pathname = usePathname();
  const { colorMode, isLight } = useSiteTheme();

  useEffect(() => {
    document.documentElement.classList.add("js-reveal-ready");
    window.scrollTo(0, 0);

    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash) {
      const scrollToHash = () =>
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(scrollToHash, 350);
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      revealAllImmediately();
      return;
    }

    revealVisibleElements();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -10px 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
    };

    observeAll();
    const t1 = window.setTimeout(observeAll, 80);
    const t2 = window.setTimeout(revealVisibleElements, 200);
    const t3 = window.setTimeout(revealAllImmediately, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname, colorMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-motion-on", isLight);
    return () => document.documentElement.classList.remove("theme-motion-on");
  }, [isLight]);

  return null;
}
