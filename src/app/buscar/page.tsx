import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProCard } from "@/components/ProCard";
import { BuscarSearchForm, BuscarFilters, BuscarSort } from "./BuscarClient";
import { BuscarPageHeader, BuscarResultsToolbar, BuscarEmptyState } from "@/components/BuscarPageClient";
import { getCategories, getCities, getProfessionals } from "@/lib/queries";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  categoria?: string;
  cidade?: string;
  bairro?: string;
  rating?: string;
  fundador?: string;
  verificado?: string;
  "24h"?: string;
  domiciliar?: string;
  ordenar?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const cat = searchParams.categoria;
  const city = searchParams.cidade;
  let title = "Profissionais em Aracaju";
  if (cat && city) title = `${cat.replace(/-/g, " ")} em ${city.replace(/-/g, " ")}`;
  else if (cat) title = `${cat.replace(/-/g, " ")} — AchouPro`;
  else if (city) title = `Profissionais em ${city.replace(/-/g, " ")}`;
  return {
    title,
    description: "Encontre os melhores profissionais avaliados em Aracaju e região.",
  };
}

export default async function BuscarPage({ searchParams }: { searchParams: SearchParams }) {
  const [pros, categories, cities] = await Promise.all([
    getProfessionals({
      search: searchParams.q,
      categorySlug: searchParams.categoria,
      citySlug: searchParams.cidade,
      neighborhood: searchParams.bairro,
      minRating: searchParams.rating ? Number(searchParams.rating) : undefined,
      isFounder: searchParams.fundador === "1",
      isVerified: searchParams.verificado === "1",
      is24h: searchParams["24h"] === "1",
      isDomiciliar: searchParams.domiciliar === "1",
      orderBy: (searchParams.ordenar as "rating" | "reviews" | "recent" | "founder") || "rating",
    }),
    getCategories(),
    getCities(),
  ]);

  const titleCity = searchParams.cidade
    ? cities.find((c) => c.slug === searchParams.cidade)?.name || "Aracaju"
    : "Aracaju";
  const titleCat = searchParams.categoria
    ? categories.find((c) => c.slug === searchParams.categoria)
    : null;

  return (
    <main className="page-main">
      <Navbar />

      <BuscarPageHeader
        count={pros.length}
        categorySlug={titleCat?.slug}
        categoryName={titleCat?.name}
        cityName={titleCity}
        searchForm={
          <BuscarSearchForm cities={cities.map((c) => ({ slug: c.slug, name: c.name, state: c.state }))} />
        }
      />

      <main className="container results-layout" data-reveal>
        <BuscarFilters categories={categories} cities={cities} total={pros.length} />

        <section className="results-main">
          <div className="results-toolbar">
            <BuscarResultsToolbar count={pros.length} />
            <BuscarSort />
          </div>

          {pros.length === 0 ? (
            <BuscarEmptyState />
          ) : (
            <div className="results-grid">
              {pros.map((pro) => (
                <ProCard key={pro.id} pro={pro} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </main>
  );
}
