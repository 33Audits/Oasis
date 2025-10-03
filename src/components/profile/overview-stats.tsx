"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Vault } from "lucide-react";
import { FaMicrochip } from "react-icons/fa6";

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-neutral-950 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-neutral-400">
            Total Portfolio Value
          </CardTitle>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neutral-50">
            $145,892.50
          </div>
          <p className="text-xs text-green-500">+12.5% this month</p>
        </CardContent>
      </Card>

      <Card className="bg-neutral-950 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-neutral-400">
            Active Agents
          </CardTitle>
          <FaMicrochip className="w-4 h-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neutral-50">8</div>
          <p className="text-xs text-neutral-400">3 training</p>
        </CardContent>
      </Card>

      <Card className="bg-neutral-950 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-neutral-400">
            Total Vaults
          </CardTitle>
          <Vault className="w-4 h-4 text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neutral-50">5</div>
          <p className="text-xs text-neutral-400">$85,420 capital</p>
        </CardContent>
      </Card>

      <Card className="bg-neutral-950 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-neutral-400">
            Active Markets
          </CardTitle>
          <TrendingUp className="w-4 h-4 text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neutral-50">3</div>
          <p className="text-xs text-neutral-400">2 completing</p>
        </CardContent>
      </Card>
    </div>
  );
}
