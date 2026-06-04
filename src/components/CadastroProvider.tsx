"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CadastroModal } from "./CadastroModal";

type CadastroContextValue = {
  openCadastro: () => void;
  openLogin: () => void;
  closeCadastro: () => void;
};

const CadastroContext = createContext<CadastroContextValue | null>(null);

export function useCadastro() {
  const ctx = useContext(CadastroContext);
  if (!ctx) throw new Error("useCadastro must be used within CadastroProvider");
  return ctx;
}

export function CadastroProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"signup" | "login">("signup");
  const pathname = usePathname();

  const openCadastro = useCallback(() => {
    setModalMode("signup");
    setOpen(true);
  }, []);

  const openLogin = useCallback(() => {
    setModalMode("login");
    setOpen(true);
  }, []);

  const closeCadastro = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/cadastro") {
      setModalMode("signup");
      setOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#cadastro") {
        setModalMode("signup");
        setOpen(true);
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <CadastroContext.Provider value={{ openCadastro, openLogin, closeCadastro }}>
      {children}
      <CadastroModal open={open} onClose={closeCadastro} initialMode={modalMode} />
    </CadastroContext.Provider>
  );
}
