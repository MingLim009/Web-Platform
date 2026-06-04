"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "./I18nProvider";

export function ResultsSort() {
  const router = useRouter();
  const sp = useSearchParams();
  const { t } = useI18n();
  const current = sp.get("ordenar") || "rating";

  const options = useMemo(
    () => [
      { value: "rating", label: t("buscar.sortRating") },
      { value: "reviews", label: t("buscar.sortReviews") },
      { value: "founder", label: t("buscar.sortFounder") },
      { value: "recent", label: t("buscar.sortRecent") },
    ],
    [t]
  );

  function onChange(value: string) {
    const params = new URLSearchParams(sp.toString());
    if (value === "rating") params.delete("ordenar");
    else params.set("ordenar", value);
    router.push(`/buscar?${params.toString()}`);
  }

  return (
    <label className="results-sort">
      <span className="results-sort-label">{t("buscar.sortLabel")}</span>
      <select value={current} onChange={(e) => onChange(e.target.value)} aria-label={t("buscar.sortLabel")}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
