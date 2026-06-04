import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  isApproved: z.boolean().optional(),
  proResponse: z.string().max(1000).optional(),
});

// =================== PATCH (aprovar/despublicar/resposta) ===================
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const data = patchSchema.parse(body);

    const review = await prisma.review.update({
      where: { id: params.id },
      data,
    });

    // Recalcula a média e o total de avaliações aprovadas
    await recalcProRating(review.professionalId);

    return NextResponse.json({ data: review });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}

// =================== DELETE ===================
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const review = await prisma.review.delete({ where: { id: params.id } });
    await recalcProRating(review.professionalId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}

async function recalcProRating(professionalId: string) {
  const reviews = await prisma.review.findMany({
    where: { professionalId, isApproved: true },
    select: { rating: true },
  });

  const reviewCount = reviews.length;
  const rating =
    reviewCount > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviewCount : 0;

  await prisma.professional.update({
    where: { id: professionalId },
    data: { rating, reviewCount },
  });
}
