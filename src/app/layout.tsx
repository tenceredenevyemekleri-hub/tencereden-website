import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Tencereden Ev Yemekleri | Ofisler için Catering Hizmeti",
  description: "Ofisler için taze, sağlıklı ve kaliteli ev yemeği hizmeti. Geleneksel Türk mutfağından lezzetler, aylık menü planları ve kurumsal catering.",
  keywords: "ev yemeği, catering, ofis yemeği, kurumsal yemek, İstanbul catering, günlük yemek servisi",
  authors: [{ name: "Tencereden Ev Yemekleri" }],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Tencereden Ev Yemekleri | Ofisler için Catering Hizmeti",
    description: "Ofisler için taze, sağlıklı ve kaliteli ev yemeği hizmeti.",
    url: "https://tencereden.com",
    siteName: "Tencereden Ev Yemekleri",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://tencereden.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tencereden Ev Yemekleri Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tencereden Ev Yemekleri",
    description: "Ofisler için taze, sağlıklı ve kaliteli ev yemeği hizmeti.",
    images: ["https://tencereden.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
