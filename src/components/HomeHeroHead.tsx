"use client";

import Link from "next/link";
import { ThemeText } from "./ThemeText";
import { useI18n } from "./I18nProvider";
import { SITE, waLink } from "@/lib/utils";

export function HomeHeroHead() {
  const { t } = useI18n();
  const talkUrl = waLink(SITE.whatsapp, "Olá! Gostaria de saber mais sobre o AchouPro.");

  return (
    <>
      <p className="hero-eyebrow peach-only">
        <span className="hero-eyebrow-dot" />
        {t("hero.eyebrow")}
      </p>

      <h1>
        <ThemeText
          achoupro={
            <>
              {t("hero.titleFind")} <span className="accent">{t("hero.titleAccent")}</span> {t("hero.titleFor")}{" "}
              <span className="blue">{t("hero.titleNeed")}</span>
            </>
          }
          peachweb={
            <>
              {t("hero.titleFind")} <span className="accent">{t("hero.titleAccent")}</span>
              <br />
              {t("hero.titleImmersive")} <span className="blue">{t("hero.titleImmersiveEnd")}</span>
            </>
          }
        />
      </h1>

      <p className="hero-lead">
        <ThemeText achoupro={t("hero.lead")} peachweb={t("hero.leadImmersive")} />
      </p>

      <div className="hero-cta-row peach-only">
        <a href={talkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
          {t("hero.talk")}
        </a>
        <Link href="/buscar" className="btn btn-primary btn-lg">
          {t("hero.start")}
        </Link>
      </div>

      <a href="#categorias" className="hero-scroll-cue peach-only" aria-label={t("hero.scroll")}>
        <span>{t("hero.scroll")}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </>
  );
}
