import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const permissions = pgTable("permissions", {
  id: uuid("id").primaryKey().defaultRandom(),

  code: varchar("code", { length: 150 })
    .notNull()
    .unique(),

  description: text("description"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});