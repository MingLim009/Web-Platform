"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";
import { MissionIcon } from "./MissionIcon";
import { AnimatedStat } from "./AnimatedStat";
import { SITE, waLink } from "@/lib/utils";

type Stats = {
  totalPros: number;
  totalReviews: number;
  avgRating: number;
  foundersRemaining: number;
};

export function SobrePageContent({ stats }: { stats: Stats }) {
  const { t } = useI18n();
  const wa = waLink(SITE.whatsapp, "Olá! Quero ser um dos Fundadores do AchouPro.");

  return (
    <>
      <section className="about-hero" data-reveal>
        <div className="container">
          <span className="section-tag">{t("sobre.tag")}</span>
          <h1>
            {t("sobre.title")}
            <br />
            <span style={{ color: "var(--c-orange)" }}>{t("sobre.titleAccent")}</span>
          </h1>
          <p>{t("sobre.lead")}</p>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card" data-reveal>
              <div className="mission-icon mission-icon-svg">
                <MissionIcon kind="mission" size={120} />
              </div>
              <h3>{t("sobre.mission")}</h3>
              <p>{t("sobre.missionText")}</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon mission-icon-svg">
                <MissionIcon kind="vision" size={120} />
              </div>
              <h3>{t("sobre.vision")}</h3>
              <p>{t("sobre.visionText")}</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon mission-icon-svg">
                <MissionIcon kind="values" size={120} />
              </div>
              <h3>{t("sobre.values")}</h3>
              <p>{t("sobre.valuesText")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t("sobre.statsEyebrow")}</span>
            <h2>{t("sobre.statsTitle")}</h2>
          </div>
          <div className="stats-strip">
            <div className="stat-big">
              <div className="stat-num">
                <AnimatedStat value={stats.totalPros} />
              </div>
              <div className="stat-lbl">{t("sobre.statPros")}</div>
            </div>
            <div className="stat-big">
              <div className="stat-num">
                <AnimatedStat value={stats.totalReviews} suffix="+" />
              </div>
              <div className="stat-lbl">{t("sobre.statReviews")}</div>
            </div>
            <div className="stat-big">
              <div className="stat-num">
                <AnimatedStat value={stats.avgRating} decimals={1} suffix="★" />
              </div>
              <div className="stat-lbl">{t("sobre.statAvg")}</div>
            </div>
            <div className="stat-big">
              <div className="stat-num">
                <AnimatedStat value={stats.foundersRemaining} />
              </div>
              <div className="stat-lbl">{t("sobre.statFounder")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t("sobre.whyEyebrow")}</span>
            <h2>{t("sobre.whyTitle")}</h2>
          </div>
          <div className="phases-grid">
            <div className="phase-card phase-current">
              <span className="phase-tag">{t("sobre.trustTag")}</span>
              <h3>{t("sobre.trustTitle")}</h3>
              <ul>
                <li>✓ {t("sobre.trust1")}</li>
                <li>✓ {t("sobre.trust2")}</li>
                <li>✓ {t("sobre.trust3")}</li>
                <li>✓ {t("sobre.trust4")}</li>
              </ul>
            </div>
            <div className="phase-card">
              <span className="phase-tag">{t("sobre.simpleTag")}</span>
              <h3>{t("sobre.simpleTitle")}</h3>
              <ul>
                <li>• {t("sobre.simple1")}</li>
                <li>• {t("sobre.simple2")}</li>
                <li>• {t("sobre.simple3")}</li>
                <li>• {t("sobre.simple4")}</li>
              </ul>
            </div>
            <div className="phase-card">
              <span className="phase-tag">{t("sobre.communityTag")}</span>
              <h3>{t("sobre.communityTitle")}</h3>
              <ul>
                <li>• {t("sobre.community1")}</li>
                <li>• {t("sobre.community2")}</li>
                <li>• {t("sobre.community3")}</li>
                <li>• {t("sobre.community4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="founder-banner">
            <div className="content">
              <span className="ribbon">🚀 {t("sobre.joinRibbon")}</span>
              <h2>{t("sobre.joinTitle", { n: stats.totalPros })}</h2>
              <p>{t("sobre.joinLead")}</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                {t("sobre.joinCta")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
