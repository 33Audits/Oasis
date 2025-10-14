"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, shortenTokenAddress } from "@/lib/utils";
import {
  RefreshCw,
  ExternalLink,
} from "lucide-react";
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
  Cell
} from "recharts";
import Link from "next/link";

const candlestickData = [
    { time: "00:00", open: 34, high: 41, low: 29, close: 38, volume: 2340000 },
    { time: "01:00", open: 38, high: 45, low: 35, close: 42, volume: 1980000 },
    { time: "02:00", open: 42, high: 48, low: 38, close: 39, volume: 1750000 },
    { time: "03:00", open: 39, high: 43, low: 31, close: 33, volume: 2120000 },
    { time: "04:00", open: 33, high: 37, low: 25, close: 27, volume: 2890000 },
    { time: "05:00", open: 27, high: 35, low: 23, close: 32, volume: 3120000 },
    { time: "06:00", open: 32, high: 51, low: 30, close: 48, volume: 4560000 },
    { time: "07:00", open: 48, high: 67, low: 46, close: 63, volume: 5780000 },
    { time: "08:00", open: 63, high: 78, low: 59, close: 71, volume: 6230000 },
    { time: "09:00", open: 71, high: 82, low: 65, close: 68, volume: 5140000 },
    { time: "10:00", open: 68, high: 75, low: 61, close: 73, volume: 4890000 },
    { time: "11:00", open: 73, high: 89, low: 70, close: 85, volume: 7120000 },
    { time: "12:00", open: 85, high: 93, low: 79, close: 81, volume: 5560000 },
    { time: "13:00", open: 81, high: 87, low: 72, close: 75, volume: 4320000 },
    { time: "14:00", open: 75, high: 83, low: 68, close: 79, volume: 3980000 },
    { time: "15:00", open: 79, high: 94, low: 77, close: 91, volume: 6450000 },
    { time: "16:00", open: 91, high: 98, low: 86, close: 95, volume: 5890000 },
    { time: "17:00", open: 95, high: 105, low: 90, close: 102, volume: 7230000 },
    { time: "18:00", open: 102, high: 112, low: 98, close: 108, volume: 8120000 },
    { time: "19:00", open: 108, high: 118, low: 104, close: 114, volume: 6780000 },
    { time: "20:00", open: 114, high: 121, low: 107, close: 109, volume: 5640000 },
    { time: "21:00", open: 109, high: 116, low: 101, close: 112, volume: 4920000 },
    { time: "22:00", open: 112, high: 125, low: 110, close: 122, volume: 7890000 },
    { time: "23:00", open: 122, high: 129, low: 118, close: 126, volume: 6340000 },
  ];

// Custom candlestick shape function for Recharts Bar
const CandlestickShape = (props: any) => {
  const { payload, x, y, width, height } = props;

  // Early return if no payload or missing data
  if (!payload || typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number' || typeof height !== 'number') {
    return <g />;
  }

  const { open, close, high, low } = payload;
  const isPositive = close > open;

  // Calculate price range for the entire dataset
  const allHighs = candlestickData.map(d => d.high);
  const allLows = candlestickData.map(d => d.low);
  const dataMax = Math.max(...allHighs);
  const dataMin = Math.min(...allLows);
  const dataRange = dataMax - dataMin;

  if (dataRange === 0) return <g />;

  // Scale factor: how much chart height corresponds to the data range
  const scale = height / dataRange;

  // Calculate Y positions relative to the chart's Y coordinate system
  // Y increases downward in SVG, so we need to flip the calculation
  const wickTop = y + (dataMax - high) * scale;
  const wickBottom = y + (dataMax - low) * scale;
  const bodyTop = y + (dataMax - Math.max(open, close)) * scale;
  const bodyHeight = Math.abs(close - open) * scale;

  return (
    <g>
      {/* High-Low wick (thin vertical line) */}
      <line
        x1={x + width / 2}
        y1={wickTop}
        x2={x + width / 2}
        y2={wickBottom}
        stroke={isPositive ? "#10b981" : "#ef4444"}
        strokeWidth="1"
      />
      {/* Open-Close body (rectangle) */}
      <rect
        x={x + width * 0.25}
        y={bodyTop}
        width={width * 0.5}
        height={Math.max(bodyHeight, 2)}
        fill={isPositive ? "#10b981" : "#ef4444"}
        stroke={isPositive ? "#10b981" : "#ef4444"}
        strokeWidth="0.5"
      />
    </g>
  );
};

