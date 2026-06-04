import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.object({
  professionalId: z.string().cuid(),
  reviewerName: z.string().min(2).max(60),
  reviewerEmail: z.string().email().optional().or(z.literal("")),
  reviewerPhone: z.string().max(20).optional().or(z.literal("")),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(1000),
});

// =================== POST (público — qualquer um pode enviar) ===================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = reviewSchema.parse(body);

    const pro = await prisma.professional.findUnique({ where: { id: data.professionalId } });
    if (!pro) return NextResponse.json({ error: "Profissional não encontrado" }, { status: 404 });

    const review = await prisma.review.create({
      data: {
        ...data,
        isApproved: false, // requer aprovação do admin
      },
    });

    return NextResponse.json({ data: review }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message || "Dados inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao enviar avaliação" }, { status: 500 });
  }
}
