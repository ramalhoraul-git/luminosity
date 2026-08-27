"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/modalidades", label: "Modalidades" },
    { href: "/especialidades", label: "Especialidades" },
    { href: "/campeoes", label: "Campeões" },
    { href: "/equipe", label: "Equipe" },
    { href: "/estrutura", label: "Estrutura" },
    { href: "/precos", label: "Preços" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 shadow-md"
      style={{ backgroundColor: "#F5EFE3" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo-principal.png"
              alt="MT Fight - Onde Campeões São Forjados"
              width={180}
              height={55}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#0a1628] hover:text-[#1a4f8a] font-medium transition-colors text-sm uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contato"
              className="bg-[#1a4f8a] text-white px-6 py-2.5 rounded-md hover:bg-[#2a7bd4] transition-colors font-bold uppercase text-sm shadow-md hover:shadow-lg"
            >
              Agende sua aula
            </Link>
          </nav>

          {/* Botão Mobile */}
          <button
            className="lg:hidden text-[#0a1628] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t" style={{ borderColor: "#d4c9b0" }}>
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#0a1628] hover:text-[#1a4f8a] font-medium transition-colors text-sm uppercase tracking-wider py-3 px-4 hover:bg-[#e8dfd0] rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contato"
                className="bg-[#1a4f8a] text-white px-6 py-3 rounded-md hover:bg-[#2a7bd4] transition-colors font-bold uppercase text-sm text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Agende sua aula
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
