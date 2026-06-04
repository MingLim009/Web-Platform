import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(10).max(15),
  role: z.enum(["client", "professional"]),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const email = session.user.email.toLowerCase().trim();
  const phone = parsed.data.phone.replace(/\D/g, "");

  await prisma.user.update({
    where: { email },
    data: {
      name: parsed.data.name.trim(),
      phone,
      role: parsed.data.role,
    },
  });

  return NextResponse.json({ ok: true });
}
