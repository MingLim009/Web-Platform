import { pt, type Messages } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";

export type { Messages };

export type Locale = "pt" | "en" | "es";

const dictionaries = { pt, en, es };

export function catName(messages: Messages, slug: string, fallback: string): string {
  const cats = messages.categories as Record<string, string>;
  return cats[slug] ?? fallback;
}

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "pt";
  const lang = (navigator.language || "pt-BR").toLowerCase();
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("es")) return "es";
  return "pt";
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale] ?? pt;
}

export function t(
  messages: Messages,
  key: string,
  vars?: Record<string, string | number>
): string {
  const parts = key.split(".");
  let cur: unknown = messages;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return key;
    }
  }
  let text = typeof cur === "string" ? cur : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}
