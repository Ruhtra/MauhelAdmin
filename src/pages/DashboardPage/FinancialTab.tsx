import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialChart } from "./FinancialChart"

export function FinancialTab() {
  // Substitua estes valores por dados reais da sua aplicação
  const annualRevenue = 1000000
  const monthlyRevenue = 85000
  const averageTicket = 250

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Faturamento Anual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ {annualRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Faturamento Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ {monthlyRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ {averageTicket.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Faturamento Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <FinancialChart />
        </CardContent>
      </Card>
    </div>
  )
}

