"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCompactNumber, shortenTokenAddress } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { EXPLORER_URL } from "@/lib/constants";

import { useTokenHolders } from "@/hooks/useTokenHolders";

interface AgentSummaryProps {
  bondingCurveData: {
    bondingCurveAddress: `0x${string}`;
    name: string;
    symbol: string;
    avatar: string;
    marketCap: number;
  };
}

export function AgentSummary({ bondingCurveData }: AgentSummaryProps) {
  const { data: holdersData } = useTokenHolders(bondingCurveData.bondingCurveAddress);
  return (
    <div className="p-4 sm:p-6 bg-card border border-border rounded-xl">
      {/* Mobile layout */}
      <div className="sm:hidden space-y-4">
        {/* Avatar + Name + ID in one row */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 bg-black shrink-0">
            <AvatarImage
              src={bondingCurveData.avatar}
              alt={bondingCurveData.name}
            />
            <AvatarFallback className="bg-black text-white text-lg">
              S
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-2xl font-bold text-foreground leading-tight truncate">
              {bondingCurveData.name}
            </h1>
            <span className="text-lg text-red-500 whitespace-nowrap">
              ${bondingCurveData.symbol}
            </span>
          </div>
        </div>

        {/* Stats below */}
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="text-center">
            <span className="text-neutral-400 block">Market cap: </span>
            <span className="text-foreground font-medium break-words">
              {formatCompactNumber(Number(bondingCurveData.marketCap))}
            </span>
          </div>
          <div className="text-center">
            <span className="text-neutral-400 block">Holders: </span>
            <span className="text-foreground font-medium break-words">
              {holdersData?.holderCount ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center gap-6">
        <Avatar className="h-20 w-20 bg-black">
          <AvatarImage
            src={bondingCurveData.avatar}
            alt={bondingCurveData.name}
          />
          <AvatarFallback className="bg-black text-white text-xl">
            S
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              {bondingCurveData.name}
            </h1>
            <span className="inline-flex items-center gap-2 text-xl text-neutral-400">
              {shortenTokenAddress(bondingCurveData.bondingCurveAddress)}

              <Link
                href={`${EXPLORER_URL}/token/${bondingCurveData.bondingCurveAddress}`}
                target="_blank"
              >
                <ExternalLink className="h-4 w-4 text-neutral-400" />
              </Link>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="grid grid-cols-2 sm:flex sm:gap-8 text-sm gap-4">
              <div>
                <span className="text-neutral-400">Market cap: </span>
                <span className="text-foreground font-medium">
                  {formatCompactNumber(Number(bondingCurveData.marketCap))}
                </span>
              </div>

              <div>
                <span className="text-neutral-400">Holders: </span>
                <span className="text-foreground font-medium">
                  {holdersData?.holderCount ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
