import { useEffect, useState, useCallback } from "react";
import { usePublicClient } from "wagmi";
import { useZeroDev } from "@/providers/ZeroDev";
import { abis } from "@/lib/abis";

const GAIA_TOKEN_ADDRESS = "0x525470415c0958a749888d4f2e872ef1cf0a73c1" as const;

export function useSmartAccountBalance() {
  const publicClient = usePublicClient();
  const { smartAccountAddress, isInitializing } = useZeroDev();
  const [balance, setBalance] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    if (!publicClient || !smartAccountAddress || isInitializing) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const bal = await publicClient.readContract({
        address: GAIA_TOKEN_ADDRESS,
        abi: abis.ERC20Mint,
        functionName: "balanceOf",
        args: [smartAccountAddress as `0x${string}`],
      });
      setBalance(bal);
      
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance(null);
    } finally {
      setIsLoading(false);
    }
  }, [publicClient, smartAccountAddress, isInitializing]);

  // Only fetch balance once when the hook mounts
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    isLoading,
    hasZeroBalance: balance !== null && balance === BigInt(0),
    refetchBalance: fetchBalance,
  };
}
