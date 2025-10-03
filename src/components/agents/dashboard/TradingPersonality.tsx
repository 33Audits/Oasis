"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TradingPersonalityProps {
  tradingPersonality: string;
}

export function TradingPersonality({ tradingPersonality }: TradingPersonalityProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          TRADING PERSONALITY
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-400">
          {tradingPersonality}
        </p>
      </CardContent>
    </Card>
  );
}
