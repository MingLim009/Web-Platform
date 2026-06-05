import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompletarCadastroForm } from "./CompletarCadastroForm";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Completar cadastro",
};

// Read JWT directly at request time — must be dynamic so we never serve a
// pre-rendered (no-session) version that would bounce signed-in users back.
export const dynamic = "force-dynamic";

function buildReqFromCookies() {
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

export default async function CompletarCadastroPage() {
  // Try BOTH cookie names — production uses `__Secure-` prefix on HTTPS, dev
  // uses the plain name. We attempt secure first, then fall back.
  const reqLike = buildReqFromCookies();
  const secret = process.env.NEXTAUTH_SECRET;

  const tokenSecure = await getToken({
    req: reqLike,
    secret,
    secureCookie: true,
  }).catch(() => null);

  const tokenPlain = tokenSecure
    ? null
    : await getToken({
        req: reqLike,
        secret,
        secureCookie: false,
      }).catch(() => null);

  const token = tokenSecure || tokenPlain;
  const email = (token?.email as string | undefined)?.toLowerCase();

  const user = email
    ? await prisma.user.findUnique({ where: { email } }).catch(() => null)
    : null;

  // No session → render a graceful fallback panel, NEVER redirect.
  // A redirect would loop back to /cadastro which used to re-open the modal,
  // causing the "shake" the user reported.
  if (!user) {
    return (
      <main className="page-main">
        <Navbar />
        <section className="cadastro-complete-section">
          <div className="container">
            <div className="cadastro-complete-card cadastro-need-login">
              <h1>Sessão expirada</h1>
              <p>
                Você precisa entrar para completar seu cadastro. Volte para a
                tela de login para continuar.
              </p>
              <Link href="/cadastro" className="btn btn-primary">
                Voltar e entrar
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="page-main">
      <Navbar />
      <section className="cadastro-complete-section">
        <div className="container">
          <div className="cadastro-complete-card">
            <h1>Quase lá, {user.name.split(" ")[0]}!</h1>
            <p>Complete seu perfil para usar o AchouPro.</p>
            <CompletarCadastroForm
              defaultName={user.name}
              defaultPhone={user.phone || ""}
              defaultRole={user.role === "client" ? "client" : "professional"}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
