"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category, City } from "@prisma/client";
import { useI18n } from "@/components/I18nProvider";

type CategoryWithCount = Category & { _count: { professionals: number } };
type CityWithCount = City & { _count: { professionals: number } };

export function SearchFilters({
  categories,
  cities,
  total,
}: {
  categories: CategoryWithCount[];
  cities: CityWithCount[];
  total: number;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const { t, cat } = useI18n();
  const [open, setOpen] = useState(false);

  const params = useMemo(() => {
    const p: Record<string, string | undefined> = {};
    sp.forEach((value, key) => {
      p[key] = value;
    });
    return p;
  }, [sp]);

  useEffect(() => {
    document.body.classList.toggle("filters-open", open);
    return () => document.body.classList.remove("filters-open");
  }, [open]);

  function pushParams(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(sp.toString());
    mutate(next);
    const qs = next.toString();
    router.push(qs ? `/buscar?${qs}` : "/buscar");
    router.refresh();
  }

  function toggleParam(key: string, value: string) {
    pushParams((p) => {
      if (p.get(key) === value) p.delete(key);
      else p.set(key, value);
    });
  }

  function clearFilters() {
    router.push("/buscar");
    router.refresh();
    setOpen(false);
  }

  const totalCategoryPros = categories.reduce((sum, c) => sum + c._count.professionals, 0);
  const totalCityPros = cities.reduce((sum, c) => sum + c._count.professionals, 0);

  const activeCount =
    (params.categoria ? 1 : 0) +
    (params.cidade ? 1 : 0) +
    (params.bairro ? 1 : 0) +
    (params.rating ? 1 : 0) +
    (params.fundador ? 1 : 0) +
    (params.verificado ? 1 : 0) +
    (params["24h"] ? 1 : 0) +
    (params.domiciliar ? 1 : 0);

  return (
    <>
      <div className="mobile-filter-bar">
        <button className="chip primary" type="button" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          {t("buscar.filters")} {activeCount > 0 && <span className="badge-c">{activeCount}</span>}
        </button>
        {activeCount > 0 && (
          <button type="button" className="chip" onClick={clearFilters}>
            {t("common.clear")}
          </button>
        )}
      </div>

      <aside className={`filters${open ? " open" : ""}`}>
        <button type="button" className="filter-close" aria-label={t("buscar.closeFilters")} onClick={() => setOpen(false)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h3>
          {t("buscar.filters")}
          {activeCount > 0 && (
            <button type="button" onClick={clearFilters}>
              {t("common.clear")}
            </button>
          )}
        </h3>

        <div className="filter-group">
          <h4>{t("buscar.category")}</h4>
          <button
            type="button"
            className={`filter-option filter-pill${!params.categoria ? " is-active" : ""}`}
            onClick={() => pushParams((p) => p.delete("categoria"))}
          >
            <span className="filter-radio" aria-hidden />
            <span className="filter-label">{t("buscar.allCategories")}</span>
            <span className="badge-mini">{totalCategoryPros}</span>
          </button>
          {categories.map((c) => {
            const active = params.categoria === c.slug;
            return (
              <button
                key={c.id}
                type="button"
                className={`filter-option filter-pill${active ? " is-active" : ""}`}
                onClick={() =>
                  pushParams((p) => {
                    if (active) p.delete("categoria");
                    else p.set("categoria", c.slug);
                  })
                }
              >
                <span className="filter-radio" aria-hidden />
                <span className="filter-label">{cat(c.slug, c.name)}</span>
                <span className="badge-mini">{c._count.professionals}</span>
              </button>
            );
          })}
        </div>

        <div className="filter-group">
          <h4>{t("buscar.city")}</h4>
          <button
            type="button"
            className={`filter-option filter-pill${!params.cidade ? " is-active" : ""}`}
            onClick={() => pushParams((p) => p.delete("cidade"))}
          >
            <span className="filter-radio" aria-hidden />
            <span className="filter-label">{t("buscar.allCitiesFilter")}</span>
            <span className="badge-mini">{totalCityPros}</span>
          </button>
          {cities.map((c) => {
            const active = params.cidade === c.slug;
            return (
              <button
                key={c.id}
                type="button"
                className={`filter-option filter-pill${active ? " is-active" : ""}`}
                onClick={() =>
                  pushParams((p) => {
                    if (active) p.delete("cidade");
                    else p.set("cidade", c.slug);
                  })
                }
              >
                <span className="filter-radio" aria-hidden />
                <span className="filter-label">{c.name}</span>
                <span className="badge-mini">{c._count.professionals}</span>
              </button>
            );
          })}
        </div>

        <div className="filter-group">
          <h4>{t("buscar.minRating")}</h4>
          {[
            { v: "", l: t("buscar.ratingAll") },
            { v: "5", l: t("buscar.rating5") },
            { v: "4", l: t("buscar.rating4") },
            { v: "3", l: t("buscar.rating3") },
          ].map(({ v, l }) => (
            <label key={v || "all"} className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={(params.rating || "") === v}
                onChange={() => {
                  pushParams((p) => {
                    if (v) p.set("rating", v);
                    else p.delete("rating");
                  });
                }}
              />
              {l}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>{t("buscar.perks")}</h4>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={params.verificado === "1"}
              onChange={() => toggleParam("verificado", "1")}
            />
            {t("pro.verified")}
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={params.fundador === "1"}
              onChange={() => toggleParam("fundador", "1")}
            />
            {t("pro.founder2026")}
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={params["24h"] === "1"}
              onChange={() => toggleParam("24h", "1")}
            />
            24h
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={params.domiciliar === "1"}
              onChange={() => toggleParam("domiciliar", "1")}
            />
            {t("pro.domiciliar")}
          </label>
        </div>

        <div className="filter-apply">
          <button type="button" className="btn btn-ghost" onClick={clearFilters}>
            {t("common.clear")}
          </button>
          <button type="button" className="btn btn-primary filter-apply-btn" onClick={() => setOpen(false)}>
            {t("common.apply")} ({total})
          </button>
        </div>
      </aside>

      {open && (
        <div className="mobile-backdrop filters-backdrop open" onClick={() => setOpen(false)} aria-hidden />
      )}
    </>
  );
}
