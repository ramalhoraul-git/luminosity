import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1628] border-t border-[#1a3a6b] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1 - Logo */}
          <div className="space-y-4">
            <Image
              src="/logo-principal.png"
              alt="MT Fight"
              width={140}
              height={44}
              className="h-11 w-auto object-contain"
            />
            <p className="text-[#8aa3c9] text-sm">
              Onde campeões são forjados.
            </p>
            <p className="text-[#8aa3c9] text-sm">
              O maior centro de artes marciais de Belo Horizonte.
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/modalidades" className="text-[#8aa3c9] hover:text-[#4a9ff5] text-sm transition-colors">
                  Modalidades
                </Link>
              </li>
              <li>
                <Link href="/especialidades" className="text-[#8aa3c9] hover:text-[#4a9ff5] text-sm transition-colors">
                  Especialidades
                </Link>
              </li>
              <li>
                <Link href="/campeoes" className="text-[#8aa3c9] hover:text-[#4a9ff5] text-sm transition-colors">
                  Nossos Campeões
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="text-[#8aa3c9] hover:text-[#4a9ff5] text-sm transition-colors">
                  Equipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://wa.me/5531994338005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8aa3c9] hover:text-[#4a9ff5] text-sm transition-colors"
                >
                  WhatsApp: (31) 99433-8005
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mt__fight/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8aa3c9] hover:text-[#4a9ff5] text-sm transition-colors"
                >
                  Instagram: @mt__fight
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/CT.MTFGHT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8aa3c9] hover:text-[#4a9ff5] text-sm transition-colors"
                >
                  Facebook: CT.MTFGHT
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Horário */}
          <div>
            <h4 className="text-white font-bold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-[#8aa3c9] text-sm">
              <li>Segunda a Sexta: 06:00 - 22:00</li>
              <li>Sábado: 08:00 - 18:00</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a3a6b] mt-8 pt-8 text-center text-[#8aa3c9] text-sm">
          <p>
            &copy; {currentYear} MT Fight - Todos os direitos reservados.
          </p>
          <p className="mt-1">
            Belo Horizonte - MG
          </p>
        </div>
      </div>
    </footer>
  );
}
