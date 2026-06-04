"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";

export function PeachShowcase() {
  const { t } = useI18n();

  const items = [
    {
      tag: t("peach.step1tag"),
      title: t("peach.step1title"),
      text: t("peach.step1text"),
      href: "/buscar",
      cta: t("peach.step1cta"),
    },
    {
      tag: t("peach.step2tag"),
      title: t("peach.step2title"),
      text: t("peach.step2text"),
      href: "/buscar?fundador=1",
      cta: t("peach.step2cta"),
    },
    {
      tag: t("peach.step3tag"),
      title: t("peach.step3title"),
      text: t("peach.step3text"),
      href: "/#cadastro",
      cta: t("peach.step3cta"),
    },
  ];

  return (
    <section className="peach-showcase peach-only" data-reveal>
      <div className="container">
        <div className="peach-showcase-head">
          <span className="section-tag">{t("peach.experience")}</span>
          <h2>{t("peach.title")}</h2>
          <p>{t("peach.lead")}</p>
        </div>
        <div className="peach-showcase-grid">
          {items.map((item) => (
            <article key={item.tag} className="peach-showcase-card" data-reveal>
              <span className="peach-showcase-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link href={item.href} className="peach-showcase-link">
                {item.cta} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
