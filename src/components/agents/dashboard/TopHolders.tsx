"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TopHoldersProps {
  holders: string;
  topHolders: Array<{
    rank: number;
    address: string;
    type: string;
    percentage: string;
  }>;
}

export function TopHolders({ holders, topHolders }: TopHoldersProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            TOP HOLDERS
          </CardTitle>
          <span className="text-sm text-neutral-400">
            {holders} TOTAL
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topHolders.map((holder, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-neutral-400">
                  #{holder.rank}
                </span>
                <div>
                  <div className="font-mono">{holder.address}</div>
                  <div className="text-xs text-neutral-400">
                    ({holder.type})
                  </div>
                </div>
              </div>
              <span className="font-medium">{holder.percentage}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
