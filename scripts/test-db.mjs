import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = postgres(connectionString, {
  prepare: false,
});

try {
  const result = await sql`
    SELECT
      current_user AS database_user,
      r.rolsuper AS is_superuser,
      r.rolbypassrls AS bypasses_rls,
      (c.relowner = r.oid) AS is_table_owner,
      c.relrowsecurity AS rls_enabled,
      c.relforcerowsecurity AS force_rls,
      (
        SELECT COUNT(*)::int
        FROM public.organizations
      ) AS visible_organizations
    FROM pg_roles r
    CROSS JOIN pg_class c
    WHERE r.rolname = current_user
      AND c.oid = 'public.organizations'::regclass;
  `;

  console.log("RLS diagnostic result:");
  console.log(result[0]);

  console.log("Database connection successful!");
  console.log(result[0]);
} catch (error) {
  console.error("Database connection failed:");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}

