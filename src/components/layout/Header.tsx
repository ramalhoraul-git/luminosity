"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "HOME" },
    { href: "/velas", label: "VELAS" },
    { href: "/aromas", label: "AROMAS" },
    { href: "/kits", label: "KITS" },
    { href: "/presentes", label: "PRESENTES" },
    { href: "/sobre", label: "SOBRE" },
    { href: "/contato", label: "FALE CONOSCO" },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50"
      style={{ 
        backgroundColor: "#3b2e22", 
        color: "#ffffff",
        borderBottom: "1px solid rgba(255,255,255,0.18)"
      }}
    >
      {/* PROMO BAR — FRETE FIXO + VELAS AROMÁTICAS + BH */}
      <div 
        className="promo-bar"
        style={{ 
          height: "31px", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          gap: "32px", 
          fontSize: "9px", 
          fontWeight: 700, 
          letterSpacing: "0.12em",
          backgroundColor: "#2d231b",
          color: "#f5efe6"
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          ✨ Frete fixo de R$ 12,90 para todo o Brasil
        </span>
        <span style={{ opacity: 0.75, display: "inline-flex", alignItems: "center", gap: "8px" }}>
          Velas aromáticas feitas com amor <i style={{ color: "#d4af37", fontStyle: "normal", padding: "0 8px" }}>•</i> BH — MG
        </span>
      </div>

      {/* HEADER PRINCIPAL */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[82px]">
          
          {/* LOGO — USANDO A IMAGEM logo-principal.png */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo-principal.png"
              alt="Luminosity Candles - Velas Aromáticas"
              width={160}
              height={55}
              className="h-[55px] w-auto object-contain"
              priority
              style={{ 
                height: "55px", 
                width: "auto",
                background: "transparent"
              }}
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#d4af37] font-medium transition-colors text-xs uppercase tracking-wider"
                style={{ opacity: 0.86 }}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => window.open(`https://wa.me/5531999999999?text=Olá! ✨ Vim pelo site da Luminosity Candles e gostaria de conhecer as velas.`, "_blank")}
              className="text-white hover:text-[#d4af37] font-medium transition-colors text-xs uppercase tracking-wider"
              style={{ 
                border: "1px solid #d4af37",
                padding: "8px 16px",
                borderRadius: "4px",
                opacity: 0.86,
                background: "transparent",
                cursor: "pointer"
              }}
            >
              WhatsApp
            </button>
          </nav>

          {/* BOTÃO MOBILE */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MENU MOBILE */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-[#d4af37] font-medium transition-colors text-sm uppercase tracking-wider py-3 px-4 rounded"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  window.open(`https://wa.me/5531999999999?text=Olá! ✨ Vim pelo site da Luminosity Candles e gostaria de conhecer as velas.`, "_blank");
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-[#d4af37] font-medium transition-colors text-sm uppercase tracking-wider py-3 px-4 rounded text-center"
                style={{ 
                  border: "1px solid #d4af37",
                  marginTop: "8px",
                  background: "transparent",
                  cursor: "pointer"
                }}
              >
                WhatsApp
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
