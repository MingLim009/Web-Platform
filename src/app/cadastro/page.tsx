import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CadastroPageClient } from "./CadastroPageClient";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Cadastre-se no AchouPro com Google ou acesse o painel administrativo.",
};

export default function CadastroPage() {
  return (
    <main className="page-main">
      <Navbar />
      <CadastroPageClient />
      <Footer />
    </main>
  );
}
