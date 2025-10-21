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
            abi: abis.FM_BC_Bancor_Gaia_v1,
            functionName: "getVirtualCollateralSupply",
          }),
          readContract(wagmiConfig, {
            address: fundingManager,
            abi: abis.FM_BC_Bancor_Gaia_v1,
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

