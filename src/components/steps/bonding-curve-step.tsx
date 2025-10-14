"use client"

import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { AnimatedCard } from "@/components/ui/animated-card"
import { useBondingCurveStore } from "@/lib/store"
import { formatUnits, parseEther } from "viem"

export function BondingCurveStep() {
  const { formData, updateFormData } = useBondingCurveStore()

  const handleInputChange = (field: string, value: string | number[]) => {
    if (field === "initialIssuanceSupply" || field === "initialCollateralSupply") {
      const stringValue = Array.isArray(value) ? value[0]?.toString() : value;
      try {
        const weiValue = parseEther(stringValue || "0");
        updateFormData({ [field]: weiValue.toString() });
      } catch (error) {
        console.warn(`Invalid ${field}:`, value);
      }
    } else {
      updateFormData({ [field]: value });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bonding Curve Parameters</h1>
            <p className="text-neutral-400 text-balance">
              Configure the bonding curve parameters that will determine how your token price changes with supply and demand.
            </p>
          </div>

          <AnimatedCard className="glass-card border-white/20">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-foreground">Reserve Ratio for Buying (%)</Label>
                <div className="space-y-3">
                  <Slider
                    value={[formData.reserveRatioForBuying]}
                    onValueChange={(value) => handleInputChange("reserveRatioForBuying", value[0].toString())}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-medium">{formData.reserveRatioForBuying}%</span>
                    <span className="text-neutral-400">Higher = steeper price increase when buying</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-foreground">Reserve Ratio for Selling (%)</Label>
                <div className="space-y-3">
                  <Slider
                    value={[formData.reserveRatioForSelling]}
                    onValueChange={(value) => handleInputChange("reserveRatioForSelling", value[0].toString())}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-medium">{formData.reserveRatioForSelling}%</span>
                    <span className="text-neutral-400">Higher = steeper price decrease when selling</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialIssuanceSupply" className="text-sm font-medium text-foreground">
                  Initial Issuance Supply
                </Label>
                <Input
                  id="initialIssuanceSupply"
                  placeholder="e.g. 1000000"
                  value={formatUnits(BigInt(formData.initialIssuanceSupply), 18)}
                  onChange={(e) => handleInputChange("initialIssuanceSupply", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
                <p className="text-xs text-neutral-400">Initial supply of tokens available for trading (automatically converted to 18 decimals)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialCollateralSupply" className="text-sm font-medium text-foreground">
                  Initial Collateral Supply
                </Label>
                <Input
                  id="initialCollateralSupply"
                  placeholder="e.g. 1000000"
                  value={formatUnits(BigInt(formData.initialCollateralSupply), 18)}
                  onChange={(e) => handleInputChange("initialCollateralSupply", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
                <p className="text-xs text-neutral-400">Initial collateral backing the bonding curve (automatically converted to 18 decimals)</p>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Bonding Curve Preview</h2>
          </div>

          <AnimatedCard className="glass-card border-white/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Reserve Ratios</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-neutral-400">
                    Buy Ratio: <span className="text-primary font-medium">{formData.reserveRatioForBuying}%</span>
                  </p>
                  <p className="text-neutral-400">
                    Sell Ratio: <span className="text-primary font-medium">{formData.reserveRatioForSelling}%</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Initial Supplies</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-neutral-400">
                    Issuance Supply: <span className="text-primary font-medium">
                      {formData.initialIssuanceSupply ? formatUnits(BigInt(formData.initialIssuanceSupply), 18) : "Not set"}
                    </span>
                  </p>
                  <p className="text-neutral-400">
                    Collateral Supply: <span className="text-primary font-medium">
                      {formData.initialCollateralSupply ? formatUnits(BigInt(formData.initialCollateralSupply), 18) : "Not set"}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Curve Behavior</h3>
                <p className="text-neutral-400 text-sm">
                  {formData.reserveRatioForBuying > formData.reserveRatioForSelling
                    ? "Price increases faster than it decreases (bullish curve)"
                    : formData.reserveRatioForBuying < formData.reserveRatioForSelling
                    ? "Price decreases faster than it increases (bearish curve)"
                    : "Symmetric price changes (neutral curve)"}
                </p>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
