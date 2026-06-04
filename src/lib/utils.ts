/**
 * Utilitários gerais do AchouPro
 */

export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "AchouPro",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5579999515563",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/achouprofissional",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || "https://www.facebook.com/share/1EMqc22Nzk/",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@achoupro.com",
  tagline: "Encontre o profissional certo",
  description:
    "Plataforma que conecta clientes a profissionais qualificados em Aracaju e região. Eletricistas, diaristas, pedreiros, encanadores e muito mais.",
} as const;

/** Gera link wa.me com mensagem pré-preenchida (opcional) */
export function waLink(phone: string, message?: string): string {
  const clean = phone.replace(/\D/g, "");
  const base = `https://wa.me/${clean}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Formata número BR: 5579999515563 → (79) 99951-5563 */
export function formatPhoneBR(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  // Remove código país se vier
  const local = clean.startsWith("55") && clean.length === 13 ? clean.slice(2) : clean;
  if (local.length === 11) return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  if (local.length === 10) return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  return phone;
}

/** Cria slug a partir de texto */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

/** Parse seguro de JSON, retorna fallback se inválido */
export function safeJsonParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/** Formata data BR */
export function formatDateBR(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Tempo relativo BR: "há 2 dias", "há 1 mês" */
export function timeAgoBR(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  const intervals: Array<[number, string, string]> = [
    [31536000, "ano", "anos"],
    [2592000, "mês", "meses"],
    [604800, "semana", "semanas"],
    [86400, "dia", "dias"],
    [3600, "hora", "horas"],
    [60, "minuto", "minutos"],
  ];

  for (const [secs, singular, plural] of intervals) {
    const n = Math.floor(seconds / secs);
    if (n >= 1) return `há ${n} ${n === 1 ? singular : plural}`;
  }
  return "agora mesmo";
}

/** Truncate */
export function truncate(text: string, max = 120): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}
