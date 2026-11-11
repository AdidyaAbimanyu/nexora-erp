import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import { organizations } from "./organizations";

export const roles = pgTable(
  "roles",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", { length: 100 }).notNull(),

    description: text("description"),

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
    unique("roles_org_name_unique").on(
      table.organizationId,
      table.name
    ),

    unique("roles_id_org_unique").on(
      table.id,
      table.organizationId
    ),

    index("idx_roles_organization_id").on(
      table.organizationId
    ),
  ]
);