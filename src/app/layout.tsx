import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Imobiliária - Encontre seu imóvel ideal",
    template: "%s | Imobiliária"
  },
  description: "Encontre casas, apartamentos e terrenos para comprar ou alugar. A melhor seleção de imóveis da região com os melhores preços e atendimento especializado.",
  keywords: ["imóveis", "casas", "apartamentos", "terrenos", "comprar", "alugar", "imobiliária", "propriedades"],
  authors: [{ name: "Imobiliária" }],
  creator: "Imobiliária",
  publisher: "Imobiliária",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Imobiliária",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Imobiliária",
    title: "Imobiliária - Encontre seu imóvel ideal",
    description: "Encontre casas, apartamentos e terrenos para comprar ou alugar. A melhor seleção de imóveis da região com os melhores preços e atendimento especializado.",
    url: "https://imobiliaria.com",
    images: [
      {
        url: "/hero-banner.webp",
        width: 1200,
        height: 630,
        alt: "Imobiliária - Encontre seu imóvel ideal",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imobiliária - Encontre seu imóvel ideal",
    description: "Encontre casas, apartamentos e terrenos para comprar ou alugar. A melhor seleção de imóveis da região.",
    images: ["/hero-banner.webp"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Imobiliária" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Imobiliária",
              "description": "Encontre casas, apartamentos e terrenos para comprar ou alugar. A melhor seleção de imóveis da região.",
              "url": "https://imobiliaria.com",
              "logo": "https://imobiliaria.com/logo.svg",
              "image": "https://imobiliaria.com/hero-banner.webp",
              "telephone": "+55 11 99999-9999",
              "email": "contato@imobiliaria.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Principal, 123",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "postalCode": "01000-000",
                "addressCountry": "BR"
              },
              "sameAs": [
                "https://www.facebook.com/imobiliaria",
                "https://www.instagram.com/imobiliaria",
                "https://www.linkedin.com/company/imobiliaria"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": -23.5505,
                  "longitude": -46.6333
                },
                "geoRadius": "50000"
              },
              "priceRange": "$$",
              "openingHours": "Mo-Fr 08:00-18:00, Sa 08:00-12:00"
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
