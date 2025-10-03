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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <CardTitle className="text-sm font-medium">
            TOP HOLDERS
          </CardTitle>
          <span className="text-xs md:text-sm text-neutral-400">
            {holders} TOTAL
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topHolders.map((holder, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-2 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-border/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 text-sm">
                  #{holder.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm truncate">{holder.address}</div>
                  <div className="text-xs text-neutral-400">
                    ({holder.type})
                  </div>
                </div>
              </div>
              <span className="font-medium text-sm self-end sm:self-auto">{holder.percentage}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
