import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const organizations = pgTable(
  "organizations",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", { length: 255 }).notNull(),

    slug: varchar("slug", { length: 100 }).notNull().unique(),

    status: varchar("status", { length: 20 })
      .notNull()
      .default("active"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "organizations_status_check",
      sql`${table.status} IN ('active', 'suspended', 'archived')`
    ),

    check(
      "organizations_slug_format",
      sql`${table.slug} ~ '^[a-z0-9]+(-[a-z0-9]+)*$'`
    ),
  ]
);