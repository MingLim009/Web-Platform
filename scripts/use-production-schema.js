#!/usr/bin/env node
/**
 * AchouPro — Troca o schema do Prisma para PostgreSQL (produção)
 *
 * Uso:
 *   node scripts/use-production-schema.js          # ativa Postgres
 *   node scripts/use-production-schema.js --revert # volta para SQLite (dev)
 *
 * O que faz:
 *   1) Faz backup de schema.prisma -> schema.dev.prisma (se ainda não existir)
 *   2) Copia schema.production.prisma -> schema.prisma
 *
 * Depois disso:
 *   - Configure DATABASE_URL apontando para o Postgres
 *   - Rode: npx prisma migrate deploy
 *   - Rode: npx prisma generate
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const main = path.join(root, "prisma", "schema.prisma");
const dev = path.join(root, "prisma", "schema.dev.prisma");
const prod = path.join(root, "prisma", "schema.production.prisma");

const revert = process.argv.includes("--revert");

if (revert) {
  if (!fs.existsSync(dev)) {
    console.error("[ERRO] Não encontrei schema.dev.prisma — não há o que reverter.");
    process.exit(1);
  }
  fs.copyFileSync(dev, main);
  console.log("[OK] schema.prisma agora usa SQLite (dev).");
  process.exit(0);
}

if (!fs.existsSync(prod)) {
  console.error("[ERRO] Não encontrei prisma/schema.production.prisma");
  process.exit(1);
}

if (!fs.existsSync(dev)) {
  fs.copyFileSync(main, dev);
  console.log("[OK] Backup criado: schema.dev.prisma");
}

fs.copyFileSync(prod, main);
console.log("[OK] schema.prisma agora usa PostgreSQL (produção).");
console.log("");
console.log("Próximos passos:");
console.log("  1) Configure DATABASE_URL no .env apontando para o Postgres");
console.log("  2) npx prisma migrate deploy");
console.log("  3) npx prisma generate");
console.log("  4) npm run db:seed (opcional, para popular dados iniciais)");
