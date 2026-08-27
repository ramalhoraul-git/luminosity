"use client";

import { useState } from "react";

type Tab = "dashboard" | "products" | "orders" | "crm" | "finance";

type AdminProduct = {
  name: string;
  sku: string;
  stock: number;
  price: string;
  sales: number;
  status: "Disponível" | "Estoque baixo" | "Esgotado";
  featured: boolean;
};

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "◒" },
  { id: "products", label: "Produtos", icon: "◫" },
  { id: "orders", label: "Pedidos", icon: "□" },
  { id: "crm", label: "CRM & Leads", icon: "♧" },
  { id: "finance", label: "Financeiro", icon: "◇" },
];

const initialProducts: AdminProduct[] = [
  { name: "Lavanda", sku: "LUM-LAV-180", stock: 24, price: "R$ 49,90", sales: 86, status: "Disponível", featured: true },
  { name: "Baunilha Dourada", sku: "LUM-BAU-180", stock: 11, price: "R$ 54,90", sales: 64, status: "Disponível", featured: true },
  { name: "Kit Acolhimento", sku: "LUM-KIT-002", stock: 7, price: "R$ 89,90", sales: 42, status: "Estoque baixo", featured: true },
  { name: "Rosas Brancas", sku: "LUM-ROS-180", stock: 18, price: "R$ 59,90", sales: 38, status: "Disponível", featured: false },
  { name: "Canela & Cedro", sku: "LUM-CAN-180", stock: 0, price: "R$ 56,90", sales: 21, status: "Esgotado", featured: false },
];

const leads = [
  { name: "Marina Alves", detail: "Lavanda · há 8 min", stage: "Novo lead", tag: "#lavanda", color: "lilac" },
  { name: "Camila Ribeiro", detail: "Kit Presente · há 28 min", stage: "Interessado", tag: "#presente", color: "rose" },
  { name: "João Pedro", detail: "Kit Acolhimento · ontem", stage: "Aguardando pagamento", tag: "#kit", color: "olive" },
  { name: "Ana Luiza", detail: "Baunilha Dourada · ontem", stage: "Venda realizada", tag: "#primeiracompra", color: "gold" },
];

const orders = [
  { id: "#LUM-1048", customer: "Ana Luiza", item: "Baunilha Dourada", total: "R$ 54,90", status: "Pago", time: "Hoje, 10:42" },
  { id: "#LUM-1047", customer: "Camila Ribeiro", item: "Kit Presente", total: "R$ 109,90", status: "Aguardando pagamento", time: "Hoje, 09:18" },
  { id: "#LUM-1046", customer: "João Pedro", item: "Kit Acolhimento", total: "R$ 89,90", status: "Preparando", time: "Ontem, 17:05" },
  { id: "#LUM-1045", customer: "Marina Alves", item: "Lavanda", total: "R$ 49,90", status: "Entregue", time: "Ontem, 14:32" },
];

function StatusPill({ children }: { children: string }) {
  const tone = children === "Disponível" || children === "Pago" || children === "Venda realizada" || children === "Entregue" ? "good" : children === "Estoque baixo" || children === "Aguardando pagamento" || children === "Interessado" ? "warn" : "bad";
  return <span className={`admin-status ${tone}`}><i />{children}</span>;
}

