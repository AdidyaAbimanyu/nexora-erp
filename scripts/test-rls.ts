import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;
const userId = process.env.TEST_USER_ID;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

if (!userId) {
  throw new Error("TEST_USER_ID is not defined");
}

const client = postgres(connectionString, {
  prepare: false,
});

const db = drizzle(client);

async function testRLS() {
  try {
    await db.transaction(async (tx) => {
      // 1. Gunakan role authenticated
      await tx.execute(
        sql`SET LOCAL ROLE authenticated`
      );

      // 2. Simulasikan JWT claims pengguna
      await tx.execute(sql`
        SELECT set_config(
          'request.jwt.claim.sub',
          ${userId},
          true
        )
      `);

      await tx.execute(sql`
        SELECT set_config(
          'request.jwt.claims',
          ${JSON.stringify({
            sub: userId,
            role: "authenticated",
          })},
          true
        )
      `);

      // 3. Periksa identitas dan akses RLS
      const result = await tx.execute(sql`
        SELECT
          current_user AS database_user,
          auth.uid() AS authenticated_user_id,
          (
            SELECT COUNT(*)::int
            FROM public.organizations
          ) AS visible_organizations,
          (
            SELECT json_agg(
              json_build_object(
                'id', id,
                'name', name
              )
            )
            FROM public.organizations
          ) AS organizations
      `);

      console.log("RLS test result:");
      console.log(result[0]);

      if (result[0].database_user !== "authenticated") {
        throw new Error("Database role is not authenticated");
      }

      if (result[0].authenticated_user_id !== userId) {
        throw new Error("Authenticated user ID does not match");
      }

      console.log("RLS identity verification successful!");
    });
  } catch (error) {
    console.error("RLS test failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

testRLS();