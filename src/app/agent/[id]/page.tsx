"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  Copy,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Lock,
  Shield,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
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
  ResponsiveContainer,
  Cell,
} from "recharts";

// Mock candlestick data for the chart - zig-zag pattern
const candlestickData = [
  { time: "Aug 14", open: 2.5, high: 3.2, low: 2.3, close: 3.0, volume: 1500000 },
  { time: "Aug 15", open: 3.0, high: 3.3, low: 2.8, close: 3.2, volume: 1800000 },
  { time: "Aug 16", open: 3.2, high: 3.4, low: 2.9, close: 3.0, volume: 1600000 },
  { time: "Aug 17", open: 3.0, high: 3.5, low: 2.8, close: 3.4, volume: 2100000 },
  { time: "Aug 18", open: 3.4, high: 3.6, low: 3.1, close: 3.3, volume: 1900000 },
  { time: "Aug 19", open: 3.3, high: 3.8, low: 3.2, close: 3.7, volume: 2400000 },
  { time: "Aug 20", open: 3.7, high: 3.9, low: 3.4, close: 3.5, volume: 2200000 },
  { time: "Aug 21", open: 4.0, high: 4.3, low: 3.9, close: 4.2, volume: 2600000 },
  { time: "Aug 22", open: 3.8, high: 4.2, low: 3.6, close: 4.0, volume: 2800000 },
  { time: "Aug 23", open: 4.0, high: 4.3, low: 3.8, close: 3.9, volume: 2500000 },
  { time: "Aug 24", open: 3.9, high: 4.4, low: 3.7, close: 4.2, volume: 2900000 },
  { time: "Aug 25", open: 4.2, high: 4.5, low: 4.0, close: 4.4, volume: 3200000 },
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
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  // Trading panel state managed via Tabs
  const [tradeTab, setTradeTab] = useState("SELL");
  const [buyAmount, setBuyAmount] = useState("1");
  const [sellAmount, setSellAmount] = useState("10");
  const [activePerformanceTab, setActivePerformanceTab] = useState("ALL TIME");
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(""), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Header */}

      <div className="container max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Agent Summary Section */}
        <div className="flex items-center gap-6 p-6 bg-card border border-border rounded-xl">
          <Avatar className="h-20 w-20 bg-black">
            <AvatarImage src={agentData.avatar} alt={agentData.name} />
            <AvatarFallback className="bg-black text-white text-xl">
              S
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-foreground">
                {agentData.name}
              </h1>
              <span className="text-xl text-muted-foreground">
                #{agentData.id}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex gap-2 flex-wrap">
                {agentData.tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-neutral-700 text-neutral-300 text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:flex sm:gap-8 text-sm gap-4">
                <div>
                  <span className="text-muted-foreground">Market cap: </span>
                  <span className="text-foreground font-medium">
                    {agentData.marketCap}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">1d change: </span>
                  <span className="text-green-400 font-medium">
                    {agentData.change1d}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Holders: </span>
                  <span className="text-foreground font-medium">
                    {agentData.holders}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">AUM: </span>
                  <span className="text-foreground font-medium">
                    {agentData.aum}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-muted-foreground">Returns: </span>
                  <span className="text-green-400 font-medium">
                    {agentData.returns}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Chart Panel */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-medium">
                    Token {agentData.tokenAddress}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Dexscreener
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      Market Cap {agentData.marketCap}
                    </div>
                    <div className="text-green-400 font-medium">
                      +$1.14M ({agentData.change1d}) 24hr
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">ATH</div>
                    <div className="text-lg font-medium text-foreground">
                      {agentData.ath}
                    </div>
                  </div>
                </div>

                {/* Chart Controls */}
                <div className="flex items-center gap-4">
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
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {timeframe}
                      </Button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground"
                    >
                      Trade Display
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground"
                    >
                      Hide All Bubbles
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-primary"
                    >
                      Price/Mcap
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-primary"
                    >
                      USD/SOL
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
                  <div className="absolute top-4 left-4 text-xs text-muted-foreground pointer-events-none">
                    <div>Aug 14 - Aug 25 UTC</div>
                  </div>

                  {/* Price indicators */}
                  <div className="absolute top-4 right-4 text-xs text-right pointer-events-none">
                    <div className="text-green-400">4.7</div>
                    <div className="text-muted-foreground">4.0</div>
                    <div className="text-muted-foreground">3.3</div>
                    <div className="text-muted-foreground">2.6</div>
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
                        className="text-xs text-muted-foreground"
                      >
                        {timeframe}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="log" className="rounded" />
                    <label
                      htmlFor="log"
                      className="text-xs text-muted-foreground"
                    >
                      log
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Tabs defaultValue="trades" className="w-full">
                  <div className="flex items-center justify-between">
                    <TabsList>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                      <TabsTrigger value="trades">Trades</TabsTrigger>
                    </TabsList>
                    <div className="text-sm text-muted-foreground">
                      Sort by: Newest
                    </div>
                  </div>

                  <TabsContent value="trades" className="mt-4">
                    <div className="space-y-2">
                      <div className="grid grid-cols-6 gap-4 text-xs text-muted-foreground border-b border-border pb-2">
                        <div>Account</div>
                        <div>Type</div>
                        <div>Amount (SOL)</div>
                        <div>Amount (ZARD)</div>
                        <div>Time</div>
                        <div>Txn</div>
                      </div>

                      {agentData.trades.map((trade, idx) => (
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

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Trading Panel */}
            <Card className="bg-card border-border shadow-lg">
              <CardContent className="p-0">
                {/* Trading Interface Header */}
                <div className="p-6 pb-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Trade {agentData.symbol}</h3>
                  <p className="text-sm text-muted-foreground">Execute buy and sell orders</p>
                </div>

                <Tabs value={tradeTab} onValueChange={setTradeTab} className="w-full">
                  <div className="px-6 pt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-muted h-12">
                      <TabsTrigger
                        value="BUY"
                        className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-medium"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        BUY
                      </TabsTrigger>
                      <TabsTrigger
                        value="SELL"
                        className="data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-medium"
                      >
                        <TrendingDown className="w-4 h-4 mr-2" />
                        SELL
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* BUY tab */}
                  <TabsContent value="BUY" className="px-6 pb-6 space-y-4 mt-6">
                    <div className="space-y-3">
                      <div className="relative">
                        <Input
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          placeholder="0.0"
                          className="text-xl h-14 pl-4 pr-16 border-2 focus:border-green-500 transition-colors"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                          ETH
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground text-center">
                        ≈ $3,420.00 USD
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {["0.1", "1", "10"].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            className="h-10 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                            onClick={() => setBuyAmount(amount)}
                          >
                            {amount} ETH
                          </Button>
                        ))}
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="text-sm text-green-800">
                          <div className="flex justify-between items-center">
                            <span>You will receive:</span>
                            <span className="font-semibold">≈ 1,234 {agentData.symbol}</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span>Est. slippage:</span>
                            <span className="font-semibold text-green-600">0.2%</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium text-base">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        PLACE BUY ORDER
                      </Button>
                    </div>
                  </TabsContent>

                  {/* SELL tab */}
                  <TabsContent value="SELL" className="px-6 pb-6 space-y-4 mt-6">
                    <div className="space-y-3">
                      <div className="relative">
                        <Input
                          value={sellAmount}
                          onChange={(e) => setSellAmount(e.target.value)}
                          placeholder="0.0"
                          className="text-xl h-14 pl-4 pr-16 border-2 focus:border-orange-500 transition-colors"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                          {agentData.symbol}
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground text-center">
                        ≈ $342.00 USD
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {["1", "5", "10"].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            className="h-10 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors"
                            onClick={() => setSellAmount(amount)}
                          >
                            {amount}K {agentData.symbol}
                          </Button>
                        ))}
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="text-sm text-orange-800">
                          <div className="flex justify-between items-center">
                            <span>You will receive:</span>
                            <span className="font-semibold">≈ 0.1 ETH</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span>Est. slippage:</span>
                            <span className="font-semibold text-orange-600">0.3%</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium text-base">
                        <TrendingDown className="w-4 h-4 mr-2" />
                        PLACE SELL ORDER
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Bonding Curve Status */}
                <div className="px-6 py-4 bg-muted/50 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Bonding Curve Progress</span>
                    <span className="text-sm text-muted-foreground">{agentData.bondingCurveProgress}%</span>
                  </div>
                  <Progress
                    value={agentData.bondingCurveProgress}
                    className="h-2 mb-2"
                  />
                  <div className="text-center text-sm text-green-400 font-medium">
                    Token has graduated!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Personality */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  TRADING PERSONALITY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {agentData.tradingPersonality}
                </p>
              </CardContent>
            </Card>

            {/* Policies & Agent Wallet */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">POLICIES:</div>
                  <div className="flex gap-2">
                    {agentData.policies.map((policy, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-neutral-700 text-neutral-300 text-xs"
                      >
                        {policy}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">AGENT WALLET:</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">
                      {agentData.agentWallet}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(agentData.agentWallet)}
                      className={cn(
                        "transition-colors",
                        copiedText === agentData.agentWallet
                          ? "text-green-400"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            {/* <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">PERFORMANCE</CardTitle>
                  <span className="text-sm text-muted-foreground">AUM {agentData.aum}</span>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activePerformanceTab} onValueChange={setActivePerformanceTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="ALL TIME" className="text-xs">ALL TIME</TabsTrigger>
                    <TabsTrigger value="THIS MONTH" className="text-xs">THIS MONTH</TabsTrigger>
                    <TabsTrigger value="LAST 7 DAYS" className="text-xs">LAST 7 DAYS</TabsTrigger>
                  </TabsList>
                  <TabsContent value="ALL TIME" className="text-center">
                    <div className="text-2xl font-bold text-green-400">{agentData.performance.allTime}</div>
                  </TabsContent>
                  <TabsContent value="THIS MONTH" className="text-center">
                    <div className="text-2xl font-bold text-green-400">{agentData.performance.thisMonth}</div>
                  </TabsContent>
                  <TabsContent value="LAST 7 DAYS" className="text-center">
                    <div className="text-2xl font-bold text-green-400">{agentData.performance.last7Days}</div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card> */}

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    TOP HOLDERS
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {agentData.holders} TOTAL
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agentData.topHolders.map((holder, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                          #{holder.rank}
                        </span>
                        <div>
                          <div className="font-mono">{holder.address}</div>
                          <div className="text-xs text-muted-foreground">
                            ({holder.type})
                          </div>
                        </div>
                      </div>
                      <span className="font-medium">{holder.percentage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

