import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileBreadcrumbs } from "@/components/ProfilePageI18n";
import { ProfilePageBody } from "@/components/ProfilePageBody";
import { getProfessionalBySlug } from "@/lib/queries";
import { safeJsonParse, waLink } from "@/lib/utils";

export const revalidate = 30;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pro = await getProfessionalBySlug(params.slug);
  if (!pro) return { title: "Profissional não encontrado" };
  return {
    title: `${pro.name} — ${pro.title || pro.category.name}`,
    description: pro.bio || `${pro.name}, ${pro.title || pro.category.name} em ${pro.city.name}.`,
    openGraph: {
      title: `${pro.name} — AchouPro`,
      description: pro.bio || "",
      images: pro.photoUrl ? [pro.photoUrl] : [],
    },
  };
}

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  const pro = await getProfessionalBySlug(params.slug);
  if (!pro) notFound();

  const gallery = safeJsonParse<string[]>(pro.galleryUrls, []);
  const specialties = safeJsonParse<string[]>(pro.specialties, []);
  const wa = waLink(pro.whatsapp, `Olá, ${pro.name}! Vi seu perfil no AchouPro.`);

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = pro.reviews.filter((r) => r.rating === stars).length;
    const pct = pro.reviews.length > 0 ? (count / pro.reviews.length) * 100 : 0;
    return { stars, count, pct };
  });

  return (
    <main className="page-main">
      <Navbar />

      <div className="container" style={{ paddingTop: "1.5rem" }}>
        <ProfileBreadcrumbs
          categorySlug={pro.category.slug}
          categoryName={pro.category.name}
          proName={pro.name}
        />
      </div>

      <ProfilePageBody
        pro={{
          id: pro.id,
          name: pro.name,
          title: pro.title,
          slug: pro.slug,
          photoUrl: pro.photoUrl,
          bio: pro.bio,
          phone: pro.phone,
          whatsapp: pro.whatsapp,
          rating: pro.rating,
          reviewCount: pro.reviewCount,
          yearsExperience: pro.yearsExperience,
          neighborhood: pro.neighborhood,
          state: pro.city.state,
          isFounder: pro.isFounder,
          isVerified: pro.isVerified,
          is24h: pro.is24h,
          isDomiciliar: pro.isDomiciliar,
          category: pro.category,
          city: pro.city,
        }}
        gallery={gallery}
        specialties={specialties}
        reviews={pro.reviews}
        ratingDistribution={ratingDistribution}
        wa={wa}
      />

      <Footer />
    </main>
  );
}
