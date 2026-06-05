"use client";

import { useI18n } from "./I18nProvider";

type Variant = "home" | "category" | "profile";

/**
 * Reserved sponsored-ad placeholder. Renders an inline banner that
 * marks the slot for future paid placements. Already counted in
 * the layout so the design doesn't shift when ads go live.
 */
export function SponsoredSlot({ variant = "home" }: { variant?: Variant }) {
  const { t } = useI18n();

  return (
    <section
      className={`sponsored-slot sponsored-${variant}`}
      data-variant={variant}
      aria-label={t("common.sponsored")}
    >
      <div className="container">
        <div className="sponsored-inner">
          <span className="sponsored-tag">{t("common.sponsored")}</span>
          <div className="sponsored-body">
            <strong>{t("plans.title")}</strong>
            <span>{t("common.sponsoredHint")}</span>
          </div>
          <a href="#planos" className="sponsored-cta">
            {t("plans.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
