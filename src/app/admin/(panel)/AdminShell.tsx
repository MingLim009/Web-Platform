"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

type AdminUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
  role?: string;
};

const SIDEBAR_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/profissionais", label: "Profissionais", icon: "👥" },
  { href: "/admin/avaliacoes", label: "Avaliações", icon: "⭐" },
  { href: "/admin/categorias", label: "Categorias", icon: "🏷️" },
  { href: "/admin/cidades", label: "Cidades", icon: "📍" },
];

export function AdminShell({ user, children }: { user: AdminUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar${open ? " open" : ""}`}>
        <Link href="/admin" className="admin-logo">
          <img src="/logo.svg" alt="AchouPro" />
          <span><span className="achou">Achou</span><span className="pro">Pro</span> Admin</span>
        </Link>

        <nav className="admin-nav">
          {SIDEBAR_LINKS.map((l) => {
            const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className={active ? "active" : ""}>
                <span style={{ fontSize: "1.125rem" }}>{l.icon}</span> {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-foot">
          <Link href="/" target="_blank">↗ Ver site</Link>
          <button type="button" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
            Sair
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-toggle"
            aria-label="Menu"
            style={{ display: "none" }}
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div style={{ flex: 1 }} />

          <div className="admin-user">
            <div className="admin-avatar">
              {(user.name || "M").charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {children}
        </div>
      </main>

      {open && <div className="mobile-backdrop open" onClick={() => setOpen(false)} />}
    </div>
  );
}
