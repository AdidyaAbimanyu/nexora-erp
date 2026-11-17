
import { Suspense } from "react";
import { redirectIfAuthenticated } from "@/lib/supabase/auth";
import LoginForm from "./login-form";

async function LoginPageContent() {
  await redirectIfAuthenticated();

  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-gray-500">Loading...</p>
        </main>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
