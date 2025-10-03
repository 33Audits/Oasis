"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Vault,
  TrendingUp,
  Receipt,
  BookOpen,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import { FaMicrochip } from "react-icons/fa6";
import { usePrivy } from "@privy-io/react-auth";
import {
  OverviewStats,
  AgentManagement,
  PortfolioOverview,
  AgentVaults,
  FundingMarkets,
  RecentTransactions,
} from "@/components/profile";

export default function ProfileDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const { user } = usePrivy();
  const walletAddress = user?.wallet?.address;
  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Not Connected";

  const handleNavClick = (section: string) => {
    setActiveNav(section);
    // Close mobile sidebar when navigating
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
    if (typeof window !== "undefined" && (window as any).smoothScrollTo) {
      (window as any).smoothScrollTo(`#${section}`);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, section: "overview" },
    { name: "My Agents", icon: FaMicrochip, section: "agents" },
    { name: "Agent Vaults", icon: Vault, section: "vaults" },
    { name: "Funding Markets", icon: TrendingUp, section: "markets" },
    { name: "Transactions", icon: Receipt, section: "transactions" },
    { name: "Knowledge Base", icon: BookOpen, section: "knowledge" },
    { name: "Settings", icon: Settings, section: "settings" },
  ];

  const agents = [
    {
      id: 1,
      name: "Trading Alpha",
      initials: "TA",
      status: "Ready",
      portfolio: "$24,580",
      strategies: "3 active",
      lastAction: "2 hours ago",
      canTrain: false,
    },
    {
      id: 2,
      name: "Yield Optimizer",
      initials: "YO",
      status: "Training",
      portfolio: "$18,920",
      strategies: "2 active",
      lastAction: "5 hours ago",
      canTrain: true,
    },
    {
      id: 3,
      name: "DeFi Master",
      initials: "DM",
      status: "Ready",
      portfolio: "$32,150",
      strategies: "5 active",
      lastAction: "1 hour ago",
      canTrain: false,
    },
  ];

  const vaults = [
    {
      id: 1,
      name: "Alpha Trading Vault",
      agent: "Trading Alpha",
      capital: "$24,580",
      assets: "ETH, USDC",
      status: "Active",
    },
    {
      id: 2,
      name: "Yield Optimization Vault",
      agent: "Yield Optimizer",
      capital: "$18,920",
      assets: "USDC, DAI",
      status: "Active",
    },
    {
      id: 3,
      name: "DeFi Strategy Vault",
      agent: "DeFi Master",
      capital: "$32,150",
      assets: "ETH, BTC, USDC",
      status: "Active",
    },
    {
      id: 4,
      name: "Arbitrage Vault",
      agent: "Arbitrage Scout",
      capital: "$28,470",
      assets: "Multi-chain",
      status: "Active",
    },
    {
      id: 5,
      name: "Risk Hedging Vault",
      agent: "Risk Manager",
      capital: "$15,600",
      assets: "ETH, USDC",
      status: "Paused",
    },
  ];

  const markets = [
    {
      id: 1,
      title: "Alpha Trading Initial Funding",
      agent: "Trading Alpha",
      progress: 85,
      raised: "$42,500",
      target: "$50,000",
      status: "Active",
    },
    {
      id: 2,
      title: "Yield Optimizer Launch",
      agent: "Yield Optimizer",
      progress: 100,
      raised: "$30,000",
      target: "$30,000",
      status: "Completed",
    },
    {
      id: 3,
      title: "DeFi Master Expansion",
      agent: "DeFi Master",
      progress: 45,
      raised: "$22,500",
      target: "$50,000",
      status: "Active",
    },
    {
      id: 4,
      title: "Liquidity Hunter Bootstrap",
      agent: "Liquidity Hunter",
      progress: 15,
      raised: "$3,000",
      target: "$20,000",
      status: "Active",
    },
  ];

  const transactions = [
    {
      id: 1,
      time: "2 min ago",
      agent: "Trading Alpha",
      type: "Spot Trade",
      assets: "ETH → USDC",
      value: "$5,420",
      status: "Completed",
    },
    {
      id: 2,
      time: "15 min ago",
      agent: "Yield Optimizer",
      type: "Yield Strategy",
      assets: "USDC",
      value: "$3,200",
      status: "Completed",
    },
    {
      id: 3,
      time: "1 hour ago",
      agent: "DeFi Master",
      type: "Rebalance",
      assets: "Multi-asset",
      value: "$12,850",
      status: "Completed",
    },
    {
      id: 4,
      time: "2 hours ago",
      agent: "Arbitrage Scout",
      type: "Spot Trade",
      assets: "BTC → ETH",
      value: "$8,900",
      status: "Completed",
    },
    {
      id: 5,
      time: "3 hours ago",
      agent: "Trading Alpha",
      type: "Liquidity Provision",
      assets: "ETH/USDC",
      value: "$6,500",
      status: "Pending",
    },
    {
      id: 6,
      time: "5 hours ago",
      agent: "Yield Optimizer",
      type: "Yield Strategy",
      assets: "DAI",
      value: "$4,100",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-50">
      {/* Mobile Sidebar Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ease-in-out ${
          !sidebarCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarCollapsed(true)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 min-h-screen bg-neutral-950 border-r border-neutral-800 z-40 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-16 -translate-x-full md:w-16 md:translate-x-0" : "w-64 translate-x-0"
        } ${sidebarCollapsed ? "md:block" : "block"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`border-b border-neutral-800 flex items-center ${
            sidebarCollapsed ? "justify-center p-3" : "justify-between p-3 sm:p-4"
          }`}>
            {sidebarCollapsed ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(false)}
                className="h-8 w-8 p-0 hover:bg-neutral-800"
                title="Expand sidebar"
              >
                <Menu className="w-4 h-4" />
              </Button>
            ) : (
              <>
                <div className="flex items-center gap-3"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(true)}
                  className="h-8 w-8 p-0 hover:bg-neutral-800"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Navigation */}
          <nav className={`flex-1 ${sidebarCollapsed ? "p-2" : "p-3 sm:p-4"}`}>
            <ul className={`space-y-1 ${sidebarCollapsed ? "" : "sm:space-y-2"}`}>
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.section)}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? "justify-center px-2" : "gap-2 sm:gap-3 px-2 sm:px-3 justify-start"
                    } py-2 rounded-lg transition-colors text-left ${
                      activeNav === item.section
                        ? "bg-neutral-800 border border-neutral-700 text-blue-400"
                        : "text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800"
                    }`}
                    title={sidebarCollapsed ? item.name : ""}
                  >
                    <item.icon className={`${
                      sidebarCollapsed ? "w-5 h-5" : "w-4 h-4 sm:w-5 sm:h-5"
                    } flex-shrink-0`} />
                    {!sidebarCollapsed && (
                      <span className="text-sm sm:text-base truncate">{item.name}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300 ${
        sidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-64"
      }`}>
        {/* Header */}
        <header className="bg-neutral-950 border-b border-neutral-800 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="md:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-neutral-400">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-neutral-50">Overview</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  placeholder="Search agents, vaults..."
                  className="pl-10 w-48 sm:w-64 bg-neutral-900 border-neutral-700 text-neutral-50 placeholder:text-neutral-400"
                />
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <div id="overview" className="pt-6 sm:pt-8">
              <OverviewStats />
            </div>

            <div id="agents" className="pt-6 sm:pt-8">
              <AgentManagement agents={agents} />
            </div>

            <div id="vaults" className="pt-6 sm:pt-8">
              <AgentVaults vaults={vaults} />
            </div>

            <div id="markets" className="pt-6 sm:pt-8">
              <FundingMarkets markets={markets} />
            </div>

            <div id="transactions" className="pt-6 sm:pt-8">
              <RecentTransactions transactions={transactions} />
            </div>

            {/* Placeholder sections for future implementation */}
            <div id="knowledge" className="min-h-screen flex items-center justify-center pt-6 sm:pt-8">
              <div className="text-center text-neutral-400 px-4">
                <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Knowledge Base</h3>
                <p className="text-sm sm:text-base">Coming soon...</p>
              </div>
            </div>

            <div id="settings" className="min-h-screen flex items-center justify-center pt-6 sm:pt-8">
              <div className="text-center text-neutral-400 px-4">
                <Settings className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Settings</h3>
                <p className="text-sm sm:text-base">Coming soon...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
