import { Users, Package, FolderKanban, MoreHorizontal } from "lucide-react";

const activities = [
    {
        title: "New employee onboarded",
        description: "Sarah Johnson joined the HR department",
        time: "10 minutes ago",
        color: "bg-blue-100 text-blue-600",
        icon: Users,
    },
    {
        title: "Purchase order approved",
        description: "PO-2026-0842 was approved by Finance",
        time: "35 minutes ago",
        color: "bg-emerald-100 text-emerald-600",
        icon: Package,
    },
    {
        title: "Project updated",
        description: "Website Redesign reached 75% completion",
        time: "1 hour ago",
        color: "bg-violet-100 text-violet-600",
        icon: FolderKanban,
    },
];

export default function RecentActivities() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-slate-900">
                        Recent Activities
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Latest organization updates
                    </p>
                </div>
                <button className="text-slate-400 hover:text-slate-700">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="mt-6 space-y-6">
                {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                        <div key={activity.title} className="flex gap-3">
                            <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activity.color}`}
                            >
                                <Icon size={17} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800">
                                    {activity.title}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {activity.description}
                                </p>
                                <p className="mt-2 text-[11px] text-slate-400">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}