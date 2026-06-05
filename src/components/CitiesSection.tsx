"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";

type CityCard = { slug: string; name: string; state: string; count: number };

// Photos of the Sergipe cities served by the platform.
// Each entry uses a Pexels stock photo that *visually represents* the city
// (beach for Aracaju/Barra; urban for Socorro; colonial street for São
// Cristóvão — which is famous for its UNESCO-listed colonial architecture).
// Pexels was chosen over loremflickr because the latter was returning random
// off-topic photos (a statue ended up on the São Cristóvão card).
const CITY_IMAGES: Record<string, string> = {
  aracaju:
    "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  "barra-dos-coqueiros":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&auto=format&fit=crop&q=80",
  "nossa-senhora-do-socorro":
    "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=900&h=700&auto=format&fit=crop&q=80",
  "sao-cristovao":
    "https://images.pexels.com/photos/2901214/pexels-photo-2901214.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
};

// Per-city fallback — used if the primary image fails to load at runtime.
const CITY_FALLBACK: Record<string, string> = {
  aracaju:
    "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  "barra-dos-coqueiros":
    "https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  "nossa-senhora-do-socorro":
    "https://images.pexels.com/photos/3155671/pexels-photo-3155671.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  "sao-cristovao":
    "https://images.pexels.com/photos/3155671/pexels-photo-3155671.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
};

const GENERIC_FALLBACK =
  "https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop";

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
