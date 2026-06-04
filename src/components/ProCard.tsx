"use client";

import Link from "next/link";
import type { Professional, Category, City } from "@prisma/client";
import { waLink } from "@/lib/utils";
import { useI18n } from "./I18nProvider";

type ProCardData = Professional & { category: Category; city: City };

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const IconStar = ({ opacity = 1 }: { opacity?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ opacity }}>
    <path d="M12 2l2.39 7.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.61-2.01z" />
  </svg>
);

const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar key={i} opacity={i <= full ? 1 : 0.35} />
      ))}
    </span>
  );
}

function Badge({ pro }: { pro: ProCardData }) {
  const { t } = useI18n();
  if (pro.isFounder) {
    return (
      <span className="badge badge-founder">
        <IconStar /> {t("pro.founder")}
      </span>
    );
  }
  if (pro.is24h) return <span className="badge badge-24h">24h</span>;
  if (pro.isDomiciliar) {
    return <span className="badge badge-domiciliar">{t("pro.domiciliar")}</span>;
  }
  if (pro.isVerified) {
    return <span className="badge badge-verified">{t("pro.verified")}</span>;
  }
  return null;
}

export function ProCard({ pro }: { pro: ProCardData }) {
  const { t } = useI18n();
  const wa = waLink(pro.whatsapp, t("pro.waMessage", { name: pro.name }));

  return (
    <article className="pro-card">
      <div className="pro-photo">
        {pro.photoUrl ? (
          <img src={pro.photoUrl} alt={pro.name} loading="lazy" />
        ) : (
          <div style={{ background: "var(--c-gray-200)", width: "100%", height: "100%" }} />
        )}
        <div className="pro-badges">
          <Badge pro={pro} />
          <button type="button" className="pro-fav" aria-label={t("common.favorite")}>
            <IconHeart />
          </button>
        </div>
      </div>
      <div className="pro-body">
        <h3>{pro.name}</h3>
        <span className="pro-cat">{pro.title || pro.category.name}</span>
        <div className="pro-rating">
          <Stars value={pro.rating} />
          <strong>{pro.rating.toFixed(1)}</strong>
          <span className="count">({pro.reviewCount})</span>
        </div>
        <div className="pro-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          </svg>
          {pro.neighborhood ? `${pro.neighborhood}, ${pro.city.name}` : pro.city.name}
          {pro.yearsExperience > 0 && ` · ${pro.yearsExperience} ${t("common.yearsExp")}`}
        </div>
        <div className="pro-actions">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wpp">
            <IconWhatsApp /> {t("common.whatsapp")}
          </a>
          <Link href={`/profissional/${pro.slug}`} className="btn-view" aria-label={t("common.viewProfile")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
