"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"enter" | "idle">("enter");

  useEffect(() => {
    setPhase("enter");
    const timer = window.setTimeout(() => setPhase("idle"), 520);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div key={pathname} className={`page-transition${phase === "enter" ? " is-entering" : ""}`}>
      {children}
    </div>
  );
}
