import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SubscriptionChart } from "./SubscriptionChart"

export function SubscriptionTab() {
  // Aqui você deve substituir por dados reais da sua aplicação
  const totalSubscriptions = 1234

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Total de Assinaturas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalSubscriptions}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Evolução de Assinaturas</CardTitle>
        </CardHeader>
        <CardContent>
          <SubscriptionChart />
        </CardContent>
      </Card>
    </div>
  )
}

