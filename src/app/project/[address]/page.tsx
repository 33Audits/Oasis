"use client";

import React from "react";
import {
  AgentSummary,
  ChartPanel,
  TradingPanel,
  TopHolders,
} from "@/components/agents/dashboard";
import { useTokenDetails } from "@/hooks/useTokenDetails";

const getAgentData = (bondingCurveAddress: `0x${string}`, tokenName?: string, tokenSymbol?: string, issuanceTokenAddress?: string) => (
  {
  bondingCurveAddress: bondingCurveAddress,
  name: tokenName || "AGENT",
  symbol: tokenSymbol || "AGENT",
  avatar: "/33labs.jpg",
  tokenAddress: issuanceTokenAddress as `0x${string}`,
  tags: ["DEXs", "Altcoins", "Meme"],
  marketCap: "$3.5M",
  change1d: "+47.25%",
  holders: "4,206",
  aum: "$40M",
  returns: "+34,456%",
  ath: "$7.4M",
  bondingCurveProgress: 100,
  performance: {
    allTime: "+34,456%",
    thisMonth: "+150%",
    last7Days: "+100%",
  },
  trades: [
    {
      account: "0x...jprb",
      type: "Sell",
      amountSol: "1.876",
      amountZard: "80.98k",
      time: "1 hr ago",
      txn: "x0f5m",
    },
    {
      account: "2hryMU",
      type: "Sell",
      amountSol: "0.119",
      amountZard: "7393.00",
      time: "1 hr ago",
      txn: "25mxc",
    },
  ],
  topHolders: [
    { rank: 1, address: "0x...fsc7", type: "deployer", percentage: "15%" },
    { rank: 2, address: "0x...cz8a", type: "liq. pool", percentage: "12.7%" },
    { rank: 3, address: "0x...aa81", type: "liq. pool", percentage: "7.3%" },
    { rank: 4, address: "0x...bb92", type: "liq. pool", percentage: "7.3%" },
    { rank: 5, address: "0x...cc03", type: "liq. pool", percentage: "7.3%" },
  ],
});

export default function AgentDashboard({ params }: { params: Promise<{ address: string }> }) {
  const resolvedParams = React.use(params);

  const { data: tokenDetails } = useTokenDetails(resolvedParams.address as `0x${string}`);

  const bondingCurveData = getAgentData(
    resolvedParams.address as `0x${string}`,
    tokenDetails?.name,
    tokenDetails?.symbol,
    tokenDetails?.address ? tokenDetails.address as `0x${string}` : undefined
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6">
        <AgentSummary bondingCurveData={bondingCurveData} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          <ChartPanel bondingCurveData={{ ...bondingCurveData, tokenSymbol: tokenDetails?.symbol || "" }} fundingManagerAddress={resolvedParams.address as `0x${string}`} />
          <div className="space-y-4 md:space-y-6">
            <TradingPanel agentData={bondingCurveData} bondingCurveAddress={resolvedParams.address as `0x${string}`} issuanceToken={tokenDetails?.address as `0x${string}`} />
            <TopHolders holders={bondingCurveData.holders} topHolders={bondingCurveData.topHolders} />
          </div>
        </div>
      </div>
    </div>
  );
}

