"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";

type CityCard = { slug: string; name: string; state: string; count: number };

// Real photos of the Sergipe cities served by the platform.
// loremflickr.com returns deterministic Flickr photos by tag+lock — used for
// cities where the previous Unsplash IDs were removed (404). Existing working
// Unsplash URLs are kept as-is.
const CITY_IMAGES: Record<string, string> = {
  aracaju:
    "https://loremflickr.com/900/700/aracaju,brazil,beach/all?lock=42",
  "barra-dos-coqueiros":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&auto=format&fit=crop&q=80",
  "nossa-senhora-do-socorro":
    "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=900&h=700&auto=format&fit=crop&q=80",
  "sao-cristovao":
    "https://loremflickr.com/900/700/saocristovao,sergipe,brazil/all?lock=7",
};

// Per-city fallback (also from loremflickr) — used if the primary image fails
// to load at runtime. Different lock values so retries don't infinite-loop.
const CITY_FALLBACK: Record<string, string> = {
  aracaju: "https://loremflickr.com/900/700/aracaju,brazil/all?lock=11",
  "barra-dos-coqueiros":
    "https://loremflickr.com/900/700/beach,brazil,sergipe/all?lock=21",
  "nossa-senhora-do-socorro":
    "https://loremflickr.com/900/700/sergipe,brazil,city/all?lock=31",
  "sao-cristovao":
    "https://loremflickr.com/900/700/colonial,brazil,sergipe/all?lock=41",
};

const GENERIC_FALLBACK =
  "https://loremflickr.com/900/700/brazil,city,sunset/all?lock=51";

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
              <img
                src={CITY_IMAGES[c.slug] || GENERIC_FALLBACK}
                alt={`${c.name}, ${c.state}`}
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  const fb = CITY_FALLBACK[c.slug] || GENERIC_FALLBACK;
                  if (img.src !== fb) {
                    img.src = fb;
                  } else if (img.src !== GENERIC_FALLBACK) {
                    img.src = GENERIC_FALLBACK;
                  }
                }}
              />
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
