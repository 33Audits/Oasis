"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBondingCurveStore } from "@/lib/store";
import { TokenParametersStep } from "@/components/steps/token-parameters-step";
import { BondingCurveStep } from "@/components/steps/bonding-curve-step";
import { DeployStep } from "@/components/steps/deploy-step";

const steps = [
  { id: 1, name: "Token Parameters", component: TokenParametersStep },
  { id: 2, name: "Bonding Curve", component: BondingCurveStep },
  { id: 3, name: "Deploy", component: DeployStep },
];

export default function CreateBondingCurvePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { formData } = useBondingCurveStore();

  const CurrentStepComponent =
    steps.find((step) => step.id === currentStep)?.component ||
    TokenParametersStep;

  const canProceed = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.symbol && formData.maxSupply;
      case 2:
        return (
          formData.initialIssuanceSupply && formData.initialCollateralSupply
        );
      case 3:
        return formData.stakeAmount;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Steps */}
      <div className="bg-background border-b border-border">
        <div className="container max-w-6xl  mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center space-x-1 md:space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center md:space-x-2">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-xs md:text-sm lg:text-base font-semibold transition-all duration-300 ${
                    currentStep === step.id
                      ? "bg-primary text-white"
                      : currentStep > step.id
                      ? "bg-primary/20 text-primary hover:bg-primary/30"
                      : "bg-muted text-neutral-400 hover:bg-muted/80"
                  }`}
                >
                  {step.id}
                </button>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`font-light text-xs md:text-sm lg:text-base transition-colors ${
                    currentStep === step.id
                      ? "text-white"
                      : currentStep > step.id
                      ? "text-primary/80 hover:text-primary"
                      : "text-neutral-400 hover:text-foreground"
                  }`}
                >
                  {step.name}
                </button>
                {index < steps.length - 1 && (
                  <div className="w-6 md:w-8 lg:w-10 h-px bg-border"></div>
                )}
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
              duration: 0.3,
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
            className="border-border text-neutral-400 hover:bg-muted"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
            disabled={currentStep === 4 || !canProceed(currentStep)}
            className={`bg-white text-black rounded-xl hover:bg-white/90 ${
              currentStep === 3 ? "hidden" : "block"
            }`}
          >
            {currentStep === 3 ? "Create Bonding Curve" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
