import { usePublicClient, useWriteContract } from "wagmi";
import { abis } from "@/lib/abis";
import { useCallback } from "react";

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

      await writeContractAsync({
        address: params.tokenAddress,
        abi: abis.ERC20Mint,
        functionName: "approve",
        args: [params.bcAddress, params.depositAmount],
      });

      // Simulate the sellTo transaction to check for errors
      try {
        const { request } = await publicClient.simulateContract({
          address: params.bcAddress,
          abi: abis.FM_BC_Bancor_Gaia_v1,
          functionName: "sellTo",
          args: [params.receiver, params.depositAmount, params.minAmountOut],
          gas: BigInt(2100000),
        });
        console.log("Simulation successful:", request);
      } catch (simulationError) {
        console.error("Simulation failed:", simulationError);
        
        // Extract the specific contract error
        let errorMessage = "Transaction simulation failed";
        if (simulationError instanceof Error) {
          const errorMatch = simulationError.message.match(/Error: ([\w_]+)\(/);
          if (errorMatch) {
            // Convert contract error name to readable format
            const contractError = errorMatch[1]
              .replace(/^Module__\w+__/, '')
              .replace(/([A-Z])/g, ' $1')
              .trim();
            errorMessage = contractError || errorMatch[1];
          } else if (simulationError.message.includes("reverted")) {
            errorMessage = "Transaction would revert";
          }
        }
        
        throw new Error(errorMessage);
      }

      const txid = await writeContractAsync({
        address: params.bcAddress,
        abi: abis.FM_BC_Bancor_Gaia_v1,
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
    },
    [writeContractAsync, publicClient]
  );

  return { sellFromBondingCurve, ...rest };
}
