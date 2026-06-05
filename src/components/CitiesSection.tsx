"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";

type CityCard = { slug: string; name: string; state: string; count: number };

// Real photos of the Sergipe cities served by the platform.
const CITY_IMAGES: Record<string, string> = {
  aracaju:
    "https://images.unsplash.com/photo-1568452887198-aabaeaedd6e0?w=900&h=700&auto=format&fit=crop&q=80",
  "barra-dos-coqueiros":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&auto=format&fit=crop&q=80",
  "nossa-senhora-do-socorro":
    "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=900&h=700&auto=format&fit=crop&q=80",
  "sao-cristovao":
    "https://images.unsplash.com/photo-1599735380562-fc8d486a4a6c?w=900&h=700&auto=format&fit=crop&q=80",
};

const FALLBACK =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=700&auto=format&fit=crop&q=80";

export function CitiesSection({ cities }: { cities: CityCard[] }) {
  const { t } = useI18n();

  if (!cities.length) return null;

  return (
    <section className="section cities-section" id="cidades" data-reveal>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">{t("cities.eyebrow")}</span>
          <h2>{t("cities.title")}</h2>
          <p>{t("cities.lead")}</p>
        </div>

        <div className="city-grid">
          {cities.map((c) => (
            <Link key={c.slug} href={`/buscar?cidade=${c.slug}`} className="city-card">
              <img src={CITY_IMAGES[c.slug] || FALLBACK} alt={`${c.name}, ${c.state}`} loading="lazy" />
              <div className="overlay">
                <h3>{c.name}</h3>
                <p>
                  {c.count} {c.count === 1 ? t("common.professional") : t("common.professionals")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
