import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SavedProvider } from "@/context/SavedContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://luxoraestates.co.uk"),
  title: `${siteConfig.brandName} | Prime UK Real Estate & Country Estates`,
  description: siteConfig.heroSubheading,
  keywords: [
    "UK Luxury Real Estate",
    "Mayfair Penthouses",
    "Surrey Private Estates",
    "The Cotswolds Manors",
    "Prime London Property",
    "Wentworth Estate",
    "3D Property Walkthrough",
  ],
  authors: [{ name: siteConfig.legalEntity }],
  openGraph: {
    title: `${siteConfig.brandName} | Prime UK Real Estate & Country Estates`,
    description: siteConfig.heroSubheading,
    url: "https://luxoraestates.co.uk",
    siteName: siteConfig.brandName,
    images: [
      {
        url: "/videos/hero-poster.jpg",
        width: 1920,
        height: 1080,
        alt: `${siteConfig.brandName} Master Architecture`,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} | Prime UK Real Estate`,
    description: siteConfig.heroSubheading,
    images: ["/videos/hero-poster.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#08090C" />
      </head>
      <body className="bg-[#08090C] text-gray-100 antialiased selection:bg-[#D4AF37]/30 selection:text-white min-h-screen">
        <SavedProvider>{children}</SavedProvider>
      </body>
    </html>
  );
}
