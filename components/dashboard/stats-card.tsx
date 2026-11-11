import { Users, Wallet, Package, FolderKanban, ArrowUpRight, ArrowDownRight } from "lucide-react";

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

export default function statsCard () {
    return (
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
    );
}