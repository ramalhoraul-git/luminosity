"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  const menuItems = [
    { href: "/", label: "HOME" },
    { href: "/velas", label: "VELAS" },
    { href: "/aromas", label: "AROMAS" },
    { href: "/kits", label: "KITS" },
    { href: "/presentes", label: "PRESENTES" },
    { href: "/sobre", label: "SOBRE" },
    { href: "/contato", label: "FALE CONOSCO" },
  ];

  const headerBgColor = "#F3EBDD";

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{ 
        backgroundColor: headerBgColor,
        borderBottom: "1px solid rgba(0,0,0,0.08)"
      }}
    >
      {/* PROMO BAR — RESPONSIVA */}
      <div 
        className="w-full overflow-hidden"
        style={{ 
          minHeight: "31px",
          padding: "4px 12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2d231b",
          color: "#f5efe6"
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[8px] sm:text-[9px] font-bold tracking-[0.12em] text-center">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            ✨ Frete fixo de R$ 12,90
          </span>
          <span className="hidden xs:flex items-center gap-1.5 whitespace-nowrap opacity-75">
            <span className="hidden sm:inline">Velas aromáticas feitas com amor</span>
            <span className="sm:hidden">Velas artesanais</span>
            <i style={{ color: "#d4af37", fontStyle: "normal", padding: "0 4px" }}>•</i>
            BH — MG
          </span>
        </div>
      </div>

      {/* HEADER PRINCIPAL */}
      <div className="w-full" style={{ backgroundColor: headerBgColor }}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-[64px] sm:h-[72px] md:h-[82px]" style={{ backgroundColor: headerBgColor }}>
            
            {/* LOGO — RESPONSIVA */}
            <Link 
              href="/" 
              className="flex items-center flex-shrink-0" 
              style={{ backgroundColor: headerBgColor }}
            >
              <Image
                src="/logo-principal.png"
                alt="Luminosity Candles"
                width={120}
                height={40}
                className="h-[36px] sm:h-[44px] md:h-[55px] w-auto object-contain"
                priority
                style={{ 
                  height: "auto",
                  maxHeight: "55px",
                  width: "auto",
                  maxWidth: "140px",
                  backgroundColor: headerBgColor,
                  display: "block"
                }}
              />
            </Link>

            {/* MENU DESKTOP */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8" style={{ backgroundColor: headerBgColor }}>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-medium transition-colors text-[10px] xl:text-xs uppercase tracking-wider whitespace-nowrap"
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
                className="font-medium transition-colors text-[10px] xl:text-xs uppercase tracking-wider whitespace-nowrap"
                style={{ 
                  border: "1px solid #d4af37",
                  padding: "6px 14px",
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

            {/* BOTÃO HAMBÚRGUER — RESPONSIVO */}
            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
              aria-expanded={isMenuOpen}
              style={{ 
                backgroundColor: "transparent", 
                border: "none", 
                cursor: "pointer",
                color: "#3b2e22"
              }}
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* MENU MOBILE — OVERLAY RESPONSIVO */}
          {isMenuOpen && (
            <nav 
              className="lg:hidden py-4 border-t overflow-y-auto max-h-[calc(100vh-120px)]"
              style={{ 
                borderColor: "rgba(59,46,34,0.1)",
                backgroundColor: headerBgColor
              }}
            >
              <div className="flex flex-col gap-1" style={{ backgroundColor: headerBgColor }}>
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
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    window.open(`https://wa.me/5531999999999?text=Olá! ✨ Vim pelo site da Luminosity Candles e gostaria de conhecer as velas.`, "_blank");
                    setIsMenuOpen(false);
                  }}
                  className="font-medium transition-colors text-sm uppercase tracking-wider py-3 px-4 rounded text-center mt-2"
                  style={{ 
                    border: "1px solid #d4af37",
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
