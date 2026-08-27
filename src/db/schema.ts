import { integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const leadStage = pgEnum("lead_stage", [
  "novo_lead",
  "whatsapp",
  "interessado",
  "escolheu_produto",
  "aguardando_pagamento",
  "venda_realizada",
  "pos_venda",
  "recompra",
]);

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email"),
  city: text("city"),
  source: text("source").notNull().default("site"),
  landingPage: text("landing_page"),
  interestedProduct: text("interested_product"),
  stage: leadStage("stage").notNull().default("novo_lead"),
  tags: text("tags").array().notNull().default([]),
  notes: text("notes"),
  metadata: jsonb("metadata").$type<Record<string, string>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const conversionEvents = pgTable("conversion_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  event: text("event").notNull(),
  source: text("source").notNull().default("site"),
  page: text("page"),
  product: text("product"),
  value: integer("value"),
  metadata: jsonb("metadata").$type<Record<string, string>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
