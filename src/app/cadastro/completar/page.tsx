import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompletarCadastroPanel } from "./CompletarCadastroPanel";

export const metadata: Metadata = {
  title: "Completar cadastro",
};

// Dynamic — never pre-rendered (would cache the no-session state).
export const dynamic = "force-dynamic";

// Renders a client panel that uses useSession() to read the auth state.
// This avoids the known App Router + next-auth v4 server-side cookie quirk
// that previously caused the /cadastro -> /cadastro/completar -> /cadastro
// redirect loop (the "shake").
export default function CompletarCadastroPage() {
  return (
    <main className="page-main">
      <Navbar />
      <section className="cadastro-complete-section">
        <div className="container">
          <CompletarCadastroPanel />
        </div>
      </section>
      <Footer />
    </main>
  );
}
