import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface BondingCurveFormData {
  // Token Parameters
  name: string
  symbol: string
  decimals: number
  maxSupply: string

  // Bonding Curve Parameters
  reserveRatioForBuying: number
  reserveRatioForSelling: number
  initialIssuanceSupply: string
  initialCollateralSupply: string

  // Vault Configuration
  vaultAddress: string
  feeVaultAddress: string
  threshold: string

  // Deployment
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
  // Token Parameters
  name: "",
  symbol: "",
  decimals: 18,
  maxSupply: "",

  // Bonding Curve Parameters
  reserveRatioForBuying: 50,
  reserveRatioForSelling: 50,
  initialIssuanceSupply: "",
  initialCollateralSupply: "",

  // Vault Configuration
  vaultAddress: "",
  feeVaultAddress: "",
  threshold: "",

  // Deployment
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
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    },
  ),
)
