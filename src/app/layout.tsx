import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luminosity Candles | Acenda uma experiência",
  description: "Velas aromáticas feitas com amor para transformar ambientes e criar momentos inesquecíveis.",
  keywords: ["velas aromáticas BH", "velas perfumadas", "vela artesanal", "velas para presente"],
  openGraph: {
    title: "Luminosity Candles | Acenda uma experiência",
    description: "Aromas que abraçam a alma. Encontre a vela que combina com o seu momento.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
