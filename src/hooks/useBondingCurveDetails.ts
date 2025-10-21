//TODO: Break this into smaller hooks

"use client";

import { useQuery } from "@tanstack/react-query";
import { readContract, readContracts } from "wagmi/actions";
import { sepolia } from "viem/chains";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { wagmiConfig } from "@/providers/wagmiConfig";
import { calcMarketCapNumber } from "@/lib/marketCap";
import { setBondingCurves } from "@/lib/store";
import { GRAPHQL_URL } from "@/lib/constants";

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
  marketCap?: number | null;
  holderCount?: number;
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

  // get token total supply
  const tokenSupplyQuery = useQuery({
    queryKey: ["token-supply", tokenAddressesQuery.data ? Number(tokenAddressesQuery.data) : null],
    enabled: !!tokenAddressesQuery.data,
    queryFn: async () => {
      const contracts = tokenAddressesQuery.data!
        .map((result) => result.result as `0x${string}`)
        .filter(Boolean)
        .map((tokenAddress) => ({
          address: tokenAddress,
          abi: abis.ERC20Mint,
          functionName: "totalSupply" as const,
        }));

      return readContracts(wagmiConfig, { contracts });
    },
  });

  // get collateral balance and reserve ratio for each bonding curve
  const bcMetricsQuery = useQuery({
    queryKey: [
      "bc-metrics",
      fundingManagersQuery.data,
    ],
    enabled:
      !!fundingManagersQuery.data,
    queryFn: async () => {
      const contracts: Array<{
        address: `0x${string}`;
        abi: typeof abis.FM_BC_Bancor_Gaia_v1;
        functionName:
          | "getVirtualCollateralSupply"
          | "getReserveRatioForBuying"
          | "getVirtualIssuanceSupply";
      }> = [];

      fundingManagersQuery.data!.forEach((result) => {
        const fmAddress = result.result as `0x${string}`;
        if (fmAddress) {
          contracts.push(
            {
              address: fmAddress,
              abi: abis.FM_BC_Bancor_Gaia_v1,
              functionName: "getVirtualCollateralSupply",
            },
            {
              address: fmAddress,
              abi: abis.FM_BC_Bancor_Gaia_v1,
              functionName: "getReserveRatioForBuying",
            }
          );
        }
      });

      return readContracts(wagmiConfig, { contracts });
    },
  });

  // fetch holderCount and allTimeHigh from GraphQL
  const graphQLDataQuery = useQuery({
    queryKey: ["bonding-curve-graphql-data"],
    queryFn: async () => {
      const query = `
        query GetBondingCurveStats {
          bondingCurves {
            holderCount
            fundingManagerAddress
          }
        }
      `;

      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      interface GraphQLResponse {
        data: {
          bondingCurves: Array<{
            holderCount: number;
            fundingManagerAddress: string;
          }>;
        };
      }

      const json: GraphQLResponse = await response.json();
      
      // Create a map for quick lookup by funding manager address
      const dataMap = new Map<string, { holderCount: number }>();
      json.data?.bondingCurves?.forEach((bc) => {
        dataMap.set(bc.fundingManagerAddress.toLowerCase(), {
          holderCount: bc.holderCount
        });
      });

      return dataMap;
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
      tokenSupplyQuery.data
        ? tokenSupplyQuery.data.map((r) =>
            r?.result !== undefined ? (r.result as bigint).toString() : null
          )
        : null,
      bcMetricsQuery.data
        ? bcMetricsQuery.data.map((r) =>
            r?.result !== undefined ? (r.result as bigint | number).toString() : null
          )
        : null,
      graphQLDataQuery.data ? Array.from(graphQLDataQuery.data.entries()) : null,
    ],
    enabled: !!(
      addressesQuery.data &&
      fundingManagersQuery.data &&
      tokenAddressesQuery.data &&
      tokenMetadataQuery.data &&
      tokenSupplyQuery.data &&
      bcMetricsQuery.data &&
      graphQLDataQuery.data
    ),
    queryFn: () => {
      const addresses = addressesQuery.data!;
      const fundingManagers = fundingManagersQuery.data!;
      const tokenAddresses = tokenAddressesQuery.data!;
      const tokenMetadata = tokenMetadataQuery.data!;
      const tokenSupply = tokenSupplyQuery.data!;
      const bcMetrics = bcMetricsQuery.data!;
      const graphQLData = graphQLDataQuery.data!;

      const detailsArray: BondingCurveDetails[] = [];

      addresses.forEach((address, index) => {
        const fundingManagerResult = fundingManagers[index];
        const tokenAddressResult = tokenAddresses[index];

        if (
          fundingManagerResult?.result &&
          tokenAddressResult?.result
        ) {
          const tokenAddress = tokenAddressResult.result as `0x${string}`;
          const fundingManagerAddress = fundingManagerResult.result as `0x${string}`;
          const metadataIndex = index * 3;

          const nameResult = tokenMetadata[metadataIndex];
          const symbolResult = tokenMetadata[metadataIndex + 1];
          const decimalsResult = tokenMetadata[metadataIndex + 2];

          const collateralResult = bcMetrics[index * 2];
          const crrResult = bcMetrics[index * 2 + 1];

          // Get GraphQL data for this funding manager
          const gqlData = graphQLData.get(fundingManagerAddress.toLowerCase());

          if (nameResult?.result && symbolResult?.result && decimalsResult?.result) {
            // compute market cap if supply & collateral available
            let marketCap: number | null = null;
            try {
              if (collateralResult?.result && crrResult?.result) {
                const reserveBal = collateralResult.result as bigint; // wei
                const reserveRatioPpm = BigInt(crrResult.result as number);

                marketCap = calcMarketCapNumber(reserveBal, reserveRatioPpm);
              }
            } catch {
              marketCap = null;
            }

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
              marketCap,
              holderCount: gqlData?.holderCount,
            });
          }
        }
      });

      setBondingCurves(detailsArray);

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
      tokenSupplyQuery.isLoading ||
      bcMetricsQuery.isLoading ||
      graphQLDataQuery.isLoading ||
      detailsQuery.isLoading,
    error:
      countQuery.error ||
      addressesQuery.error ||
      fundingManagersQuery.error ||
      tokenAddressesQuery.error ||
      tokenMetadataQuery.error ||
      tokenSupplyQuery.error ||
      bcMetricsQuery.error ||
      graphQLDataQuery.error ||
      detailsQuery.error,
    refetch: () => {
      countQuery.refetch();
    },
  };
}
