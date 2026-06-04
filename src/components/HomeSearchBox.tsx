"use client";

import { useI18n } from "./I18nProvider";

type City = { slug: string; name: string; state: string };

export function HomeSearchBox({ cities }: { cities: City[] }) {
  const { t, cat } = useI18n();

  return (
    <>
      <form className="search-box" action="/buscar" method="get">
        <div className="field">
          <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input name="q" type="text" placeholder={t("common.searchPlaceholder")} />
        </div>
        <div className="field">
          <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          </svg>
          <select name="cidade" defaultValue="">
            <option value="">{t("common.allCities")}</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}, {c.state}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {t("common.search")}
        </button>
      </form>

      <div className="popular-tags">
        <strong>{t("common.popular")}</strong>
        {(["eletricista", "encanador", "pedreiro", "diarista"] as const).map((slug) => (
          <a key={slug} href={`/buscar?categoria=${slug}`}>
            {cat(slug, slug)}
          </a>
        ))}
        <a href="/buscar">{t("common.seeAll")}</a>
      </div>
    </>
  );
}
