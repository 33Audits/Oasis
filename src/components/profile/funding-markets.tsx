"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

interface Market {
  id: number;
  title: string;
  agent: string;
  progress: number;
  raised: string;
  target: string;
  status: string;
}

interface FundingMarketsProps {
  markets: Market[];
}

export function FundingMarkets({ markets }: FundingMarketsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-50">
          Funding Markets
        </h2>
        <Button
          variant="outline"
          className="border-neutral-700 hover:bg-neutral-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Deploy New Market
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {markets.map((market) => (
          <Card
            key={market.id}
            className="bg-neutral-950 border-neutral-800"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-50">
                    {market.title}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    by {market.agent}
                  </p>
                </div>
                <Badge
                  variant={
                    market.status === "Active" ? "default" : "secondary"
                  }
                  className={
                    market.status === "Active"
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : ""
                  }
                >
                  {market.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Progress</span>
                  <span className="text-neutral-50">
                    {market.progress}%
                  </span>
                </div>
                <Progress value={market.progress} className="h-2" />
                <div className="flex justify-between">
                  <span className="text-neutral-300 font-mono">
                    {market.raised}
                  </span>
                  <span className="text-neutral-400">
                    / {market.target}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-neutral-700 hover:bg-neutral-800"
                  size="sm"
                >
                  View Market
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
