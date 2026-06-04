"use client";

import { useEffect } from "react";
import { useCadastro } from "@/components/CadastroProvider";

export function CadastroPageClient() {
  const { openCadastro } = useCadastro();

  useEffect(() => {
    openCadastro();
  }, [openCadastro]);

  return (
    <section className="cadastro-page-placeholder">
      <div className="container">
        <h1>Cadastro</h1>
        <p>Use o formulário na tela para criar sua conta com Google.</p>
      </div>
    </section>
  );
}
