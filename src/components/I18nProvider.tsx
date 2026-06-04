"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { catName, detectLocale, getMessages, t, type Locale, type Messages } from "@/lib/i18n";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  t: (key: string, vars?: Record<string, string | number>) => string;
  cat: (slug: string, fallback: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

  useEffect(() => {
    const detected = detectLocale();
    setLocale(detected);
    document.documentElement.lang = detected === "pt" ? "pt-BR" : detected;
  }, []);

  const messages = useMemo(() => getMessages(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      messages,
      t: (key: string, vars?: Record<string, string | number>) => t(messages, key, vars),
      cat: (slug: string, fallback: string) => catName(messages, slug, fallback),
    }),
    [locale, messages]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
