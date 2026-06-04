"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "./I18nProvider";

const STORAGE_KEY = "achoupro_cookie_consent_v1";

type Consent = "accepted" | "essential" | null;

export function CookieBanner() {
  const { t } = useI18n();
  const [consent, setConsent] = useState<Consent>("accepted");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent;
      setConsent(stored);
    } catch {
      setConsent(null);
    }
  }, []);

  const decide = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignora
    }
    setConsent(value);
  };

  if (!mounted || consent !== null) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-live="polite">
      <div className="container cookie-banner-inner">
        <div className="cookie-banner-text">
          <h3 id="cookie-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M21.6 9.8a9 9 0 1 1-7.4-7.4 5 5 0 0 0 7.4 7.4Z" />
            </svg>
            {t("cookie.title")}
          </h3>
          <p>
            {t("cookie.text")}{" "}
            <Link href="/privacidade" className="cookie-link">
              {t("cookie.privacy")}
            </Link>
            .
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-btn cookie-btn-ghost" onClick={() => decide("essential")}>
            {t("cookie.essential")}
          </button>
          <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => decide("accepted")}>
            {t("cookie.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
