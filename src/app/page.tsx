"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";

type IconName =
  | "arrow"
  | "bag"
  | "bath"
  | "book"
  | "check"
  | "chevron"
  | "gift"
  | "heart"
  | "home"
  | "leaf"
  | "menu"
  | "message"
  | "moon"
  | "plus"
  | "search"
  | "sparkle"
  | "star"
  | "x";

type Product = {
  name: string;
  scent: string;
  description: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  categories: string[];
  tone: string;
  image: string;
  position?: string;
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5531999999999";
const brandMessage = "Olá! ✨ Vim pelo site da Luminosity Candles e gostaria de conhecer as velas.";

const products: Product[] = [
  {
    name: "Lavanda",
    scent: "Lavanda • Algodão • Íris",
    description: "Uma pausa delicada para desacelerar e voltar para si.",
    price: "R$ 49,90",
    oldPrice: "R$ 59,90",
    badge: "Mais vendida",
    categories: ["relaxantes", "florais", "mais-vendidos"],
    tone: "lavender",
    image: "/images/luminosity-collection.jpg",
    position: "left center",
  },
  {
    name: "Baunilha Dourada",
    scent: "Baunilha • Âmbar • Fava Tonka",
    description: "Aconchego em forma de aroma, com doçura na medida.",
    price: "R$ 54,90",
    badge: "Queridinha",
    categories: ["doces", "românticos", "mais-vendidos"],
    tone: "vanilla",
    image: "/images/luminosity-hero.jpg",
    position: "70% center",
  },
  {
    name: "Rosas Brancas",
    scent: "Rosa • Peônia • Musk",
    description: "Leve, feminina e luminosa para celebrar os pequenos rituais.",
    price: "R$ 59,90",
    categories: ["florais", "românticos", "recentes"],
    tone: "rose",
    image: "/images/luminosity-collection.jpg",
    position: "center center",
  },
  {
    name: "Capim-limão",
    scent: "Capim-limão • Bergamota • Folhas verdes",
    description: "Frescor que abre as janelas e renova o ambiente.",
    price: "R$ 49,90",
    categories: ["cítricos", "recentes"],
    tone: "lemongrass",
    image: "/images/luminosity-collection.jpg",
    position: "right center",
  },
  {
    name: "Canela & Cedro",
    scent: "Canela • Cedro • Cravo",
    description: "Quente, envolvente e com a profundidade de uma noite calma.",
    price: "R$ 56,90",
    categories: ["amadeirados", "doces"],
    tone: "cinnamon",
    image: "/images/luminosity-hero.jpg",
    position: "left center",
  },
  {
    name: "Alecrim Solar",
    scent: "Alecrim • Eucalipto • Limão siciliano",
    description: "Uma presença verde para trazer energia e clareza ao dia.",
    price: "R$ 52,90",
    categories: ["cítricos", "amadeirados", "recentes"],
    tone: "rosemary",
    image: "/images/luminosity-collection.jpg",
    position: "center right",
  },
];

const filterOptions = [
  { label: "Todos", value: "todos" },
  { label: "Relaxantes", value: "relaxantes" },
  { label: "Florais", value: "florais" },
  { label: "Doces", value: "doces" },
  { label: "Cítricos", value: "cítricos" },
  { label: "Amadeirados", value: "amadeirados" },
  { label: "Presentes", value: "presentes" },
];

const quizOptions = [
  { label: "Desacelerar e relaxar", value: "relaxar", icon: "moon" as IconName },
  { label: "Aconchego para a casa", value: "aconchegar", icon: "home" as IconName },
  { label: "Criar um momento romântico", value: "romance", icon: "heart" as IconName },
  { label: "Energia e frescor", value: "energia", icon: "sparkle" as IconName },
  { label: "Um ritual de autocuidado", value: "autocuidado", icon: "bath" as IconName },
  { label: "Presentear alguém especial", value: "presentear", icon: "gift" as IconName },
];

const faqItems = [
  {
    question: "Como faço meu pedido?",
    answer: "Você escolhe sua experiência aqui no site e fala com a gente pelo WhatsApp. Nosso atendimento confirma disponibilidade, combina os detalhes e finaliza o pedido com você.",
  },
  {
    question: "Vocês entregam em todo o Brasil?",
    answer: "Sim. Enviamos para todo o Brasil com frete fixo de R$ 12,90. Para BH e região, fale com nossa equipe sobre prazos e possibilidades de entrega.",
  },
  {
    question: "Como escolher uma fragrância?",
    answer: "Você pode explorar os aromas por sensação ou fazer nosso quiz. Se ainda ficar em dúvida, a equipe Luminosity te ajuda a encontrar a vela que combina com o seu momento.",
  },
  {
    question: "Posso comprar para presente?",
    answer: "Sim. Temos opções de kits, embalagem especial e cartão. Conte para quem é o presente pelo WhatsApp e montamos uma sugestão com carinho.",
  },
  {
    question: "Posso montar um kit personalizado?",
    answer: "Pode sim, conforme disponibilidade. Fale com a gente para combinar aromas, quantidades e uma composição que tenha a cara de quem vai receber.",
  },
];

function Icon({ name, size = 20, strokeWidth = 1.7 }: { name: IconName; size?: number; strokeWidth?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow":
      return <svg {...common}><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>;
    case "bag":
      return <svg {...common}><path d="M5.5 8.5h13l1 11h-15l1-11Z" /><path d="M9 9V6.8a3 3 0 0 1 6 0V9" /></svg>;
    case "bath":
      return <svg {...common}><path d="M4 12h16" /><path d="M5 12v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3" /><path d="M6 19v2M18 19v2M6 12V6a2 2 0 0 1 3.7-1.1L11 7" /></svg>;
    case "book":
      return <svg {...common}><path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12v16H7a2.5 2.5 0 0 0-2.5 2.5v-16Z" /><path d="M4.5 19.5A2.5 2.5 0 0 1 7 17h12" /></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "chevron":
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
    case "gift":
      return <svg {...common}><path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13" /><path d="M12 7H8.5a2.5 2.5 0 1 1 2.3-3.5L12 7ZM12 7h3.5a2.5 2.5 0 1 0-2.3-3.5L12 7Z" /></svg>;
    case "heart":
      return <svg {...common}><path d="M20.8 8.8c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z" /></svg>;
    case "home":
      return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></svg>;
    case "leaf":
      return <svg {...common}><path d="M20.5 3.5C13 3.5 6.5 5.4 5 10c-1.1 3.4 1.3 6.6 4.7 6.4C15.1 16.1 19.9 10.8 20.5 3.5Z" /><path d="M4 21c2.7-4.9 6.2-7.8 11.3-10.5" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "message":
      return <svg {...common}><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.6-.8L4 20l1.8-3.7A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></svg>;
    case "moon":
      return <svg {...common}><path d="M19.5 15.2A7.9 7.9 0 0 1 8.8 4.5 8 8 0 1 0 19.5 15.2Z" /></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case "search":
      return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
    case "sparkle":
      return <svg {...common}><path d="m12 3-1.4 5.6L5 10l5.6 1.4L12 17l1.4-5.6L19 10l-5.6-1.4L12 3ZM19 16l-.6 2.4L16 19l2.4.6L19 22l.6-2.4L22 19l-2.4-.6L19 16Z" /></svg>;
    case "star":
      return <svg {...common}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg>;
    case "x":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
  }
}

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Logo() {
  return (
    <a href="#inicio" className="brand-lockup" aria-label="Luminosity Candles, início">
      <span className="brand-mark"><Icon name="sparkle" size={19} strokeWidth={1.2} /></span>
      <span className="brand-name">Luminosity <em>Candles</em></span>
    </a>
  );
}

function ProductVisual({ product }: { product: Product }) {
  return (
    <div className={`product-visual visual-${product.tone}`}>
      <img src={product.image} alt="" style={{ objectPosition: product.position }} />
      <div className="visual-wash" />
      <div className="candle-silhouette" aria-hidden="true">
        <span className="candle-flame" />
        <span className="candle-lid" />
        <span className="candle-vessel"><small>luminosity</small></span>
      </div>
      <span className="visual-note">feito à mão</span>
    </div>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", whatsapp: "", email: "" });
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("luminosity-lead-dismissed") !== "1") {
      const timer = window.setTimeout(() => setLeadOpen(true), 18000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const visibleProducts = useMemo(() => {
    const normalized = search.toLowerCase().trim();
    return products.filter((product) => {
      const matchesFilter = activeFilter === "todos" || product.categories.includes(activeFilter);
      const matchesSearch = !normalized || `${product.name} ${product.scent} ${product.description}`.toLowerCase().includes(normalized);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  function openWhatsApp(message = brandMessage) {
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  function chooseQuiz(value: string) {
    const results: Record<string, string> = {
      relaxar: "Lavanda",
      aconchegar: "Baunilha Dourada",
      romance: "Rosas Brancas",
      energia: "Capim-limão",
      autocuidado: "Lavanda",
      presentear: "Kit Presente",
    };
    setQuizResult(results[value] || "Lavanda");
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm),
      });
    } catch {
      // The WhatsApp handoff below remains available even if the CRM is offline.
    }
    setLeadSent(true);
    setToast("Pronto. Em breve você recebe novidades da Luminosity ✨");
    window.setTimeout(() => setToast(""), 4500);
  }

  function closeLead() {
    setLeadOpen(false);
    sessionStorage.setItem("luminosity-lead-dismissed", "1");
  }

  return (
    <main className="site-shell" id="inicio">
      {/* ============================================================
      PROMO BAR — FRETE FIXO + VELAS AROMÁTICAS + BH
      ============================================================ */}
      <div className="promo-bar" style={{ backgroundColor: "#3b2e22", color: "#f5efe6", height: "31px", display: "flex", justifyContent: "center", alignItems: "center", gap: "32px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <Icon name="sparkle" size={14} /> Frete fixo de R$ 12,90 para todo o Brasil
        </span>
        <span style={{ opacity: 0.75, display: "inline-flex", alignItems: "center", gap: "8px" }}>
          Velas aromáticas feitas com amor <i style={{ color: "#d4af37", fontStyle: "normal", padding: "0 8px" }}>•</i> BH — MG
        </span>
      </div>

      {/* ============================================================
      HEADER — LOGO + MENU + WHATSAPP
      ============================================================ */}
      <header className="site-header" style={{ position: "absolute", zIndex: 10, top: "31px", width: "100%", color: "#ffffff", borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
        <div className="header-inner" style={{ width: "min(1340px, calc(100% - 80px))", height: "82px", margin: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* LOGO — AUMENTADA EM 2CM DE ALTURA PROPORCIONAL */}
          <a href="#inicio" className="brand-lockup" style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "inherit", whiteSpace: "nowrap" }}>
            <span className="brand-mark" style={{ width: "40px", height: "40px", border: "1.5px solid currentColor", borderRadius: "50%", display: "inline-grid", placeItems: "center", color: "#d4af37" }}>
              <Icon name="sparkle" size={20} strokeWidth={1.2} />
            </span>
            <span className="brand-name" style={{ fontFamily: '"Iowan Old Style", "Baskerville", "Times New Roman", serif', fontSize: "28px", letterSpacing: "0.04em", lineHeight: "1.1" }}>
              Luminosity
              <em style={{ display: "block", marginTop: "-4px", fontFamily: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif', fontSize: "9px", fontStyle: "normal", textTransform: "uppercase", letterSpacing: "0.36em", textAlign: "center", opacity: 0.8 }}>Candles</em>
            </span>
          </a>

          {/* MENU — CORRIGIDO (SEM "AGENDE SUA AULA" — É MT FIGHT) */}
          <nav className="main-nav" style={{ display: "flex", alignItems: "center", gap: "29px", marginLeft: "auto", marginRight: "41px", fontSize: "11px", letterSpacing: "0.045em" }}>
            <a href="#inicio" style={{ opacity: 0.86, transition: "color 0.2s, opacity 0.2s" }}>HOME</a>
            <a href="#velas" style={{ opacity: 0.86, transition: "color 0.2s, opacity 0.2s" }}>VELAS</a>
            <a href="#aromas" style={{ opacity: 0.86, transition: "color 0.2s, opacity 0.2s" }}>AROMAS</a>
            <a href="#kits" style={{ opacity: 0.86, transition: "color 0.2s, opacity 0.2s" }}>KITS</a>
            <a href="#presentes" style={{ opacity: 0.86, transition: "color 0.2s, opacity 0.2s" }}>PRESENTES</a>
            <a href="#sobre" style={{ opacity: 0.86, transition: "color 0.2s, opacity 0.2s" }}>SOBRE</a>
            <a href="#contato" style={{ opacity: 0.86, transition: "color 0.2s, opacity 0.2s" }}>FALE CONOSCO</a>
          </nav>

          {/* WHATSAPP BUTTON — CORRETO */}
          <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button 
              className="header-whatsapp" 
              onClick={() => openWhatsApp()}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 16px", border: "1px solid #d4af37", background: "transparent", color: "#ffffff", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", transition: "0.2s", cursor: "pointer" }}
            >
              <Icon name="message" size={17} /> <span>WhatsApp</span>
            </button>
            <button 
              className="menu-toggle" 
              onClick={() => setMobileMenuOpen((value) => !value)} 
              aria-label="Abrir menu" 
              aria-expanded={mobileMenuOpen}
              style={{ display: "none", border: 0, color: "inherit", background: "transparent", cursor: "pointer" }}
            >
              <Icon name={mobileMenuOpen ? "x" : "menu"} size={22} />
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div style={{ position: "absolute", top: "82px", left: 0, right: 0, background: "#3b2e22", padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.13)" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="#inicio" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>HOME</a>
              <a href="#velas" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>VELAS</a>
              <a href="#aromas" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>AROMAS</a>
              <a href="#kits" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>KITS</a>
              <a href="#presentes" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>PRESENTES</a>
              <a href="#sobre" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>SOBRE</a>
              <a href="#contato" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "10px 0" }}>FALE CONOSCO</a>
            </nav>
          </div>
        )}
      </header>

      {/* ============================================================
      HERO SECTION
      ============================================================ */}
      <section className="hero-section">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-inner content-width">
          <div className="hero-copy">
            <p className="eyebrow light-eyebrow"><span /> Feitas para o seu momento</p>
            <h1>Acenda uma experiência.<br /><i>Sinta a diferença.</i></h1>
            <p className="hero-description">Velas aromáticas feitas com amor para transformar ambientes, despertar os sentidos e tornar pequenos momentos inesquecíveis.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#velas">Conhecer as velas <Icon name="arrow" size={17} /></a>
              <button className="text-link light-link" onClick={() => openWhatsApp()}><span className="round-icon"><Icon name="message" size={16} /></span> Falar pelo WhatsApp</button>
            </div>
            <div className="hero-details">
              <span><Icon name="sparkle" size={14} /> Aromas que abraçam</span>
              <span><Icon name="leaf" size={14} /> Ingredientes selecionados</span>
              <span><Icon name="bag" size={14} /> Enviamos para todo o Brasil</span>
            </div>
          </div>
          <div className="hero-side-note">
            <span className="vertical-text">luz · aroma · presença</span>
            <span className="hero-line" />
            <span className="hero-scroll">role para descobrir <Icon name="arrow" size={15} /></span>
          </div>
        </div>
        <div className="hero-stamp"><span>feito<br />à mão</span><Icon name="leaf" size={20} /></div>
      </section>

      <section className="promise-strip">
        <div className="content-width promise-grid">
          <div className="promise-intro"><span className="gold-rule" /><p>Um cuidado em cada detalhe</p></div>
          <div className="promise-item"><span className="promise-icon"><Icon name="leaf" size={21} /></span><div><strong>Cera vegetal</strong><small>Queima limpa e delicada</small></div></div>
          <div className="promise-item"><span className="promise-icon"><Icon name="sparkle" size={21} /></span><div><strong>Feito com amor</strong><small>Produção artesanal em BH</small></div></div>
          <div className="promise-item"><span className="promise-icon"><Icon name="bag" size={21} /></span><div><strong>Frete fixo</strong><small>R$ 12,90 para todo o Brasil</small></div></div>
        </div>
      </section>

      <section className="intro-section content-width" id="sobre">
        <div className="section-kicker">01 / a essência</div>
        <div className="intro-grid">
          <div>
            <h2>Não é só uma vela.<br /><em>É a atmosfera.</em></h2>
          </div>
          <div className="intro-text">
            <p className="lead-copy">A Luminosity nasceu para iluminar os intervalos da vida — aqueles instantes simples que, quando ganham aroma e presença, viram memória.</p>
            <p>Acender uma vela é abrir espaço. Para respirar, acolher, celebrar. Nossas composições unem fragrâncias envolventes, matérias-primas escolhidas e o cuidado de quem acredita que bem-estar mora nos detalhes.</p>
            <a className="underlined-link" href="#aromas">Descubra o universo Luminosity <Icon name="arrow" size={16} /></a>
          </div>
        </div>
      </section>

      <section className="catalog-section" id="velas">
        <div className="content-width">
          <div className="section-heading catalog-heading">
            <div><div className="section-kicker">02 / a coleção</div><h2>Encontre o aroma<br /><em>que combina com você.</em></h2></div>
            <p>Explore fragrâncias criadas para acompanhar diferentes sensações, ambientes e momentos.</p>
          </div>
          <div className="catalog-tools">
            <div className="filter-list" role="group" aria-label="Filtrar aromas">
              {filterOptions.map((filter) => <button key={filter.value} className={activeFilter === filter.value ? "filter-chip active" : "filter-chip"} onClick={() => setActiveFilter(filter.value)}>{filter.label}</button>)}
            </div>
            <label className="search-box"><Icon name="search" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Qual aroma você está procurando?" aria-label="Buscar aromas" /></label>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-media"><ProductVisual product={product} />{product.badge && <span className="product-badge">{product.badge}</span>}<button className="product-quick" aria-label={`Ver ${product.name}`} onClick={() => openWhatsApp(`Olá! ✨ Vim pelo site da Luminosity e me interessei pela Vela ${product.name}. Gostaria de saber mais e fazer meu pedido. 🕯️`)}><Icon name="arrow" size={17} /></button></div>
                <div className="product-info"><p className="product-scent">{product.scent}</p><h3>{product.name}</h3><p className="product-description">{product.description}</p><div className="product-bottom"><div><strong>{product.price}</strong>{product.oldPrice && <del>{product.oldPrice}</del>}</div><button className="product-cta" onClick={() => openWhatsApp(`Olá! ✨ Vim pelo site da Luminosity Candles e me interessei pela Vela ${product.name}. Ela custa ${product.price}. Gostaria de saber mais e fazer meu pedido. 🕯️`)}>Quero essa vela <Icon name="arrow" size={15} /></button></div></div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && <div className="empty-state">Nenhum aroma encontrado. Tente outra busca ou <button onClick={() => { setSearch(""); setActiveFilter("todos"); }}>ver todos os aromas</button>.</div>}
          <div className="catalog-footer"><span>Mostrando {visibleProducts.length} de {products.length} experiências</span><a className="underlined-link" href="#contato">Precisa de ajuda para escolher? <Icon name="arrow" size={16} /></a></div>
        </div>
      </section>

      <section className="sensory-section" id="aromas">
        <div className="content-width sensory-grid">
          <div className="sensory-copy"><div className="section-kicker light-kicker">03 / notas e intenções</div><h2>O poder simbólico<br /><em>das essências.</em></h2><p>Os aromas carregam histórias e sensações. Escolha o que deseja convidar para o seu espaço — sem pressa, sem regras, só presença.</p><button className="text-link light-link" onClick={() => openWhatsApp("Olá! ✨ Vim pelo site e gostaria de uma ajuda para escolher uma fragrância.")}><span className="round-icon"><Icon name="message" size={16} /></span> Me ajude a escolher</button></div>
          <div className="scent-notes">
            <div className="scent-note active"><span className="note-number">01</span><div><h3>Lavanda</h3><p>Calma <i>•</i> Serenidade <i>•</i> Leveza</p></div><Icon name="arrow" size={17} /></div>
            <div className="scent-note"><span className="note-number">02</span><div><h3>Baunilha</h3><p>Aconchego <i>•</i> Conforto <i>•</i> Doçura</p></div><Icon name="arrow" size={17} /></div>
            <div className="scent-note"><span className="note-number">03</span><div><h3>Rosas</h3><p>Romance <i>•</i> Delicadeza <i>•</i> Amor</p></div><Icon name="arrow" size={17} /></div>
            <div className="scent-note"><span className="note-number">04</span><div><h3>Alecrim</h3><p>Frescor <i>•</i> Renovação <i>•</i> Clareza</p></div><Icon name="arrow" size={17} /></div>
            <div className="scent-note"><span className="note-number">05</span><div><h3>Canela</h3><p>Calor <i>•</i> Intensidade <i>•</i> Presença</p></div><Icon name="arrow" size={17} /></div>
          </div>
        </div>
      </section>

      <section className="quiz-section content-width" id="quiz">
        <div className="quiz-card">
          <div className="quiz-orb orb-one" /><div className="quiz-orb orb-two" />
          <div className="quiz-content">
            <div className="quiz-label"><Icon name="sparkle" size={15} /> ritual de escolha</div>
            {!quizResult ? <><h2>Qual aroma combina<br /><em>com o seu momento?</em></h2><p>Responda uma pergunta e deixe a Luminosity te apresentar uma fragrância.</p><div className="quiz-options">{quizOptions.map((option) => <button key={option.value} className="quiz-option" onClick={() => chooseQuiz(option.value)}><span><Icon name={option.icon} size={18} /> {option.label}</span><Icon name="arrow" size={16} /></button>)}</div></> : <div className="quiz-result"><span className="result-spark"><Icon name="sparkle" size={22} /></span><p className="result-eyebrow">seu aroma é</p><h2>{quizResult}</h2><p>Seu momento pede uma fragrância que abrace o agora. Quer sentir essa experiência de perto?</p><div className="result-actions"><button className="button button-dark" onClick={() => openWhatsApp(`Olá! ✨ Fiz o quiz no site e meu aroma é ${quizResult}. Quero conhecer essa vela.`)}>Quero conhecer <Icon name="arrow" size={16} /></button><button className="reset-quiz" onClick={() => setQuizResult(null)}>Refazer o quiz</button></div></div>}
          </div>
          <div className="quiz-side"><span>luminosity<br /><i>rituals</i></span><span className="quiz-side-line" /><small>01 — 06</small></div>
        </div>
      </section>

      <section className="kits-section" id="kits">
        <div className="content-width">
          <div className="section-heading kits-heading"><div><div className="section-kicker">04 / experiências</div><h2>Acenda junto.<br /><em>Compartilhe a luz.</em></h2></div><p>Para criar momentos maiores — ou presentear alguém com uma experiência que continua depois da chama.</p></div>
          <div className="kit-grid">
            <article className="kit-card kit-featured"><div className="kit-image kit-image-one"><span>02 aromas<br /><i>para acolher</i></span></div><div className="kit-info"><span className="kit-tag">o essencial</span><h3>Kit Acolhimento</h3><p>Duas velas para transformar a casa em refúgio.</p><div className="kit-bottom"><strong>R$ 89,90</strong><button onClick={() => openWhatsApp("Olá! ✨ Vim pelo site e quero o Kit Acolhimento da Luminosity.")}>Quero esse kit <Icon name="arrow" size={15} /></button></div></div></article>
            <article className="kit-card"><div className="kit-image kit-image-two"><span>03 notas<br /><i>uma jornada</i></span></div><div className="kit-info"><span className="kit-tag">para explorar</span><h3>Kit Experiência</h3><p>Três aromas, três jeitos de sentir.</p><div className="kit-bottom"><strong>R$ 119,90</strong><button onClick={() => openWhatsApp("Olá! ✨ Vim pelo site e quero conhecer o Kit Experiência da Luminosity.")}>Conhecer <Icon name="arrow" size={15} /></button></div></div></article>
            <article className="kit-card"><div className="kit-image kit-image-three"><span>um gesto<br /><i>que fica</i></span></div><div className="kit-info"><span className="kit-tag">para presentear</span><h3>Kit Presente</h3><p>Vela, embalagem e cartão com intenção.</p><div className="kit-bottom"><strong>R$ 109,90</strong><button onClick={() => openWhatsApp("Olá! ✨ Vim pelo site e quero montar um Kit Presente Luminosity.")}>Montar presente <Icon name="arrow" size={15} /></button></div></div></article>
          </div>
        </div>
      </section>

      <section className="gift-section" id="presentes">
        <div className="gift-image" aria-hidden="true" />
        <div className="gift-overlay" />
        <div className="content-width gift-content"><div className="section-kicker light-kicker">05 / para guardar na memória</div><h2>Presentear é criar<br /><em>memórias.</em></h2><p>Para aniversário, casa nova, romance ou simplesmente porque alguém merece um pouco de luz hoje.</p><button className="button button-outline-light" onClick={() => openWhatsApp("Olá! ✨ Gostaria de ajuda para escolher um presente Luminosity.")}>Me ajude a escolher <Icon name="arrow" size={17} /></button><div className="gift-categories"><span><Icon name="gift" size={16} /> Aniversário</span><span><Icon name="heart" size={16} /> Romance</span><span><Icon name="home" size={16} /> Casa nova</span><span><Icon name="sparkle" size={16} /> Autocuidado</span></div></div>
      </section>

      <section className="testimonial-section content-width">
        <div className="section-kicker">06 / quem sente, fica</div>
        <div className="testimonial-grid"><div><h2>Quem experimenta,<br /><em>se apaixona.</em></h2><div className="stars">★★★★★</div></div><blockquote>“Minha casa ficou com outra atmosfera. O aroma é maravilhoso e a embalagem chegou tão linda que parecia um presente para mim mesma.”<footer><strong>Marina A.</strong><span>• Belo Horizonte, MG</span></footer></blockquote></div>
        <div className="testimonial-dots"><span className="active" /><span /><span /><small>01 / 03</small></div>
      </section>

      <section className="instagram-section">
        <div className="content-width">
          <div className="instagram-heading"><div><div className="section-kicker">07 / por perto</div><h2>Siga a Luminosity<br /><em>no seu dia a dia.</em></h2></div><div><p>Rituais, bastidores e um pouco de luz no seu feed.</p><a className="underlined-link" href="https://instagram.com/luminositycandles" target="_blank" rel="noreferrer">@luminositycandles <Icon name="arrow" size={16} /></a></div></div>
          <div className="instagram-grid"><div className="insta-tile insta-one"><span>uma pausa<br /><i>para respirar</i></span></div><div className="insta-tile insta-two"><span>rituais<br /><i>luminosos</i></span></div><div className="insta-tile insta-three"><span>feito à mão<br /><i>em BH</i></span></div><div className="insta-tile insta-four"><span>acenda<br /><i>o seu momento</i></span></div></div>
        </div>
      </section>

      <section className="faq-section content-width" id="faq">
        <div className="faq-heading"><div className="section-kicker">08 / perguntas frequentes</div><h2>Ficou alguma<br /><em>dúvida?</em></h2><p>Se a resposta não estiver aqui, é só chamar a gente.</p><button className="underlined-link" onClick={() => openWhatsApp("Olá! ✨ Vim pelo site e fiquei com uma dúvida sobre as velas.")}>Falar com a Luminosity <Icon name="arrow" size={16} /></button></div>
        <div className="faq-list">{faqItems.map((item, index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={item.question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{item.question}</span><span className="faq-toggle"><Icon name={openFaq === index ? "x" : "plus"} size={17} /></span></button>{openFaq === index && <p>{item.answer}</p>}</div>)}</div>
      </section>

      <section className="contact-section" id="contato">
        <div className="content-width contact-inner"><div className="contact-copy"><div className="section-kicker light-kicker">09 / estamos aqui</div><h2>Ainda está em dúvida?</h2><p>Escolher uma fragrância pode ser uma experiência pessoal. Nossa equipe pode ajudar você a encontrar a vela que combina com o seu momento — ou com quem você deseja presentear.</p><button className="button button-gold" onClick={() => openWhatsApp("Olá! ✨ Vim pelo site da Luminosity e gostaria de conversar com vocês.")}>Falar com a Luminosity <Icon name="arrow" size={17} /></button></div><div className="contact-orbit"><span className="orbit-word">acenda</span><span className="orbit-circle"><Icon name="sparkle" size={28} /></span><span className="orbit-word orbit-bottom">sua experiência</span></div></div>
      </section>

      <footer className="site-footer"><div className="content-width"><div className="footer-top"><div className="footer-brand">
        <a href="#inicio" className="brand-lockup" style={{ display: "inline-flex", alignItems: "center", gap: "12px", color: "inherit", whiteSpace: "nowrap" }}>
          <span className="brand-mark" style={{ width: "38px", height: "38px", border: "1.5px solid currentColor", borderRadius: "50%", display: "inline-grid", placeItems: "center", color: "#d4af37" }}>
            <Icon name="sparkle" size={19} strokeWidth={1.2} />
          </span>
          <span className="brand-name" style={{ fontFamily: '"Iowan Old Style", "Baskerville", "Times New Roman", serif', fontSize: "26px", letterSpacing: "0.04em", lineHeight: "1.1" }}>
            Luminosity
            <em style={{ display: "block", marginTop: "-4px", fontFamily: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif', fontSize: "8px", fontStyle: "normal", textTransform: "uppercase", letterSpacing: "0.36em", textAlign: "center", opacity: 0.8 }}>Candles</em>
          </span>
        </a>
        <p style={{ marginTop: "16px", color: "rgba(245,239,230,0.62)", fontFamily: '"Iowan Old Style", "Baskerville", "Times New Roman", serif', fontSize: "17px", lineHeight: "1.25" }}>Velas aromáticas feitas com amor.<br />Para iluminar o que importa.</p>
        <div className="footer-location" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "27px", color: "rgba(245,239,230,0.52)", fontSize: "10px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Icon name="leaf" size={16} /> BH — MG</span>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Icon name="bag" size={16} /> Enviamos para todo o Brasil</span>
        </div>
      </div><div className="footer-col"><h4 style={{ margin: "0 0 6px", color: "#e2c875", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Navegação</h4><a href="#inicio" style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px" }}>Início</a><a href="#velas" style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px" }}>Velas</a><a href="#aromas" style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px" }}>Aromas</a><a href="#kits" style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px" }}>Kits</a><a href="#presentes" style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px" }}>Presentes</a></div><div className="footer-col"><h4 style={{ margin: "0 0 6px", color: "#e2c875", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Atendimento</h4><button onClick={() => openWhatsApp()} style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px", cursor: "pointer" }}>WhatsApp</button><a href="https://instagram.com/luminositycandles" target="_blank" rel="noreferrer" style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px" }}>Instagram</a><a href="#faq" style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px" }}>Perguntas frequentes</a><a href="/admin" style={{ padding: 0, border: 0, background: "transparent", color: "rgba(245,239,230,0.68)", fontSize: "11px" }}>Área de gestão</a></div><div className="footer-cta" style={{ borderLeft: "1px solid rgba(245,239,230,0.16)", paddingLeft: "33px" }}><span style={{ display: "block", marginBottom: "18px", color: "#d4af37", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" }}>um convite</span><strong style={{ display: "block", fontFamily: '"Iowan Old Style", "Baskerville", "Times New Roman", serif', fontSize: "30px", fontWeight: 400, lineHeight: "0.95" }}>Acenda sua<br /><em style={{ color: "#e2c875", fontStyle: "italic" }}>experiência.</em></strong><button onClick={() => openWhatsApp()} style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginTop: "25px", paddingBottom: "7px", border: 0, borderBottom: "1px solid #d4af37", background: "transparent", color: "#f5efe6", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.09em", cursor: "pointer" }}>Falar com a gente <Icon name="arrow" size={16} /></button></div></div><div className="footer-bottom" style={{ minHeight: "42px", paddingTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", borderTop: "1px solid rgba(245,239,230,0.14)", color: "rgba(245,239,230,0.4)", fontSize: "9px" }}><span>© 2024 Luminosity Candles. Todos os direitos reservados.</span><span>Privacidade &nbsp;·&nbsp; Termos</span><span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#d4af37" }}>feito com intenção <Icon name="heart" size={13} /></span></div></div></footer>

      <button className="floating-whatsapp" onClick={() => openWhatsApp()} style={{ position: "fixed", zIndex: 20, right: "25px", bottom: "24px", minWidth: "181px", minHeight: "56px", padding: "8px 17px 8px 8px", display: "flex", alignItems: "center", gap: "10px", border: "1px solid rgba(212,175,55,0.5)", borderRadius: "40px", background: "#3b2e22", color: "#f5efe6", boxShadow: "0 12px 28px rgba(59,46,34,0.24)", cursor: "pointer", transition: "transform 0.2s, background 0.2s" }}>
        <span className="floating-icon" style={{ width: "39px", height: "39px", display: "grid", placeItems: "center", borderRadius: "50%", background: "#d4af37", color: "#3b2e22" }}><Icon name="message" size={20} /></span>
        <span className="floating-label" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px", textAlign: "left" }}>
          <small style={{ color: "#e2c875", fontSize: "8px", letterSpacing: "0.13em", textTransform: "uppercase" }}>fale conosco</small>
          <strong style={{ fontSize: "10px", letterSpacing: "0.07em", textTransform: "uppercase" }}>pelo WhatsApp</strong>
        </span>
      </button>

      {leadOpen && <div className="lead-backdrop" role="presentation" style={{ position: "fixed", zIndex: 40, inset: 0, display: "grid", placeItems: "center", padding: "20px", background: "rgba(45,35,27,0.74)", backdropFilter: "blur(5px)" }}><div className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title" style={{ position: "relative", width: "min(810px, 100%)", minHeight: "460px", display: "grid", gridTemplateColumns: "0.86fr 1.14fr", background: "#f5efe6", boxShadow: "0 25px 80px rgba(0,0,0,0.3)" }}><button className="modal-close" onClick={closeLead} aria-label="Fechar" style={{ position: "absolute", zIndex: 2, top: "15px", right: "15px", width: "32px", height: "32px", display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,0.45)", borderRadius: "50%", background: "rgba(59,46,34,0.22)", color: "#ffffff", cursor: "pointer" }}><Icon name="x" size={19} /></button><div className="modal-image" style={{ position: "relative", minHeight: "460px", backgroundImage: "linear-gradient(180deg, rgba(59,46,34,0.08), rgba(59,46,34,0.6)), url('/images/luminosity-hero.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}><div className="modal-image-copy" style={{ position: "absolute", left: "30px", bottom: "28px", color: "#ffffff", fontFamily: '"Iowan Old Style", "Baskerville", "Times New Roman", serif', fontSize: "27px", lineHeight: "0.9" }}>uma pausa<br /><em style={{ color: "#e2c875", fontStyle: "italic" }}>só sua</em></div></div><div className="lead-content" style={{ padding: "59px 53px 40px" }}>{!leadSent ? <><div className="section-kicker" style={{ color: "#7a7a59", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>um presente para você</div><h2 id="lead-title" style={{ fontFamily: '"Iowan Old Style", "Baskerville", "Times New Roman", serif', fontSize: "clamp(34px, 4vw, 49px)", fontWeight: 400, margin: "23px 0 15px", color: "#3b2e22" }}>Receba um pouco<br /><em style={{ color: "#d4af37", fontStyle: "italic" }}>mais de luminosity.</em></h2><p style={{ maxWidth: "290px", color: "#665545", fontSize: "12px", lineHeight: "1.7" }}>Novos aromas, rituais e condições especiais direto no seu WhatsApp ou e-mail.</p><form onSubmit={submitLead} style={{ display: "flex", flexDirection: "column", gap: "9px", marginTop: "23px" }}><input required placeholder="Seu nome" value={leadForm.name} onChange={(event) => setLeadForm({ ...leadForm, name: event.target.value })} style={{ width: "100%", height: "39px", padding: "0 12px", border: "1px solid rgba(59,46,34,0.22)", outline: "none", background: "rgba(255,255,255,0.35)", color: "#3b2e22", fontSize: "11px" }} /><input required placeholder="Seu WhatsApp" type="tel" value={leadForm.whatsapp} onChange={(event) => setLeadForm({ ...leadForm, whatsapp: event.target.value })} style={{ width: "100%", height: "39px", padding: "0 12px", border: "1px solid rgba(59,46,34,0.22)", outline: "none", background: "rgba(255,255,255,0.35)", color: "#3b2e22", fontSize: "11px" }} /><input placeholder="Seu melhor e-mail" type="email" value={leadForm.email} onChange={(event) => setLeadForm({ ...leadForm, email: event.target.value })} style={{ width: "100%", height: "39px", padding: "0 12px", border: "1px solid rgba(59,46,34,0.22)", outline: "none", background: "rgba(255,255,255,0.35)", color: "#3b2e22", fontSize: "11px" }} /><button className="button button-dark" type="submit" style={{ alignSelf: "flex-start", marginTop: "5px", minHeight: "47px", padding: "0 20px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "19px", border: "1px solid transparent", background: "#3b2e22", color: "#f5efe6", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "transform 0.2s, background 0.2s, color 0.2s" }}>Quero receber <Icon name="arrow" size={16} /></button></form><small className="form-note" style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "13px", color: "#7a7a59", fontSize: "9px" }}><Icon name="check" size={13} /> Sem spam. Só coisas bonitas.</small></> : <div className="lead-success" style={{ paddingTop: "27px" }}><span style={{ width: "49px", height: "49px", display: "grid", placeItems: "center", borderRadius: "50%", background: "#d4af37", color: "#3b2e22" }}><Icon name="check" size={25} /></span><h2 style={{ fontFamily: '"Iowan Old Style", "Baskerville", "Times New Roman", serif', fontSize: "clamp(34px, 4vw, 49px)", fontWeight: 400, margin: "23px 0 15px", color: "#3b2e22" }}>Você está na nossa lista.</h2><p style={{ color: "#665545", fontSize: "12px", lineHeight: "1.7" }}>Obrigada, {leadForm.name || "por estar aqui"}. Prepare um cantinho especial: vem coisa bonita por aí.</p><button className="button button-dark" onClick={closeLead} style={{ marginTop: "10px", minHeight: "47px", padding: "0 20px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "19px", border: "1px solid transparent", background: "#3b2e22", color: "#f5efe6", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "transform 0.2s, background 0.2s, color 0.2s" }}>Continuar explorando <Icon name="arrow" size={16} /></button></div>}</div></div></div>}
      {toast && <div className="toast-message" style={{ position: "fixed", zIndex: 45, right: "25px", bottom: "94px", maxWidth: "calc(100% - 50px)", padding: "13px 17px", display: "flex", alignItems: "center", gap: "9px", background: "#7a7a59", color: "#ffffff", boxShadow: "0 7px 20px rgba(59,46,34,0.22)", fontSize: "11px" }}><Icon name="check" size={16} /> {toast}</div>}
    </main>
  );
}
