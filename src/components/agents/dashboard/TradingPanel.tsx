"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useBuyFromBondingCurve } from "@/hooks/useBuyFromBondingCurve";
import { useReadContract } from "wagmi";
import { abis } from "@/lib/abis";
import { parseEther, formatEther } from "viem";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import Link from "next/link";
import { useSellFromBondingCurve } from "@/hooks/useSellFromBondingCurve";
import { useQueryClient } from "@tanstack/react-query";

interface TradingPanelProps {
  agentData: {
    symbol: string;
    bondingCurveProgress: number;
  };
  bondingCurveAddress?: `0x${string}`;
  issuanceToken?: `0x${string}`;
}

export function TradingPanel({
  agentData,
  bondingCurveAddress,
  issuanceToken,
}: TradingPanelProps) {
  const [tradeTab, setTradeTab] = useState("BUY");
  const [buyAmount, setBuyAmount] = useState("0");
  const [sellAmount, setSellAmount] = useState("0");
  const [isBuying, setIsBuying] = useState(false);
  const [isSelling, setIsSelling] = useState(false);

  // Input validation function
  const isValidAmount = (amount: string): boolean => {
    if (!amount || amount.trim() === '') return false;
    const num = Number(amount);
    return !isNaN(num) && num > 0 && num <= Number.MAX_SAFE_INTEGER;
  };

  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { buyFromBondingCurve, isLoading: isBuyingPending } =
    useBuyFromBondingCurve();
  const { sellFromBondingCurve, isLoading: isSellingPending } =
    useSellFromBondingCurve();

  const { data: purchaseReturn } = useReadContract({
    address: bondingCurveAddress,
    abi: abis.FM_BC_Bancor_Launchpad_v1,
    functionName: "calculatePurchaseReturn",
    args: buyAmount && isValidAmount(buyAmount) ? [parseEther(buyAmount)] : undefined,
    query: {
      enabled:
        !!bondingCurveAddress && !!buyAmount && isValidAmount(buyAmount),
    },
  });

  const { data: saleReturn } = useReadContract({
    address: bondingCurveAddress,
    abi: abis.FM_BC_Bancor_Launchpad_v1,
    functionName: "calculateSaleReturn",
    args: sellAmount && isValidAmount(sellAmount) ? [parseEther(sellAmount)] : undefined,
    query: {
      enabled:
        !!bondingCurveAddress && !!sellAmount && isValidAmount(sellAmount),
    },
  });

  const handleBuy = async () => {
    if (!bondingCurveAddress || !address || !purchaseReturn) {
      toast.error("Missing required data for purchase");
      return;
    }

    if (!isValidAmount(buyAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setIsBuying(true);
      const minAmountOut = (purchaseReturn * BigInt(98)) / BigInt(100);

      const result = await buyFromBondingCurve({
        bcAddress: bondingCurveAddress,
        receiver: address,
        depositAmount: parseEther(buyAmount),
        minAmountOut,
      });

      toast.success(
        <div className="flex flex-col gap-1">
          <div>Successfully bought tokens!</div>
          <Link
            href={`https://sepolia.etherscan.io/tx/${result.txid}`}
            target="_blank"
            className="text-blue-400 hover:text-blue-300 underline text-sm"
          >
            View transaction: {result.txid.slice(0, 10)}...{result.txid.slice(-4)}
          </Link>
        </div>
      );

      // Refresh candles, transactions, market cap, and holders data
      queryClient.invalidateQueries({ queryKey: ["candles", bondingCurveAddress] });
      queryClient.invalidateQueries({ queryKey: ["bonding-curve-transactions", bondingCurveAddress] });
      queryClient.invalidateQueries({ queryKey: ["market-cap", bondingCurveAddress] });
      queryClient.invalidateQueries({ queryKey: ["token-holders", bondingCurveAddress] });

      // Reset buy amount to default
      setBuyAmount("1");
    } catch (error: any) {
      console.error("Buy transaction failed:", error);
      toast.error(error.message || "Buy transaction failed");
    } finally {
      setIsBuying(false);
    }
  };

  const handleSell = async () => {
    if (!bondingCurveAddress || !address || !sellAmount) {
      toast.error("Missing required data for sell");
      return;
    }

    if (!isValidAmount(sellAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setIsSelling(true);
      const minAmountOut =
        (saleReturn ? saleReturn * BigInt(98) : BigInt(0)) / BigInt(100);

      const result = await sellFromBondingCurve({
        bcAddress: bondingCurveAddress,
        receiver: address,
        depositAmount: parseEther(sellAmount),
        minAmountOut,
        tokenAddress: issuanceToken!,
      });

      toast.success(
        <div className="flex flex-col gap-1">
          <div>Successfully sold tokens!</div>
          <Link
            href={`https://sepolia.etherscan.io/tx/${result.txid}`}
            target="_blank"
            className="text-blue-400 hover:text-blue-300 underline text-sm"
          >
            View transaction: {result.txid.slice(0, 10)}...{result.txid.slice(-4)}
          </Link>
        </div>
      );

      // Refresh candles, transactions, market cap, and holders data
      queryClient.invalidateQueries({ queryKey: ["candles", bondingCurveAddress] });
      queryClient.invalidateQueries({ queryKey: ["bonding-curve-transactions", bondingCurveAddress] });
      queryClient.invalidateQueries({ queryKey: ["market-cap", bondingCurveAddress] });
      queryClient.invalidateQueries({ queryKey: ["token-holders", bondingCurveAddress] });

      // Reset sell amount to default
      setSellAmount("0");
    } catch (error: any) {
      console.error("Sell transaction failed:", error);
      toast.error(error.message || "Sell transaction failed");
    } finally {
      setIsSelling(false);
    }
  };

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardContent className="p-0">
        {/* Trading Interface Header */}
        <div className="p-4 md:p-6 pb-4 border-b border-border">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
            Trade ${agentData.symbol}
          </h3>
          <p className="text-xs md:text-sm text-neutral-400">
            Execute buy and sell orders
          </p>
        </div>

        <Tabs value={tradeTab} onValueChange={setTradeTab} className="w-full">
          <div className="px-4 md:px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2 bg-muted h-10 md:h-12">
              <TabsTrigger
                value="BUY"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-medium text-xs md:text-sm"
              >
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                BUY
              </TabsTrigger>
              <TabsTrigger
                value="SELL"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 font-medium text-xs md:text-sm"
              >
                <TrendingDown className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                SELL
              </TabsTrigger>
            </TabsList>
          </div>

          {/* BUY tab */}
          <TabsContent
            value="BUY"
            className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4 mt-4 md:mt-6"
          >
            <div className="space-y-3">
              <div className="relative">
                <Input
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  type="number"
                  placeholder="0.0"
                  className="text-lg md:text-xl h-12 md:h-14 pl-4 pr-12 md:pr-16 border-2 focus:border-green-500 transition-colors [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-xs md:text-sm text-neutral-400 font-medium">
                  GAIA
                </div>
              </div>

              <div className="text-xs md:text-sm text-neutral-400 text-center">
                ≈ ${agentData.symbol}{" "}
                {purchaseReturn
                  ? Number(formatEther(purchaseReturn)).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 5 }
                    )
                  : "0"}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["0.1", "1", "10"].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="h-8 md:h-10 text-xs md:text-sm hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                    onClick={() => setBuyAmount(amount)}
                  >
                    {amount} GAIA
                  </Button>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-2 md:p-3">
                <div className="text-xs md:text-sm text-green-800">
                  <div className="flex justify-between items-center">
                    <span>You will receive:</span>
                    <span className="font-semibold">
                      ≈{" "}
                      {purchaseReturn
                        ? Number(formatEther(purchaseReturn)).toLocaleString(
                            undefined,
                            { maximumFractionDigits: 5 }
                          )
                        : "0"}{" "}
                      {agentData.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Est. slippage:</span>
                    <span className="font-semibold text-green-600">2%</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-10 md:h-12 bg-green-600 hover:bg-green-700 text-white font-medium text-sm md:text-base"
                onClick={handleBuy}
                disabled={
                  isBuying ||
                  isBuyingPending ||
                  !bondingCurveAddress ||
                  !purchaseReturn
                }
              >
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                {isBuying ? "BUYING..." : "PLACE BUY ORDER"}
              </Button>
            </div>
          </TabsContent>

          {/* SELL tab */}
          <TabsContent
            value="SELL"
            className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4 mt-4 md:mt-6"
          >
            <div className="space-y-3">
              <div className="relative">
                <Input
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  type="number"
                  placeholder="0.0"
                  className="text-lg md:text-xl h-12 md:h-14 pl-4 pr-12 md:pr-16 border-2 focus:border-orange-500 transition-colors [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-xs md:text-sm text-neutral-400 font-medium">
                  {agentData.symbol}
                </div>
              </div>

              <div className="text-xs md:text-sm text-neutral-400 text-center">
                ≈ $GAIA {" "}
                {saleReturn
                  ? Number(formatEther(saleReturn)).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 5 }
                    )
                  : "0"}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["1", "5", "10"].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="h-8 md:h-10 text-xs md:text-sm hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors"
                    onClick={() => setSellAmount(amount)}
                  >
                    {amount} {agentData.symbol}
                  </Button>
                ))}
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 md:p-3">
                <div className="text-xs md:text-sm text-orange-800">
                  <div className="flex justify-between items-center">
                    <span>You will receive:</span>
                    <span className="font-semibold">
                      ≈{" "}
                      {saleReturn
                        ? Number(formatEther(saleReturn)).toLocaleString(
                            undefined,
                            { maximumFractionDigits: 5 }
                          )
                        : "0"}{" "}
                      GAIA
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Est. slippage:</span>
                    <span className="font-semibold text-orange-600">2%</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-10 md:h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm md:text-base"
                onClick={handleSell}
                disabled={
                  isSelling ||
                  isSellingPending ||
                  !bondingCurveAddress ||
                  !sellAmount
                }
              >
                <TrendingDown className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                PLACE SELL ORDER
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bonding Curve Status */}
        {/* <div className="px-4 md:px-6 py-3 md:py-4 bg-muted/50 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
            <span className="text-xs md:text-sm font-medium text-foreground">
              Bonding Curve Progress
            </span>
            <span className="text-xs md:text-sm text-neutral-400">
              {agentData.bondingCurveProgress}%
            </span>
          </div>
          <Progress
            value={agentData.bondingCurveProgress}
            className="h-2 mb-2"
          />
          <div className="text-center text-xs md:text-sm text-green-400 font-medium">
            Token has graduated!
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
