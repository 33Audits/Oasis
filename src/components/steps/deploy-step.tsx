"use client"

import { useState } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AnimatedCard } from "@/components/ui/animated-card"
import { FadeIn } from "@/components/ui/fade-in"
import { Rocket, DollarSign, Target, Clock } from "lucide-react"
import { useAgentStore } from "@/lib/store"

export function DeployStep() {
  const { formData, updateFormData } = useAgentStore()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)

  const handleInputChange = (field: string, value: string | number) => {
    updateFormData({ [field]: value })
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    setDeployProgress(0)

    // Simulate deployment process
    const steps = [
      { name: "Creating smart contract", duration: 2000 },
      { name: "Deploying to blockchain", duration: 3000 },
      { name: "Setting up liquidity pool", duration: 2500 },
      { name: "Initializing agent", duration: 1500 },
      { name: "Finalizing deployment", duration: 1000 },
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration))
      setDeployProgress((i + 1) * 20)
    }

    setIsDeploying(false);
  }

  const estimatedCost = 0.05 + (parseFloat(formData.fundingGoal) || 0) * 0.001

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Deploy Agent</h1>
            <p className="text-neutral-400 text-balance">
              Set your launch parameters and deploy your AI trading agent to the blockchain.
            </p>
          </div>

          <AnimatedCard className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Launch Parameters</CardTitle>
              <CardDescription>Configure the initial settings for your agent launch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buyAmount" className="text-sm font-medium text-foreground">
                  Initial Token Buy Amount (ETH)
                </Label>
                <Input
                  id="buyAmount"
                  type="number"
                  placeholder="0.1"
                  step="0.01"
                  min="0.01"
                  value={formData.buyAmount || ""}
                  onChange={(e) => handleInputChange("buyAmount", Number.parseFloat(e.target.value) || 0)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundingGoal" className="text-sm font-medium text-foreground">
                  Funding Goal (ETH)
                </Label>
                <Input
                  id="fundingGoal"
                  type="number"
                  placeholder="10"
                  step="1"
                  min="1"
                  value={formData.fundingGoal || ""}
                  onChange={(e) => handleInputChange("fundingGoal", Number.parseFloat(e.target.value) || 0)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="launchDelay" className="text-sm font-medium text-foreground">
                  Launch Delay (hours)
                </Label>
                <Input
                  id="launchDelay"
                  type="number"
                  placeholder="24"
                  step="1"
                  min="0"
                  value={formData.launchDelay || ""}
                  onChange={(e) => handleInputChange("launchDelay", Number.parseInt(e.target.value) || 0)}
                  className="border-border focus:border-primary focus:ring-primary transition-all duration-200"
                />
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Deployment Cost</CardTitle>
              <CardDescription>Estimated costs for deploying your agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Smart Contract Deployment</span>
                <span className="text-foreground">0.05 ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Initial Liquidity</span>
                <span className="text-foreground">{(parseFloat(formData.fundingGoal) || 0) * 0.001} ETH</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-medium">
                <span className="text-foreground">Total Estimated Cost</span>
                <span className="text-primary">{estimatedCost.toFixed(3)} ETH</span>
              </div>
            </CardContent>
          </AnimatedCard>

          {!isDeploying && deployProgress === 0 && (
            <Button
              onClick={handleDeploy}
              className="w-full bg-white text-black rounded-xl hover:bg-white/90"
              disabled={!formData.buyAmount || !formData.fundingGoal}
            >
              <Rocket className="mr-2 h-4 w-4" />
              Deploy Agent
            </Button>
          )}

          {isDeploying && (
            <AnimatedCard className="border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-5 w-5 text-primary animate-pulse" />
                    <span className="text-foreground font-medium">Deploying Agent...</span>
                  </div>
                  <Progress value={deployProgress} className="w-full" />
                  <p className="text-sm text-neutral-400">
                    {deployProgress < 20 && "Creating smart contract..."}
                    {deployProgress >= 20 && deployProgress < 40 && "Deploying to blockchain..."}
                    {deployProgress >= 40 && deployProgress < 60 && "Setting up liquidity pool..."}
                    {deployProgress >= 60 && deployProgress < 80 && "Initializing agent..."}
                    {deployProgress >= 80 && "Finalizing deployment..."}
                  </p>
                </div>
              </CardContent>
            </AnimatedCard>
          )}

          {deployProgress === 100 && (
            <AnimatedCard className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <div className="text-green-500 font-semibold">🎉 Agent Deployed Successfully!</div>
                  <p className="text-sm text-neutral-400">
                    Your AI trading agent is now live and ready to start trading.
                  </p>
                </div>
              </CardContent>
            </AnimatedCard>
          )}
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Launch Summary</h2>
          </div>

          <AnimatedCard className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Initial Investment</h3>
                  <p className="text-neutral-400 text-sm">{formData.buyAmount || 0} ETH token purchase</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Funding Goal</h3>
                  <p className="text-neutral-400 text-sm">{formData.fundingGoal || "0"} ETH target</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Launch Timing</h3>
                  <p className="text-neutral-400 text-sm">{formData.launchDelay || 0} hours delay</p>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  )
}
