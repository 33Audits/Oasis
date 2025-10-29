"use client";

import { useQuery } from "@tanstack/react-query";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "@/providers/wagmiConfig";
import { abis } from "@/lib/abis";
import { calcMarketCapNumber } from "@/lib/marketCap";

 // fetch market cap for a single funding manager address.
export function useMarketCap(fundingManager?: `0x${string}`) {
  return useQuery<number | null>({
    queryKey: ["market-cap", fundingManager],
    enabled: !!fundingManager,
    queryFn: async () => {
      try {
        if (!fundingManager) return null;

        const [reserveBalanceWeiRaw, reserveRatioRaw] = await Promise.all([
          readContract(wagmiConfig, {
            address: fundingManager,
            abi: abis.FM_BC_Bancor_Launchpad_v1,
            functionName: "getVirtualCollateralSupply",
          }),
          readContract(wagmiConfig, {
            address: fundingManager,
            abi: abis.FM_BC_Bancor_Launchpad_v1,
            functionName: "getReserveRatioForBuying",
          }),
        ]);

        const reserveBalanceWei = reserveBalanceWeiRaw as bigint;
        const reserveRatioPpm = BigInt(reserveRatioRaw as number | bigint);

        return calcMarketCapNumber(reserveBalanceWei, reserveRatioPpm);
      } catch {
        return null;
      }
    },
  });
}

// fetch market caps for multiple funding manager addresses
export function useMultipleMarketCaps(fundingManagers: `0x${string}`[] = []) {
  return useQuery<Record<string, number | null>>({
    queryKey: ["market-caps", fundingManagers],
    enabled: fundingManagers.length > 0,
    queryFn: async () => {
      try {
        const results: Record<string, number | null> = {};

        // Process all addresses concurrently
        const promises = fundingManagers.map(async (address) => {
          try {
            const [reserveBalanceWeiRaw, reserveRatioRaw] = await Promise.all([
              readContract(wagmiConfig, {
                address,
                abi: abis.FM_BC_Bancor_Launchpad_v1,
                functionName: "getVirtualCollateralSupply",
              }),
              readContract(wagmiConfig, {
                address,
                abi: abis.FM_BC_Bancor_Launchpad_v1,
                functionName: "getReserveRatioForBuying",
              }),
            ]);

            const reserveBalanceWei = reserveBalanceWeiRaw as bigint;
            const reserveRatioPpm = BigInt(reserveRatioRaw as number | bigint);

            results[address] = calcMarketCapNumber(reserveBalanceWei, reserveRatioPpm);
          } catch {
            results[address] = null;
          }
        });

        await Promise.all(promises);
        return results;
      } catch {
        return {};
      }
    },
  });
}

