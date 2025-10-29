"use client";

import { useQuery } from "@tanstack/react-query";
import { readContract, readContracts } from "wagmi/actions";
import { abis } from "@/lib/abis";
import { wagmiConfig } from "@/providers/wagmiConfig";

export interface TokenDetails {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
}

export function useTokenDetails(fundingManagerAddress: `0x${string}` | undefined) {
  const issuanceTokenQuery = useQuery({
    queryKey: ["issuance-token", fundingManagerAddress],
    enabled: !!fundingManagerAddress,
    queryFn: () => readContract(wagmiConfig, {
      address: fundingManagerAddress!,
      abi: abis.FM_BC_Bancor_Launchpad_v1,
      functionName: "getIssuanceToken",
    }),
  });

  const issuanceTokenMetadataQuery = useQuery({
    queryKey: ["issuance-token-metadata", issuanceTokenQuery.data],
    enabled: !!issuanceTokenQuery.data,
    queryFn: async () => {
      const issuanceTokenAddress = issuanceTokenQuery.data as `0x${string}`;

      const contracts = [
        {
          address: issuanceTokenAddress,
          abi: abis.ERC20Mint,
          functionName: "name" as const,
        },
        {
          address: issuanceTokenAddress,
          abi: abis.ERC20Mint,
          functionName: "symbol" as const,
        },
        {
          address: issuanceTokenAddress,
          abi: abis.ERC20Mint,
          functionName: "decimals" as const,
        },
      ];

      const results = await readContracts(wagmiConfig, { contracts });
      return results;
    },
  });

  const tokenDetailsQuery = useQuery({
    queryKey: [
      "token-details",
      fundingManagerAddress,
      issuanceTokenQuery.data,
      issuanceTokenMetadataQuery.data,
    ],
    enabled: !!(
      fundingManagerAddress &&
      issuanceTokenQuery.data &&
      issuanceTokenMetadataQuery.data
    ),
    queryFn: () => {
      const issuanceTokenAddress = issuanceTokenQuery.data as `0x${string}`;
      const issuanceMetadata = issuanceTokenMetadataQuery.data!;

      const result: TokenDetails = {
        address: issuanceTokenAddress,
        name: issuanceMetadata[0]?.result as string || "",
        symbol: issuanceMetadata[1]?.result as string || "",
        decimals: issuanceMetadata[2]?.result as number || 18,
      };

      return result;
    },
  });

  return {
    data: tokenDetailsQuery.data,
    isLoading:
      issuanceTokenQuery.isLoading ||
      issuanceTokenMetadataQuery.isLoading ||
      tokenDetailsQuery.isLoading,
    error:
      issuanceTokenQuery.error ||
      issuanceTokenMetadataQuery.error ||
      tokenDetailsQuery.error,
    refetch: () => {
      issuanceTokenQuery.refetch();
    },
  };
}
