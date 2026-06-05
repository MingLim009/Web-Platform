/**
 * One-shot script: update women professionals' photoUrl in BOTH databases
 * (dev.db and deploy.db) without re-running the full seed.
 *
 * Usage:
 *   $env:DATABASE_URL="file:./dev.db"; npx tsx scripts/update-photos.ts
 *   $env:DATABASE_URL="file:./prisma/deploy.db"; npx tsx scripts/update-photos.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UPDATES: Array<{ slug: string; photoUrl: string }> = [
  {
    slug: "ana-costa-diarista",
    photoUrl: "https://loremflickr.com/600/800/woman,smile,brazilian,professional/all?lock=101",
  },
  {
    slug: "mariana-oliveira-personal",
    photoUrl: "https://loremflickr.com/600/800/woman,fitness,trainer,gym/all?lock=102",
  },
  {
    slug: "patricia-lima-manicure",
    photoUrl: "https://loremflickr.com/600/800/woman,manicure,nails,beauty/all?lock=103",
  },
  {
    slug: "sandra-rocha-cuidadora",
    photoUrl: "https://loremflickr.com/600/800/woman,nurse,care,brazilian/all?lock=104",
  },
  {
    slug: "daniela-souza-tec-informatica",
    photoUrl: "https://loremflickr.com/600/800/woman,laptop,technology,coding/all?lock=105",
  },
];

async function main() {
  console.log(`Updating photos in DATABASE_URL=${process.env.DATABASE_URL}`);
  for (const u of UPDATES) {
    try {
      const r = await prisma.professional.update({
        where: { slug: u.slug },
        data: { photoUrl: u.photoUrl },
      });
      console.log(`  ✓ ${r.name} -> ${u.photoUrl.substring(0, 60)}...`);
    } catch (e) {
      console.warn(`  ✗ ${u.slug}: ${String(e).substring(0, 80)}`);
    }
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
