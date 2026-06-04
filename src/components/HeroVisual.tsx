"use client";

import { useEffect, useRef } from "react";
import { GlowStar } from "./GlowStar";
import { useSiteTheme } from "./SiteThemeProvider";
import { useI18n } from "./I18nProvider";
import { drawPeachHeroFrame } from "@/lib/peach-hero-canvas";

type HeroVisualProps = {
  imageSrc: string;
  imageAlt: string;
  avgRating: number;
  totalPros: number;
};

function useHeroCanvas(isPeach: boolean, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.parentElement?.clientWidth ?? 400;
      const h = canvas.parentElement?.clientHeight ?? 500;

      if (isPeach) {
        drawPeachHeroFrame(ctx, w, h, t, reduced);
      } else {
        ctx.fillStyle = "#050b1f";
        ctx.fillRect(0, 0, w, h);

        const horizon = h * 0.38;
        const vanishX = w * 0.5;
        const scroll = reduced ? 0 : (t * 0.35) % 1;

        for (let i = 0; i <= 18; i++) {
          const p = ((i / 18 + scroll) % 1);
          const y = horizon + p * p * (h - horizon);
          ctx.strokeStyle = `rgba(0, 119, 255, ${0.06 + p * 0.28})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        for (let i = -14; i <= 14; i++) {
          const x = vanishX + i * (w / 14) * 1.4;
          ctx.strokeStyle = `rgba(255, 106, 0, ${0.05 + Math.abs(i / 14) * 0.12})`;
          ctx.beginPath();
          ctx.moveTo(vanishX, horizon);
          ctx.lineTo(x, h);
          ctx.stroke();
        }

        for (let i = 0; i < 12; i++) {
          const phase = (i / 12 + t * 0.08) % 1;
          const ox = w * (0.15 + 0.7 * ((i * 0.37) % 1));
          const oy = h * (0.2 + 0.55 * Math.sin(phase * Math.PI * 2));
          const r = 8 + (i % 3) * 6;
          const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r * 3);
          g.addColorStop(0, i % 2 === 0 ? "rgba(0,119,255,0.35)" : "rgba(255,106,0,0.28)");
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(ox, oy, r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduced) t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isPeach, canvasRef]);
}

export function HeroVisual({ imageSrc, imageAlt, avgRating, totalPros }: HeroVisualProps) {
  const { isPeach } = useSiteTheme();
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useHeroCanvas(isPeach, canvasRef);

  return (
    <div className={`hero-visual${isPeach ? " hero-visual--peach" : ""}`}>
      <div className="hero-media-frame">
        <div className="hero-media-scene" aria-hidden>
          <canvas ref={canvasRef} className="hero-media-canvas" />
          {!isPeach && <div className="hero-media-shine" />}
          {isPeach && <div className="hero-media-peach-glow" />}
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src={imageSrc} alt={imageAlt} loading="eager" />
        </div>
      </div>

      <div className="float-card fc-1">
        <div className="icon icon-verified">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <div className="label">{t("hero.verified")}</div>
          <div className="value">{t("hero.professionalLabel")}</div>
        </div>
      </div>

      <div className="float-card fc-2">
        <div className="icon icon-rating">
          <GlowStar size={22} />
        </div>
        <div>
          <div className="label">{t("hero.avgRating")}</div>
          <div className="value value-rating">
            {avgRating.toFixed(1)} <GlowStar size={16} className="value-star" />
          </div>
        </div>
      </div>

      <div className="float-card fc-3">
        <div className="icon icon-users">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div>
          <div className="label">{t("hero.registered")}</div>
          <div className="value">+{totalPros}</div>
        </div>
      </div>
    </div>
  );
}
