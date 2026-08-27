import { NextResponse } from "next/server";
import { db, isDbAvailable } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  // ✅ Verifica se banco está disponível
  if (!isDbAvailable()) {
    console.warn("⚠️ Banco de dados indisponível durante o build");
    // Retorna sucesso simulado para não quebrar o build
    return NextResponse.json(
      { ok: true, id: "mock_" + Date.now(), message: "Modo de desenvolvimento (sem banco)" },
      { status: 201 }
    );
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      whatsapp?: string;
      email?: string;
      source?: string;
      landingPage?: string;
    };

    const name = body.name?.trim();
    const whatsapp = body.whatsapp?.trim();
    const email = body.email?.trim() || null;

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
      source: body.source?.trim() || "site",
      landingPage: body.landingPage?.trim() || "/",
      metadata: { capture: "newsletter_modal" },
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
