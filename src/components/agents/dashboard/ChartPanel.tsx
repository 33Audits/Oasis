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
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import Link from "next/link";
import { useBondingCurveTransactions } from "@/hooks/useBondingCurveTransactions";
import { formatEther } from "viem";
import { useCandles, type AllCandles } from "@/hooks/useCandles";
import React from "react";

// Custom candlestick shape function for Recharts Bar
const CandlestickShape = (props: any) => {
  const { payload, x, y, width, height } = props;

  if (
    !payload ||
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof width !== "number" ||
    typeof height !== "number"
  ) {
    return <g />;
  }

  const { open, close, high, low } = payload;
  const isPositive = close > open;

  return (
    <g>
      {/* High-Low wick (thin vertical line) */}
      <line
        x1={x + width / 2}
        y1={y}
        x2={x + width / 2}
        y2={y + height}
        stroke={isPositive ? "#10b981" : "#ef4444"}
        strokeWidth="1"
      />
      {/* Open-Close body (rectangle) */}
      <rect
        x={x + width * 0.25}
        y={y}
        width={width * 0.5}
        height={Math.max(height, 2)}
        fill={isPositive ? "#10b981" : "#ef4444"}
        stroke={isPositive ? "#10b981" : "#ef4444"}
        strokeWidth="0.5"
      />
    </g>
  );
};


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
  const TIMEFRAME_OPTIONS = ["1m", "1h", "1d"] as const;
  type Timeframe = (typeof TIMEFRAME_OPTIONS)[number];
  type CandlesKey = keyof AllCandles;
  const PERIOD_MAP: Record<Timeframe, CandlesKey> = {
    "1m": "min1",
    "1h": "hour1",
    "1d": "day1",
  } as const;

  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("1h");

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
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
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
                        labelFormatter={(value) => `Date: ${value}`}
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

                  {/* Candlestick bars - using close price to position bars, custom shape renders OHLC */}
                  <Bar dataKey="close" fill="#8884d8" shape={CandlestickShape}>
                    {candlestickData.map((_entry: unknown, index: number) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ChartContainer>
            )}
          </div>

          {/* Bottom Chart Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["1D", "5D", "1M"].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-neutral-400"
                >
                  {timeframe}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="log" className="rounded" />
              <label htmlFor="log" className="text-xs text-neutral-400">
                log
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trades Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <Tabs defaultValue="trades" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="comments">Comments</TabsTrigger>
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
