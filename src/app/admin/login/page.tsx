"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <Link href="/" className="brand login-brand">
          <img src="/logo.svg" alt="AchouPro" />
          <span className="brand-name">
            <span className="achou">Achou</span><span className="pro">Pro</span>
          </span>
        </Link>

        <h1>Painel Administrativo</h1>
        <p className="login-subtitle">Acesse com suas credenciais de administrador</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="contato@magnocorretor.com"
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link href="/" className="login-back">← Voltar ao site</Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
