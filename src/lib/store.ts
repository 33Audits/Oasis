import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AgentFormData {
  // Step 1: Agent Creation
  name: string
  ticker: string
  personality: string
  lpAllocation: number[]

  // Step 2: Strategy Configuration
  riskAppetite: string
  selectedAssets: string[]
  selectedTools: string[]
  selectedProtocols: string[]
  strategy: string
  assetTypes: string[]
  mcpTools: string[]

  // Step 2b: Advanced Parameters
  baseStrategy: string
  parameters: {
    watching: string
    rsiPeriod: string
    rsiThresholds: string
    slTp: string
  }
  connectedServers: string[]

  // Step 3: Vault Policies
  profitSplit: string
  customSplit: number[]
  distributionToken: string
  distributionMethod: string
  vaultAccess: string
  performanceFee: number[]

  // Step 4: Deployment
  initialBuy: string
  fundingGoal: string
  buyAmount: number
  launchDelay: number
}

interface AgentStore {
  formData: AgentFormData
  currentStep: number
  updateFormData: (data: Partial<AgentFormData>) => void
  setCurrentStep: (step: number) => void
  resetForm: () => void
}

const initialFormData: AgentFormData = {
  // Step 1
  name: "",
  ticker: "",
  personality: "",
  lpAllocation: [60],

  // Step 2
  riskAppetite: "Middle",
  selectedAssets: ["altcoins"],
  selectedTools: ["Trendmoon", "Allora"],
  selectedProtocols: ["Ethereum", "Aave"],
  strategy: "",
  assetTypes: ["altcoins"],
  mcpTools: ["Trendmoon", "Allora"],

  // Step 2b
  baseStrategy: "momentum scalper",
  parameters: {
    watching: "ETH/USDC",
    rsiPeriod: "14",
    rsiThresholds: "70 / 30",
    slTp: "5% / 10%",
  },
  connectedServers: ["Ethereum", "Aave", "Euler"],

  // Step 3
  profitSplit: "55-45",
  customSplit: [70],
  distributionToken: "agent",
  distributionMethod: "automatic",
  vaultAccess: "locked",
  performanceFee: [15],

  // Step 4
  initialBuy: "0.005",
  fundingGoal: "10",
  buyAmount: 0.005,
  launchDelay: 0,
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      currentStep: 1,
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetForm: () => set({ formData: initialFormData, currentStep: 1 }),
    }),
    {
      name: "agent-launchpad-storage",
    },
  ),
)
