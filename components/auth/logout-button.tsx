
"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function LogoutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm Logout
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to log out of your account?
            You will need to sign in again to access your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <form action={logoutAction}>
            <AlertDialogAction type="submit">
              Logout
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
