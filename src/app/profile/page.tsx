"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Receipt,
  BookOpen,
  Settings,
  Bell,
  Search,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { FaMicrochip } from "react-icons/fa6";
import { usePrivy } from "@privy-io/react-auth";
import { OverviewStats, RecentTransactions } from "@/components/profile";
import { useCreatorData } from "@/hooks/useCreatorData";
import { useMultipleMarketCaps } from "@/hooks/useMarketCap";
import { formatCompactNumber } from "@/lib/utils";
import Image from "next/image";
import { useZeroDev } from "@/providers/ZeroDev";

export default function ProfileDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const { user } = usePrivy();
  const walletAddress = user?.wallet?.address as `0x${string}` | undefined;

  const { smartAccountAddress } = useZeroDev();

  const {
    data: walletData,
    isLoading,
    error,
  } = useCreatorData(
    (walletAddress as `0x${string}`)
  );

  const { data: smartAccountData } = useCreatorData(
    smartAccountAddress as `0x${string}`
  );

  const creatorData = {
    bondingCurves: [
      ...(walletData?.bondingCurves || []),
      ...(smartAccountData?.bondingCurves || []),
    ],
    transactions: [
      ...(walletData?.transactions || []),
      ...(smartAccountData?.transactions || []),
    ],
  };

  const fundingManagerAddresses =
    creatorData?.bondingCurves
      ?.map(
        (curve: unknown) =>
          (curve as any).fundingManagerAddress as `0x${string}`
      )
      .filter(Boolean) || [];

  const { data: marketCaps } = useMultipleMarketCaps(fundingManagerAddresses);

  const projects =
    creatorData?.bondingCurves?.map((curve: unknown, index: number) => {
      const fundingManagerAddress = (curve as any)
        .fundingManagerAddress as `0x${string}`;
      const marketCap = marketCaps?.[fundingManagerAddress];
      const displayMarketCap =
        marketCap !== null && marketCap !== undefined
          ? `$${formatCompactNumber(marketCap)}`
          : `$${formatCompactNumber((curve as any).totalBuyVolume / 1e18)}`;

      return {
        id: index + 1,
        name: (curve as any).tokenName || `Token ${index + 1}`,
        symbol: (curve as any).tokenSymbol || `T${index + 1}`,
        address: (curve as any).orchestratorAddress,
        marketCap: displayMarketCap,
        holders: `${(curve as any).holderCount} holders`,
        holderCount: (curve as any).holderCount,
        createdAt: new Date(
          Number((curve as any).createdAt) * 1000
        ).toLocaleDateString(),
        status: (curve as any).holderCount > 0 ? "Active" : "Inactive",
        currentPrice: `$${(Number((curve as any).currentPrice) / 1e18).toFixed(
          4
        )}`,
      };
    }) || [];

  // Transform transactions data
  const transactions =
    creatorData?.transactions?.map((tx: unknown, index: number) => ({
      id: index + 1,
      time: new Date(
        Number((tx as any).blockTimestamp) * 1000
      ).toLocaleString(),
      agent: (tx as any).transactionType,
      type: (tx as any).transactionType,
      assets: (tx as any).tokenAmount
        ? `${(Number((tx as any).tokenAmount) / 1e18).toFixed(4)} ${
            (tx as any)?.bondingCurve?.tokenSymbol
          }`
        : "N/A",
      value: (tx as any).paymentAmount
        ? `$${(Number((tx as any).paymentAmount) / 1e18).toFixed(2)} LAUNCHPAD`
        : "N/A",
      status: "completed",
      transactionHash: (tx as any).transactionHash,
    })) || [];

  const totalValue =
    fundingManagerAddresses.reduce((sum: number, address: `0x${string}`) => {
      const marketCap = marketCaps?.[address];
      if (marketCap !== null && marketCap !== undefined) {
        return sum + marketCap;
      }

      const curveData = creatorData?.bondingCurves?.find(
        (c: unknown) => (c as any).fundingManagerAddress === address
      );
      if (curveData) {
        return sum + Number((curveData as any).totalBuyVolume) / 1e18;
      }
      return sum;
    }, 0) || 0;

  const activeCurves = projects.length;
  const totalHolders = projects.reduce((sum: number, project: unknown) => {
    return sum + (project as any).holderCount;
  }, 0);

  const totalTransactions = transactions.length;

  const handleNavClick = (section: string) => {
    setActiveNav(section);
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
    { name: "Bonding Curves", icon: FaMicrochip, section: "projects" },
    { name: "Transactions", icon: Receipt, section: "transactions" },
    { name: "Knowledge Base", icon: BookOpen, section: "knowledge" },
    { name: "Settings", icon: Settings, section: "settings" },
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
          sidebarCollapsed
            ? "w-16 -translate-x-full md:w-16 md:translate-x-0"
            : "w-64 translate-x-0"
        } ${sidebarCollapsed ? "md:block" : "block"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={`border-b border-neutral-800 flex items-center ${
              sidebarCollapsed
                ? "justify-center p-3"
                : "justify-between p-3 sm:p-4"
            }`}
          >
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
            <ul
              className={`space-y-1 ${sidebarCollapsed ? "" : "sm:space-y-2"}`}
            >
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.section)}
                    className={`w-full flex items-center ${
                      sidebarCollapsed
                        ? "justify-center px-2"
                        : "gap-2 sm:gap-3 px-2 sm:px-3 justify-start"
                    } py-2 rounded-lg transition-colors text-left ${
                      activeNav === item.section
                        ? "bg-neutral-800 border border-neutral-700 text-blue-400"
                        : "text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800"
                    }`}
                    title={sidebarCollapsed ? item.name : ""}
                  >
                    <item.icon
                      className={`${
                        sidebarCollapsed ? "w-5 h-5" : "w-4 h-4 sm:w-5 sm:h-5"
                      } flex-shrink-0`}
                    />
                    {!sidebarCollapsed && (
                      <span className="text-sm sm:text-base truncate">
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300 ${
          sidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-64"
        }`}
      >
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
              <OverviewStats
                totalValue={`$${formatCompactNumber(totalValue)}`}
                activeCurves={activeCurves}
                totalTransactions={totalTransactions}
                totalHolders={totalHolders}
              />
            </div>

            <div id="projects" className="pt-6 sm:pt-8">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-neutral-400">
                    Loading bonding curves...
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-red-400">
                    Error loading bonding curves: {error.message}
                  </div>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-neutral-400">
                    No bonding curves found
                  </div>
                </div>
              ) : (
                <div className="max-w-7xl mx-auto w-full container space-y-4 px-4 py-8 bg-background shadow-sm overflow-x-auto">
                  <div className="flex flex-wrap gap-4 items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-5xl font-normal text-white">
                      My Bonding Curves
                    </h2>
                  </div>

                  <div className="border border-neutral-800 p-4 rounded-xl">
                    <table className="w-full">
                      <thead>
                        <tr className="border-neutral-700">
                          <th className="w-[200px] text-left text-neutral-300 p-2">
                            Token
                          </th>
                          <th className="w-[100px] text-left text-neutral-300 p-2">
                            Symbol
                          </th>
                          <th className="w-[120px] text-left text-neutral-300 p-2">
                            Market Cap
                          </th>
                          <th className="w-[100px] text-left text-neutral-300 p-2">
                            Holders
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project: unknown) => (
                          <tr
                            key={(project as any).address}
                            className="border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                            onClick={() =>
                              window.open(
                                `/project/${(project as any).address}`,
                                "_blank"
                              )
                            }
                          >
                            <td className="p-2">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-neutral-700 rounded-full flex items-center justify-center">
                                  <span className="text-neutral-300 text-sm">
                                    <Image
                                      src="/33labs.jpg"
                                      alt={(project as any).name}
                                      width={32}
                                      height={32}
                                    />
                                  </span>
                                </div>
                                <span className="text-neutral-300">
                                  {(project as any).name}
                                </span>
                              </div>
                            </td>
                            <td className="p-2 font-mono text-neutral-300">
                              ${(project as any).symbol}
                            </td>
                            <td className="p-2 text-neutral-300">
                              {(project as any).marketCap}
                            </td>
                            <td className="p-2 text-neutral-300">
                              {(project as any).holders}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div id="transactions" className="pt-6 sm:pt-8">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-neutral-400">
                    Loading transactions...
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-red-400">
                    Error loading transactions: {error.message}
                  </div>
                </div>
              ) : (
                <RecentTransactions transactions={transactions} />
              )}
            </div>

            {/* Placeholder sections for future implementation */}
            <div
              id="knowledge"
              className="min-h-screen flex items-center justify-center pt-6 sm:pt-8"
            >
              <div className="text-center text-neutral-400 px-4">
                <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Knowledge Base
                </h3>
                <p className="text-sm sm:text-base">Coming soon...</p>
              </div>
            </div>

            <div
              id="settings"
              className="min-h-screen flex items-center justify-center pt-6 sm:pt-8"
            >
              <div className="text-center text-neutral-400 px-4">
                <Settings className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Settings
                </h3>
                <p className="text-sm sm:text-base">Coming soon...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