function Dashboard({ products }: { products: AdminProduct[] }) {
  return <>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">terça-feira, 24 de setembro de 2024</p><h1>Bom dia, Luminosity <span>✦</span></h1><p className="admin-muted">Aqui está o pulso da sua operação hoje.</p></div><button className="admin-primary">+ Novo produto</button></div>
    <div className="admin-kpis">
      <div className="admin-kpi kpi-main"><span>Faturamento no mês <b>↗ 18,4%</b></span><strong>R$ 12.480<small>,00</small></strong><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><small>vs. R$ 10.520 no mês anterior</small></div>
      <div className="admin-kpi"><span>Pedidos</span><strong>184</strong><b className="kpi-delta">↗ 12,8%</b><small>no período</small></div>
      <div className="admin-kpi"><span>Novos leads</span><strong>326</strong><b className="kpi-delta">↗ 24,2%</b><small>via site e WhatsApp</small></div>
      <div className="admin-kpi"><span>Ticket médio</span><strong>R$ 67<small>,82</small></strong><b className="kpi-delta">↗ 8,6%</b><small>por pedido</small></div>
    </div>
    <div className="admin-grid-two">
      <section className="admin-panel revenue-panel"><div className="panel-heading"><div><h2>Receita & conversão</h2><p>Desempenho dos últimos 30 dias</p></div><button className="period-select">Últimos 30 dias⌄</button></div><div className="chart-area"><div className="chart-y"><span>4k</span><span>3k</span><span>2k</span><span>1k</span><span>0</span></div><div className="chart"><div className="chart-grid"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 650 190" preserveAspectRatio="none" aria-label="Gráfico de receita"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d4af37" stopOpacity=".3" /><stop offset="1" stopColor="#d4af37" stopOpacity="0" /></linearGradient></defs><path d="M0 157 C36 146, 50 149, 81 126 S128 144, 161 113 S201 121, 239 99 S274 130, 310 111 S352 75, 383 84 S421 108, 457 67 S502 89, 527 53 S571 64, 603 28 S632 43, 650 13 L650 190 L0 190 Z" fill="url(#chartFill)" /><path d="M0 157 C36 146, 50 149, 81 126 S128 144, 161 113 S201 121, 239 99 S274 130, 310 111 S352 75, 383 84 S421 108, 457 67 S502 89, 527 53 S571 64, 603 28 S632 43, 650 13" fill="none" stroke="#d4af37" strokeWidth="2" /></svg><div className="chart-x"><span>26 ago</span><span>01 set</span><span>08 set</span><span>15 set</span><span>24 set</span></div></div></div></section>
      <section className="admin-panel funnel-panel"><div className="panel-heading"><div><h2>Funil comercial</h2><p>Visitante até venda</p></div><span className="live-dot">ao vivo</span></div><div className="funnel"><div style={{ width: "100%" }}><span>Visitantes <b>10.240</b></span></div><div style={{ width: "77%" }}><span>Interessados <b>1.240</b></span></div><div style={{ width: "57%" }}><span>WhatsApp <b>624</b></span></div><div style={{ width: "40%" }}><span>Pedidos <b>250</b></span></div><div style={{ width: "29%" }}><span>Vendas <b>184</b></span></div></div><div className="funnel-rate"><strong>1,8%</strong><span>taxa de conversão<br />visitante → venda</span></div></section>
    </div>
    <div className="admin-grid-two lower-panels">
      <section className="admin-panel"><div className="panel-heading"><div><h2>Produtos mais vendidos</h2><p>Ranking do mês</p></div><button className="panel-link">Ver todos →</button></div><div className="ranking-list">{products.slice(0, 4).map((product, index) => <div className="ranking-row" key={product.sku}><span className="ranking-number">0{index + 1}</span><div className={`rank-thumb rank-${index}`}><span /></div><div className="rank-name"><strong>{product.name}</strong><small>{product.sales} vendas</small></div><strong className="rank-revenue">{index === 0 ? "R$ 4.293" : index === 1 ? "R$ 3.514" : index === 2 ? "R$ 2.846" : "R$ 2.278"}</strong></div>)}</div></section>
      <section className="admin-panel"><div className="panel-heading"><div><h2>Estoque em atenção</h2><p>Produtos que precisam de você</p></div><button className="panel-link">Gerenciar →</button></div><div className="stock-alerts">{products.filter((product) => product.stock < 12).map((product) => <div className="stock-row" key={product.sku}><div className={`stock-dot ${product.stock === 0 ? "empty" : "low"}`} /><div><strong>{product.name}</strong><small>SKU {product.sku}</small></div><span>{product.stock === 0 ? "Esgotado" : `${product.stock} unidades`}</span><button aria-label={`Editar estoque de ${product.name}`}>···</button></div>)}</div></section>
    </div>
  </>;
}

