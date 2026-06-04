"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { CategoryIcon } from "./CategoryIcon";
import { FounderSeal } from "./FounderSeal";
import { useI18n } from "./I18nProvider";
import { SITE, waLink } from "@/lib/utils";

type Cat = { id: string; slug: string; name: string; count: number };
type Stats = {
  foundersTaken: number;
  foundersRemaining: number;
  founderPct: number;
  categoriesCount: number;
};

export function HomePageSections({
  categories,
  stats,
  featuredGrid,
}: {
  categories: Cat[];
  stats: Stats;
  featuredGrid: ReactNode;
}) {
  const { t, cat } = useI18n();
  const waFounder = waLink(SITE.whatsapp, "Olá! Quero garantir minha vaga de Fundador no AchouPro.");

  return (
    <>
      <section className="trust-strip" data-reveal>
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <svg className="ti-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              {t("trust.verified")}
            </div>
            <div className="trust-item">
              <svg className="ti-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.39 7.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.61-2.01z" />
              </svg>
              {t("trust.reviews")}
            </div>
            <div className="trust-item">
              <svg className="ti-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              {t("trust.direct")}
            </div>
            <div className="trust-item">
              <svg className="ti-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              {t("trust.categories", { n: stats.categoriesCount })}
            </div>
          </div>
        </div>
      </section>

      <section className="section categories" id="categorias" data-reveal>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t("home.catEyebrow")}</span>
            <h2>{t("home.catTitle")}</h2>
            <p>{t("home.catLead")}</p>
          </div>
          <div className="cat-grid">
            {categories.map((c) => (
              <Link key={c.id} href={`/buscar?categoria=${c.slug}`} className="cat-card">
                <div className="cat-icon">
                  <CategoryIcon slug={c.slug} size={28} />
                </div>
                <h3>{cat(c.slug, c.name)}</h3>
                <p>
                  {c.count} {c.count === 1 ? t("common.professional") : t("common.professionals")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t("home.featuredEyebrow")}</span>
            <h2>{t("home.featuredTitle")}</h2>
            <p>{t("home.featuredLead")}</p>
          </div>
          <div className="pros-grid">{featuredGrid}</div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/buscar" className="btn btn-outline btn-lg">
              {t("home.seeAllPros")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section howto" data-reveal>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t("home.howEyebrow")}</span>
            <h2>{t("home.howTitle")}</h2>
            <p>{t("home.howLead")}</p>
          </div>
          <div className="howto-grid">
            <div className="howto-step" data-reveal>
              <span className="howto-peach-label peach-only">{t("home.step1")}</span>
              <div className="step-num">1</div>
              <h3>{t("home.howSearch")}</h3>
              <p>{t("home.howSearchText")}</p>
            </div>
            <div className="howto-step" data-reveal>
              <span className="howto-peach-label peach-only">{t("home.step2")}</span>
              <div className="step-num">2</div>
              <h3>{t("home.howCompare")}</h3>
              <p>{t("home.howCompareText")}</p>
            </div>
            <div className="howto-step" data-reveal>
              <span className="howto-peach-label peach-only">{t("home.step3")}</span>
              <div className="step-num">3</div>
              <h3>{t("home.howHire")}</h3>
              <p>{t("home.howHireText")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="cadastro" data-reveal>
        <div className="container">
          <div className="founder-banner">
            <div className="content">
              <span className="ribbon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.39 7.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.61-2.01z" />
                </svg>
                {t("home.founderRibbon")}
              </span>
              <h2>
                {t("home.founderTitle")}{" "}
                <span className="gold">{t("home.founderTitleGold")}</span>
              </h2>
              <p>
                {t("home.founderLead")} <strong>{t("home.founderMonths")}</strong>.
              </p>
              <ul className="perks">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t("home.perk1")}
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t("home.perk2")}
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t("home.perk3")}
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t("home.perk4")}
                </li>
              </ul>
              <div className="progress">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${stats.founderPct}%` }} />
                </div>
                <div className="progress-label">
                  <span>
                    <strong style={{ color: "var(--c-white)" }}>
                      {t("home.founderFilled", { n: stats.foundersTaken })}
                    </strong>
                  </span>
                  <span>
                    <strong style={{ color: "var(--c-orange)" }}>
                      {stats.foundersRemaining} {t("common.remaining")}
                    </strong>
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                <a href={waFounder} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  {t("home.founderRegister")}
                </a>
                <Link
                  href="/sobre"
                  className="btn"
                  style={{ background: "rgba(255,255,255,.12)", color: "var(--c-white)" }}
                >
                  {t("common.learnMore")}
                </Link>
              </div>
            </div>
            <div className="founder-visual">
              <FounderSeal />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
