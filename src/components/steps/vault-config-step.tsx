"use client"

import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedCard } from "@/components/ui/animated-card"
import { useBondingCurveStore } from "@/lib/store"

export function VaultConfigStep() {
  const { formData, updateFormData } = useBondingCurveStore()

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Vault Configuration</h1>
            <p className="text-neutral-400 text-balance">
              Configure the vault addresses and threshold required for your bonding curve deployment.
            </p>
          </div>

          <AnimatedCard className="glass-card border-white/20">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vaultAddress" className="text-sm font-medium text-foreground">
                  Vault Address
                </Label>
                <Input
                  id="vaultAddress"
                  placeholder="0x..."
                  value={formData.vaultAddress}
                  onChange={(e) => handleInputChange("vaultAddress", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200 font-mono"
                />
                <p className="text-xs text-neutral-400">The main vault address for the bonding curve</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feeVaultAddress" className="text-sm font-medium text-foreground">
                  Fee Vault Address
                </Label>
                <Input
                  id="feeVaultAddress"
                  placeholder="0x..."
                  value={formData.feeVaultAddress}
                  onChange={(e) => handleInputChange("feeVaultAddress", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200 font-mono"
                />
                <p className="text-xs text-neutral-400">The vault address for collecting fees</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold" className="text-sm font-medium text-foreground">
                  Threshold
                </Label>
                <Input
                  id="threshold"
                  placeholder="e.g. 1000000000000000000"
                  value={formData.threshold}
                  onChange={(e) => handleInputChange("threshold", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
                <p className="text-xs text-neutral-400">The threshold value for the bonding curve (in wei)</p>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Vault Configuration Preview</h2>
          </div>

          <AnimatedCard className="glass-card border-white/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Vault Addresses</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-neutral-400">
                    Main Vault: <span className="text-primary font-mono font-medium">
                      {formData.vaultAddress ? `${formData.vaultAddress.slice(0, 6)}...${formData.vaultAddress.slice(-4)}` : "Not set"}
                    </span>
                  </p>
                  <p className="text-neutral-400">
                    Fee Vault: <span className="text-primary font-mono font-medium">
                      {formData.feeVaultAddress ? `${formData.feeVaultAddress.slice(0, 6)}...${formData.feeVaultAddress.slice(-4)}` : "Not set"}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Threshold</h3>
                <p className="text-neutral-400 text-sm">
                  <span className="text-primary font-medium">
                    {formData.threshold || "Not set"}
                  </span>
                  {formData.threshold && " wei"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Configuration Status</h3>
                <p className="text-neutral-400 text-sm">
                  {formData.vaultAddress && formData.feeVaultAddress && formData.threshold
                    ? "All vault parameters configured"
                    : "Missing required vault parameters"}
                </p>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
