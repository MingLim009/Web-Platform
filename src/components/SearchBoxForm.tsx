"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { useI18n } from "./I18nProvider";

type SearchBoxFormProps = {
  cities: { slug: string; name: string; state: string }[];
  className?: string;
  style?: React.CSSProperties;
  compact?: boolean;
};

/** Busca que preserva filtros ativos na URL */
export function SearchBoxForm({ cities, className = "search-box", style, compact }: SearchBoxFormProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const { t } = useI18n();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams(sp.toString());

    const q = (fd.get("q") as string)?.trim();
    const cidade = fd.get("cidade") as string;

    if (q) params.set("q", q);
    else params.delete("q");

    if (cidade) params.set("cidade", cidade);
    else params.delete("cidade");

    const qs = params.toString();
    router.push(qs ? `/buscar?${qs}` : "/buscar");
  }

  return (
    <form className={className} style={style} onSubmit={onSubmit}>
      <div className="field">
        <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          name="q"
          type="text"
          defaultValue={sp.get("q") || ""}
          placeholder={compact ? t("common.searchPlaceholderShort") : t("common.searchPlaceholder")}
        />
      </div>
      <div className="field">
        <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        </svg>
        <select name="cidade" defaultValue={sp.get("cidade") || ""}>
          <option value="">{t("common.allCities")}</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}, {c.state}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={compact ? undefined : "btn btn-primary"}>
        {compact ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        ) : (
          t("common.search")
        )}
      </button>
    </form>
  );
}
