"use client";

import { useQuery } from "@tanstack/react-query";
import { GRAPHQL_URL } from "@/lib/constants";

export interface TokenHolder {
  holderAddress: string;
  balance: string;
}

export interface BondingCurveHolders {
  holderCount: number;
  holders: TokenHolder[];
}

/**
 * Fetch token holders for a bonding curve by funding manager address.
 * Returns holder count and list of holders sorted by balance (descending).
 */
export function useTokenHolders(fundingManagerAddress: `0x${string}` | undefined) {
  return useQuery<BondingCurveHolders | null>({
    queryKey: ["token-holders", fundingManagerAddress],
    enabled: !!fundingManagerAddress,
    queryFn: async () => {
      if (!fundingManagerAddress) return null;

      const query = `
        query GetBondingCurveTokenHoldersByFundingManager($fundingManagerAddress: String!) {
          bondingCurves(where: { fundingManagerAddress: $fundingManagerAddress }) {
            holderCount
            holders(orderBy: balance, orderDirection: desc) {
              holderAddress
              balance
            }
          }
        }
      `;

      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            fundingManagerAddress: fundingManagerAddress.toLowerCase(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      interface GraphQLResponse {
        data: {
          bondingCurves: Array<{
            holderCount: number;
            holders: Array<{
              holderAddress: string;
              balance: string;
            }>;
          }>;
        };
      }

      const json: GraphQLResponse = await response.json();

      if (json.data?.bondingCurves && json.data.bondingCurves.length > 0) {
        const curve = json.data.bondingCurves[0];
        return {
          holderCount: curve.holderCount,
          holders: curve.holders,
        };
      }

      return null;
    },
  });
}

