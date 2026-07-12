import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./sales.css";
import { CookieConsent } from "./components/cookie-consent";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "Dudexa — Science to Insects",
    description: "Professional insect light traps, UV lamps and glue boards engineered in Germany.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Dudexa — Science to Insects",
      description: "Professional flying-insect control engineered in Germany.",
      type: "website",
      images: [{ url: new URL("/og-v2.png", base).toString(), width: 1200, height: 630, alt: "Dudexa — Science to Insects" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dudexa — Science to Insects",
      description: "Professional flying-insect control engineered in Germany.",
      images: [new URL("/og-v2.png", base).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}<CookieConsent /></body>
    </html>
  );
}
