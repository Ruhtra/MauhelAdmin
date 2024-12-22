import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { SubscriptionTab } from "./SubscriptionTab";
import { FinancialTab } from "./FinancialTab";

export function DashboardPage() {
  return  <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="container mx-auto p-6"
>
  <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
  <Tabs defaultValue="subscription" className="w-full">
    <TabsList className="grid w-full grid-cols-4 mb-6">
      <TabsTrigger value="subscription">Assinaturas</TabsTrigger>
      <TabsTrigger value="financial">Financeiro</TabsTrigger>
      <TabsTrigger value="other1" disabled>Outras</TabsTrigger>
      <TabsTrigger value="other2" disabled>Mais</TabsTrigger>
    </TabsList>
    <TabsContent value="subscription">
      <SubscriptionTab />
    </TabsContent>
    <TabsContent value="financial">
      <FinancialTab />
    </TabsContent>
  </Tabs>
</motion.div>;
}
