import { usePublicClient, useWriteContract } from "wagmi";
import { abis } from "@/lib/abis";
import { useCallback } from "react";
import { decodeErrorResult } from "viem";

export function useSellFromBondingCurve() {
  const publicClient = usePublicClient();
  const { writeContractAsync, ...rest } = useWriteContract();

  const sellFromBondingCurve = useCallback(
    async (params: {
      bcAddress: `0x${string}`;
      receiver: `0x${string}`;
      depositAmount: bigint;
      minAmountOut: bigint;
      tokenAddress: `0x${string}`;
    }) => {
      if (!publicClient) {
        throw new Error("Public client not available");
      }

      // Check if selling is still open before proceeding
      const sellIsOpen = await publicClient.readContract({
        address: params.bcAddress,
        abi: abis.FM_BC_Bancor_Launchpad_v1,
        functionName: "sellIsOpen",
      });

      if (!sellIsOpen) {
        throw new Error("Selling is currently closed. The funding threshold may have been reached.");
      }

      try {
        await writeContractAsync({
          address: params.tokenAddress,
          abi: abis.ERC20Mint,
          functionName: "approve",
          args: [params.bcAddress, params.depositAmount],
        });
      } catch (approveError: any) {
        // Handle approval errors
        throw new Error(approveError?.shortMessage || approveError?.message || "Token approval failed");
      }

      let txid: `0x${string}`;
      
      try {
        txid = await writeContractAsync({
          address: params.bcAddress,
          abi: abis.FM_BC_Bancor_Gaia_v1,
          functionName: "sellTo",
          args: [params.receiver, params.depositAmount, params.minAmountOut],
          gas: BigInt(2100000),
        });
      } catch (txError: any) {
        console.error("Transaction failed:", txError);
        
        let errorMessage = "Sell transaction failed";
        
        // Check for Viem error properties
        const errorWithData = txError as any;
        const revertData = errorWithData.data?.data || errorWithData.cause?.data;
        
        if (revertData && typeof revertData === 'string' && revertData.startsWith('0x')) {
          try {
            const decodedError = decodeErrorResult({
              abi: abis.FM_BC_Bancor_Gaia_v1,
              data: revertData as `0x${string}`,
            });
            
            // Format the error name
            const errorName = decodedError.errorName
              .replace(/^Module__\w+__/, '')
              .replace(/([A-Z])/g, ' $1')
              .trim();
            
            errorMessage = decodedError.args && decodedError.args.length > 0
              ? `${errorName}: ${decodedError.args.join(', ')}`
              : errorName;
          } catch (decodeErr) {
            console.error("Failed to decode error:", decodeErr);
          }
        } else if (errorWithData.shortMessage) {
          errorMessage = errorWithData.shortMessage;
        } else if (errorWithData.message) {
          // Extract readable error from message
          const contractErrorMatch = errorWithData.message.match(/Error: ([\w_]+)\(/);
          if (contractErrorMatch) {
            const contractError = contractErrorMatch[1]
              .replace(/^Module__\w+__/, '')
              .replace(/([A-Z])/g, ' $1')
              .trim();
            errorMessage = contractError;
          } else if (errorWithData.message.includes("User rejected")) {
            errorMessage = "Transaction rejected";
          } else if (errorWithData.message.includes("insufficient")) {
            errorMessage = "Insufficient balance";
          } else {
            errorMessage = errorWithData.message;
          }
        }
        
        throw new Error(errorMessage);
      }

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txid,
        confirmations: 1,
      });

      if (receipt.status !== "success") {
        throw new Error("Transaction failed: " + receipt.status);
      }

      return { txid, receipt };
    },
    [writeContractAsync, publicClient]
  );

  return { sellFromBondingCurve, ...rest };
}
