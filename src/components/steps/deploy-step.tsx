"use client";

import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Rocket, DollarSign, Copy } from "lucide-react";
import { useBondingCurveStore } from "@/lib/store";
import { useCreateBondingCurve } from "@/hooks/useCreateBondingCurve";
import { copyToClipboard, formatTokenAmount } from "@/lib/utils";
import { toast } from "sonner";
import { parseEther } from "viem";

export function DeployStep() {
  const { formData, updateFormData, resetForm } = useBondingCurveStore();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);

  const { createBondingCurve, minDepositAmount, bcWorkflowAddress, isPending } =
    useCreateBondingCurve();

  const handleInputChange = (field: string, value: string) => {
    if (field === "stakeAmount") {
      try {
        const weiValue = parseEther(value || "0");
        updateFormData({ [field]: weiValue.toString() });
      } catch (error) {
        console.warn("Invalid stake amount:", value);
      }
    } else {
      updateFormData({ [field]: value });
    }
  };

  const handleCopyAddress = async () => {
    if (bcWorkflowAddress) {
      const success = await copyToClipboard(bcWorkflowAddress);
      if (success) {
        toast.success("Address Copied!", {
          description: "Contract address copied to clipboard",
        });
      } else {
        toast.error("Copy Failed", {
          description: "Failed to copy address to clipboard",
        });
      }
    }
  };

  const handleDeploy = async () => {
    try {
      setIsDeploying(true);
      setDeployProgress(0);

      setDeployProgress(25);

      const params = {
        vaultAddress: "0x5da6bfd31475057af04e2804a03a3b1d06338724" as `0x${string}`,
        feeVaultAddress: "0x5da6bfd31475057af04e2804a03a3b1d06338724" as `0x${string}`,
        threshold: BigInt(formData.threshold),
        bcParams: {
          reserveRatioForBuying: formData.reserveRatioForBuying,
          reserveRatioForSelling: formData.reserveRatioForSelling,
          initialIssuanceSupply: BigInt(formData.initialIssuanceSupply),
          initialCollateralSupply: BigInt(formData.initialCollateralSupply),
        },
        issuanceTokenParams: {
          name: formData.name,
          symbol: formData.symbol,
          decimals: formData.decimals,
          maxSupply: BigInt(formData.maxSupply),
        },
        stakeAmount: BigInt(formData.stakeAmount),
      };

      setDeployProgress(50);

      const result = await createBondingCurve(params);

      setDeployProgress(100);

      toast.success("Bonding Curve Deployed Successfully!", {
        description: `Contract deployed on Sepolia${
          bcWorkflowAddress ? ` at ${bcWorkflowAddress}` : ""
        }`,
      });
      
      resetForm();

      console.log("Bonding curve created successfully:", result);
    } catch (err) {
      setDeployProgress(0);
      setIsDeploying(false);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create bonding curve";
      toast.error("Deployment Failed", {
        description: errorMessage,
      });
      console.error("Deployment failed:", err);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Deploy Bonding Curve
            </h1>
            <p className="text-neutral-400 text-balance">
              Set your stake amount and deploy your bonding curve to the
              blockchain.
            </p>
          </div>

          <AnimatedCard className="glass-card border-white/20">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="stakeAmount"
                  className="text-sm font-medium text-foreground"
                >
                  Stake Amount (GAIA Tokens)
                </Label>
                <Input
                  id="stakeAmount"
                  placeholder="e.g. 100"
                  value={formatTokenAmount(formData.stakeAmount)}
                  onChange={(e) =>
                    handleInputChange("stakeAmount", e.target.value)
                  }
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
                <p className="text-xs text-neutral-400">
                  Minimum stake:{" "}
                  {minDepositAmount
                    ? formatTokenAmount(minDepositAmount.toString())
                    : "Loading..."}{" "}
                  GAIA tokens
                </p>
              </div>
            </CardContent>
          </AnimatedCard>

          {!isDeploying && deployProgress === 0 && (
            <Button
              onClick={handleDeploy}
              className="w-full bg-white text-black rounded-xl hover:bg-white/90"
              disabled={!formData.stakeAmount || isPending}
            >
              <Rocket className="mr-2 h-4 w-4" />
              {isPending ? "Creating Bonding Curve..." : "Deploy Bonding Curve"}
            </Button>
          )}

          {(isDeploying || isPending) && (
            <AnimatedCard className="border-white/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-5 w-5 text-primary animate-pulse" />
                    <span className="text-foreground font-medium">
                      Deploying Bonding Curve...
                    </span>
                  </div>
                  <Progress value={deployProgress} className="w-full" />
                  <p className="text-sm text-neutral-400">
                    {deployProgress < 25 && "Preparing parameters..."}
                    {deployProgress >= 25 &&
                      deployProgress < 50 &&
                      "Approving tokens..."}
                    {deployProgress >= 50 &&
                      deployProgress < 100 &&
                      "Creating bonding curve..."}
                    {deployProgress >= 100 && "Finalizing deployment..."}
                  </p>
                </div>
              </CardContent>
            </AnimatedCard>
          )}

          {deployProgress === 100 && bcWorkflowAddress && (
            <AnimatedCard className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <div className="text-green-500 font-semibold">
                    🎉 Bonding Curve Deployed Successfully!
                  </div>
                  <p className="text-sm text-neutral-400">
                    Your bonding curve is now live on Sepolia testnet.
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <p className="text-xs text-neutral-500 font-mono">
                      Contract: {bcWorkflowAddress}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyAddress}
                      className="h-6 w-6 p-0 hover:bg-neutral-700"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          )}
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Deployment Summary
            </h2>
          </div>

          <AnimatedCard className="glass-card border-white/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Token Parameters
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-neutral-400">
                    Name:{" "}
                    <span className="text-primary font-medium">
                      {formData.name || "Not set"}
                    </span>
                  </p>
                  <p className="text-neutral-400">
                    Symbol:{" "}
                    <span className="text-primary font-medium">
                      {formData.symbol || "Not set"}
                    </span>
                  </p>
                  <p className="text-neutral-400">
                    Max Supply:{" "}
                    <span className="text-primary font-medium">
                      { formatTokenAmount(formData.maxSupply) || "Not set"}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Bonding Curve Config
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-neutral-400">
                    Buy Ratio:{" "}
                    <span className="text-primary font-medium">
                      {formData.reserveRatioForBuying}%
                    </span>
                  </p>
                  <p className="text-neutral-400">
                    Sell Ratio:{" "}
                    <span className="text-primary font-medium">
                      {formData.reserveRatioForSelling}%
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Stake Amount
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    {formData.stakeAmount
                      ? `${formatTokenAmount(formData.stakeAmount)} GAIA tokens`
                      : "Not set"}
                  </p>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
