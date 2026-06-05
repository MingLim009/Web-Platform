"use client";

import { useCadastro } from "./CadastroProvider";
import { useI18n } from "./I18nProvider";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function PremiumPlans() {
  const { t } = useI18n();
  const { openCadastro } = useCadastro();

  const plans = [
    {
      key: "free",
      name: t("plans.freeName"),
      price: t("plans.free"),
      per: "",
      desc: t("plans.freeDesc"),
      features: [t("plans.freeF1"), t("plans.freeF2"), t("plans.freeF3")],
      cta: t("common.startNow"),
      badge: "",
      variant: "plan-free",
    },
    {
      key: "professional",
      name: t("plans.professional"),
      price: t("plans.professionalPrice"),
      per: t("plans.professionalPer"),
      desc: t("plans.professionalDesc"),
      features: [t("plans.proF1"), t("plans.proF2"), t("plans.proF3"), t("plans.proF4")],
      cta: t("plans.cta"),
      badge: t("plans.popular"),
      variant: "plan-pro",
    },
    {
      key: "premium",
      name: t("plans.premium"),
      price: t("plans.premiumPrice"),
      per: t("plans.premiumPer"),
      desc: t("plans.premiumDesc"),
      features: [
        t("plans.premiumF1"),
        t("plans.premiumF2"),
        t("plans.premiumF3"),
        t("plans.premiumF4"),
        t("plans.premiumF5"),
      ],
      cta: t("plans.cta"),
      badge: t("plans.soon"),
      variant: "plan-premium",
    },
  ];

  return (
    <section className="section plans-section" id="planos" data-reveal>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">{t("plans.eyebrow")}</span>
          <h2>{t("plans.title")}</h2>
          <p>{t("plans.lead")}</p>
        </div>

        <div className="plans-grid">
          {plans.map((p) => (
            <article key={p.key} className={`plan-card ${p.variant}`}>
              {p.badge && <span className="plan-badge">{p.badge}</span>}
              <header className="plan-head">
                <h3>{p.name}</h3>
                <div className="plan-price">
                  <strong>{p.price}</strong>
                  {p.per && <span>{p.per}</span>}
                </div>
                <p className="plan-desc">{p.desc}</p>
              </header>
              <ul className="plan-features">
                {p.features.map((f, i) => (
                  <li key={i}>
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="btn plan-cta" onClick={openCadastro}>
                {p.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
