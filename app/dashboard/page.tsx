import BusinessChart from "@/components/dashboard/business-chart";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import StatsCard from "@/components/dashboard/stats-card";
import RecentActivities from "@/components/dashboard/recent-activities";
import ProjectOverview from "@/components/dashboard/project-overview";

import {
  Plus,
  CalendarDays,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />

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
        <StatsCard />

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
          <RecentActivities />
        </section>

        {/* Projects */}
        <ProjectOverview />
        
      </div>
    </div>
  );
}