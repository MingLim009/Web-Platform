/**
 * One-shot script: update professionals' photoUrl with profession-matched
 * Pexels stock photos (verified visually for each role).
 *
 * Usage:
 *   $env:DATABASE_URL="file:./prisma/deploy.db"; npx tsx scripts/update-photos.ts
 *   $env:DATABASE_URL="file:./dev.db";          npx tsx scripts/update-photos.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PEX = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop`;

const UPDATES: Array<{ slug: string; photoUrl: string }> = [
  // Electrician (man with tools, not businessman)
  { slug: "carlos-silva-eletricista", photoUrl: PEX("8005397") },
  // Mason / construction worker (not a guy in a sweater)
  { slug: "joao-ferreira-pedreiro", photoUrl: PEX("1216544") },
  // Diarista / house cleaner (cleaning woman, not a statue)
  { slug: "ana-costa-diarista", photoUrl: PEX("4239092") },
  // Personal trainer woman
  { slug: "mariana-oliveira-personal", photoUrl: PEX("3768916") },
  // Manicure scene (not a vintage salon)
  { slug: "patricia-lima-manicure", photoUrl: PEX("3997389") },
  // Caregiver with elderly
  { slug: "sandra-rocha-cuidadora", photoUrl: PEX("7551589") },
  // Tech / programmer woman
  { slug: "daniela-souza-tec-informatica", photoUrl: PEX("1181519") },
];

async function main() {
  console.log(`Updating photos in DATABASE_URL=${process.env.DATABASE_URL}`);
  for (const u of UPDATES) {
    try {
      const r = await prisma.professional.update({
        where: { slug: u.slug },
        data: { photoUrl: u.photoUrl },
      });
      console.log(`  ✓ ${r.name} -> ${u.photoUrl.substring(0, 70)}...`);
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
