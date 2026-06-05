import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function buildReq() {
  const jar = cookies();
  const cookieHeader = jar
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  return {
    headers: { cookie: cookieHeader },
    cookies: Object.fromEntries(jar.getAll().map((c) => [c.name, c.value])),
  } as unknown as Parameters<typeof getToken>[0]["req"];
}

export async function GET() {
  const req = buildReq();
  const secret = process.env.NEXTAUTH_SECRET;
  // Try both cookie names — /api/auth/session can read either, so we do too.
  const t =
    (await getToken({ req, secret, secureCookie: true }).catch(() => null)) ||
    (await getToken({ req, secret, secureCookie: false }).catch(() => null));

  const email = (t?.email as string | undefined)?.toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    phone: user.phone || "",
    role: user.role === "client" ? "client" : "professional",
  });
}
