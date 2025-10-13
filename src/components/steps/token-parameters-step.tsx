"use client"

import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Plus } from "lucide-react"
import { useBondingCurveStore } from "@/lib/store"

export function TokenParametersStep() {
  const { formData, updateFormData } = useBondingCurveStore()

  const handleInputChange = (field: string, value: string | number[]) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Token Parameters</h1>
            <p className="text-neutral-400 text-balance">
              Configure your token parameters. These will be used to create the issuance token for your bonding curve.
            </p>
          </div>

          <AnimatedCard className="glass-card border-white/20">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Token Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. My Awesome Token"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol" className="text-sm font-medium text-foreground">
                  Token Symbol
                </Label>
                <Input
                  id="symbol"
                  placeholder="e.g. MAT"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="decimals" className="text-sm font-medium text-foreground">
                  Decimals
                </Label>
                <Input
                  id="decimals"
                  type="number"
                  placeholder="18"
                  value={formData.decimals}
                  onChange={(e) => handleInputChange("decimals", (parseInt(e.target.value) || 18).toString())}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxSupply" className="text-sm font-medium text-foreground">
                  Max Supply
                </Label>
                <Input
                  id="maxSupply"
                  placeholder="e.g. 1000000000000000000000000"
                  value={formData.maxSupply}
                  onChange={(e) => handleInputChange("maxSupply", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Token Preview</h2>
          </div>

          <AnimatedCard className="glass-card border-white/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border-2 border-white/20 transition-all duration-300 hover:scale-105">
                  {formData.name ? (
                    <span className="text-primary font-bold text-lg">{formData.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <Plus className="h-6 w-6 text-primary/60" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{formData.name || "Token Name"}</h3>
                    {formData.symbol && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-sm font-mono rounded transition-all duration-200 hover:bg-primary/20">
                        ${formData.symbol}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-neutral-400">
                    <p>Decimals: {formData.decimals}</p>
                    {formData.maxSupply && (
                      <p>Max Supply: {formData.maxSupply}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