// Chart configuration
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
    marketCap: string;
    change1d: string;
    ath: string;
    trades: Array<{
      account: string;
      type: string;
      amountSol: string;
      amountZard: string;
      time: string;
      txn: string;
    }>;
  };
}

export function ChartPanel({ bondingCurveData }: ChartPanelProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  return (
    <div className="xl:col-span-2 space-y-6">
      {/* Main Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">
              Token {bondingCurveData.tokenAddress && (
                <>
                  <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-white/70">{shortenTokenAddress(bondingCurveData.tokenAddress)}</span>
                  <Link href={`https://sepolia.etherscan.io/token/${bondingCurveData.tokenAddress}`} target="_blank">
                    <ExternalLink className="h-4 w-4 text-neutral-400" />
                  </Link>
                  </div>
                </>
              )}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400">
              Dexscreener
            </span>
            <ExternalLink className="h-4 w-4 text-neutral-400" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">
                Market Cap {bondingCurveData.marketCap}
              </div>
              <div className="text-green-400 font-medium">
                +$1.14M ({bondingCurveData.change1d}) 24hr
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-400">ATH</div>
              <div className="text-lg font-medium text-foreground">
                {bondingCurveData.ath}
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="flex flex-wrap items-center md:gap-4">
            <div className="flex gap-2">
              {["24h", "1D", "5D", "1M"].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={
                    selectedTimeframe === timeframe ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={cn(
                    "text-xs",
                    selectedTimeframe === timeframe
                      ? "bg-primary text-primary-foreground"
                      : "text-neutral-400 hover:text-foreground"
                  )}
                >
                  {timeframe}
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
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => `Date: ${value}`}
                      formatter={(value, name, props) => {
                        if (name === 'close') {
                          return [
                            `$${Number(value).toFixed(2)}`,
                            'Close Price'
                          ];
                        }
                        return [value, name];
                      }}
                    />
                  }
                />

                {/* Candlestick bars - using close price to position bars, custom shape renders OHLC */}
                <Bar
                  dataKey="close"
                  fill="#8884d8"
                  shape={CandlestickShape}
                >
                  {candlestickData.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Bar>
              </ComposedChart>
            </ChartContainer>

            {/* Chart info overlay */}
            <div className="absolute top-4 left-4 text-xs text-neutral-400 pointer-events-none">
              <div>Aug 14 - Aug 25 UTC</div>
            </div>

            {/* Price indicators */}
            <div className="absolute top-4 right-4 text-xs text-right pointer-events-none">
              <div className="text-green-400">4.7</div>
              <div className="text-neutral-400">4.0</div>
              <div className="text-neutral-400">3.3</div>
              <div className="text-neutral-400">2.6</div>
              <div className="text-red-400">2.0</div>
            </div>
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
              <label
                htmlFor="log"
                className="text-xs text-neutral-400"
              >
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
              <div className="text-sm text-neutral-400">
                Sort by: Newest
              </div>
            </div>

            <TabsContent value="trades" className="mt-4">
              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-4 text-xs text-neutral-400 border-b border-border pb-2">
                  <div>Account</div>
                  <div>Type</div>
                  <div>Amount (SOL)</div>
                  <div>Amount (ZARD)</div>
                  <div>Time</div>
                  <div>Txn</div>
                </div>

                {bondingCurveData.trades.map((trade, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-6 gap-4 text-sm py-2 border-b border-border/50"
                  >
                    <div className="font-mono">{trade.account}</div>
                    <div
                      className={cn(
                        "font-medium",
                        trade.type === "Sell"
                          ? "text-red-400"
                          : "text-green-400"
                      )}
                    >
                      {trade.type}
                    </div>
                    <div>{trade.amountSol}</div>
                    <div>{trade.amountZard}</div>
                    <div>{trade.time}</div>
                    <div className="font-mono">{trade.txn}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
