"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Receipt } from "lucide-react";
import { FaMicrochip } from "react-icons/fa6";

interface OverviewStatsProps {
  totalValue?: string;
  activeCurves?: number;
  totalTransactions?: number;
  totalHolders?: number;
}

export function OverviewStats({ totalValue = "$0", activeCurves = 0, totalTransactions = 0, totalHolders = 0 }: OverviewStatsProps) {
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
            {totalValue}
          </div>
          <p className="text-xs text-neutral-400">Total portfolio value</p>
        </CardContent>
      </Card>

      <Card className="bg-neutral-950 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-neutral-400">
            Bonding Curves
          </CardTitle>
          <FaMicrochip className="w-4 h-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neutral-50">{activeCurves}</div>
          <p className="text-xs text-neutral-400">Active curves</p>
        </CardContent>
      </Card>

      <Card className="bg-neutral-950 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-neutral-400">
            Total Holders
          </CardTitle>
          <TrendingUp className="w-4 h-4 text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neutral-50">{totalHolders}</div>
          <p className="text-xs text-neutral-400">Across all curves</p>
        </CardContent>
      </Card>

      <Card className="bg-neutral-950 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-neutral-400">
            Transactions
          </CardTitle>
          <Receipt className="w-4 h-4 text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-neutral-50">{totalTransactions}</div>
          <p className="text-xs text-neutral-400">Total transactions</p>
        </CardContent>
      </Card>
    </div>
  );
}
