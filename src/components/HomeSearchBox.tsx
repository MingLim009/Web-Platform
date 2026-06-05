"use client";

import { useState } from "react";
import { useCadastro } from "./CadastroProvider";
import { useI18n } from "./I18nProvider";

type City = { slug: string; name: string; state: string };

function IconLocation() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconQuote() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  );
}

export function HomeSearchBox({ cities }: { cities: City[] }) {
  const { t, cat } = useI18n();
  const { openCadastro } = useCadastro();
  const [citySlug, setCitySlug] = useState("");
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  function nearestCityFromCoords(lat: number, lng: number): string | null {
    const CITY_COORDS: Record<string, [number, number]> = {
      aracaju: [-10.9472, -37.0731],
      "barra-dos-coqueiros": [-10.9047, -37.0392],
      "nossa-senhora-do-socorro": [-10.8542, -37.1264],
      "sao-cristovao": [-11.0153, -37.2064],
    };
    let best: { slug: string; dist: number } | null = null;
    for (const slug of Object.keys(CITY_COORDS)) {
      const [clat, clng] = CITY_COORDS[slug];
      const dx = clat - lat;
      const dy = clng - lng;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (!best || dist < best.dist) best = { slug, dist };
    }
    if (!best) return null;
    if (!cities.find((c) => c.slug === best!.slug)) return null;
    return best.slug;
  }

  function useMyLocation() {
    setLocError(null);
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocError(t("common.locationError"));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const slug = nearestCityFromCoords(pos.coords.latitude, pos.coords.longitude);
        if (slug) setCitySlug(slug);
        else setLocError(t("common.locationError"));
        setLocating(false);
      },
      () => {
        setLocError(t("common.locationError"));
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  }

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
          <select
            name="cidade"
            value={citySlug}
            onChange={(e) => setCitySlug(e.target.value)}
          >
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

      <div className="search-actions">
        <button type="button" className="search-action loc" onClick={useMyLocation} disabled={locating}>
          <IconLocation />
          <span>{locating ? t("common.locating") : t("common.useMyLocation")}</span>
        </button>
        <button type="button" className="search-action quote" onClick={openCadastro}>
          <IconQuote />
          <span>{t("common.requestQuote")}</span>
        </button>
      </div>
      {locError && <div className="search-error">{locError}</div>}

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
