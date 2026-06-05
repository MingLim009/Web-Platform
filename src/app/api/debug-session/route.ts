import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const jar = cookies();
  const hdr = headers();

  const allCookies = jar.getAll().map((c) => ({
    name: c.name,
    valuePreview: c.value.substring(0, 20) + "...",
  }));

  const cookieHeader = jar
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const reqLike = {
    headers: { cookie: cookieHeader },
    cookies: Object.fromEntries(jar.getAll().map((c) => [c.name, c.value])),
  };

  const tokenResult = await getToken({
    req: reqLike as unknown as Parameters<typeof getToken>[0]["req"],
    secret: process.env.NEXTAUTH_SECRET,
  }).catch((e) => ({ error: String(e) }));

  const sessionResult = await getServerSession(authOptions).catch((e) => ({
    error: String(e),
  }));

  return NextResponse.json({
    env: {
      hasSecret: Boolean(process.env.NEXTAUTH_SECRET),
      secretPreview: process.env.NEXTAUTH_SECRET?.substring(0, 6) + "...",
      nextauthUrl: process.env.NEXTAUTH_URL,
      vercel: process.env.VERCEL,
      nodeEnv: process.env.NODE_ENV,
    },
    cookies: allCookies,
    headers: {
      cookieHeader: cookieHeader.substring(0, 100) + "...",
      host: hdr.get("host"),
      xForwardedProto: hdr.get("x-forwarded-proto"),
      xForwardedHost: hdr.get("x-forwarded-host"),
    },
    getToken: tokenResult,
    getServerSession: sessionResult,
  });
}
