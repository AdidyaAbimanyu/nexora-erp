
"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

export default function LogoutButton() {
    return (
        <form action={logoutAction}>
            <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
                <LogOut size={18} />
                <span>Logout</span>
            </button>
        </form>
    );
}
