
"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Nama minimal 2 karakter."),
    email: z.string().trim().email("Format email tidak valid."),
    password: z.string().min(8, "Password minimal 8 karakter."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

export async function registerAction(
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData
) {
  void prevState;
  const validatedFields = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message,
    };
  }

  const { fullName, email, password } = validatedFields.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

    if (error) {
    console.error("Supabase signup error:", {
        message: error.message,
        code: error.code,
        status: error.status,
    });

    return {
        success: false,
        message: error.message,
    };
    }

  return {
    success: true,
    message:
      "Registrasi berhasil. Silakan periksa email Anda untuk melakukan konfirmasi.",
  };
}

export async function loginAction(
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData
) {
  void prevState;

  const loginSchema = z.object({
    email: z.string().trim().email("Format email tidak valid."),
    password: z.string().min(1, "Password wajib diisi."),
  });

  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message,
    };
  }

  const { email, password } = validatedFields.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Supabase login error:", error.message);

    return {
      success: false,
      message: "Email atau password tidak valid.",
    };
  }

  return {
    success: true,
    message: "Login berhasil.",
  };
}

export async function logoutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Supabase logout error:", error.message);
    throw new Error("Gagal melakukan logout.");
  }

  redirect("/login");
}
