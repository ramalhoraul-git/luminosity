import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "MT Fight - Onde Campeões São Forjados",
  description: "O maior centro de artes marciais de Belo Horizonte. Jiu-Jitsu, Muay Thai e Boxe. Treinamento Kids, Feminino e Método de Emagrecimento.",
  keywords: "artes marciais BH, jiu-jitsu, muay thai, boxe, treino kids, treino feminino, emagrecimento, campeões",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a1628] text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
