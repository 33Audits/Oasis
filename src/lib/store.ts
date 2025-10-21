import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BondingCurveDetails } from "@/hooks/useBondingCurveDetails";

export interface BondingCurveFormData {
  // Token Parameters
  name: string;
  symbol: string;
  decimals: number;
  maxSupply: string;

  // Bonding Curve Parameters
  reserveRatioForBuying: number;
  reserveRatioForSelling: number;
  initialIssuanceSupply: string;
  initialCollateralSupply: string;

  // Vault Configuration
  vaultAddress: string;
  feeVaultAddress: string;
  threshold: string;

  // Deployment
  stakeAmount: string;
}

interface BondingCurveStore {
  // create state
  formData: BondingCurveFormData;
  currentStep: number;
  updateFormData: (data: Partial<BondingCurveFormData>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;

  // fetched curves state
  curves: Record<string, BondingCurveDetails>;
  setCurves: (arr: BondingCurveDetails[]) => void;
}

const initialFormData: BondingCurveFormData = {
  name: "",
  symbol: "",
  decimals: 18,
  maxSupply: "",

  reserveRatioForBuying: 50,
  reserveRatioForSelling: 50,
  initialIssuanceSupply: "",
  initialCollateralSupply: "",

  vaultAddress: "",
  feeVaultAddress: "",
  threshold: "",

  stakeAmount: "",
};

export const useBondingCurveStore = create<BondingCurveStore>()(
  persist(
    (set) => ({
      // create actions
      formData: initialFormData,
      currentStep: 1,
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetForm: () => set({ formData: initialFormData, currentStep: 1 }),

      // Fetched curves actions
      curves: {},
      setCurves: (arr) =>
        set({
          curves: Object.fromEntries(
            arr.map((c) => [c.fundingManagerAddress.toLowerCase(), c])
          ),
        }),
    }),
    {
      name: "bonding-curve-storage",
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        curves: state.curves,
      }),
      storage: {
        getItem: (name) => {
          const sessionStr = sessionStorage.getItem(name);
          const localStr = localStorage.getItem(name);

          const sessionData = sessionStr ? JSON.parse(sessionStr) : {};
          const localData = localStr ? JSON.parse(localStr) : {};

          return {
            state: {
              formData: sessionData.state?.formData || {},
              currentStep: sessionData.state?.currentStep || 1,
              curves: localData.state?.curves || {},
            },
            version: sessionData.version || 0,
          };
        },
        setItem: (name, value) => {
          const parsed = typeof value === "string" ? JSON.parse(value) : value;

          // Save form data to session storage
          const sessionData = {
            state: {
              formData: parsed.state.formData,
              currentStep: parsed.state.currentStep,
            },
            version: parsed.version,
          };
          sessionStorage.setItem(name, JSON.stringify(sessionData));

          // Save curves to local storage
          const localData = {
            state: {
              curves: parsed.state.curves,
            },
            version: parsed.version,
          };
          localStorage.setItem(name, JSON.stringify(localData));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export const getBondingCurve = (
  address: string
): BondingCurveDetails | undefined =>
  useBondingCurveStore.getState().curves[address.toLowerCase()];

export const setBondingCurves = (curves: BondingCurveDetails[]) =>
  useBondingCurveStore.getState().setCurves(curves);
