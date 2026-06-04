import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { SITE } from "@/lib/utils";
import { AppProviders } from "@/components/AppProviders";
import "./globals.css";
import "../styles/fixes.css";
import "../styles/theme-3d.css";
import "../styles/theme-peachweb.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "profissionais",
    "Aracaju",
    "Sergipe",
    "eletricista",
    "diarista",
    "pedreiro",
    "encanador",
    "manicure",
    "personal trainer",
    "cuidador",
    "mecânico",
    "informática",
    "AchouPro",
  ],
  authors: [{ name: "Magno Carvalho" }],
  creator: "AchouPro",
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050b1f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${inter.variable}`}
      data-color-mode="dark"
      data-site-theme="achoupro"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem("achoupro-color-mode");if(m==="light"||m==="dark"){document.documentElement.dataset.colorMode=m;document.documentElement.dataset.siteTheme=m==="light"?"peachweb":"achoupro";return}var t=localStorage.getItem("achoupro-site-theme");if(t==="peachweb"){document.documentElement.dataset.colorMode="light";document.documentElement.dataset.siteTheme="peachweb"}else if(t==="achoupro"){document.documentElement.dataset.colorMode="dark";document.documentElement.dataset.siteTheme="achoupro"}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={poppins.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
