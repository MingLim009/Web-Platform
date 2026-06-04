#!/usr/bin/env node
/**
 * Vercel build hook — keeps SQLite schema (see prisma/deploy.db + vercel.json).
 * For Hostinger/Postgres, run: node scripts/use-production-schema.js
 */
if (process.env.VERCEL) {
  console.log("[vercel-prebuild] Using committed SQLite schema (deploy.db).");
}
