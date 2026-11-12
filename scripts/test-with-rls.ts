import { withRLS } from "@/lib/db/with-rls-core";import { organizations } from "@/lib/db/schema";

async function testUser(label: string, userId: string) {
  console.log(`\nTesting ${label}...`);

  const result = await withRLS(userId, async (tx) => {
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

  const resultA = await testUser("User A", userA);
  const resultB = await testUser("User B", userB);

  const organizationsA = resultA.map((item) => item.id);
  const organizationsB = resultB.map((item) => item.id);

  const hasOverlap = organizationsA.some((id) =>
    organizationsB.includes(id)
  );

  console.log("\nIsolation test result:");

  if (hasOverlap) {
    throw new Error(
      "Unexpected: both users can access the same organization"
    );
  }

  console.log("SUCCESS: Organization data is isolated!");
}

main().catch((error) => {
  console.error("Test failed:", error);
  process.exitCode = 1;
});