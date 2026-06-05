"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "./I18nProvider";

type CadastroModalProps = {
  open: boolean;
  onClose: () => void;
  initialMode?: "signup" | "login";
};

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function CadastroModal({ open, onClose, initialMode = "signup" }: CadastroModalProps) {
  const { t } = useI18n();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError(null);
    }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.classList.add("cadastro-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("cadastro-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && session?.user) {
      onClose();
      router.push("/cadastro/completar");
    }
  }, [open, session, onClose, router]);

  if (!open) return null;

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/cadastro/completar",
        redirect: true,
      });
    } catch {
      setError("Não foi possível conectar com o Google. Tente novamente.");
      setLoading(false);
    }
  }

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/cadastro/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao criar conta.");
        setLoading(false);
        return;
      }
      const sign = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (sign?.error) {
        setError("Conta criada, mas não foi possível entrar. Use Entrar com seu e-mail.");
        setLoading(false);
        return;
      }
      onClose();
      router.push("/cadastro/completar");
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const sign = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (sign?.error) {
        setError("E-mail ou senha incorretos.");
        setLoading(false);
        return;
      }
      onClose();
      router.push("/cadastro/completar");
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <div className="cadastro-overlay" role="dialog" aria-modal="true" aria-labelledby="cadastro-title">
      <div className="cadastro-backdrop" onClick={onClose} aria-hidden />
      <div className="cadastro-modal">
        <button type="button" className="cadastro-close" onClick={onClose} aria-label="Fechar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="cadastro-modal-head">
          <img src="/logo.svg" alt="" className="cadastro-logo" />
          <h2 id="cadastro-title">
            {isSignup ? t("cadastro.title") : t("cadastro.login")}
          </h2>
          {isSignup && <p>{t("cadastro.subtitle")}</p>}
        </div>

        <div className="cadastro-options">
          {/* Google OAuth — always primary, shown for both signup AND login.
              Differentiates Gmail-based accounts from email/password ones
              just like every modern SaaS sign-up flow. */}
          <button
            type="button"
            className="btn btn-google"
            onClick={handleGoogle}
            disabled={loading || status === "loading"}
          >
            <GoogleLogo />
            <span className="btn-google-label">
              {loading ? t("cadastro.connecting") : t("cadastro.google")}
            </span>
          </button>
          {isSignup && (
            <p className="cadastro-google-hint">{t("cadastro.googleFast")}</p>
          )}

          <div className="cadastro-divider">
            <span>{t("cadastro.orWithEmail")}</span>
          </div>

          <form
            className="cadastro-form"
            onSubmit={isSignup ? handleEmailSignup : handleEmailLogin}
          >
            {isSignup && (
              <label className="cadastro-field">
                <span>{t("cadastro.name")}</span>
                <input
                  type="text"
                  required
                  minLength={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
            )}
            <label className="cadastro-field">
              <span>{t("cadastro.email")}</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <label className="cadastro-field cadastro-field-pw">
              <span>{t("cadastro.password")}</span>
              <div className="cadastro-pw-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />
                <button
                  type="button"
                  className="cadastro-eye-btn"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? t("cadastro.hidePassword") : t("cadastro.showPassword")}
                  aria-pressed={showPw}
                  tabIndex={-1}
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </label>
            {isSignup && (
              <label className="cadastro-field cadastro-field-pw">
                <span>{t("cadastro.confirmPassword")}</span>
                <div className="cadastro-pw-wrap">
                  <input
                    type={showConfirmPw ? "text" : "password"}
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="cadastro-eye-btn"
                    onClick={() => setShowConfirmPw((v) => !v)}
                    aria-label={showConfirmPw ? t("cadastro.hidePassword") : t("cadastro.showPassword")}
                    aria-pressed={showConfirmPw}
                    tabIndex={-1}
                  >
                    <EyeIcon open={showConfirmPw} />
                  </button>
                </div>
              </label>
            )}
            <div className="cadastro-form-actions">
              <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
                {t("cadastro.cancel")}
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading
                  ? t("cadastro.connecting")
                  : isSignup
                    ? t("cadastro.registerBtn")
                    : t("cadastro.login")}
              </button>
            </div>
          </form>

          {error && <p className="cadastro-error">{error}</p>}
        </div>

        <p className="cadastro-alt">
          {isSignup ? (
            <>
              {t("cadastro.hasAccount")}{" "}
              <button type="button" className="cadastro-link-btn" onClick={() => setMode("login")}>
                {t("cadastro.login")}
              </button>
            </>
          ) : (
            <>
              {t("cadastro.noAccount")}{" "}
              <button type="button" className="cadastro-link-btn" onClick={() => setMode("signup")}>
                {t("cadastro.registerBtn")}
              </button>
            </>
          )}
          {" · "}
          <Link href="/admin/login" onClick={onClose}>
            {t("cadastro.admin")}
          </Link>
        </p>

        <p className="cadastro-legal">{t("cadastro.legal")}</p>
      </div>
    </div>
  );
}
