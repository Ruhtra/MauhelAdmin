import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", subscriptions: 100 },
  { month: "Fev", subscriptions: 120 },
  { month: "Mar", subscriptions: 150 },
  { month: "Abr", subscriptions: 180 },
  { month: "Mai", subscriptions: 220 },
  { month: "Jun", subscriptions: 250 },
]

export function SubscriptionChart() {
  return (
    <ChartContainer
      config={{
        subscriptions: {
          label: "Assinaturas",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="subscriptions" stroke="var(--color-subscriptions)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

