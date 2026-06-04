import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SobrePageContent } from "@/components/SobrePageContent";
import { getStats } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Sobre o AchouPro",
  description:
    "Conheça a história, missão e valores do AchouPro — a plataforma que conecta clientes a profissionais qualificados em Aracaju.",
};

export const dynamic = "force-dynamic";

export default async function SobrePage() {
  const stats = await getStats();

  return (
    <main className="page-main">
      <Navbar />
      <SobrePageContent stats={stats} />
      <Footer />
    </main>
  );
}
