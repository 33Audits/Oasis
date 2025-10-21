"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTokenHolders } from "@/hooks/useTokenHolders";
import { shortenTokenAddress } from "@/lib/utils";
import { formatEther } from "viem";

interface TopHoldersProps {
  fundingManagerAddress: `0x${string}`;
}

export function TopHolders({ fundingManagerAddress }: TopHoldersProps) {
  const { data: holdersData, isLoading } = useTokenHolders(fundingManagerAddress);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <CardTitle className="text-sm font-medium">
            TOP HOLDERS
          </CardTitle>
          <span className="text-xs md:text-sm text-neutral-400">
            {holdersData?.holderCount ?? 0} TOTAL
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4 text-neutral-400">
            Loading holders...
          </div>
        ) : !holdersData || holdersData.holders.length === 0 ? (
          <div className="text-center py-4 text-neutral-400">
            No holders found
          </div>
        ) : (
          <div className="space-y-3">
            {holdersData.holders.slice(0, 5).map((holder, idx) => (
              <div
                key={holder.holderAddress}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-2 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-border/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400 text-sm">
                    #{idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-sm truncate">
                      {shortenTokenAddress(holder.holderAddress as `0x${string}`)}
                    </div>
                  </div>
                </div>
                <span className="font-medium text-sm self-end sm:self-auto">
                  {parseFloat(Number(formatEther(BigInt(holder.balance))).toFixed(6))}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
