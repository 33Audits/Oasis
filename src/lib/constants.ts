import { PaymentRequirements } from "x402/types";

export const GRAPHQL_URL = 'https://api.studio.thegraph.com/query/72134/mosaic-subgraph/v0.0.7';

/**
 * Payment requirements for bonding curve deployment using x402
 * 1 USDC payment to cover deployment costs
 */
export const DEPLOYMENT_PAYMENT_REQUIREMENTS: PaymentRequirements = {
  scheme: "exact",
  network: "base-sepolia",
  maxAmountRequired: "1000000", // 1 USDC (6 decimals)
  resource: "bonding-curve-deployment",
  description: "Payment for bonding curve deployment",
  mimeType: "application/json",
  payTo: "0x02F6302D1b7C94FF01a2B59ebAC8d9aa2fc62522",
  maxTimeoutSeconds: 300,
  asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  outputSchema: undefined,
  extra: {
    name: "USDC",
    version: "2",
  },
};
