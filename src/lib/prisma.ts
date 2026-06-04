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
 */
function resolveDatabaseUrl(): string | undefined {
  const original = process.env.DATABASE_URL;
  if (!original || !original.startsWith("file:")) return original;
  if (!process.env.VERCEL && !process.env.LAMBDA_TASK_ROOT) return original;

  const tmpDb = "/tmp/achoupro.db";

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
