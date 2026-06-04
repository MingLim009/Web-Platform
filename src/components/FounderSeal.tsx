"use client";

import { ShineStar } from "./ShineStar";
import { useI18n } from "./I18nProvider";

/** Selo Fundador — apenas estrela luminosa grande, sem círculo de fundo */
export function FounderSeal({ className = "founder-seal" }: { className?: string }) {
  const { t } = useI18n();

  return (
    <div className={`founder-seal-hero ${className}`.trim()}>
      <ShineStar
        size={200}
        rays={16}
        showLabel
        label={t("founder.label")}
        sublabel={t("founder.year")}
      />
    </div>
  );
}
