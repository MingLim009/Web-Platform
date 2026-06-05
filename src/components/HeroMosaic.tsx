"use client";

import { GlowStar } from "./GlowStar";
import { useI18n } from "./I18nProvider";

type HeroMosaicProps = {
  avgRating: number;
  totalPros: number;
};

// Profession tiles. Each src is a Pexels stock photo verified to match the
// occupation visually (no random/loremflickr — those returned unrelated images
// like statues or vintage salons). `fallback` is used when the primary URL
// fails to load at runtime (handled by the <img onError> below).
const TILES: { key: string; src: string; fallback: string; categoria: string }[] = [
  {
    key: "mosaicElectrician",
    src: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    fallback: "https://images.pexels.com/photos/5691656/pexels-photo-5691656.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    categoria: "eletricista",
  },
  {
    key: "mosaicCaregiver",
    src: "https://images.pexels.com/photos/7551589/pexels-photo-7551589.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    fallback: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    categoria: "cuidador",
  },
  {
    key: "mosaicPersonal",
    src: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    fallback: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    categoria: "personal-trainer",
  },
  {
    key: "mosaicPhysio",
    src: "https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    fallback: "https://images.pexels.com/photos/3760275/pexels-photo-3760275.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    categoria: "cuidador",
  },
  {
    key: "mosaicMason",
    src: "https://images.pexels.com/photos/1216544/pexels-photo-1216544.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    fallback: "https://images.pexels.com/photos/3681998/pexels-photo-3681998.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    categoria: "pedreiro",
  },
  {
    key: "mosaicHouseCleaner",
    src: "https://images.pexels.com/photos/4239092/pexels-photo-4239092.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    fallback: "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    categoria: "diarista",
  },
];

export function HeroMosaic({ avgRating, totalPros }: HeroMosaicProps) {
  const { t } = useI18n();

  return (
    <div className="hero-visual hero-mosaic">
      <div className="mosaic-grid">
        {TILES.map((tile) => (
          <a
            key={tile.key}
            href={`/buscar?categoria=${tile.categoria}`}
            className="mosaic-tile"
            aria-label={t(`hero.${tile.key}`)}
          >
            <img
              src={tile.src}
              alt={t(`hero.${tile.key}`)}
              loading="eager"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== tile.fallback) {
                  img.src = tile.fallback;
                }
              }}
            />
            <span className="mosaic-tile-label">{t(`hero.${tile.key}`)}</span>
          </a>
        ))}
      </div>

      <div className="mosaic-subtitle">{t("hero.mosaicSubtitle")}</div>

      <div className="float-card fc-1">
        <div className="icon icon-verified">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <div className="label">{t("hero.verified")}</div>
          <div className="value">{t("hero.professionalLabel")}</div>
        </div>
      </div>

      <div className="float-card fc-2">
        <div className="icon icon-rating">
          <GlowStar size={22} />
        </div>
        <div>
          <div className="label">{t("hero.avgRating")}</div>
          <div className="value value-rating">
            {avgRating.toFixed(1)} <GlowStar size={16} className="value-star" />
          </div>
        </div>
      </div>

      <div className="float-card fc-3">
        <div className="icon icon-users">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div>
          <div className="label">{t("hero.registered")}</div>
          <div className="value">+{totalPros}</div>
        </div>
      </div>
    </div>
  );
}
