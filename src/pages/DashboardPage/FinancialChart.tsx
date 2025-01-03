"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMediaQuery } from "./mediaQuery";

const data = [
  { month: "Jan", revenue: 65000 },
  { month: "Fev", revenue: 70000 },
  { month: "Mar", revenue: 75000 },
  { month: "Abr", revenue: 80000 },
  { month: "Mai", revenue: 85000 },
  { month: "Jun", revenue: 90000 },
];

export function FinancialChart() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Faturamento",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[200px] md:h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: isDesktop ? 12 : 10 }} />
          <YAxis tick={{ fontSize: isDesktop ? 12 : 10 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
