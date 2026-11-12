"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/lib/actions/auth";

const initialState = {
  success: false,
  message: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-500">
            Sign in to your Nexora ERP account.
          </p>
        </div>

        {state.message && (
          <div
            className={`rounded-md p-3 text-sm ${
              state.success
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@example.com"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Your password"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-black underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
