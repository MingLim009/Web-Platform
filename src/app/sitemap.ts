import type { MetadataRoute } from "next";
import { hasDatabaseUrl } from "@/lib/db-env";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/utils";

export const dynamic = "force-dynamic";

const baseStaticSitemap = (): MetadataRoute.Sitemap => {
  const base = SITE.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/buscar`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.5 },
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!hasDatabaseUrl()) return baseStaticSitemap();

  let pros: { slug: string; updatedAt: Date }[] = [];
  let categories: { slug: string }[] = [];
  let cities: { slug: string }[] = [];

  try {
    [pros, categories, cities] = await Promise.all([
      prisma.professional.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.category.findMany({ where: { isActive: true }, select: { slug: true } }),
      prisma.city.findMany({ where: { isActive: true }, select: { slug: true } }),
    ]);
  } catch {
    return baseStaticSitemap();
  }

  const base = SITE.url.replace(/\/$/, "");

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/buscar`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const proUrls: MetadataRoute.Sitemap = pros.map((p) => ({
    url: `${base}/profissional/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/buscar?categoria=${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const cityUrls: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${base}/buscar?cidade=${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticUrls, ...proUrls, ...categoryUrls, ...cityUrls];
}
