/**
 * Server queries para Prisma (uso em Server Components)
 */

import { EMPTY_STATS, hasDatabaseUrl } from "@/lib/db-env";
import { prisma } from "@/lib/prisma";

export type ProfessionalListFilters = {
  categorySlug?: string;
  citySlug?: string;
  neighborhood?: string;
  minRating?: number;
  isFounder?: boolean;
  isVerified?: boolean;
  is24h?: boolean;
  isDomiciliar?: boolean;
  search?: string;
  orderBy?: "rating" | "reviews" | "recent" | "founder";
  take?: number;
  skip?: number;
};

export async function getProfessionals(filters: ProfessionalListFilters = {}) {
  if (!hasDatabaseUrl()) return [];
  const where: Record<string, unknown> = { isActive: true };

  if (filters.categorySlug) where.category = { slug: filters.categorySlug };
  if (filters.citySlug) where.city = { slug: filters.citySlug };
  if (filters.neighborhood) where.neighborhood = filters.neighborhood;
  if (filters.minRating) where.rating = { gte: filters.minRating };
  if (filters.isFounder) where.isFounder = true;
  if (filters.isVerified) where.isVerified = true;
  if (filters.is24h) where.is24h = true;
  if (filters.isDomiciliar) where.isDomiciliar = true;
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { title: { contains: filters.search } },
      { bio: { contains: filters.search } },
    ];
  }

  const orderBy =
    filters.orderBy === "reviews"
      ? [{ reviewCount: "desc" as const }, { rating: "desc" as const }]
      : filters.orderBy === "recent"
        ? [{ createdAt: "desc" as const }]
        : filters.orderBy === "founder"
          ? [{ isFounder: "desc" as const }, { rating: "desc" as const }]
          : [{ rating: "desc" as const }, { reviewCount: "desc" as const }];

  return prisma.professional.findMany({
    where,
    include: { category: true, city: true },
    orderBy,
    take: filters.take,
    skip: filters.skip,
  });
}

export async function getProfessionalBySlug(slug: string) {
  if (!hasDatabaseUrl()) return null;
  return prisma.professional.findUnique({
    where: { slug },
    include: {
      category: true,
      city: true,
      reviews: {
        where: { isApproved: true, isPublic: true },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });
}

export async function getCategories() {
  if (!hasDatabaseUrl()) return [];
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: {
      _count: { select: { professionals: { where: { isActive: true } } } },
    },
  });
}

export async function getCities() {
  if (!hasDatabaseUrl()) return [];
  return prisma.city.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    include: {
      _count: { select: { professionals: { where: { isActive: true } } } },
    },
  });
}

export async function getFeaturedProfessionals(limit = 4) {
  if (!hasDatabaseUrl()) return [];
  return prisma.professional.findMany({
    where: { isActive: true, isFounder: true },
    include: { category: true, city: true },
    orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    take: limit,
  });
}

/**
 * Top-rated professionals for the home "Weekly Top" podium.
 * Strategy: prefer pros with reviews in the last 7 days, fall back to
 * overall best-rated when there aren't enough recent reviews yet.
 */
export async function getTopRatedWeekly(limit = 3) {
  if (!hasDatabaseUrl()) return [];

  const since = new Date();
  since.setDate(since.getDate() - 7);

  const recent = await prisma.review.groupBy({
    by: ["professionalId"],
    where: { isApproved: true, createdAt: { gte: since } },
    _count: { _all: true },
    _avg: { rating: true },
    orderBy: [{ _avg: { rating: "desc" } }, { _count: { professionalId: "desc" } }],
    take: limit,
  });

  if (recent.length >= limit) {
    const ids = recent.map((r) => r.professionalId);
    const pros = await prisma.professional.findMany({
      where: { id: { in: ids }, isActive: true },
      include: { category: true, city: true },
    });
    return ids
      .map((id) => pros.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
  }

  return prisma.professional.findMany({
    where: { isActive: true, reviewCount: { gt: 0 } },
    include: { category: true, city: true },
    orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    take: limit,
  });
}

export async function getStats() {
  if (!hasDatabaseUrl()) return { ...EMPTY_STATS };
  const [totalPros, totalReviews, foundersTaken, pending] = await Promise.all([
    prisma.professional.count({ where: { isActive: true } }),
    prisma.review.count({ where: { isApproved: true } }),
    prisma.professional.count({ where: { isFounder: true, isActive: true } }),
    prisma.professional.count({ where: { isPending: true } }),
  ]);

  const avgRating = await prisma.professional.aggregate({
    where: { isActive: true, reviewCount: { gt: 0 } },
    _avg: { rating: true },
  });

  return {
    totalPros,
    totalReviews,
    foundersTaken,
    foundersRemaining: 200 - foundersTaken,
    pending,
    avgRating: avgRating._avg.rating || 0,
  };
}
