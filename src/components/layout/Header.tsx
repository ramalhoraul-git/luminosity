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

  // COR DO FUNDO = #F3EBDD (creme/areia/champagne) — mesma da logo
  const headerBgColor = "#F3EBDD";

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{ 
        backgroundColor: headerBgColor,
        borderBottom: "1px solid rgba(0,0,0,0.08)"
      }}
    >
      {/* PROMO BAR — FRETE FIXO + VELAS AROMÁTICAS + BH */}
      <div 
        className="w-full"
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

      {/* HEADER PRINCIPAL — TODA A ÁREA COM A MESMA COR #F3EBDD */}
      <div className="w-full" style={{ backgroundColor: headerBgColor }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[82px]" style={{ backgroundColor: headerBgColor }}>
            
            {/* LOGO — FUNDO #F3EBDD (mesma cor do menu) */}
            <Link href="/" className="flex items-center flex-shrink-0" style={{ backgroundColor: headerBgColor }}>
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
                  backgroundColor: headerBgColor,
                  display: "block"
                }}
              />
            </Link>

            {/* MENU DESKTOP */}
            <nav className="hidden lg:flex items-center gap-8" style={{ backgroundColor: headerBgColor }}>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-medium transition-colors text-xs uppercase tracking-wider"
                  style={{ 
                    color: "#3b2e22",
                    opacity: 0.8,
                    backgroundColor: "transparent"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#d4af37"; e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#3b2e22"; e.currentTarget.style.opacity = "0.8"; }}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => window.open(`https://wa.me/5531999999999?text=Olá! ✨ Vim pelo site da Luminosity Candles e gostaria de conhecer as velas.`, "_blank")}
                className="font-medium transition-colors text-xs uppercase tracking-wider"
                style={{ 
                  border: "1px solid #d4af37",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  color: "#3b2e22",
                  backgroundColor: "transparent",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d4af37"; e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#3b2e22"; }}
              >
                WhatsApp
              </button>
            </nav>

            {/* BOTÃO MOBILE */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
              style={{ 
                backgroundColor: "transparent", 
                border: "none", 
                cursor: "pointer",
                color: "#3b2e22"
              }}
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
            <nav className="lg:hidden py-4 border-t" style={{ 
              borderColor: "rgba(59,46,34,0.1)",
              backgroundColor: headerBgColor
            }}>
              <div className="flex flex-col gap-2" style={{ backgroundColor: headerBgColor }}>
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-medium transition-colors text-sm uppercase tracking-wider py-3 px-4 rounded"
                    style={{ 
                      color: "#3b2e22",
                      borderBottom: "1px solid rgba(59,46,34,0.05)",
                      backgroundColor: "transparent"
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,175,55,0.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    window.open(`https://wa.me/5531999999999?text=Olá! ✨ Vim pelo site da Luminosity Candles e gostaria de conhecer as velas.`, "_blank");
                    setIsMenuOpen(false);
                  }}
                  className="font-medium transition-colors text-sm uppercase tracking-wider py-3 px-4 rounded text-center"
                  style={{ 
                    border: "1px solid #d4af37",
                    marginTop: "8px",
                    color: "#3b2e22",
                    backgroundColor: "transparent",
                    cursor: "pointer"
                  }}
                >
                  WhatsApp
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
