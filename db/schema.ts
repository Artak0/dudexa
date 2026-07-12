import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const analyticsEvents = sqliteTable("analytics_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventName: text("event_name").notNull(),
  path: text("path").notNull(),
  language: text("language").notNull().default("en"),
  product: text("product"),
  sessionId: text("session_id").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("events_created_at_idx").on(table.createdAt),
  index("events_name_idx").on(table.eventName),
]);

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  language: text("language").notNull().default("en"),
  source: text("source").notNull().default("website"),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("leads_created_at_idx").on(table.createdAt),
  index("leads_status_idx").on(table.status),
]);
