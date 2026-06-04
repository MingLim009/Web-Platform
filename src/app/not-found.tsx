import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: "6rem 1rem", textAlign: "center", minHeight: "60vh" }}>
        <h1 style={{ fontSize: "4rem", color: "var(--c-blue)" }}>404</h1>
        <h2>Página não encontrada</h2>
        <p style={{ color: "var(--c-gray-600)", marginBottom: "2rem" }}>
          A página que você procura não existe ou foi movida.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          Voltar à página inicial
        </Link>
      </main>
      <Footer />
    </>
  );
}
