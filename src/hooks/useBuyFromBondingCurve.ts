import { usePublicClient } from "wagmi";
import { baseSepolia } from "viem/chains";
import { decodeErrorResult } from "viem";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { useCallback, useState } from "react";
import { useZeroDev } from "@/providers/ZeroDev";

export function useBuyFromBondingCurve() {
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { kernelClient, isInitializing } = useZeroDev();

  const buyFromBondingCurve = useCallback(async (params: {
    bcAddress: `0x${string}`,
    receiver: `0x${string}`,
    depositAmount: bigint,
    minAmountOut: bigint,
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

      // Check if buying is still open before proceeding
      const buyIsOpen = await publicClient.readContract({
        address: params.bcAddress,
        abi: abis.FM_BC_Bancor_Launchpad_v1,
        functionName: "buyIsOpen",
      });

      if (!buyIsOpen) {
        throw new Error("Buying is currently closed. The funding threshold may have been reached.");
      }

      // Approve token spending using ZeroDev (gasless)
      // @ts-expect-error - ZeroDev kernel client already has account embedded
      const approveTxHash = await kernelClient.writeContract({
        address: contractAddress[baseSepolia.id].CollateralToken,
        abi: abis.ERC20Mint,
        functionName: "approve",
        args: [params.bcAddress, params.depositAmount],
      });

      await publicClient.waitForTransactionReceipt({
        hash: approveTxHash,
        confirmations: 1,
      });

      // Buy tokens using ZeroDev (gasless)
      // @ts-expect-error - ZeroDev kernel client already has account embedded
      const txid = await kernelClient.writeContract({
        address: params.bcAddress,
        abi: abis.FM_BC_Bancor_Launchpad_v1,
        functionName: "buyFor",
        args: [params.receiver, params.depositAmount, params.minAmountOut],
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
      let errorMessage = "Transaction failed";
      
      if (err instanceof Error) {
        const errorStr = err.message;
        
        // Extract UserOperation revert reason
        const revertMatch = errorStr.match(/reverted during simulation with reason: (0x[a-fA-F0-9]+)/);
        if (revertMatch) {
          const revertData = revertMatch[1] as `0x${string}`;
          
          try {
            const decodedError = decodeErrorResult({
              abi: abis.FM_BC_Bancor_Launchpad_v1,
              data: revertData,
            });
            
            // Format the error name and args
            const errorName = decodedError.errorName
              .replace(/^Module__\w+__/, '')
              .replace(/([A-Z])/g, ' $1')
              .trim();
            
            errorMessage = decodedError.args && decodedError.args.length > 0
              ? `${errorName}: ${decodedError.args.join(', ')}`
              : errorName;
          } catch {
            errorMessage = `Transaction would revert (${revertData})`;
          }
        }
        // Extract contract error names like "Error: SomeError()"
        else {
          const contractErrorMatch = errorStr.match(/Error: ([\w_]+)\(/);
          if (contractErrorMatch) {
            const contractError = contractErrorMatch[1]
              .replace(/^Module__\w+__/, '')
              .replace(/([A-Z])/g, ' $1')
              .trim();
            errorMessage = contractError || contractErrorMatch[1];
          } else if (errorStr.includes("User rejected")) {
            errorMessage = "Transaction rejected";
          } else if (errorStr.includes("insufficient")) {
            errorMessage = "Insufficient balance";
          } else {
            // Use original message if no pattern matches
            errorMessage = errorStr;
          }
        }
      }
      
      const error = new Error(errorMessage);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [kernelClient, publicClient]);

  return { buyFromBondingCurve, isLoading, error, isInitializing };
}