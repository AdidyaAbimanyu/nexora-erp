"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth";

const initialState = {
  success: false,
  message: "",
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-gray-500">
            Register to get started with Nexora ERP.
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

        {!state.success && (
          <form action={formAction} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                minLength={2}
                autoComplete="name"
                placeholder="Your full name"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

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
                minLength={8}
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Repeat your password"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-black underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
