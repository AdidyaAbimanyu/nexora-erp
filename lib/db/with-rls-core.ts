import { sql } from "drizzle-orm";
import { db } from "./connection";

type Transaction = Parameters<
  Parameters<typeof db.transaction>[0]
>[0];

export async function withRLS<T>(
  userId: string,
  callback: (tx: Transaction) => Promise<T>
): Promise<T> {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return db.transaction(async (tx) => {
    await tx.execute(sql`SET LOCAL ROLE authenticated`);

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

    return callback(tx);
  });
}