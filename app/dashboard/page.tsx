import BusinessChart from "@/components/dashboard/business-chart";

import {
  Users,
  Wallet,
  Package,
  FolderKanban,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Bell,
  CalendarDays,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "248",
    change: "+12.5%",
    positive: true,
    icon: Users,
    description: "Compared to last month",
  },
  {
    title: "Total Revenue",
    value: "$84,250",
    change: "+8.2%",
    positive: true,
    icon: Wallet,
    description: "Compared to last month",
  },
  {
    title: "Inventory Items",
    value: "1,420",
    change: "-2.4%",
    positive: false,
    icon: Package,
    description: "Compared to last month",
  },
  {
    title: "Active Projects",
    value: "36",
    change: "+4.6%",
    positive: true,
    icon: FolderKanban,
    description: "Compared to last month",
  },
];

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

const projects = [
  {
    name: "Website Redesign",
    department: "Marketing",
    progress: 75,
    status: "In Progress",
  },
  {
    name: "ERP Implementation",
    department: "Information Technology",
    progress: 45,
    status: "In Progress",
  },
  {
    name: "Office Expansion",
    department: "Operations",
    progress: 90,
    status: "Near Completion",
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
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

      <div className="space-y-8 p-6 lg:p-8">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-500">
              Tuesday, November 11, 2026
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Good morning, Administrator
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here is what is happening across your organization today.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
            <Plus size={17} />
            Create New
          </button>
        </section>

        {/* Statistics */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const ChangeIcon = stat.positive
              ? ArrowUpRight
              : ArrowDownRight;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                    <Icon size={19} />
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </h2>
                  <span
                    className={`flex items-center text-xs font-semibold ${
                      stat.positive ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    <ChangeIcon size={15} />
                    {stat.change}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main content */}
        <section className="grid gap-6 xl:grid-cols-3">
          {/* Chart */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Business Overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Revenue performance throughout the year
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
                <CalendarDays size={14} />
                This Year
              </button>
            </div>

            <div className="mt-8 h-64">
              <BusinessChart />
            </div>
          </div>

          {/* Activities */}
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
        </section>

        {/* Projects */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Project Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Track progress across active projects
              </p>
            </div>

            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-150 text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-400">
                  <th className="pb-4 font-medium">Project Name</th>
                  <th className="pb-4 font-medium">Department</th>
                  <th className="pb-4 font-medium">Progress</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.name}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-5 text-sm font-medium text-slate-800">
                      {project.name}
                    </td>

                    <td className="py-5 text-sm text-slate-500">
                      {project.department}
                    </td>

                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">
                          {project.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="py-5">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}