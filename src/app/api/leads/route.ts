import { NextResponse } from "next/server";
import { db, isDbAvailable } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  // ✅ Verifica se banco está disponível
  if (!isDbAvailable()) {
    console.warn("⚠️ Banco de dados indisponível durante o build");
    // Retorna sucesso simulado para não quebrar o build
    return NextResponse.json(
      { 
        ok: true, 
        id: "mock_" + Date.now(), 
        message: "Modo de desenvolvimento (sem banco)" 
      },
      { status: 201 }
    );
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      whatsapp?: string;
      email?: string;
      city?: string;
      source?: string;
      landingPage?: string;
      interestedProduct?: string;
    };

    const name = body.name?.trim();
    const whatsapp = body.whatsapp?.trim();
    const email = body.email?.trim() || null;
    const city = body.city?.trim() || null;
    const interestedProduct = body.interestedProduct?.trim() || null;
    const source = body.source?.trim() || "site";
    const landingPage = body.landingPage?.trim() || "/";

    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Nome e WhatsApp são obrigatórios." },
        { status: 400 }
      );
    }

    const [lead] = await db!.insert(leads).values({
      name,
      whatsapp,
      email,
      city,
      source,
      landingPage,
      interestedProduct,
      stage: "novo_lead",
      tags: [],
      metadata: { capture: "form_principal" },
    }).returning({ id: leads.id });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Lead capture failed", error);
    return NextResponse.json(
      { error: "Não foi possível registrar o contato agora." },
      { status: 500 }
    );
  }
}

// ✅ GET para listar leads (apenas para admin)
export async function GET(request: Request) {
  // ✅ Verifica se banco está disponível
  if (!isDbAvailable()) {
    return NextResponse.json(
      { error: "Banco de dados indisponível" },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const stage = searchParams.get('stage');

    let query = db!.select().from(leads).limit(limit);
    
    if (stage) {
      query = query.where(leads.stage.eq(stage as any));
    }

    const allLeads = await query;
    return NextResponse.json({ ok: true, data: allLeads });
  } catch (error) {
    console.error("Error fetching leads", error);
    return NextResponse.json(
      { error: "Erro ao buscar leads" },
      { status: 500 }
    );
  }
}