function Products({ products, setProducts }: { products: AdminProduct[]; setProducts: (products: AdminProduct[]) => void }) {
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">catálogo & inventário</p><h1>Produtos <span>✦</span></h1><p className="admin-muted">Cuide de cada experiência que chega até suas clientes.</p></div><button className="admin-primary">+ Novo produto</button></div><div className="admin-toolbar"><div className="admin-search">⌕ <input placeholder="Buscar por nome ou SKU" /></div><button className="admin-filter">Todos os status⌄</button><button className="admin-filter">Ordenar por⌄</button><span className="toolbar-count">{products.length} produtos cadastrados</span></div><section className="admin-panel table-panel"><table><thead><tr><th>Produto</th><th>SKU</th><th>Preço</th><th>Vendas</th><th>Estoque</th><th>Status</th><th /></tr></thead><tbody>{products.map((product) => <tr key={product.sku}><td><div className="table-product"><div className={`table-thumb rank-${products.indexOf(product)}`} /><strong>{product.name}{product.featured && <span className="featured-star">✦</span>}</strong></div></td><td className="table-muted">{product.sku}</td><td>{product.price}</td><td>{product.sales}</td><td><strong>{product.stock}</strong> un.</td><td><StatusPill>{product.status}</StatusPill></td><td><button className="row-action" onClick={() => setProducts(products.map((item) => item.sku === product.sku ? { ...item, featured: !item.featured } : item))}>{product.featured ? "Destaque" : "···"}</button></td></tr>)}</tbody></table></section></>;
}

function CRM() {
  const columns = ["Novo lead", "Interessado", "Aguardando pagamento", "Venda realizada"];
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">relacionamento & conversão</p><h1>CRM <span>✦</span></h1><p className="admin-muted">Cada conversa é uma oportunidade de criar vínculo.</p></div><button className="admin-primary">+ Adicionar lead</button></div><div className="crm-summary"><div><span>Leads ativos</span><strong>326</strong></div><div><span>Conversas hoje</span><strong>48</strong></div><div><span>Conversão</span><strong>14,2%</strong></div><div><span>Tempo médio de resposta</span><strong>12 min</strong></div></div><div className="crm-board">{columns.map((column) => <div className="crm-column" key={column}><div className="crm-column-heading"><span>{column}</span><b>{leads.filter((lead) => lead.stage === column).length || (column === "Novo lead" ? 12 : column === "Interessado" ? 8 : column === "Aguardando pagamento" ? 4 : 7)}</b></div>{leads.filter((lead) => lead.stage === column).map((lead) => <div className="lead-card" key={lead.name}><div className="lead-card-top"><span className={`avatar ${lead.color}`}>{lead.name.split(" ").map((part) => part[0]).join("")}</span><button>···</button></div><strong>{lead.name}</strong><small>{lead.detail}</small><div><span className="lead-tag">{lead.tag}</span><span className="lead-whatsapp">◔ WhatsApp</span></div></div>)}{column === "Novo lead" && <div className="lead-card ghost"><span className="ghost-avatar">+ </span><span>Mais 11 leads</span></div>}{column === "Interessado" && <div className="lead-card ghost"><span className="ghost-avatar">+ </span><span>Mais 7 leads</span></div>}{column === "Aguardando pagamento" && <div className="lead-card ghost"><span className="ghost-avatar">+ </span><span>Mais 3 leads</span></div>}{column === "Venda realizada" && <div className="lead-card ghost"><span className="ghost-avatar">+ </span><span>Mais 6 leads</span></div>}<button className="add-lead">+ Adicionar lead</button></div>)}</div></>;
}

function Orders() {
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">operação</p><h1>Pedidos <span>✦</span></h1><p className="admin-muted">Acompanhe cada pedido até chegar ao seu destino.</p></div><button className="admin-primary">Exportar pedidos ↓</button></div><div className="order-status-tabs"><button className="active">Todos <b>184</b></button><button>Novos <b>12</b></button><button>Pagamento <b>7</b></button><button>Preparando <b>9</b></button><button>Enviados <b>31</b></button></div><section className="admin-panel table-panel"><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Produto</th><th>Data</th><th>Total</th><th>Status</th><th /></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.customer}</td><td className="table-muted">{order.item}</td><td className="table-muted">{order.time}</td><td><strong>{order.total}</strong></td><td><StatusPill>{order.status}</StatusPill></td><td><button className="row-action">Ver →</button></td></tr>)}</tbody></table></section></>;
}

