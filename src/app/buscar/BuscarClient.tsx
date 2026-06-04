"use client";

import { Suspense } from "react";
import { SearchBoxForm } from "@/components/SearchBoxForm";
import { SearchFilters } from "./SearchFilters";
import { ResultsSort } from "@/components/ResultsSort";

export function BuscarSearchForm({
  cities,
}: {
  cities: { slug: string; name: string; state: string }[];
}) {
  return (
    <Suspense fallback={<div className="search-box skeleton" style={{ minHeight: 56 }} />}>
      <SearchBoxForm cities={cities} style={{ margin: 0, maxWidth: 560 }} compact />
    </Suspense>
  );
}

export function BuscarFilters(props: {
  categories: Parameters<typeof SearchFilters>[0]["categories"];
  cities: Parameters<typeof SearchFilters>[0]["cities"];
  total: number;
}) {
  return (
    <Suspense fallback={<aside className="filters skeleton" style={{ minHeight: 400 }} />}>
      <SearchFilters {...props} />
    </Suspense>
  );
}

export function BuscarSort() {
  return (
    <Suspense fallback={null}>
      <ResultsSort />
    </Suspense>
  );
}
