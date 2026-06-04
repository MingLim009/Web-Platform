import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProfessionals } from "@/lib/queries";
import { slugify } from "@/lib/utils";

// =================== GET ===================
export async function GET(req: NextRequest) {
  try {
  const sp = req.nextUrl.searchParams;

  const pros = await getProfessionals({
    search: sp.get("q") || undefined,
    categorySlug: sp.get("categoria") || undefined,
    citySlug: sp.get("cidade") || undefined,
    neighborhood: sp.get("bairro") || undefined,
    minRating: sp.get("rating") ? Number(sp.get("rating")) : undefined,
    isFounder: sp.get("fundador") === "1",
    isVerified: sp.get("verificado") === "1",
    is24h: sp.get("24h") === "1",
    isDomiciliar: sp.get("domiciliar") === "1",
    take: sp.get("limit") ? Number(sp.get("limit")) : 50,
    skip: sp.get("offset") ? Number(sp.get("offset")) : 0,
  });

  return NextResponse.json({ data: pros, count: pros.length });
  } catch (e) {
    console.error("GET /api/profissionais", e);
    return NextResponse.json(
      { error: "Erro ao buscar profissionais. Verifique o banco de dados.", data: [], count: 0 },
      { status: 500 }
    );
  }
}

// =================== POST ===================
const createSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/, "slug inválido"),
  title: z.string().max(200).optional().default(""),
  bio: z.string().max(2000).optional().default(""),
  categoryId: z.string().cuid(),
  cityId: z.string().cuid(),
  neighborhood: z.string().max(120).optional().default(""),
  phone: z.string().max(20).optional().default(""),
  whatsapp: z.string().regex(/^\d{10,13}$/, "WhatsApp inválido (somente números, 10-13 dígitos)"),
  email: z.string().email().optional().or(z.literal("")),
  yearsExperience: z.number().min(0).max(70).default(0),
  photoUrl: z.string().url().optional().or(z.literal("")),
  specialties: z.string().optional().default("[]"),
  isFounder: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  is24h: z.boolean().default(false),
  isDomiciliar: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const data = createSchema.parse(body);

    const slug = data.slug || slugify(data.name);

    const existing = await prisma.professional.findUnique({ where: { slug } });
    if (existing) return NextResponse.json({ error: "Slug já existe. Use outro." }, { status: 409 });

    const pro = await prisma.professional.create({
      data: { ...data, slug },
    });

    return NextResponse.json({ data: pro }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message || "Dados inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
