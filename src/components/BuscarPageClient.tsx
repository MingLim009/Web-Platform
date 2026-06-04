"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useI18n } from "./I18nProvider";

export function BuscarPageHeader({
  count,
  categorySlug,
  categoryName,
  cityName,
  searchForm,
}: {
  count: number;
  categorySlug?: string;
  categoryName?: string;
  cityName: string;
  searchForm?: ReactNode;
}) {
  const { t, cat } = useI18n();

  const pageTitle = categorySlug
    ? `${cat(categorySlug, categoryName || categorySlug)} ${t("common.in")} ${cityName}`
    : t("buscar.titleInCity", { city: cityName });

  return (
    <section className="search-header" data-reveal>
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">{t("common.home")}</Link>
          <span>›</span>
          <Link href="/buscar">{t("buscar.breadcrumbSearch")}</Link>
          <span>›</span>
          <span className="breadcrumb-current">{pageTitle}</span>
        </div>
        <div className="search-summary">
          <div>
            <h1>{pageTitle}</h1>
            <p className="count">
              <strong style={{ color: "var(--c-orange)" }}>{t("buscar.found", { n: count })}</strong>{" "}
              {t("buscar.foundLead")}
            </p>
          </div>
          {searchForm}
        </div>
      </div>
    </section>
  );
}

export function BuscarResultsToolbar({ count }: { count: number }) {
  const { t } = useI18n();
  return (
    <div className="results-count">
      {t("buscar.showing")} <strong>{count}</strong> {t("common.professionals")}
    </div>
  );
}

export function BuscarEmptyState() {
  const { t } = useI18n();
  return (
    <div className="empty-results">
      <p>{t("buscar.noResults")}</p>
      <Link href="/buscar" className="btn btn-primary" style={{ marginTop: "1rem" }}>
        {t("buscar.seeAll")}
      </Link>
    </div>
  );
}
