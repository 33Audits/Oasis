"use client";

import { useQuery } from "@tanstack/react-query";
import { readContract, readContracts } from "wagmi/actions";
import { sepolia } from "viem/chains";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { wagmiConfig } from "@/providers/wagmiConfig";

export interface BondingCurveDetails {
  id?: number;
  orchestratorAddress: `0x${string}`;
  fundingManagerAddress: `0x${string}`;
  issuanceToken: {
    address: `0x${string}`;
    name: string;
    symbol: string;
    decimals: number;
  };
}

export function useBondingCurveDetails() {
  // get bonding curve count
  const countQuery = useQuery({
    queryKey: ["bonding-curve-count"],
    queryFn: () => readContract(wagmiConfig, {
      address: contractAddress[sepolia.id].LM_Gaia_BC_Factory_v1,
      abi: abis.LM_Gaia_BC_Factory_v1,
      functionName: "bcWorkflowCount",
    }),
  });

  // get all bonding curve orchestrator addresses
  const addressesQuery = useQuery({
    queryKey: ["bonding-curve-addresses", countQuery.data ? Number(countQuery.data) : null],
    enabled: !!countQuery.data,
    queryFn: async () => {
      const count = Number(countQuery.data);
      if (count === 0) return [];

      const contracts = Array.from({ length: count }, (_, i) => ({
        address: contractAddress[sepolia.id].LM_Gaia_BC_Factory_v1,
        abi: abis.LM_Gaia_BC_Factory_v1,
        functionName: "bcWorkflowAddressById" as const,
        args: [BigInt(i)],
      }));

      const results = await readContracts(wagmiConfig, { contracts });
      return results.map((result) => result.result as `0x${string}`).filter(Boolean);
    },
  });

  // get funding manager addresses for each bonding curve (actual bonding curve address)
  const fundingManagersQuery = useQuery({
    queryKey: ["funding-managers", addressesQuery.data],
    enabled: !!addressesQuery.data && addressesQuery.data.length > 0,
    queryFn: async () => {
      const promises = addressesQuery.data!.map((address) =>
        readContract(wagmiConfig, {
          address,
          abi: abis.Orchestrator_v1,
          functionName: "fundingManager",
        })
      );
      const results = await Promise.all(promises);
      return results.map((result) => ({ result }));
    },
  });

  // get issuance token address from funding managers
  const tokenAddressesQuery = useQuery({
    queryKey: ["token-address", fundingManagersQuery.data],
    enabled: !!fundingManagersQuery.data && fundingManagersQuery.data.length > 0,
    queryFn: async () => {
      const contracts = fundingManagersQuery.data!
        .map((result) => result.result as `0x${string}`)
        .filter(Boolean)
        .map((fundingManagerAddress) => ({
          address: fundingManagerAddress,
          abi: abis.FM_BC_Bancor_Gaia_v1,
          functionName: "getIssuanceToken" as const,
        }));

      return readContracts(wagmiConfig, { contracts });
    },
  });

  // get token metadata (name, symbol, decimals)
  const tokenMetadataQuery = useQuery({
    queryKey: ["token-metadata", tokenAddressesQuery.data],
    enabled: !!tokenAddressesQuery.data && tokenAddressesQuery.data.length > 0,
    queryFn: async () => {
      const contracts: Array<{
        address: `0x${string}`;
        abi: typeof abis.ERC20Mint;
        functionName: "name" | "symbol" | "decimals";
      }> = [];

      tokenAddressesQuery.data!.forEach((result) => {
        const tokenAddress = result.result as `0x${string}`;
        if (tokenAddress) {
          contracts.push(
            {
              address: tokenAddress,
              abi: abis.ERC20Mint,
              functionName: "name",
            },
            {
              address: tokenAddress,
              abi: abis.ERC20Mint,
              functionName: "symbol",
            },
            {
              address: tokenAddress,
              abi: abis.ERC20Mint,
              functionName: "decimals",
            }
          );
        }
      });

      return readContracts(wagmiConfig, { contracts });
    },
  });

  // combine all data
  const detailsQuery = useQuery({
    queryKey: [
      "bonding-curve-details",
      addressesQuery.data,
      fundingManagersQuery.data,
      tokenAddressesQuery.data,
      tokenMetadataQuery.data,
    ],
    enabled: !!(
      addressesQuery.data &&
      fundingManagersQuery.data &&
      tokenAddressesQuery.data &&
      tokenMetadataQuery.data
    ),
    queryFn: () => {
      const addresses = addressesQuery.data!;
      const fundingManagers = fundingManagersQuery.data!;
      const tokenAddresses = tokenAddressesQuery.data!;
      const tokenMetadata = tokenMetadataQuery.data!;

      const detailsArray: BondingCurveDetails[] = [];

      addresses.forEach((address, index) => {
        const fundingManagerResult = fundingManagers[index];
        const tokenAddressResult = tokenAddresses[index];

        if (
          fundingManagerResult?.result &&
          tokenAddressResult?.result
        ) {
          const tokenAddress = tokenAddressResult.result as `0x${string}`;
          const metadataIndex = index * 3;

          const nameResult = tokenMetadata[metadataIndex];
          const symbolResult = tokenMetadata[metadataIndex + 1];
          const decimalsResult = tokenMetadata[metadataIndex + 2];

          if (nameResult?.result && symbolResult?.result && decimalsResult?.result) {
            detailsArray.push({
              id: index + 1,
              orchestratorAddress: address,
              fundingManagerAddress: fundingManagerResult.result as `0x${string}`,
              issuanceToken: {
                address: tokenAddress,
                name: nameResult.result as string,
                symbol: symbolResult.result as string,
                decimals: decimalsResult.result as number,
              },
            });
          }
        }
      });

      return detailsArray;
    },
  });

  return {
    data: detailsQuery.data ?? [],
    isLoading:
      countQuery.isLoading ||
      addressesQuery.isLoading ||
      fundingManagersQuery.isLoading ||
      tokenAddressesQuery.isLoading ||
      tokenMetadataQuery.isLoading ||
      detailsQuery.isLoading,
    error:
      countQuery.error ||
      addressesQuery.error ||
      fundingManagersQuery.error ||
      tokenAddressesQuery.error ||
      tokenMetadataQuery.error ||
      detailsQuery.error,
    refetch: () => {
      countQuery.refetch();
    },
  };
}
