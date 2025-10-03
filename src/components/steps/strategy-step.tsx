"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedCard } from "@/components/ui/animated-card"
import { FadeIn } from "@/components/ui/fade-in"
import { TrendingUp, Shield, Zap } from "lucide-react"
import { useAgentStore } from "@/lib/store"

const riskLevels = [
  { id: "conservative", name: "Conservative", icon: Shield, description: "Low risk, steady returns" },
  { id: "moderate", name: "Moderate", icon: TrendingUp, description: "Balanced risk and reward" },
  { id: "aggressive", name: "Aggressive", icon: Zap, description: "High risk, high potential returns" },
]

const assetTypes = ["Large Cap", "Mid Cap", "Small Cap", "DeFi", "Gaming", "AI", "Memecoins", "Stablecoins"]

const mcpTools = [
  "Price Analysis",
  "Volume Analysis",
  "Technical Indicators",
  "Social Sentiment",
  "News Analysis",
  "On-chain Metrics",
]

export function StrategyStep() {
  const { formData, updateFormData } = useAgentStore()

  const handleRiskChange = (risk: string) => {
    updateFormData({ riskAppetite: risk })
  }

  const handleAssetToggle = (asset: string) => {
    const current = formData.assetTypes || []
    const updated = current.includes(asset) ? current.filter((a: string) => a !== asset) : [...current, asset]
    updateFormData({ assetTypes: updated })
  }

  const handleToolToggle = (tool: string) => {
    const current = formData.mcpTools || []
    const updated = current.includes(tool) ? current.filter((t: string) => t !== tool) : [...current, tool]
    updateFormData({ mcpTools: updated })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Agent Strategy</h1>
            <p className="text-neutral-400 text-balance">
              Configure your agent's trading approach, risk tolerance, and the tools it will use to make decisions.
            </p>
          </div>

          <AnimatedCard className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Risk Appetite</CardTitle>
              <CardDescription>Choose your agent's risk tolerance level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {riskLevels.map((risk) => {
                  const Icon = risk.icon
                  return (
                    <Button
                      key={risk.id}
                      variant={formData.riskAppetite === risk.id ? "default" : "outline"}
                      className={`justify-start h-auto p-4 ${
                        formData.riskAppetite === risk.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-muted"
                      }`}
                      onClick={() => handleRiskChange(risk.id)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{risk.name}</div>
                        <div className="text-sm opacity-80">{risk.description}</div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Asset Types</CardTitle>
              <CardDescription>Select the types of assets your agent can trade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {assetTypes.map((asset) => (
                  <Badge
                    key={asset}
                    variant={formData.assetTypes?.includes(asset) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.assetTypes?.includes(asset)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-border hover:bg-muted"
                    }`}
                    onClick={() => handleAssetToggle(asset)}
                  >
                    {asset}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">MCP Tools</CardTitle>
              <CardDescription>Choose the analysis tools your agent will use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mcpTools.map((tool) => (
                  <Badge
                    key={tool}
                    variant={formData.mcpTools?.includes(tool) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.mcpTools?.includes(tool)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-border hover:bg-muted"
                    }`}
                    onClick={() => handleToolToggle(tool)}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Strategy Preview</h2>
          </div>

          <AnimatedCard className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Risk Profile</h3>
                <p className="text-neutral-400 text-sm">
                  {formData.riskAppetite
                    ? riskLevels.find((r) => r.id === formData.riskAppetite)?.description || "Not selected"
                    : "Select a risk level"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Asset Focus</h3>
                <p className="text-neutral-400 text-sm">
                  {formData.assetTypes?.length
                    ? `Trading ${formData.assetTypes.length} asset types`
                    : "No assets selected"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Analysis Tools</h3>
                <p className="text-neutral-400 text-sm">
                  {formData.mcpTools?.length ? `Using ${formData.mcpTools.length} analysis tools` : "No tools selected"}
                </p>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
