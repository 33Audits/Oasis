"use client"

import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { AnimatedCard } from "@/components/ui/animated-card"
import { FadeIn } from "@/components/ui/fade-in"
import { Plus } from "lucide-react"
import { useAgentStore } from "@/lib/store"

export function CreateAgentStep() {
  const { formData, updateFormData } = useAgentStore()

  const handleInputChange = (field: string, value: string | number[]) => {
    updateFormData({ [field]: value })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create an agent</h1>
            <p className="text-muted-foreground text-balance">
              Your agent's trading bio, visible to everyone. Begin building your agent by setting its identity,
              including a name, personality and strategy.
            </p>
          </div>

          <AnimatedCard className="glass-card border-primary/20">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Display name for the agent and token"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticker" className="text-sm font-medium text-foreground">
                  Ticker
                </Label>
                <Input
                  id="ticker"
                  placeholder="Your agent's token $TICKER"
                  value={formData.ticker}
                  onChange={(e) => handleInputChange("ticker", e.target.value.toUpperCase())}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personality" className="text-sm font-medium text-foreground">
                  Trading personality
                </Label>
                <Textarea
                  id="personality"
                  placeholder="Type your message here."
                  rows={4}
                  value={formData.personality}
                  onChange={(e) => handleInputChange("personality", e.target.value)}
                  className="border-border focus:border-primary focus:ring-primary resize-none transition-all duration-200"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-foreground">Strategy funding slider</Label>
                <div className="space-y-3">
                  <Slider
                    value={formData.lpAllocation}
                    onValueChange={(value) => handleInputChange("lpAllocation", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-medium">{formData.lpAllocation[0]}% to LP</span>
                    <span className="text-muted-foreground font-medium">
                      {100 - formData.lpAllocation[0]}% to Stablecoins for Strategy
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Agent Preview</h2>
          </div>

          <AnimatedCard className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 transition-all duration-300 hover:scale-105">
                  {formData.name ? (
                    <span className="text-primary font-bold text-lg">{formData.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <Plus className="h-6 w-6 text-primary/60" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{formData.name || "Agent Name"}</h3>
                    {formData.ticker && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-sm font-mono rounded transition-all duration-200 hover:bg-primary/20">
                        ${formData.ticker}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {formData.personality || "Your agent's trading bio, visible to everyone"}
                  </p>
                </div>
              </div>

              {formData.lpAllocation[0] !== 60 && (
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <div className="text-sm text-muted-foreground mb-2">Strategy Allocation</div>
                  <div className="flex space-x-2">
                    <div
                      className="bg-primary h-2 rounded-l transition-all duration-500"
                      style={{ width: `${formData.lpAllocation[0]}%` }}
                    ></div>
                    <div
                      className="bg-muted h-2 rounded-r transition-all duration-500"
                      style={{ width: `${100 - formData.lpAllocation[0]}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
