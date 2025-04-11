"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12000,
  },
  {
    name: "Feb",
    total: 15000,
  },
  {
    name: "Mar",
    total: 18000,
  },
  {
    name: "Apr",
    total: 16000,
  },
  {
    name: "May",
    total: 19000,
  },
  {
    name: "Jun",
    total: 22000,
  },
  {
    name: "Jul",
    total: 24000,
  },
  {
    name: "Aug",
    total: 28000,
  },
  {
    name: "Sep",
    total: 26000,
  },
  {
    name: "Oct",
    total: 30000,
  },
  {
    name: "Nov",
    total: 32000,
  },
  {
    name: "Dec",
    total: 35000,
  },
]

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `GHS${value / 1000}k`}
        />
        <Tooltip
          formatter={(value: number) => [`GHS${value.toLocaleString()}`, "Revenue"]}
          cursor={{ fill: "rgba(15, 118, 110, 0.1)" }}
        />
        <Bar dataKey="total" fill="#0f766e" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

