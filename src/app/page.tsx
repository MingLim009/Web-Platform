import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProCard } from "@/components/ProCard";
import { HeroVisual } from "@/components/HeroVisual";
import { HomeHeroHead } from "@/components/HomeHeroHead";
import { HomeSearchBox } from "@/components/HomeSearchBox";
import { HomePageSections } from "@/components/HomePageSections";
import { PeachShowcase } from "@/components/PeachShowcase";
import { getCategories, getCities, getFeaturedProfessionals, getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, cities, featured, stats] = await Promise.all([
    getCategories(),
    getCities(),
    getFeaturedProfessionals(4),
    getStats(),
  ]);

  const founderPct = Math.round((stats.foundersTaken / 200) * 100);

  return (
    <main className="page-main">
      <Navbar founderSlots={stats.foundersRemaining} />

      <section className="hero" data-reveal>
        <div className="container hero-inner">
          <div className="hero-text">
            <HomeHeroHead />
            <HomeSearchBox cities={cities.map((c) => ({ slug: c.slug, name: c.name, state: c.state }))} />
          </div>

          <HeroVisual
            imageSrc="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1000&auto=format&fit=crop&q=85"
            imageAlt="Professional woman working at her computer"
            avgRating={stats.avgRating}
            totalPros={stats.totalPros}
          />
        </div>
      </section>

      <PeachShowcase />

      <HomePageSections
        categories={categories.map((c) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          count: c._count.professionals,
        }))}
        stats={{
          foundersTaken: stats.foundersTaken,
          foundersRemaining: stats.foundersRemaining,
          founderPct,
          categoriesCount: categories.length,
        }}
        featuredGrid={featured.map((pro) => (
          <ProCard key={pro.id} pro={pro} />
        ))}
      />

      <Footer />
    </main>
  );
}
