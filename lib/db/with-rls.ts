import "server-only";

import { requireAuth } from "@/lib/supabase/auth";
import { withRLS as withRLSCore } from "./with-rls-core";

type Transaction = Parameters<
  Parameters<typeof withRLSCore>[1]
>[0];

export async function withRLS<T>(
  callback: (tx: Transaction) => Promise<T>
): Promise<T> {
  const user = await requireAuth();

  return withRLSCore(user.id, callback);
}