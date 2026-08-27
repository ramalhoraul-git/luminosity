import { db, isDbAvailable } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  // ✅ Verifica se banco está disponível
  if (!isDbAvailable()) {
    return Response.json({ 
      ok: false, 
      error: "Banco de dados não configurado",
      db_status: "disconnected"
    }, { status: 503 });
  }

  try {
    await db!.execute(sql`select 1`);
    return Response.json({ 
      ok: true, 
      db_status: "connected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Health check failed", error);
    return Response.json({ 
      ok: false, 
      db_status: "error",
      error: "Erro ao conectar ao banco de dados"
    }, { status: 500 });
  }
}
