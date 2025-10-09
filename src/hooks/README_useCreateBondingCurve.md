# useCreateBondingCurve Hook

## Usage
```tsx
"use client";

import { useCreateBondingCurve } from "@/hooks/useCreateBondingCurve";

const PLACEHOLDER_ADDRESS = '0x5DA6BFd31475057af04E2804a03a3B1D06338724';

export function DebugContractCommunication() {
  const { createBondingCurve, bcWorkflowAddress, minDepositAmount } = useCreateBondingCurve();

  const handleClick = async () => {
    try {
      await createBondingCurve({ 
        vaultAddress: PLACEHOLDER_ADDRESS,
        feeVaultAddress: PLACEHOLDER_ADDRESS,
        stakeAmount: parseEther("1000"),
        threshold: parseEther("1000"),
        bcParams: { reserveRatioForBuying: 500000, reserveRatioForSelling: 500000, initialIssuanceSupply: parseEther("100000"), initialCollateralSupply: parseEther("1000") },
        issuanceTokenParams: { name: "Test Issuance Token", symbol: "TIT", decimals: 18, maxSupply: parseEther("10000000000") },
       });
    } catch (error) {
      console.error("Transaction failed:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : String(error),
        code: (error as any)?.code,
        data: (error as any)?.data
      });
    }
  }

  return <>
    {bcWorkflowAddress && <div>BC Workflow Address: {bcWorkflowAddress}</div>}
    <button onClick={handleClick}>Create BC {minDepositAmount && `(Min Deposit Amount: ${formatEther(minDepositAmount)})`}</button>
  </>;
}
