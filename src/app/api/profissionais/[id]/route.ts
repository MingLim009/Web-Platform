import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// =================== GET (one) ===================
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const pro = await prisma.professional.findUnique({
    where: { id: params.id },
    include: { category: true, city: true, reviews: { where: { isApproved: true } } },
  });
  if (!pro) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  return NextResponse.json({ data: pro });
}

// =================== PUT ===================
const updateSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  title: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  categoryId: z.string().cuid(),
  cityId: z.string().cuid(),
  neighborhood: z.string().max(120).optional(),
  phone: z.string().max(20).optional(),
  whatsapp: z.string().regex(/^\d{10,13}$/),
  email: z.string().email().optional().or(z.literal("")),
  yearsExperience: z.number().min(0).max(70).default(0),
  photoUrl: z.string().url().optional().or(z.literal("")),
  specialties: z.string().optional(),
  isFounder: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  is24h: z.boolean().default(false),
  isDomiciliar: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const slug = slugify(data.slug);

    // Confere se o slug está em uso por outro
    const conflict = await prisma.professional.findFirst({
      where: { slug, NOT: { id: params.id } },
    });
    if (conflict) return NextResponse.json({ error: "Slug já está em uso por outro profissional" }, { status: 409 });

    const pro = await prisma.professional.update({
      where: { id: params.id },
      data: { ...data, slug },
    });

    return NextResponse.json({ data: pro });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message || "Dados inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

// =================== DELETE ===================
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    await prisma.professional.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao remover" }, { status: 500 });
  }
}
