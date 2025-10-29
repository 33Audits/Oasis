import { usePublicClient, useWalletClient, useAccount } from "wagmi";
import { baseSepolia } from "viem/chains";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { useCallback, useState } from "react";


export function useSellFromBondingCurve() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


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

        if (!walletClient) {
          throw new Error("Wallet not connected");
        }

        if (!isConnected || !address) {
          throw new Error("Please connect your wallet");
        }

        // Approve token spending
        const approveTxHash = await walletClient.writeContract({
          address: params.tokenAddress,
          abi: abis.ERC20Mint,
          functionName: "approve",
          args: [params.bcAddress, params.depositAmount],
          account: address,
          chain: baseSepolia,
        });

        // Sell tokens (don't wait for approve confirmation to bundle)
        const sellTxHash = await walletClient.writeContract({
          address: params.bcAddress,
          abi: abis.FM_BC_Bancor_Launchpad_v1,
          functionName: "sellTo",
          args: [params.receiver, params.depositAmount, params.minAmountOut],
          account: address,
          chain: baseSepolia,
          gas: BigInt(2100000),
        });

        // Wait for both transactions in parallel
        const [approveReceipt, sellReceipt] = await Promise.all([
          publicClient.waitForTransactionReceipt({
            hash: approveTxHash,
            confirmations: 1,
          }),
          publicClient.waitForTransactionReceipt({
            hash: sellTxHash,
            confirmations: 1,
          }),
        ]);

        if (approveReceipt.status !== "success") {
          throw new Error("Approval transaction failed");
        }

        if (sellReceipt.status !== "success") {
          throw new Error("Sell transaction failed");
        }

        return { txid: sellTxHash, receipt: sellReceipt, approveTxHash, approveReceipt };
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [walletClient, publicClient, address, isConnected]
  );

  return { sellFromBondingCurve, isLoading, error, isConnected };
}
