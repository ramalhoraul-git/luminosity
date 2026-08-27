import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// ✅ Verifica se está em ambiente de build da Vercel
const isVercelBuild = process.env.NEXT_PHASE === 'phase-production-build';

// ✅ Só verifica DATABASE_URL se NÃO for build
if (!isVercelBuild && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// ✅ Só cria pool se tiver DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;

export const pool = databaseUrl
  ? (globalForDb.__arenaNextJsPostgresqlPool ??
      new Pool({
        connectionString: databaseUrl,
      }))
  : null;

if (process.env.NODE_ENV !== "production" && pool) {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

// ✅ Exporta db apenas se tiver pool
export const db = pool ? drizzle(pool, { schema }) : null;

// ✅ Helper para verificar se banco está disponível
export const isDbAvailable = () => !!db && !!process.env.DATABASE_URL;

// ✅ Exporta schema para uso em outros arquivos
export * as schema from "./schema";
