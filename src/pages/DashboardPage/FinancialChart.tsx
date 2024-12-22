import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", revenue: 65000 },
  { month: "Fev", revenue: 70000 },
  { month: "Mar", revenue: 75000 },
  { month: "Abr", revenue: 80000 },
  { month: "Mai", revenue: 85000 },
  { month: "Jun", revenue: 90000 },
]

export function FinancialChart() {
  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Faturamento",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

