import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompletarCadastroForm } from "./CompletarCadastroForm";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Completar cadastro",
};

export default async function CompletarCadastroPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/cadastro");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
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
