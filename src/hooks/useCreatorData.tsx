import { useQuery } from "@tanstack/react-query";
import { GRAPHQL_URL } from "@/lib/constants";

const query = `
query GetBondingCurvesByCreator($creatorAddress: Bytes!) {
  bondingCurves(where: { creatorAddress: $creatorAddress }, orderBy: createdAt, orderDirection: desc) {
    orchestratorAddress
    fundingManagerAddress
    creatorAddress
    tokenName
    tokenSymbol
    tokenDecimals
    holderCount
    currentPrice
    totalBuyVolume
    totalSellVolume
    createdAt
    holders(orderBy: balance, orderDirection: desc) {
      holderAddress
      balance
    }
  }
  transactions(
    where: { user: $creatorAddress }
    first: 10
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
    bondingCurve {
      tokenSymbol
    }
  }
}
`;

export function useCreatorData(creatorAddress: `0x${string}`) {
  return useQuery({
    queryKey: ["creator-data", creatorAddress],
    queryFn: async () => {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { creatorAddress } }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(`GraphQL errors: ${data.errors.map((e: any) => e.message).join(", ")}`);
      }

      return data.data;
    },
    enabled: !!creatorAddress,
  });
}
