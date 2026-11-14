import { Suspense } from "react";
import { connection } from "next/server";

import Sidebar from "@/components/layout/sidebar";
import { requireAuth } from "@/lib/supabase/auth";

async function AuthenticatedDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  await requireAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-h-screen lg:pl-64">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading dashboard...
        </div>
      }
    >
      <AuthenticatedDashboard>
        {children}
      </AuthenticatedDashboard>
    </Suspense>
  );
}