"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSiteTheme } from "./SiteThemeProvider";
import { useCadastro } from "./CadastroProvider";
import { useI18n } from "./I18nProvider";
import { SITE, waLink } from "@/lib/utils";

function IconLogin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function IconUserPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

export function Navbar({ founderSlots }: { founderSlots?: number }) {
  const [open, setOpen] = useState(false);
  // activeSection tracks which top-level nav item is "current":
  //  - "home" when at / and no #categorias hash
  //  - "categories" when at / with #categorias hash OR when the categorias
  //    section is the most prominent one in the viewport
  //  - "search" / "about" when on /buscar or /sobre
  const [activeSection, setActiveSection] = useState<"home" | "categories" | "search" | "about" | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isLight } = useSiteTheme();
  const { openCadastro, openLogin } = useCadastro();
  const { t } = useI18n();
  const talkUrl = waLink(SITE.whatsapp, "Olá! Gostaria de falar com a equipe AchouPro.");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Compute the active nav item. usePathname() does NOT include the hash,
  // so we must read window.location.hash separately and watch hashchange +
  // scroll (so the underline tracks where the user actually is on /).
  // This fixes the bug where both "Home" and "Categories" lit up at the
  // same time on the home page, and the underline appeared to "jump" when
  // you clicked between them.
  useEffect(() => {
    if (pathname === "/buscar" || pathname.startsWith("/buscar")) {
      setActiveSection("search");
      return;
    }
    if (pathname === "/sobre" || pathname.startsWith("/sobre")) {
      setActiveSection("about");
      return;
    }
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const compute = () => {
      if (window.location.hash === "#categorias") {
        setActiveSection("categories");
        return;
      }
      // Scroll-spy: if the #categorias section center is in the upper half
      // of the viewport, mark "categories"; otherwise "home".
      const section = document.getElementById("categorias");
      if (section) {
        const r = section.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        if (mid > 0 && mid < window.innerHeight * 0.55) {
          setActiveSection("categories");
          return;
        }
      }
      setActiveSection("home");
    };

    compute();
    const onScroll = () => compute();
    const onHash = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, [pathname]);

  const navLinks: Array<{
    href: string;
    label: string;
    key: "home" | "categories" | "search" | "about";
    hash?: boolean;
  }> = [
    { href: "/", label: t("nav.home"), key: "home" },
    { href: "/buscar", label: t("nav.search"), key: "search" },
    { href: "/#categorias", label: t("nav.categories"), key: "categories", hash: true },
    { href: "/sobre", label: t("nav.about"), key: "about" },
  ];

  const goCategories = useCallback(
    (e: React.MouseEvent) => {
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById("categorias")?.scrollIntoView({ behavior: "smooth" });
        // Update the hash without triggering a reload, so the underline
        // sticks on "Categories" until the user scrolls away or clicks
        // another item.
        if (window.location.hash !== "#categorias") {
          window.history.replaceState(null, "", "/#categorias");
        }
        setActiveSection("categories");
        setOpen(false);
        return;
      }
      e.preventDefault();
      router.push("/#categorias");
      setOpen(false);
    },
    [pathname, router]
  );

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link href="/" className="brand">
            <img src="/logo.svg" alt="AchouPro" className="brand-mark" />
            <div className="brand-text">
              <span className="brand-name">
                <span className="achou">Achou</span>
                <span className="pro">Pro</span>
              </span>
              <span className="brand-tag">{t("common.brandTag")}</span>
            </div>
          </Link>

          <nav>
            <ul className={`nav-links${open ? " open" : ""}`}>
              <button
                type="button"
                className="mobile-close"
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              {navLinks.map((l) => {
                const cls = activeSection === l.key ? "active" : "";
                const onHomeClick = (e: React.MouseEvent) => {
                  // Clicking "Home" while already on /: clear the hash so
                  // the underline switches away from "Categories".
                  if (l.key === "home" && pathname === "/") {
                    if (window.location.hash) {
                      e.preventDefault();
                      window.history.replaceState(null, "", "/");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setActiveSection("home");
                      setOpen(false);
                    }
                  }
                };
                return (
                  <li key={l.href}>
                    {l.hash ? (
                      <Link href={l.href} className={cls} onClick={goCategories}>
                        {l.label}
                      </Link>
                    ) : (
                      <Link href={l.href} className={cls} onClick={onHomeClick}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="mobile-cta">
                {isLight ? (
                  <>
                    <a href={talkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                      {t("nav.talk")}
                    </a>
                    <button type="button" className="btn btn-primary btn-with-icon" onClick={openCadastro}>
                      <IconUserPlus />
                      {t("nav.register")}
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="btn btn-outline btn-with-icon" onClick={openLogin}>
                      <IconLogin />
                      {t("nav.login")}
                    </button>
                    <button type="button" className="btn btn-primary btn-with-icon" onClick={openCadastro}>
                      <IconUserPlus />
                      {t("nav.register")}
                    </button>
                  </>
                )}
              </li>
            </ul>
          </nav>

          <div className="nav-cta">
            {typeof founderSlots === "number" && founderSlots > 0 && (
              <span className="nav-founder-pill" aria-hidden>
                {t("nav.founderSlots", { n: founderSlots })}
              </span>
            )}
            {isLight ? (
              <>
                <a
                  href={talkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm nav-talk-btn"
                >
                  {t("nav.talk")}
                </a>
                <button type="button" className="btn btn-primary btn-sm btn-with-icon" onClick={openCadastro}>
                  <IconUserPlus />
                  {t("nav.register")}
                </button>
              </>
            ) : (
              <>
                <button type="button" className="btn btn-outline btn-sm btn-with-icon" onClick={openLogin}>
                  <IconLogin />
                  {t("nav.login")}
                </button>
                <button type="button" className="btn btn-primary btn-sm btn-with-icon" onClick={openCadastro}>
                  <IconUserPlus />
                  {t("nav.register")}
                </button>
              </>
            )}
            <button type="button" className="nav-toggle" aria-label="Menu" onClick={() => setOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {open && <div className="mobile-backdrop open" onClick={() => setOpen(false)} />}
    </>
  );
}
