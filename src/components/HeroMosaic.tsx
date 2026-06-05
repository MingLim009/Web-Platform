"use client";

import { GlowStar } from "./GlowStar";
import { useI18n } from "./I18nProvider";

type HeroMosaicProps = {
  avgRating: number;
  totalPros: number;
};

const TILES: { key: string; src: string; categoria: string }[] = [
  {
    key: "mosaicElectrician",
    src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=500&auto=format&fit=crop&q=80",
    categoria: "eletricista",
  },
  {
    key: "mosaicCaregiver",
    src: "https://loremflickr.com/400/500/woman,nurse,elderly,care/all?lock=201",
    categoria: "cuidador",
  },
  {
    key: "mosaicPersonal",
    src: "https://loremflickr.com/400/500/personaltrainer,gym,fitness/all?lock=202",
    categoria: "personal-trainer",
  },
  {
    key: "mosaicPhysio",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=500&auto=format&fit=crop&q=80",
    categoria: "cuidador",
  },
  {
    key: "mosaicMason",
    src: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=500&auto=format&fit=crop&q=80",
    categoria: "pedreiro",
  },
  {
    key: "mosaicHouseCleaner",
    src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=500&auto=format&fit=crop&q=80",
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
            <img src={tile.src} alt={t(`hero.${tile.key}`)} loading="eager" />
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
