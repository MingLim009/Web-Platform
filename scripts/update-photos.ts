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
  // Electrician examining residential fuse box (verified, replaces 404 8005397)
  { slug: "carlos-silva-eletricista", photoUrl: PEX("32497160") },
  // Industrial worker with grinder (verified, real construction scene)
  { slug: "joao-ferreira-pedreiro", photoUrl: PEX("1216544") },
  // Middle-aged cleaning woman with gloves + bottle (verified, replaces 404
  // 4239092 which was loading as a random chandelier)
  { slug: "ana-costa-diarista", photoUrl: PEX("3768914") },
  // Woman with purple dumbbells, kaboompics studio (replaces 3768916 which
  // showed an exposed woman on an elliptical — client asked for fully clothed)
  { slug: "mariana-oliveira-personal", photoUrl: PEX("4498294") },
  // Professional manicure with nail dryer (replaces 3997389 which showed
  // anonymous black-gloved hands the client flagged)
  { slug: "patricia-lima-manicure", photoUrl: PEX("4677850") },
  // Caregiver in yellow cardigan with elderly man (verified)
  { slug: "sandra-rocha-cuidadora", photoUrl: PEX("7551589") },
  // Smiling businesswoman tech (verified, fully clothed business attire)
  { slug: "daniela-souza-tec-informatica", photoUrl: PEX("1181519") },
  // AC technician inspecting outdoor HVAC unit (replaces a deleted Unsplash
  // photo that had been reassigned to a pair of headphones)
  { slug: "pedro-almeida-ar-condicionado", photoUrl: PEX("32497161") },
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
