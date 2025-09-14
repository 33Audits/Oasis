"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import { useAgentStore } from "@/lib/store"
import { CreateAgentStep } from "@/components/steps/create-agent-step"
import { StrategyStep } from "@/components/steps/strategy-step"
import { VaultStep } from "@/components/steps/vault-step"
import { DeployStep } from "@/components/steps/deploy-step"

const steps = [
  { id: 1, name: "Create Agent", component: CreateAgentStep },
  { id: 2, name: "Strategy", component: StrategyStep },
  { id: 3, name: "Vault", component: VaultStep },
  { id: 4, name: "Deploy", component: DeployStep },
]

export default function CreateAgentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { formData } = useAgentStore()

  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component || CreateAgentStep

  const canProceed = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.ticker
      case 2:
        return formData.riskAppetite && formData.selectedAssets && formData.selectedAssets.length > 0
      case 3:
        return formData.profitSplit && formData.distributionToken
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Agent Launchpad</span>
          </div>
          <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 bg-transparent">
            Connect Wallet
          </Button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-background border-b border-border">
        <div className="container max-w-6xl  mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "bg-primary/20 text-primary hover:bg-primary/30"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {step.id}
                </button>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`font-medium transition-colors ${
                    currentStep === step.id
                      ? "text-primary"
                      : currentStep > step.id
                        ? "text-primary/80 hover:text-primary"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {step.name}
                </button>
                {index < steps.length - 1 && <div className="w-8 h-px bg-border"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3
            }}
            className="w-full"
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="border-border text-muted-foreground hover:bg-muted"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={currentStep === 4 || !canProceed(currentStep)}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground"
          >
            {currentStep === 4 ? "Launch Agent" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
