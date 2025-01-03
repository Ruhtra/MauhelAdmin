"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMediaQuery } from "./mediaQuery";

const data = [
  { month: "Jan", subscriptions: 100 },
  { month: "Fev", subscriptions: 120 },
  { month: "Mar", subscriptions: 150 },
  { month: "Abr", subscriptions: 180 },
  { month: "Mai", subscriptions: 220 },
  { month: "Jun", subscriptions: 250 },
];

export function SubscriptionChart() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <ChartContainer
      config={{
        subscriptions: {
          label: "Assinaturas",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[200px] md:h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: isDesktop ? 12 : 10 }} />
          <YAxis tick={{ fontSize: isDesktop ? 12 : 10 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="subscriptions"
            stroke="var(--color-subscriptions)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
