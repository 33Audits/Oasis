"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { AnimatedCard } from "@/components/ui/animated-card"
import { FadeIn } from "@/components/ui/fade-in"
import { Wallet, Users, Lock } from "lucide-react"
import { useAgentStore } from "@/lib/store"

export function VaultStep() {
  const { formData, updateFormData } = useAgentStore()

  const handleInputChange = (field: string, value: string | number[] | boolean) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Vault Policies</h1>
              <p className="text-muted-foreground text-balance">
                Configure how profits are distributed, token selection criteria, and access controls for your agent's
                vault.
              </p>
            </div>
          </FadeIn>

          <AnimatedCard delay={0.3} className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Profit Distribution</CardTitle>
              <CardDescription>How should profits be shared between token holders and the vault?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={formData.profitSplit}
                onValueChange={(value) => handleInputChange("profitSplit", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50-50" id="50-50" />
                  <Label htmlFor="50-50" className="text-foreground">
                    50% to holders, 50% to vault
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="70-30" id="70-30" />
                  <Label htmlFor="70-30" className="text-foreground">
                    70% to holders, 30% to vault
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="text-foreground">
                    Custom split
                  </Label>
                </div>
              </RadioGroup>

              {formData.profitSplit === "custom" && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">Custom Split Ratio</Label>
                  <Slider
                    value={formData.customSplit || [70]}
                    onValueChange={(value) => handleInputChange("customSplit", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-medium">{(formData.customSplit || [70])[0]}% to holders</span>
                    <span className="text-muted-foreground font-medium">
                      {100 - (formData.customSplit || [70])[0]}% to vault
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.4} className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Distribution Method</CardTitle>
              <CardDescription>How should profits be distributed to token holders?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.distributionMethod}
                onValueChange={(value) => handleInputChange("distributionMethod", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="automatic" id="automatic" />
                  <Label htmlFor="automatic" className="text-foreground">
                    Automatic distribution
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="claim" id="claim" />
                  <Label htmlFor="claim" className="text-foreground">
                    Claim-based distribution
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reinvest" id="reinvest" />
                  <Label htmlFor="reinvest" className="text-foreground">
                    Auto-reinvest profits
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.5} className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Performance Fee</CardTitle>
              <CardDescription>Set a performance fee for successful trades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Performance Fee (%)</Label>
                <Slider
                  value={formData.performanceFee || [10]}
                  onValueChange={(value) => handleInputChange("performanceFee", value)}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  {(formData.performanceFee || [10])[0]}% fee on profitable trades
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <FadeIn delay={0.6}>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Vault Preview</h2>
            </div>
          </FadeIn>

          <AnimatedCard delay={0.7} className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Wallet className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Profit Split</h3>
                  <p className="text-muted-foreground text-sm">
                    {formData.profitSplit === "custom"
                      ? `${(formData.customSplit || [70])[0]}% holders, ${100 - (formData.customSplit || [70])[0]}% vault`
                      : formData.profitSplit || "Not configured"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Distribution</h3>
                  <p className="text-muted-foreground text-sm">
                    {formData.distributionMethod === "automatic" && "Automatic distribution"}
                    {formData.distributionMethod === "claim" && "Claim-based distribution"}
                    {formData.distributionMethod === "reinvest" && "Auto-reinvest profits"}
                    {!formData.distributionMethod && "Not configured"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Performance Fee</h3>
                  <p className="text-muted-foreground text-sm">
                    {(formData.performanceFee || [10])[0]}% on profitable trades
                  </p>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
