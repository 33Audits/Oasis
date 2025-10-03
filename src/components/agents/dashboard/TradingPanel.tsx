"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TradingPanelProps {
  agentData: {
    symbol: string;
    bondingCurveProgress: number;
  };
}

export function TradingPanel({ agentData }: TradingPanelProps) {
  const [tradeTab, setTradeTab] = useState("SELL");
  const [buyAmount, setBuyAmount] = useState("1");
  const [sellAmount, setSellAmount] = useState("10");

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardContent className="p-0">
        {/* Trading Interface Header */}
        <div className="p-6 pb-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Trade {agentData.symbol}</h3>
          <p className="text-sm text-neutral-400">Execute buy and sell orders</p>
        </div>

        <Tabs value={tradeTab} onValueChange={setTradeTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2 bg-muted h-12">
              <TabsTrigger
                value="BUY"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-medium"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                BUY
              </TabsTrigger>
              <TabsTrigger
                value="SELL"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-medium"
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                SELL
              </TabsTrigger>
            </TabsList>
          </div>

          {/* BUY tab */}
          <TabsContent value="BUY" className="px-6 pb-6 space-y-4 mt-6">
            <div className="space-y-3">
              <div className="relative">
                <Input
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  placeholder="0.0"
                  className="text-xl h-14 pl-4 pr-16 border-2 focus:border-green-500 transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-medium">
                  ETH
                </div>
              </div>

              <div className="text-sm text-neutral-400 text-center">
                ≈ $3,420.00 USD
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["0.1", "1", "10"].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="h-10 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                    onClick={() => setBuyAmount(amount)}
                  >
                    {amount} ETH
                  </Button>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-sm text-green-800">
                  <div className="flex justify-between items-center">
                    <span>You will receive:</span>
                    <span className="font-semibold">≈ 1,234 {agentData.symbol}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Est. slippage:</span>
                    <span className="font-semibold text-green-600">0.2%</span>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium text-base">
                <TrendingUp className="w-4 h-4 mr-2" />
                PLACE BUY ORDER
              </Button>
            </div>
          </TabsContent>

          {/* SELL tab */}
          <TabsContent value="SELL" className="px-6 pb-6 space-y-4 mt-6">
            <div className="space-y-3">
              <div className="relative">
                <Input
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder="0.0"
                  className="text-xl h-14 pl-4 pr-16 border-2 focus:border-orange-500 transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-medium">
                  {agentData.symbol}
                </div>
              </div>

              <div className="text-sm text-neutral-400 text-center">
                ≈ $342.00 USD
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["1", "5", "10"].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="h-10 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors"
                    onClick={() => setSellAmount(amount)}
                  >
                    {amount}K {agentData.symbol}
                  </Button>
                ))}
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="text-sm text-orange-800">
                  <div className="flex justify-between items-center">
                    <span>You will receive:</span>
                    <span className="font-semibold">≈ 0.1 ETH</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Est. slippage:</span>
                    <span className="font-semibold text-orange-600">0.3%</span>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium text-base">
                <TrendingDown className="w-4 h-4 mr-2" />
                PLACE SELL ORDER
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bonding Curve Status */}
        <div className="px-6 py-4 bg-muted/50 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Bonding Curve Progress</span>
            <span className="text-sm text-neutral-400">{agentData.bondingCurveProgress}%</span>
          </div>
          <Progress
            value={agentData.bondingCurveProgress}
            className="h-2 mb-2"
          />
          <div className="text-center text-sm text-green-400 font-medium">
            Token has graduated!
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
