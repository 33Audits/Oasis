"use client";

import React from "react";
import {
  AgentSummary,
  ChartPanel,
  TradingPanel,
  TopHolders,
} from "@/components/agents/dashboard";
import { useTokenDetails } from "@/hooks/useTokenDetails";
import { useBondingCurveStore } from "@/lib/store";
import { useMarketCap } from "@/hooks/useMarketCap";

const getAgentData = (
  bondingCurveAddress: `0x${string}`,
  tokenName?: string,
  tokenSymbol?: string,
  issuanceTokenAddress?: string,
  marketCap?: number
) => ({
  bondingCurveAddress,
  name: tokenName || "AGENT",
  symbol: tokenSymbol || "AGENT",
  avatar: "/33labs.jpg",
  tokenAddress: issuanceTokenAddress as `0x${string}`,
  marketCap: marketCap ?? 0,
  holders: "0",
  trades: [] as Array<{
    account: string;
    type: string;
    amountSol: string;
    amountZard: string;
    time: string;
    txn: string;
  }>,
  bondingCurveProgress: 0,
});

export default function AgentDashboard({ params }: { params: Promise<{ address: string }> }) {
  const resolvedParams = React.use(params);

  const curveDetails = useBondingCurveStore(
    (state) => state.curves[resolvedParams.address.toLowerCase()]
  );

  const { data: tokenDetails } = useTokenDetails(
    !curveDetails ? (resolvedParams.address as `0x${string}`) : undefined
  );

  // Fetch market cap if not in store
  const { data: marketCapFromHook } = useMarketCap(
    !curveDetails?.marketCap ? (resolvedParams.address as `0x${string}`) : undefined
  );

  const tokenInfo = curveDetails?.issuanceToken || tokenDetails;
  const marketCap = curveDetails?.marketCap ?? marketCapFromHook ?? 0;

  const bondingCurveData = getAgentData(
    resolvedParams.address as `0x${string}`,
    tokenInfo?.name,
    tokenInfo?.symbol,
    tokenInfo?.address,
    marketCap
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6">
        <AgentSummary bondingCurveData={bondingCurveData} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          <ChartPanel 
            bondingCurveData={{ ...bondingCurveData, tokenSymbol: tokenInfo?.symbol || "" }} 
            fundingManagerAddress={resolvedParams.address as `0x${string}`} 
          />
          <div className="space-y-4 md:space-y-6">
            <TradingPanel 
              agentData={bondingCurveData} 
              bondingCurveAddress={resolvedParams.address as `0x${string}`} 
              issuanceToken={tokenInfo?.address as `0x${string}`} 
            />
            <TopHolders holders={bondingCurveData.holders} topHolders={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}

