"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Activity } from "lucide-react";

export function PortfolioOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-neutral-950 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-neutral-50">
            Asset Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-neutral-900 rounded-lg">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <div className="text-white font-semibold">Chart</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-400">ETH</span>
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                  <span className="text-neutral-50">40%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-400">USDC</span>
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="text-neutral-50">25%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-400">BTC</span>
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full">
                    <div
                      className="h-2 bg-orange-500 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                  <span className="text-neutral-50">20%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-400">Other</span>
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full">
                    <div
                      className="h-2 bg-purple-500 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                  <span className="text-neutral-50">15%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-950 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-neutral-50">
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-neutral-400">24h Change</span>
              </div>
              <span className="text-green-500 font-medium">+5.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-neutral-400">7d Change</span>
              </div>
              <span className="text-green-500 font-medium">+18.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-neutral-400">Monthly Return</span>
              </div>
              <span className="text-green-500 font-medium">+12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-neutral-400">
                  Active Strategies
                </span>
              </div>
              <span className="text-neutral-50 font-medium">17</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
