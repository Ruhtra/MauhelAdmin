"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { SubscriptionTab } from "./SubscriptionTab";
import { FinancialTab } from "./FinancialTab";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("subscription");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          Dashboard
        </h1>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className={`grid w-full ${
            isMenuOpen ? "grid-cols-1" : "grid-cols-2"
          } md:grid-cols-4 mb-6`}
        >
          <TabsTrigger
            value="subscription"
            onClick={() => setIsMenuOpen(false)}
          >
            Assinaturas
          </TabsTrigger>
          <TabsTrigger value="financial" onClick={() => setIsMenuOpen(false)}>
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="other1" disabled className="hidden md:block">
            Outras
          </TabsTrigger>
          <TabsTrigger value="other2" disabled className="hidden md:block">
            Mais
          </TabsTrigger>
        </TabsList>
        <TabsContent value="subscription">
          <SubscriptionTab />
        </TabsContent>
        <TabsContent value="financial">
          <FinancialTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
