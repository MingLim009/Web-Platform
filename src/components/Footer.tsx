"use client";

import Link from "next/link";
import { SITE, formatPhoneBR } from "@/lib/utils";
import { useSiteTheme } from "./SiteThemeProvider";
import { ThemeText } from "./ThemeText";
import { useI18n } from "./I18nProvider";

export function Footer() {
  const { isPeach } = useSiteTheme();
  const { t, cat } = useI18n();
  const waLinkUrl = `https://wa.me/${SITE.whatsapp}`;
  const waDisplay = formatPhoneBR(SITE.whatsapp);

  const footerCats = ["eletricista", "diarista", "pedreiro", "encanador"] as const;

  return (
    <footer className="footer">
      <div className="container">
        {isPeach && (
          <div className="footer-peach-cta peach-only" data-reveal>
            <div>
              <h3>{t("footer.ctaTitle")}</h3>
              <p>{t("footer.ctaLead")}</p>
            </div>
            <div className="footer-peach-cta-actions">
              <a href={waLinkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                {t("nav.talk")}
              </a>
              <Link href="/buscar" className="btn btn-primary btn-lg">
                {t("common.startNow")}
              </Link>
            </div>
          </div>
        )}

        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="brand footer-brand-link">
              <img src="/logo.svg" alt="AchouPro" className="brand-mark" />
              <div className="brand-text">
                <span className="brand-name">
                  <span className="achou">Achou</span>
                  <span className="pro">Pro</span>
                </span>
                <span className="brand-tag">{t("common.brandTag")}</span>
              </div>
            </Link>
            <p>
              <ThemeText achoupro={t("footer.aboutDark")} peachweb={t("footer.aboutLight")} />
            </p>
            <div className="social">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href={waLinkUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4>{t("footer.platform")}</h4>
            <ul>
              <li><Link href="/">{t("nav.home")}</Link></li>
              <li><Link href="/buscar">{t("nav.search")}</Link></li>
              <li><Link href="/sobre">{t("footer.whoWeAre")}</Link></li>
              <li><Link href="/#cadastro">{t("footer.imProfessional")}</Link></li>
              <li><Link href="/admin">{t("footer.adminPanel")}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t("footer.categories")}</h4>
            <ul>
              {footerCats.map((slug) => (
                <li key={slug}>
                  <Link href={`/buscar?categoria=${slug}`}>{cat(slug, slug)}</Link>
                </li>
              ))}
              <li><Link href="/buscar">{t("common.seeAll")}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t("footer.contact")}</h4>
            <ul>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>
                <a href={waLinkUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {waDisplay}
                </a>
              </li>
              <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@achouprofissional</a></li>
              <li><a href={SITE.facebook} target="_blank" rel="noopener noreferrer">Facebook AchouPro</a></li>
              <li><Link href="/termos">{t("footer.terms")}</Link></li>
              <li><Link href="/privacidade">{t("footer.privacy")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AchouPro. {t("footer.rights")}</span>
          <span>
            {t("footer.madeIn")} <span className="footer-heart">♥</span> {t("footer.madeInCity")}
          </span>
        </div>
      </div>
    </footer>
  );
}
