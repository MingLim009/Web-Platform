"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function CompletarCadastroForm({
  defaultName,
  defaultPhone,
  defaultRole,
}: {
  defaultName: string;
  defaultPhone: string;
  defaultRole: "client" | "professional";
}) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState(defaultPhone);
  const [role, setRole] = useState<"client" | "professional">(
    defaultRole === "client" ? "client" : "professional"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/cadastro/completar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, role }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Erro ao salvar. Tente novamente.");
      setLoading(false);
      return;
    }

    if (role === "professional") {
      router.push("/#cadastro");
    } else {
      router.push("/buscar");
    }
    router.refresh();
  }

  return (
    <form className="cadastro-complete-form" onSubmit={handleSubmit}>
      <label>
        Nome completo
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        WhatsApp (com DDD)
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="79999999999"
          required
        />
      </label>

      <fieldset className="cadastro-role-field">
        <legend>Tipo de conta</legend>
        <label className="cadastro-role-option">
          <input
            type="radio"
            name="role"
            checked={role === "client"}
            onChange={() => setRole("client")}
          />
          Sou cliente — quero contratar profissionais
        </label>
        <label className="cadastro-role-option">
          <input
            type="radio"
            name="role"
            checked={role === "professional"}
            onChange={() => setRole("professional")}
          />
          Sou profissional — quero divulgar meus serviços
        </label>
      </fieldset>

      {error && <p className="cadastro-error">{error}</p>}

      <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
        {loading ? "Salvando..." : "Finalizar cadastro"}
      </button>

      <Link href="/" className="cadastro-skip">
        Voltar ao início
      </Link>
    </form>
  );
}
