"use client";

import Link from "next/link";
import type { Professional, Category, City } from "@prisma/client";
import { GlowStar } from "./GlowStar";
import { useI18n } from "./I18nProvider";

type ProWithRel = Professional & { category: Category; city: City };

const MEDALS = ["🥇", "🥈", "🥉"];

export function WeeklyTop({ pros }: { pros: ProWithRel[] }) {
  const { t, cat } = useI18n();

  if (!pros.length) return null;

  return (
    <section className="section weekly-top" data-reveal>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">{t("weekly.eyebrow")}</span>
          <h2>{t("weekly.title")}</h2>
          <p>{t("weekly.lead")}</p>
        </div>

        <ol className="podium">
          {pros.slice(0, 3).map((pro, idx) => {
            const medalText =
              idx === 0 ? t("weekly.medal1") : idx === 1 ? t("weekly.medal2") : t("weekly.medal3");
            return (
              <li key={pro.id} className={`podium-card podium-${idx + 1}`}>
                <div className="podium-rank" aria-hidden>
                  <span className="podium-medal">{MEDALS[idx]}</span>
                  <span className="podium-rank-label">{medalText}</span>
                </div>
                <Link href={`/profissional/${pro.slug}`} className="podium-link">
                  <div className="podium-photo">
                    {pro.photoUrl ? (
                      <img src={pro.photoUrl} alt={pro.name} loading="lazy" />
                    ) : (
                      <div className="podium-placeholder">{pro.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="podium-body">
                    <span className="podium-cat">{cat(pro.category.slug, pro.category.name)}</span>
                    <h3 className="podium-name">{pro.name}</h3>
                    <div className="podium-meta">
                      <GlowStar size={14} />
                      <strong>{pro.rating.toFixed(1)}</strong>
                      <span className="podium-count">
                        {t("weekly.reviewsCount", { n: pro.reviewCount })}
                      </span>
                    </div>
                    <span className="podium-city">{pro.city.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
