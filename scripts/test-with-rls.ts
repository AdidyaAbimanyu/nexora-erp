
import { sql } from "drizzle-orm";
import { withRLS } from "@/lib/db/with-rls-core";
import { organizations } from "@/lib/db/schema";

async function testUser(
  label: string,
  userId: string,
  expectedOrganizationId: string
) {
  console.log(`\nTesting ${label}...`);

  const result = await withRLS(userId, async (tx) => {
    // Periksa identitas dan akses database
    const diagnostics = await tx.execute(sql`
      SELECT
        current_user AS database_role,
        session_user AS session_role,
        auth.uid()::text AS auth_uid,
        current_setting('request.jwt.claim.sub', true) AS claim_sub,
        (
          SELECT COUNT(*)::int
          FROM public.memberships
        ) AS visible_memberships,
        (
          SELECT COUNT(*)::int
          FROM public.organizations
        ) AS visible_organizations,
        public.is_organization_member(
          ${expectedOrganizationId}::uuid
        ) AS is_organization_member;
    `);

    console.log("Database diagnostics:");
    console.table(diagnostics);

    // Ambil organisasi yang dapat diakses
    return tx
      .select({
        id: organizations.id,
        name: organizations.name,
      })
      .from(organizations);
  });

  console.log("Accessible organizations:");
  console.table(result);

  console.log("Total:", result.length);

  return result;
}

async function main() {
  const userA = process.env.TEST_USER_A_ID;
  const userB = process.env.TEST_USER_B_ID;

  if (!userA || !userB) {
    throw new Error("Test user IDs are not configured");
  }

  const resultA = await testUser(
    "User A",
    userA,
    "35de0391-4af6-4548-9689-0e2894e14b78"
  );

  const resultB = await testUser(
    "User B",
    userB,
    "33104d1c-d746-4362-978a-06f0ac507cfa"
  );

  const userAPass = resultA.some(
    (item) => item.id === "35de0391-4af6-4548-9689-0e2894e14b78"
  );

  const userBPass = resultB.some(
    (item) => item.id === "33104d1c-d746-4362-978a-06f0ac507cfa"
  );

  if (!userAPass || !userBPass) {
    throw new Error(
      `Isolation test failed. User A: ${userAPass}, User B: ${userBPass}`
    );
  }

  console.log("\nSUCCESS: Both users can access their own organizations.");
}

main().catch((error) => {
  console.error("Test failed:", error);
  process.exitCode = 1;
});
