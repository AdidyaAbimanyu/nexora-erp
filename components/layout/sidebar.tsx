import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";

import {
  LayoutDashboard,
  Users,
  Building2,
  Package,
  ShoppingCart,
  Wallet,
  FolderKanban,
  Settings,
  ChevronDown,
  BriefcaseBusiness,
  Boxes,
  ClipboardList,
} from "lucide-react";

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    ],
  },
  {
    title: "ORGANIZATION",
    items: [
      { label: "Employees", icon: Users, href: "/employees" },
      { label: "Departments", icon: Building2, href: "/departments" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Inventory", icon: Boxes, href: "/inventory" },
      { label: "Products", icon: Package, href: "/products" },
      { label: "Procurement", icon: ShoppingCart, href: "/procurement" },
      { label: "Projects", icon: FolderKanban, href: "/projects" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { label: "Transactions", icon: Wallet, href: "/transactions" },
      { label: "Reports", icon: ClipboardList, href: "/reports" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-800 bg-[#111827] text-slate-300 lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <BriefcaseBusiness size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">
            Nexora
          </h1>
          <p className="text-[10px] tracking-[0.2em] text-slate-500">
            ENTERPRISE ERP
          </p>
        </div>
      </div>

      <div className="border-b border-slate-800 p-4">
        <button className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-left hover:bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-300">
              <Building2 size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Acme Corporation</p>
              <p className="text-xs text-slate-500">Enterprise Plan</p>
            </div>
          </div>
          <ChevronDown size={16} />
        </button>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.15em] text-slate-500">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.href === "/dashboard";

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Settings size={18} />
          Settings
        </Link>

        <div className="mt-2">
          <LogoutButton />
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-slate-800 pt-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
            AA
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin Account</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
