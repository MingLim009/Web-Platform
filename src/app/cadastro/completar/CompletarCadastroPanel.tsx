"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CompletarCadastroForm } from "./CompletarCadastroForm";

// Client-side data fetcher. We rely on useSession (works reliably in client
// components) and fetch the user record from a small API. This sidesteps the
// known App Router + next-auth v4 server-side cookie reading limitation that
// was the root cause of the /cadastro/completar redirect loop ("shake").
type Me = {
  name: string;
  phone: string;
  role: "client" | "professional";
};

export function CompletarCadastroPanel() {
  const { data: session, status } = useSession();
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    fetch("/api/cadastro/me", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setMe(data);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading") {
    return (
      <div className="cadastro-complete-card">
        <h1>Carregando…</h1>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="cadastro-complete-card cadastro-need-login">
        <h1>Sessão expirada</h1>
        <p>
          Você precisa entrar para completar seu cadastro. Volte para a tela de
          login para continuar.
        </p>
        <Link href="/cadastro" className="btn btn-primary">
          Voltar e entrar
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cadastro-complete-card">
        <h1>Erro ao carregar perfil</h1>
        <p>{error}</p>
        <Link href="/cadastro" className="btn btn-primary">
          Voltar
        </Link>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="cadastro-complete-card">
        <h1>Carregando seu perfil…</h1>
      </div>
    );
  }

  const firstName = (me.name || session?.user?.name || "amigo").split(" ")[0];

  return (
    <div className="cadastro-complete-card">
      <h1>Quase lá, {firstName}!</h1>
      <p>Complete seu perfil para usar o AchouPro.</p>
      <CompletarCadastroForm
        defaultName={me.name}
        defaultPhone={me.phone || ""}
        defaultRole={me.role === "client" ? "client" : "professional"}
      />
    </div>
  );
}