function Finance() {
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">visão financeira</p><h1>Financeiro <span>✦</span></h1><p className="admin-muted">Uma visão clara para decisões mais leves.</p></div><button className="admin-primary">+ Lançamento</button></div><div className="admin-kpis finance-kpis"><div className="admin-kpi kpi-main"><span>Receita recebida <b>↗ 18,4%</b></span><strong>R$ 10.840<small>,00</small></strong><small>neste mês</small></div><div className="admin-kpi"><span>A receber</span><strong>R$ 1.640<small>,00</small></strong><small>7 pedidos pendentes</small></div><div className="admin-kpi"><span>Custos</span><strong>R$ 4.182<small>,00</small></strong><small>cera, produção e fretes</small></div><div className="admin-kpi"><span>Lucro estimado</span><strong>R$ 6.658<small>,00</small></strong><b className="kpi-delta">53,3% margem</b></div></div><div className="admin-grid-two"><section className="admin-panel finance-breakdown"><div className="panel-heading"><div><h2>Resumo do mês</h2><p>Receitas e despesas por categoria</p></div></div><div className="finance-line"><span>Vendas de produtos</span><strong>R$ 12.480,00</strong><i><b style={{ width: "87%" }} /></i></div><div className="finance-line"><span>Fretes recebidos</span><strong>R$ 1.096,50</strong><i><b style={{ width: "46%" }} /></i></div><div className="finance-line negative"><span>Custos de produção</span><strong>− R$ 2.810,00</strong><i><b style={{ width: "36%" }} /></i></div><div className="finance-line negative"><span>Fretes e operação</span><strong>− R$ 1.372,00</strong><i><b style={{ width: "21%" }} /></i></div></section><section className="admin-panel conversion-card"><div className="panel-heading"><div><h2>WhatsApp conversion rate</h2><p>O KPI mais importante da Luminosity</p></div></div><div className="conversion-number">6,1<small>%</small></div><p>de visitantes iniciaram uma conversa comercial pelo WhatsApp.</p><button className="panel-link">Ver analytics completo →</button></section></div></>;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [products, setProducts] = useState(initialProducts);

  return <main className="admin-shell"><aside className="admin-sidebar"><div className="admin-logo"><span>✦</span><div>Luminosity<small>gestão</small></div></div><div className="sidebar-label">MENU PRINCIPAL</div><nav>{tabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)}><span className="nav-icon">{tab.icon}</span>{tab.label}{tab.id === "crm" && <i className="nav-count">12</i>}</button>)}</nav><div className="sidebar-label secondary-label">CONFIGURAÇÃO</div><nav><button><span className="nav-icon">⚙</span>Configurações</button><button><span className="nav-icon">?</span>Ajuda</button></nav><div className="sidebar-bottom"><div className="admin-user"><span className="admin-user-avatar">LC</span><div><strong>Luiza Carvalho</strong><small>Administradora</small></div><span>···</span></div><a className="back-to-site" href="/">← Voltar ao site</a></div></aside><section className="admin-main"><header className="admin-topbar"><button className="mobile-admin-menu">☰</button><div className="admin-breadcrumb">Luminosity <span>/</span> {tabs.find((tab) => tab.id === activeTab)?.label}</div><div className="admin-top-actions"><button className="admin-notification">♢<i /></button><div className="topbar-date">24 SET 2024</div></div></header><div className="admin-content">{activeTab === "dashboard" && <Dashboard products={products} />}{activeTab === "products" && <Products products={products} setProducts={setProducts} />}{activeTab === "orders" && <Orders />}{activeTab === "crm" && <CRM />}{activeTab === "finance" && <Finance />}</div></section></main>;
}
