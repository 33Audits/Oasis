import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface BondingCurveFormData {
  // Step 1: Token Parameters
  name: string
  symbol: string
  decimals: number
  maxSupply: string

  // Step 2: Bonding Curve Parameters
  reserveRatioForBuying: number
  reserveRatioForSelling: number
  initialIssuanceSupply: string
  initialCollateralSupply: string

  // Step 3: Vault Configuration
  vaultAddress: string
  feeVaultAddress: string
  threshold: string

  // Step 4: Deployment
  stakeAmount: string
}

interface BondingCurveStore {
  formData: BondingCurveFormData
  currentStep: number
  updateFormData: (data: Partial<BondingCurveFormData>) => void
  setCurrentStep: (step: number) => void
  resetForm: () => void
}

const initialFormData: BondingCurveFormData = {
  // Step 1: Token Parameters
  name: "",
  symbol: "",
  decimals: 18,
  maxSupply: "",

  // Step 2: Bonding Curve Parameters
  reserveRatioForBuying: 50,
  reserveRatioForSelling: 50,
  initialIssuanceSupply: "",
  initialCollateralSupply: "",

  // Step 3: Vault Configuration
  vaultAddress: "",
  feeVaultAddress: "",
  threshold: "",

  // Step 4: Deployment
  stakeAmount: "",
}

export const useBondingCurveStore = create<BondingCurveStore>()(
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
      name: "bonding-curve-launchpad-storage",
    },
  ),
)
