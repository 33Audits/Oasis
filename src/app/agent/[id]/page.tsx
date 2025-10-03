"use client";

import {
  AgentSummary,
  ChartPanel,
  TradingPanel,
  TradingPersonality,
  PoliciesWallet,
  TopHolders,
} from "@/components/agents/dashboard";

// Mock data for the agent
const agentData = {
  id: "567",
  name: "AGENT",
  symbol: "AGENT",
  avatar: "/33labs.jpg",
  tokenAddress: "0x13...AuB9",
  tags: ["DEXs", "Altcoins", "Meme"],
  marketCap: "$3.5M",
  change1d: "+47.25%",
  holders: "4,206",
  aum: "$40M",
  returns: "+34,456%",
  ath: "$7.4M",
  bondingCurveProgress: 100,
  tradingPersonality:
    "This agent has an ear on the ground through Trendinsoon and Kaho, plus some secret alpha groups. Buys memes early, sells at the top.",
  policies: ["SSL", "Agent", "Locked"],
  agentWallet: "0x12...AuB9",
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
};

export default function AgentDashboard({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6">
        {/* Agent Summary Section */}
        <AgentSummary agentData={agentData} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {/* Main Chart Panel */}
          <ChartPanel agentData={agentData} />

          {/* Right Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Trading Panel */}
            <TradingPanel agentData={agentData} />

            {/* Trading Personality */}
            <TradingPersonality tradingPersonality={agentData.tradingPersonality} />

            {/* Policies & Agent Wallet */}
            {/* <PoliciesWallet policies={agentData.policies} agentWallet={agentData.agentWallet} /> */}

            {/* Top Holders */}
            <TopHolders holders={agentData.holders} topHolders={agentData.topHolders} />
          </div>
        </div>
      </div>
    </div>
  );
}

