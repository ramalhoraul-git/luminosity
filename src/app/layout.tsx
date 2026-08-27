import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "Luminosity Candles - Velas Aromáticas",
  description: "Velas aromáticas feitas com amor para transformar ambientes e despertar os sentidos.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#f5efe6] text-[#3b2e22] min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 pt-[96px] sm:pt-[103px] md:pt-[113px]">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
