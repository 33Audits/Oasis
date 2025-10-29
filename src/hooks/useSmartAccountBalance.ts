import { useEffect, useState, useCallback } from "react";
import { usePublicClient } from "wagmi";
import { useZeroDev } from "@/providers/ZeroDev";
import { abis } from "@/lib/abis";
import { contractAddress } from "@/lib/contractAddress";
import { baseSepolia } from "viem/chains";

const COLLATERAL_TOKEN_ADDRESS = contractAddress[baseSepolia.id].CollateralToken;

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
        address: COLLATERAL_TOKEN_ADDRESS,
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
