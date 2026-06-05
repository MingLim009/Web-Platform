/**
 * AchouPro - Seed de dados iniciais
 *
 * Cria:
 * - Admin Magno Carvalho
 * - 14 categorias
 * - 4 cidades de Sergipe
 * - 10 profissionais fictícios (conforme aprovado pelo cliente)
 * - Avaliações de exemplo
 *
 * Rodar: npm run prisma:seed
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ----------------------- CATEGORIAS -----------------------
const CATEGORIES = [
  { slug: "eletricista", name: "Eletricista", icon: "bolt", color: "#FF6A00", order: 1 },
  { slug: "diarista", name: "Diarista", icon: "broom", color: "#0077FF", order: 2 },
  { slug: "pedreiro", name: "Pedreiro / Construção", icon: "trowel", color: "#FF6A00", order: 3 },
  { slug: "personal-trainer", name: "Personal Trainer", icon: "dumbbell", color: "#28C76F", order: 4 },
  { slug: "encanador", name: "Encanador", icon: "wrench", color: "#0077FF", order: 5 },
  { slug: "manicure", name: "Manicure & Pedicure", icon: "sparkles", color: "#FF6A00", order: 6 },
  { slug: "ar-condicionado", name: "Téc. Ar Condicionado", icon: "snowflake", color: "#0077FF", order: 7 },
  { slug: "cuidador", name: "Cuidador(a) de Idosos", icon: "heart", color: "#28C76F", order: 8 },
  { slug: "mecanico", name: "Mecânico Automotivo", icon: "car", color: "#FF6A00", order: 9 },
  { slug: "tec-informatica", name: "Téc. de Informática", icon: "laptop", color: "#0077FF", order: 10 },
  { slug: "pintor", name: "Pintor", icon: "paint-roller", color: "#FF6A00", order: 11 },
  { slug: "jardineiro", name: "Jardineiro", icon: "leaf", color: "#28C76F", order: 12 },
  { slug: "cabeleireiro", name: "Cabeleireiro(a)", icon: "scissors", color: "#FF6A00", order: 13 },
  { slug: "fretista", name: "Fretes & Mudanças", icon: "truck", color: "#0077FF", order: 14 },
];

// ----------------------- CIDADES -----------------------
const CITIES = [
  { slug: "aracaju", name: "Aracaju", state: "SE" },
  { slug: "barra-dos-coqueiros", name: "Barra dos Coqueiros", state: "SE" },
  { slug: "nossa-senhora-do-socorro", name: "Nossa Senhora do Socorro", state: "SE" },
  { slug: "sao-cristovao", name: "São Cristóvão", state: "SE" },
];

// ----------------------- 10 PROFISSIONAIS FICTÍCIOS -----------------------
const PROFESSIONALS = [
  {
    slug: "carlos-silva-eletricista",
    name: "Carlos Silva",
    title: "Eletricista Residencial e Predial",
    categorySlug: "eletricista",
    citySlug: "aracaju",
    neighborhood: "Atalaia",
    bio: "Eletricista com 12 anos de experiência em instalações residenciais e prediais. Especialista em quadros de força, energia solar fotovoltaica e diagnóstico de problemas elétricos. Atendimento rápido e seguro.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    email: "carlos.silva@email.com",
    yearsExperience: 12,
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&auto=format&fit=crop&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565608087341-404b25492fee?w=800&auto=format&fit=crop&q=80",
    ]),
    specialties: JSON.stringify(["Instalação residencial", "Energia solar", "Quadro de força", "Diagnóstico"]),
    workingHours: JSON.stringify({
      monday: "08:00-18:00",
      tuesday: "08:00-18:00",
      wednesday: "08:00-18:00",
      thursday: "08:00-18:00",
      friday: "08:00-18:00",
      saturday: "08:00-12:00",
      sunday: "fechado",
    }),
    isFounder: true,
    isVerified: true,
    is24h: false,
    isDomiciliar: true,
    rating: 5.0,
    reviewCount: 48,
  },
  {
    slug: "ana-costa-diarista",
    name: "Ana Costa",
    title: "Diarista e Faxineira",
    categorySlug: "diarista",
    citySlug: "aracaju",
    neighborhood: "Farolândia",
    bio: "Diarista profissional com 8 anos de experiência. Trabalho limpeza pesada, faxina, organização e passadoria. Atendo residências e pequenos comércios.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 8,
    photoUrl: "https://loremflickr.com/600/800/woman,smile,brazilian,professional/all?lock=101",
    specialties: JSON.stringify(["Faxina geral", "Limpeza pesada", "Passadoria", "Organização"]),
    isFounder: true,
    isVerified: true,
    isDomiciliar: true,
    rating: 4.9,
    reviewCount: 64,
  },
  {
    slug: "joao-ferreira-pedreiro",
    name: "João Ferreira",
    title: "Pedreiro / Mestre de Obras",
    categorySlug: "pedreiro",
    citySlug: "sao-cristovao",
    neighborhood: "Centro",
    bio: "Mestre de obras com 15 anos de experiência. Construção do zero, reformas, alvenaria, reboco, contrapiso, acabamentos. Mão-de-obra qualificada e prazo cumprido.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 15,
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&auto=format&fit=crop&q=80",
    specialties: JSON.stringify(["Construção do zero", "Reformas", "Alvenaria", "Acabamento"]),
    isFounder: true,
    isVerified: true,
    rating: 5.0,
    reviewCount: 55,
  },
  {
    slug: "mariana-oliveira-personal",
    name: "Mariana Oliveira",
    title: "Personal Trainer",
    categorySlug: "personal-trainer",
    citySlug: "barra-dos-coqueiros",
    neighborhood: "Atalaia Nova",
    bio: "Personal Trainer formada em Educação Física com 6 anos de experiência. Treinos personalizados, emagrecimento, hipertrofia e condicionamento físico. CREF 12345-G/SE.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 6,
    photoUrl: "https://loremflickr.com/600/800/woman,fitness,trainer,gym/all?lock=102",
    specialties: JSON.stringify(["Emagrecimento", "Hipertrofia", "Condicionamento", "Treinos online"]),
    isFounder: false,
    isVerified: true,
    isDomiciliar: true,
    rating: 5.0,
    reviewCount: 27,
  },
  {
    slug: "ricardo-mendes-encanador",
    name: "Ricardo Mendes",
    title: "Encanador",
    categorySlug: "encanador",
    citySlug: "aracaju",
    neighborhood: "Centro",
    bio: "Encanador com 9 anos de experiência. Vazamentos, desentupimento, instalação hidráulica, troca de tubulação. Atendimento ágil e orçamento sem compromisso.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 9,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    specialties: JSON.stringify(["Vazamentos", "Desentupimento", "Instalação hidráulica"]),
    isVerified: true,
    rating: 4.8,
    reviewCount: 35,
  },
  {
    slug: "patricia-lima-manicure",
    name: "Patrícia Lima",
    title: "Manicure & Pedicure",
    categorySlug: "manicure",
    citySlug: "aracaju",
    neighborhood: "Grageru",
    bio: "Manicure e pedicure há 7 anos. Especialista em unhas em gel, alongamento, decoração e nail art. Atendimento domiciliar com todos os materiais esterilizados.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 7,
    photoUrl: "https://loremflickr.com/600/800/woman,manicure,nails,beauty/all?lock=103",
    specialties: JSON.stringify(["Unhas em gel", "Alongamento", "Nail art", "Pedicure"]),
    isFounder: true,
    isVerified: true,
    isDomiciliar: true,
    rating: 4.9,
    reviewCount: 52,
  },
  {
    slug: "pedro-almeida-ar-condicionado",
    name: "Pedro Almeida",
    title: "Técnico de Ar Condicionado",
    categorySlug: "ar-condicionado",
    citySlug: "aracaju",
    neighborhood: "Coroa do Meio",
    bio: "Técnico em refrigeração com 5 anos de experiência. Instalação, manutenção preventiva e corretiva de ar condicionado split. Conserto de geladeira e freezer.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 5,
    photoUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80",
    specialties: JSON.stringify(["Instalação split", "Manutenção", "Geladeira", "Freezer"]),
    isVerified: true,
    isDomiciliar: true,
    rating: 4.8,
    reviewCount: 19,
  },
  {
    slug: "sandra-rocha-cuidadora",
    name: "Sandra Rocha",
    title: "Cuidadora de Idosos",
    categorySlug: "cuidador",
    citySlug: "nossa-senhora-do-socorro",
    neighborhood: "Centro",
    bio: "Cuidadora de idosos com 11 anos de experiência. Curso técnico em enfermagem. Acompanhamento 24h, administração de medicamentos, higiene pessoal e companhia.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 11,
    photoUrl: "https://loremflickr.com/600/800/woman,nurse,care,brazilian/all?lock=104",
    specialties: JSON.stringify(["Plantão 24h", "Acamados", "Pós-operatório", "Alzheimer"]),
    isVerified: true,
    is24h: true,
    isDomiciliar: true,
    rating: 5.0,
    reviewCount: 22,
  },
  {
    slug: "bruno-santos-mecanico",
    name: "Bruno Santos",
    title: "Mecânico Automotivo",
    categorySlug: "mecanico",
    citySlug: "aracaju",
    neighborhood: "Jardins",
    bio: "Mecânico automotivo com 18 anos de experiência. Especialista em motor, suspensão, freios e injeção eletrônica. Atendimento 24h para emergências e socorro mecânico.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 18,
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
    specialties: JSON.stringify(["Motor", "Injeção eletrônica", "Freios", "Suspensão", "Socorro 24h"]),
    isVerified: true,
    is24h: true,
    rating: 4.7,
    reviewCount: 38,
  },
  {
    slug: "daniela-souza-tec-informatica",
    name: "Daniela Souza",
    title: "Técnica de Informática",
    categorySlug: "tec-informatica",
    citySlug: "aracaju",
    neighborhood: "Inácio Barbosa",
    bio: "Técnica em informática com 4 anos de experiência. Manutenção de computadores e notebooks, formatação, instalação de programas, recuperação de dados e configuração de redes.",
    phone: "5579999515563",
    whatsapp: "5579999515563",
    yearsExperience: 4,
    photoUrl: "https://loremflickr.com/600/800/woman,laptop,technology,coding/all?lock=105",
    specialties: JSON.stringify(["Formatação", "Manutenção", "Redes Wi-Fi", "Recuperação de dados"]),
    isVerified: true,
    isDomiciliar: true,
    rating: 4.8,
    reviewCount: 29,
  },
];

// ----------------------- AVALIAÇÕES EXEMPLO -----------------------
const SAMPLE_REVIEWS: Record<string, Array<{ name: string; rating: number; comment: string; response?: string }>> = {
  "carlos-silva-eletricista": [
    {
      name: "Joana M.",
      rating: 5,
      comment: "Atendimento impecável! Chegou no horário, identificou o problema rapidamente e ainda explicou tudo. Recomendo demais!",
      response: "Muito obrigado, Joana! Foi um prazer atender você.",
    },
    {
      name: "Roberto A.",
      rating: 5,
      comment: "Excelente eletricista. Resolveu um problema antigo de quadro que outros não conseguiram. Profissional sério.",
    },
    {
      name: "Patrícia S.",
      rating: 5,
      comment: "Instalei sistema solar com o Carlos e ficou perfeito. Preço justo e trabalho de qualidade.",
    },
  ],
  "ana-costa-diarista": [
    {
      name: "Mariana R.",
      rating: 5,
      comment: "Ana é simplesmente maravilhosa! Limpeza impecável e muito dedicada. Já é da família!",
    },
    {
      name: "Lucas P.",
      rating: 5,
      comment: "Pontual, organizada e caprichosa. Recomendo de olhos fechados.",
    },
  ],
  "mariana-oliveira-personal": [
    {
      name: "Felipe G.",
      rating: 5,
      comment: "Perdi 12kg em 6 meses treinando com a Mari! Treino divertido e ela é super atenciosa.",
    },
  ],
};

// =========================================================
// MAIN
// =========================================================
async function main() {
  console.log("🌱 Iniciando seed AchouPro...");

  // ===== Admin =====
  const adminEmail = process.env.ADMIN_EMAIL || "contato@magnocorretor.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "MagnoAdmin@2026";
  const adminName = process.env.ADMIN_NAME || "Magno Carvalho";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: adminName },
    create: {
      email: adminEmail,
      passwordHash,
      name: adminName,
      role: "admin",
    },
  });
  console.log(`✓ Admin criado/atualizado: ${admin.email}`);

  // ===== Categorias =====
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`✓ ${CATEGORIES.length} categorias`);

  // ===== Cidades =====
  for (const city of CITIES) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: city,
      create: city,
    });
  }
  console.log(`✓ ${CITIES.length} cidades`);

  // ===== Profissionais =====
  for (const pro of PROFESSIONALS) {
    const category = await prisma.category.findUnique({ where: { slug: pro.categorySlug } });
    const city = await prisma.city.findUnique({ where: { slug: pro.citySlug } });

    if (!category || !city) {
      console.error(`✗ Categoria ou cidade não encontrada para ${pro.name}`);
      continue;
    }

    const { categorySlug, citySlug, ...proData } = pro;

    await prisma.professional.upsert({
      where: { slug: pro.slug },
      update: {
        ...proData,
        categoryId: category.id,
        cityId: city.id,
      },
      create: {
        ...proData,
        categoryId: category.id,
        cityId: city.id,
      },
    });
  }
  console.log(`✓ ${PROFESSIONALS.length} profissionais`);

  // ===== Avaliações =====
  for (const [slug, reviews] of Object.entries(SAMPLE_REVIEWS)) {
    const pro = await prisma.professional.findUnique({ where: { slug } });
    if (!pro) continue;

    // Apaga antigas
    await prisma.review.deleteMany({ where: { professionalId: pro.id } });

    for (const r of reviews) {
      await prisma.review.create({
        data: {
          professionalId: pro.id,
          reviewerName: r.name,
          rating: r.rating,
          comment: r.comment,
          proResponse: r.response,
          isApproved: true,
          isPublic: true,
        },
      });
    }
  }
  console.log(`✓ Avaliações de exemplo`);

  console.log("\n✅ Seed completo!");
  console.log("\n📧 Login admin:");
  console.log(`   E-mail: ${adminEmail}`);
  console.log(`   Senha:  ${adminPassword}`);
  console.log("\n🌐 Rode: npm run dev  →  http://localhost:3000");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
