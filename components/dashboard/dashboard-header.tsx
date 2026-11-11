import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
            <div className="relative hidden w-80 md:block">
                <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                    placeholder="Search anything..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"
                />
            </div>

            <div className="ml-auto flex items-center gap-4">
                <span className="hidden text-sm text-slate-500 sm:block">
                    November 11, 2026
                </span>
                <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <Bell size={20} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>
                <div className="h-8 w-8 rounded-full bg-slate-200" />
            </div>
        </header>
    );
}