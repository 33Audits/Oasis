"use client";

import { useQuery } from "@tanstack/react-query";
import { GRAPHQL_URL } from "@/lib/constants";

interface BondingCurveTransaction {
  id: string;
  transactionType: string;
  transactionHash: string;
  user: `0x${string}`;
  blockTimestamp: string;
  paymentAmount: bigint;
  tokenAmount: bigint;
}

interface GraphQLResponse {
  data: {
    bondingCurveTransactions: BondingCurveTransaction[];
  };
}


export function useBondingCurveTransactions(fundingManagerAddress: `0x${string}` | undefined) {
  return useQuery({
    queryKey: ["bonding-curve-transactions", fundingManagerAddress],
    enabled: !!fundingManagerAddress,
    queryFn: async (): Promise<BondingCurveTransaction[]> => {
      const query = `
        query GetBondingCurveTransactions($fundingManagerAddress: String!) {
          bondingCurveTransactions(
            where: { fundingManagerAddress: $fundingManagerAddress }
            first: 5
            orderBy: blockTimestamp
            orderDirection: desc
          ) {
            id
            transactionType
            transactionHash
            user
            blockTimestamp
            paymentAmount
            tokenAmount
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
            fundingManagerAddress,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const data: GraphQLResponse = await response.json();

      if (data.data?.bondingCurveTransactions) {
        return data.data.bondingCurveTransactions;
      }

      return [];
    },
  });
}
