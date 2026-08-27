import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d231b] text-[#f5efe6] border-t border-[#d4af37]/20 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1 - Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="m12 3-1.4 5.6L5 10l5.6 1.4L12 17l1.4-5.6L19 10l-5.6-1.4L12 3Z" />
                </svg>
              </div>
              <div>
                <span className="block font-serif text-xl tracking-wide">Luminosity</span>
                <span className="block text-[8px] uppercase tracking-[0.36em] text-[#d4af37]">Candles</span>
              </div>
            </div>
            <p className="text-[#c4b8a8] text-sm">
              Velas aromáticas feitas com amor.<br />Para iluminar o que importa.
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h4 className="text-[#d4af37] font-bold text-xs uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[#c4b8a8] hover:text-white text-sm transition-colors">Início</Link></li>
              <li><Link href="/velas" className="text-[#c4b8a8] hover:text-white text-sm transition-colors">Velas</Link></li>
              <li><Link href="/kits" className="text-[#c4b8a8] hover:text-white text-sm transition-colors">Kits</Link></li>
              <li><Link href="/contato" className="text-[#c4b8a8] hover:text-white text-sm transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div>
            <h4 className="text-[#d4af37] font-bold text-xs uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://wa.me/5531999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4b8a8] hover:text-white text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/luminositycandles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c4b8a8] hover:text-white text-sm transition-colors"
                >
                  @luminositycandles
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Horário */}
          <div>
            <h4 className="text-[#d4af37] font-bold text-xs uppercase tracking-wider mb-4">Horário</h4>
            <ul className="space-y-2 text-[#c4b8a8] text-sm">
              <li>Segunda a Sexta: 09:00 - 18:00</li>
              <li>Sábado: 09:00 - 13:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d4af37]/10 mt-8 pt-8 text-center text-[#c4b8a8] text-xs">
          <p>&copy; {currentYear} Luminosity Candles. Todos os direitos reservados.</p>
          <p className="mt-1">Belo Horizonte - MG</p>
        </div>
      </div>
    </footer>
  );
}
