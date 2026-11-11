"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 51000 },
  { month: "May", revenue: 46000 },
  { month: "Jun", revenue: 62000 },
  { month: "Jul", revenue: 58000 },
  { month: "Aug", revenue: 71000 },
  { month: "Sep", revenue: 65000 },
  { month: "Oct", revenue: 84000 },
  { month: "Nov", revenue: 78000 },
  { month: "Dec", revenue: 92000 },
];

export default function BusinessChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
