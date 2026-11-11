import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  unique,
  foreignKey,
  index,
} from "drizzle-orm/pg-core";

import { organizations } from "./organizations";
import { users } from "./users";
import { roles } from "./roles";

export const memberships = pgTable(
  "memberships",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    roleId: uuid("role_id").notNull(),

    status: varchar("status", { length: 20 })
      .notNull()
      .default("active"),

    joinedAt: timestamp("joined_at", {
      withTimezone: true,
    }).defaultNow(),

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
    unique("memberships_org_user_unique").on(
      table.organizationId,
      table.userId
    ),

    foreignKey({
      name: "memberships_role_org_fk",
      columns: [table.roleId, table.organizationId],
      foreignColumns: [roles.id, roles.organizationId],
    }).onDelete("restrict"),

    index("idx_memberships_user_id").on(table.userId),

    index("idx_memberships_organization_id").on(
      table.organizationId
    ),

    index("idx_memberships_role_id").on(table.roleId),
  ]
);