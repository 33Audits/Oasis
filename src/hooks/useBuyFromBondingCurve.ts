import { usePublicClient } from "wagmi";
import { baseSepolia } from "viem/chains";
import { decodeErrorResult, encodeFunctionData } from "viem";
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

      if (!kernelClient || !kernelClient.account) {
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

      // Batch approve + buy into a single UserOperation to avoid nonce issues
      const approveCallData = encodeFunctionData({
        abi: abis.ERC20Mint,
        functionName: "approve",
        args: [params.bcAddress, params.depositAmount],
      });

      const buyCallData = encodeFunctionData({
        abi: abis.FM_BC_Bancor_Launchpad_v1,
        functionName: "buyFor",
        args: [params.receiver, params.depositAmount, params.minAmountOut],
      });

      const userOpHash = await kernelClient.sendUserOperation({
        callData: await kernelClient.account.encodeCalls([
          {
            to: contractAddress[baseSepolia.id].CollateralToken,
            data: approveCallData,
            value: BigInt(0),
          },
          {
            to: params.bcAddress,
            data: buyCallData,
            value: BigInt(0),
          },
        ]),
      });

      // Wait for the UserOperation to be included in a transaction
      const txid = await kernelClient.waitForUserOperationReceipt({
        hash: userOpHash,
      }).then((receipt: any) => receipt.receipt.transactionHash);

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