import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * On Vercel/serverless the lambda filesystem is read-only except for /tmp.
 * SQLite needs write access (journal/WAL), so when we ship a bundled DB
 * (`prisma/deploy.db`) we copy it to /tmp on cold start and point Prisma there.
 *
 * Strict gate: only run on Linux serverless in production. This avoids the
 * Vercel CLI's leaked `VERCEL=1` env var from breaking local Windows dev.
 */
function resolveDatabaseUrl(): string | undefined {
  const original = process.env.DATABASE_URL;
  if (!original || !original.startsWith("file:")) return original;

  const isProd = process.env.NODE_ENV === "production";
  const isServerless = Boolean(process.env.VERCEL || process.env.LAMBDA_TASK_ROOT);
  const isLinux = process.platform === "linux";
  const tmpDir = "/tmp";
  const tmpAvailable = (() => {
    try {
      return fs.existsSync(tmpDir) && fs.statSync(tmpDir).isDirectory();
    } catch {
      return false;
    }
  })();

  if (!(isProd && isServerless && isLinux && tmpAvailable)) {
    return original;
  }

  const tmpDb = path.join(tmpDir, "achoupro.db");

  if (!fs.existsSync(tmpDb)) {
    const candidates = [
      path.join(process.cwd(), "prisma", "deploy.db"),
      path.join(process.cwd(), "deploy.db"),
      path.join(__dirname, "..", "..", "prisma", "deploy.db"),
    ];
    const source = candidates.find((p) => {
      try {
        return fs.existsSync(p);
      } catch {
        return false;
      }
    });
    if (source) {
      try {
        fs.copyFileSync(source, tmpDb);
      } catch (err) {
        console.error("[prisma] Failed to seed /tmp DB:", err);
      }
    } else {
      console.error("[prisma] deploy.db not found in any candidate path");
    }
  }

  return `file:${tmpDb}`;
}

const datasourceUrl = resolveDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    ...(datasourceUrl ? { datasourceUrl } : {}),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
