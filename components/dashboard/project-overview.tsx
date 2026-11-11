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

export default function ProjectOverview() {
    return (
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
    );
}