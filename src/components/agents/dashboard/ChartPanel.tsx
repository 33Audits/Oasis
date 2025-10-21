"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatCompactNumber, shortenTokenAddress } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Link from "next/link";
import { useBondingCurveTransactions } from "@/hooks/useBondingCurveTransactions";
import { formatEther } from "viem";
import { useCandles, type AllCandles } from "@/hooks/useCandles";
import React from "react";

const chartConfig = {
  close: {
    label: "Close Price",
    color: "hsl(var(--chart-1))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-2))",
  },
};

interface ChartPanelProps {
  bondingCurveData: {
    tokenAddress?: `0x${string}`;
    tokenSymbol: string;
    marketCap: number;
    trades: Array<{
      account: string;
      type: string;
      amountSol: string;
      amountZard: string;
      time: string;
      txn: string;
    }>;
  };
  fundingManagerAddress: `0x${string}`;
}

export function ChartPanel({
  bondingCurveData,
  fundingManagerAddress,
}: ChartPanelProps) {
  const TIMEFRAME_OPTIONS = ["m", "h", "d"] as const;
  type Timeframe = (typeof TIMEFRAME_OPTIONS)[number];
  type CandlesKey = keyof AllCandles;
  const PERIOD_MAP: Record<Timeframe, CandlesKey> = {
    "m": "min1",
    "h": "hour1",
    "d": "day1",
  } as const;

  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("h");

  const { data: allCandles, isLoading: candlesLoading } = useCandles(
    fundingManagerAddress
  );

  const candlestickData = React.useMemo(() => {
    if (!allCandles) return null;

    const periodKey: CandlesKey = PERIOD_MAP[selectedTimeframe];
    const candles = allCandles[periodKey];
    if (!candles || candles.length === 0) return null;

    return candles;
  }, [allCandles, selectedTimeframe]);

  const { data: transactions, isLoading: transactionsLoading } =
    useBondingCurveTransactions(fundingManagerAddress);

  // Determine line color based on price trend
  const lineColor = React.useMemo(() => {
    if (!candlestickData || candlestickData.length < 2) {
      return "#10b981"; // default green
    }
    
    const firstPrice = candlestickData[0].close;
    const lastPrice = candlestickData[candlestickData.length - 1].close;
    
    // Green if price went up, red if down
    return lastPrice >= firstPrice ? "#10b981" : "#ef4444";
  }, [candlestickData]);

  // Format X-axis labels based on timeframe
  const formatXAxisTick = (value: number) => {
    const date = new Date(value);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    if (selectedTimeframe === "m" || selectedTimeframe === "h") {
      // For 1m and 1h, show date and time: "Oct 21 14:30"
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${month} ${day} ${hours}:${minutes}`;
    } else {
      // For 1d, just show the date: "Oct 21"
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      return `${month} ${day}`;
    }
  };

  return (
    <div className="xl:col-span-2 space-y-6">
      {/* Main Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">
              Token{" "}
              {bondingCurveData.tokenAddress && (
                <>
                  <div className="inline-flex items-center gap-2">
                    <span className="font-mono text-white/70">
                      {shortenTokenAddress(bondingCurveData.tokenAddress)}
                    </span>
                    <Link
                      href={`https://sepolia.etherscan.io/token/${bondingCurveData.tokenAddress}`}
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4 text-neutral-400" />
                    </Link>
                  </div>
                </>
              )}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400">Dexscreener</span>
            <ExternalLink className="h-4 w-4 text-neutral-400" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">
                Market Cap {formatCompactNumber(bondingCurveData.marketCap)}
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="flex flex-wrap items-center md:gap-4">
            <div className="flex gap-2">
              {TIMEFRAME_OPTIONS.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={
                    selectedTimeframe === timeframe ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe as Timeframe)}
                  className={cn(
                    "text-xs",
                    selectedTimeframe === timeframe
                      ? "bg-primary text-primary-foreground"
                      : "text-neutral-400 hover:text-foreground"
                  )}
                >
                  {timeframe.toUpperCase()}
                </Button>
              ))}
            </div>

            <div className="flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-neutral-400"
              >
                Trade Display
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-neutral-400"
              >
                Hide All Bubbles
              </Button>
            </div>

            <div className="flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary"
              >
                Price/Mcap
              </Button>
            </div>
          </div>

          {/* Candlestick Chart */}
          <div className="h-80 w-full">
            {candlesLoading ? (
              <div className="h-full w-full flex items-center justify-center text-neutral-400">
                Loading chart...
              </div>
            ) : !candlestickData ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-neutral-400 text-lg">Chart not available</p>
                  <p className="text-neutral-500 text-sm mt-2">No candle data found for this bonding curve</p>
                </div>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ComposedChart
                  data={candlestickData}
                  margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="timestamp"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={formatXAxisTick}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    domain={["dataMin - 0.5", "dataMax + 0.5"]}
                    tickFormatter={(value: number) => value.toFixed(3)}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          const date = new Date(Number(value));
                          return `Date: ${date.toLocaleString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                          })}`;
                        }}
                        formatter={(value, name, props) => {
                          if (name === "close") {
                            return [
                              `$${Number(value).toFixed(2)}`,
                              "Close Price",
                            ];
                          }
                          return [value, name];
                        }}
                      />
                    }
                  />

                  {/* Line chart using close price */}
                  <Line 
                    type="monotone"
                    dataKey="close" 
                    stroke={lineColor}
                    strokeWidth={2}
                    dot={false}
                  />
                </ComposedChart>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trades Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <Tabs defaultValue="trades" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="trades">Trades</TabsTrigger>
              </TabsList>
              <div className="text-sm text-neutral-400">Sort by: Newest</div>
            </div>

            <TabsContent value="trades" className="mt-4">
              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-4 text-xs text-neutral-400 border-b border-border pb-2">
                  <div>Account</div>
                  <div>Type</div>
                  <div>Amount (GAIA)</div>
                  <div>Amount ({bondingCurveData?.tokenSymbol})</div>
                  <div>Time</div>
                  <div>Txn</div>
                </div>

                {transactionsLoading ? (
                  <div className="grid grid-cols-6 gap-4 text-sm py-2 border-b border-border/50">
                    <div className="col-span-6 text-center text-neutral-400">
                      Loading transactions...
                    </div>
                  </div>
                ) : transactions && transactions.length > 0 ? (
                  transactions.map((transaction, idx) => {
                    const transactionHashShort =
                      transaction.transactionHash.slice(0, 6) +
                      "..." +
                      transaction.transactionHash.slice(-4);
                    const blockTimestamp = new Date(
                      parseInt(transaction.blockTimestamp) * 1000
                    );
                    const timeAgo =
                      Math.floor(
                        (Date.now() - blockTimestamp.getTime()) /
                          (1000 * 60 * 60)
                      ) + "h ago";

                    return (
                      <div
                        key={transaction.id}
                        className="grid grid-cols-6 gap-4 text-sm py-2 border-b border-border/50"
                      >
                        <div className="font-mono inline-flex items-center gap-2">
                          <Link
                            href={`https://sepolia.etherscan.io/address/${transaction.user}`}
                            target="_blank"
                            className="hover:text-primary"
                          >
                            {shortenTokenAddress(transaction?.user)}
                          </Link>
                          <ExternalLink className="h-4 w-4 text-neutral-400" />
                        </div>
                        <div
                          className={cn(
                            "font-medium",
                            transaction.transactionType
                              .toLowerCase()
                              .includes("sell")
                              ? "text-red-400"
                              : "text-green-400"
                          )}
                        >
                          {transaction.transactionType}
                        </div>
                        <div>
                          {Number(
                            formatEther(transaction.paymentAmount)
                          ).toFixed(3)}
                        </div>
                        <div>
                          {Number(formatEther(transaction.tokenAmount)).toFixed(
                            3
                          )}
                        </div>
                        <div>{timeAgo}</div>
                        <div className="font-mono flex items-center gap-2">
                          <Link
                            href={`https://sepolia.etherscan.io/tx/${transaction.transactionHash}`}
                            target="_blank"
                            className="flex-1 hover:text-primary"
                          >
                            {transactionHashShort}
                          </Link>
                          {/* <ExternalLink size={16} width={16} height={16} className="flex-1 h-4 w-4 text-neutral-400" /> */}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="grid grid-cols-6 gap-4 text-sm py-2 border-b border-border/50">
                    <div className="col-span-6 text-center text-neutral-400">
                      No transactions found
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
