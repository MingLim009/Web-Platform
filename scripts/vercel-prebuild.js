#!/usr/bin/env node
/**
 * On Vercel, use PostgreSQL schema (SQLite is not suitable for serverless).
 * Requires DATABASE_URL in the Vercel project settings (Neon, Supabase, Vercel Postgres, etc.).
 */
const fs = require("fs");
const path = require("path");

if (!process.env.VERCEL) return;

const dbUrl = process.env.DATABASE_URL || "";
const usePostgres =
  dbUrl.startsWith("postgresql://") || dbUrl.startsWith("postgres://");

if (!usePostgres) {
  console.log("[vercel-prebuild] SQLite DATABASE_URL — keeping dev schema.");
  return;
}

const root = path.join(__dirname, "..");
const main = path.join(root, "prisma", "schema.prisma");
const prod = path.join(root, "prisma", "schema.production.prisma");

if (!fs.existsSync(prod)) {
  console.warn("[vercel-prebuild] schema.production.prisma not found; keeping dev schema.");
  return;
}

fs.copyFileSync(prod, main);
console.log("[vercel-prebuild] Using PostgreSQL schema for Vercel.");
