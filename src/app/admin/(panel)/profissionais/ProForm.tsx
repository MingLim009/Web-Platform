"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category, City, Professional } from "@prisma/client";
import { slugify } from "@/lib/utils";

type Props = {
  categories: Category[];
  cities: City[];
  mode: "create" | "edit";
  initial?: Professional;
};

/** SQLite stores JSON as string; PostgreSQL uses Prisma Json — always edit as text. */
function specialtiesToInput(value: unknown): string {
  if (value == null || value === "") return "[]";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

export function ProForm({ categories, cities, mode, initial }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: initial?.name || "",
    slug: initial?.slug || "",
    title: initial?.title || "",
    bio: initial?.bio || "",
    categoryId: initial?.categoryId || categories[0]?.id || "",
    cityId: initial?.cityId || cities[0]?.id || "",
    neighborhood: initial?.neighborhood || "",
    phone: initial?.phone || "",
    whatsapp: initial?.whatsapp || "",
    email: initial?.email || "",
    yearsExperience: initial?.yearsExperience || 0,
    photoUrl: initial?.photoUrl || "",
    specialties: specialtiesToInput(initial?.specialties),
    isFounder: initial?.isFounder || false,
    isVerified: initial?.isVerified || false,
    is24h: initial?.is24h || false,
    isDomiciliar: initial?.isDomiciliar || false,
    isActive: initial?.isActive ?? true,
  });

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleNameChange(value: string) {
    setField("name", value);
    if (mode === "create" && !form.slug) {
      setField("slug", slugify(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const url = mode === "create" ? "/api/profissionais" : `/api/profissionais/${initial?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao salvar");
      }

      router.push("/admin/profissionais");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="pro-form">
      <div className="form-grid">
        <label>
          Nome completo *
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            maxLength={120}
          />
        </label>

        <label>
          Slug (URL) *
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setField("slug", slugify(e.target.value))}
            required
            pattern="[a-z0-9-]+"
            placeholder="ex: carlos-silva-eletricista"
          />
        </label>

        <label className="col-span-2">
          Título profissional
          <input
            type="text"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="ex: Eletricista Residencial e Predial"
          />
        </label>

        <label className="col-span-2">
          Bio / Apresentação
          <textarea
            value={form.bio}
            onChange={(e) => setField("bio", e.target.value)}
            rows={4}
            maxLength={2000}
            placeholder="Descrição completa do profissional, especialidades, anos de experiência..."
          />
        </label>

        <label>
          Categoria *
          <select value={form.categoryId} onChange={(e) => setField("categoryId", e.target.value)} required>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label>
          Cidade *
          <select value={form.cityId} onChange={(e) => setField("cityId", e.target.value)} required>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}, {c.state}</option>
            ))}
          </select>
        </label>

        <label>
          Bairro
          <input
            type="text"
            value={form.neighborhood}
            onChange={(e) => setField("neighborhood", e.target.value)}
            placeholder="ex: Atalaia"
          />
        </label>

        <label>
          Anos de experiência
          <input
            type="number"
            min={0}
            max={70}
            value={form.yearsExperience}
            onChange={(e) => setField("yearsExperience", Number(e.target.value))}
          />
        </label>

        <label>
          WhatsApp * <small>(formato 5579999999999)</small>
          <input
            type="text"
            value={form.whatsapp}
            onChange={(e) => setField("whatsapp", e.target.value.replace(/\D/g, ""))}
            required
            pattern="[0-9]{12,13}"
            placeholder="5579999515563"
          />
        </label>

        <label>
          Telefone fixo
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value.replace(/\D/g, ""))}
            placeholder="opcional"
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
          />
        </label>

        <label>
          Foto principal (URL)
          <input
            type="url"
            value={form.photoUrl}
            onChange={(e) => setField("photoUrl", e.target.value)}
            placeholder="https://..."
          />
        </label>

        <label className="col-span-2">
          Especialidades (JSON array)
          <input
            type="text"
            value={form.specialties}
            onChange={(e) => setField("specialties", e.target.value)}
            placeholder='["Instalação residencial","Energia solar"]'
          />
        </label>

        <fieldset className="col-span-2 selo-group">
          <legend>Selos e status</legend>
          <label className="check"><input type="checkbox" checked={form.isFounder} onChange={(e) => setField("isFounder", e.target.checked)} /> ⭐ Selo Fundador 2026</label>
          <label className="check"><input type="checkbox" checked={form.isVerified} onChange={(e) => setField("isVerified", e.target.checked)} /> ✓ Verificado</label>
          <label className="check"><input type="checkbox" checked={form.is24h} onChange={(e) => setField("is24h", e.target.checked)} /> 🕐 Atendimento 24h</label>
          <label className="check"><input type="checkbox" checked={form.isDomiciliar} onChange={(e) => setField("isDomiciliar", e.target.checked)} /> 🏠 Atendimento domiciliar</label>
          <label className="check"><input type="checkbox" checked={form.isActive} onChange={(e) => setField("isActive", e.target.checked)} /> 🟢 Perfil ativo (visível no site)</label>
        </fieldset>
      </div>

      {error && <p style={{ color: "#dc2626", padding: ".75rem 1rem", background: "#fee2e2", borderRadius: 8 }}>{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Salvando..." : mode === "create" ? "Criar profissional" : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}
