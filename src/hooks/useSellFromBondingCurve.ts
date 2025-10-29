import { usePublicClient } from "wagmi";
import { sepolia } from "viem/chains";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { useCallback, useState } from "react";
import { useZeroDev } from "@/providers/ZeroDev";


export function useSellFromBondingCurve() {
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { kernelClient, isInitializing } = useZeroDev();


  const sellFromBondingCurve = useCallback(
    async (params: {
      bcAddress: `0x${string}`;
      receiver: `0x${string}`;
      depositAmount: bigint;
      minAmountOut: bigint;
      tokenAddress: `0x${string}`;
    }) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!publicClient) {
          throw new Error("Public client not available");
        }

        if (!kernelClient) {
          throw new Error("Smart account not initialized. Please wait...");
        }

        // Approve token spending using ZeroDev (gasless)
        // @ts-expect-error - ZeroDev kernel client has account embedded
        const approveTxHash = await kernelClient.writeContract({
          address: params.tokenAddress,
          abi: abis.ERC20Mint,
          functionName: "approve",
          args: [params.bcAddress, params.depositAmount],
        });

        await publicClient.waitForTransactionReceipt({
          hash: approveTxHash,
          confirmations: 1,
        });

        // Sell tokens using ZeroDev (gasless)
        // @ts-expect-error - ZeroDev kernel client has account embedded
        const txid = await kernelClient.writeContract({
          address: params.bcAddress,
          abi: abis.FM_BC_Bancor_Launchpad_v1,
          functionName: "sellTo",
          args: [params.receiver, params.depositAmount, params.minAmountOut],
          gas: BigInt(2100000),
        });

        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txid,
          confirmations: 1,
        });

        if (receipt.status !== "success") {
          throw new Error("Transaction failed: " + receipt.status);
        }

        return { txid, receipt };
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [kernelClient, publicClient]
  );

  return { sellFromBondingCurve, isLoading, error, isInitializing };
}
