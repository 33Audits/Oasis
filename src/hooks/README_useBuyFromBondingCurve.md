# useCreateBondingCurve Hook

## Usage
```tsx
"use client";

import { useBuyFromBondingCurve } from "@/hooks/useBuyFromBondingCurve";
import { contractAddress } from "@/lib/contractAddress";
import { formatEther, parseEther } from "viem";
import { useReadContract } from "wagmi";
import { sepolia } from "viem/chains";
import { abis } from "@/lib/abis";
import { useAccount } from "wagmi";
import { useCallback } from "react";

export function Debug() {
  const depositAmount = parseEther("1");

  const walletAddress = useAccount().address as `0x${string}`;
  const { buyFromBondingCurve } = useBuyFromBondingCurve();

  const { data: purchaseReturn } = useReadContract({
    address: contractAddress[sepolia.id].FM_BC_Bancor_Gaia_v1,
    abi: abis.FM_BC_Bancor_Gaia_v1,
    functionName: "calculatePurchaseReturn",
    args: [depositAmount]
  });

  const handleClick = useCallback(async () => {
    try {
      const resp = await buyFromBondingCurve({
        bcAddress: contractAddress[sepolia.id].FM_BC_Bancor_Gaia_v1,
        receiver: walletAddress,
        depositAmount: depositAmount,

        // minAmountOut is something the user should choose,
        // but you can use this approach to show a recommended amount
        minAmountOut: purchaseReturn ? (purchaseReturn * BigInt(90)) / BigInt(100) : 0n,

      });
      console.log(resp);
    } catch (error) {
      console.error("Transaction failed:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : String(error),
        code: (error as any)?.code,
        data: (error as any)?.data
      });
    }
  }, [buyFromBondingCurve, walletAddress, purchaseReturn]);

  return <>
    <button onClick={handleClick}>Buy from BC {purchaseReturn && `(Purchase Return: ${formatEther(purchaseReturn)})`}</button>
  </>;
}
```
