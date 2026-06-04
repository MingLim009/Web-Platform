/** True when Prisma can connect (DATABASE_URL is set at runtime or build). */
export function hasDatabaseUrl(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url);
}

export const EMPTY_STATS = {
  totalPros: 0,
  totalReviews: 0,
  foundersTaken: 0,
  foundersRemaining: 200,
  pending: 0,
  avgRating: 0,
} as const;
