"use client";

import { AuthProvider } from "./AuthProvider";
import { CadastroProvider } from "./CadastroProvider";
import { CookieBanner } from "./CookieBanner";
import { I18nProvider } from "./I18nProvider";
import { SiteThemeProvider } from "./SiteThemeProvider";
import { StartupLoader } from "./StartupLoader";
import { StyleRecovery } from "./StyleRecovery";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <SiteThemeProvider>
        <StyleRecovery />
        <StartupLoader />
        <AuthProvider>
          <CadastroProvider>{children}</CadastroProvider>
        </AuthProvider>
        <CookieBanner />
      </SiteThemeProvider>
    </I18nProvider>
  );
}
