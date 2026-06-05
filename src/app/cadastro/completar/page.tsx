import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompletarCadastroForm } from "./CompletarCadastroForm";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Completar cadastro",
};

// Dynamic — must read the session-token cookie at request time.
export const dynamic = "force-dynamic";

// Build a synthetic NextRequest-shaped object that `getToken` can read.
// We do this instead of using `getServerSession(authOptions)` because the
// latter has known issues reading cookies in Next.js 14 App Router with
// next-auth v4. `getToken` reads the JWT cookie directly using the secret.
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
  const token = await getToken({
    req: buildReqFromCookies(),
    secret: process.env.NEXTAUTH_SECRET,
  });

  const email = token?.email as string | undefined;
  if (!email) {
    redirect("/cadastro");
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) redirect("/cadastro");

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
