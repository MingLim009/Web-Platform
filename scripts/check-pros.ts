import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

async function main() {
  const all = await p.professional.findMany({
    select: { slug: true, isActive: true, isPending: true, category: { select: { slug: true } } },
  });
  console.log("Total professionals in DB:", all.length);
  console.log("isActive=true:", all.filter((a) => a.isActive).length);
  console.log("isActive=false:", all.filter((a) => !a.isActive).length);
  console.log("\nAll:");
  for (const a of all) {
    console.log(`  ${a.slug.padEnd(35)} active=${a.isActive} pending=${a.isPending} cat=${a.category.slug}`);
  }
}

main().finally(() => p.$disconnect());
