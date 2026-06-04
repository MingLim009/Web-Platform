import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos. Verifique nome, e-mail e senha." }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Este e-mail já está cadastrado." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    await prisma.user.create({
      data: {
        email,
        name: parsed.data.name.trim(),
        passwordHash,
        role: "client",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("cadastro/registrar", e);
    return NextResponse.json({ error: "Erro ao criar conta. Tente novamente." }, { status: 500 });
  }
}
