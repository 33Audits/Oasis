import { usePublicClient } from "wagmi";
import { abis } from "@/lib/abis";
import { useCallback, useState } from "react";
import { useZeroDev } from "@/providers/ZeroDev";
import { parseEther } from "viem";
import { contractAddress } from "@/lib/contractAddress";
import { baseSepolia } from "viem/chains";

const COLLATERAL_TOKEN_ADDRESS = contractAddress[baseSepolia.id].CollateralToken; 
const MINT_AMOUNT = parseEther("100000");

export function useMintTokens() {
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { kernelClient, isInitializing, smartAccountAddress } = useZeroDev();

  const mintTokens = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!publicClient) {
        throw new Error("Public client not available");
      }

      if (!kernelClient) {
        throw new Error("Smart account not initialized. Please wait...");
      }

      if (!smartAccountAddress) {
        throw new Error("Smart account address not available");
      }

      // Mint 100,000 tokens to the user's smart account using ZeroDev (gasless)
      // @ts-expect-error - ZeroDev kernel client has account embedded
      const txHash = await kernelClient.writeContract({
        address: COLLATERAL_TOKEN_ADDRESS,
        abi: abis.ERC20Mint,
        functionName: "mint",
        args: [smartAccountAddress as `0x${string}`, MINT_AMOUNT],
      });

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
      });

      if (receipt.status !== "success") {
        throw new Error("Transaction failed: " + receipt.status);
      }

      return { txHash, receipt };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [kernelClient, publicClient, smartAccountAddress]);

  return {
    mintTokens,
    isLoading,
    error,
    isInitializing,
    smartAccountAddress,
    mintAmount: MINT_AMOUNT,
    tokenAddress: COLLATERAL_TOKEN_ADDRESS,
  };
}
