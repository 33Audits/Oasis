"use server";

import { useFacilitator } from "x402/verify";
import { PaymentRequirements } from "x402/types";
import { exact } from "x402/schemes";

export async function verifyDeploymentPayment(payload: string): Promise<{ success: boolean; error?: string }> {
  const paymentRequirements: PaymentRequirements = {
    scheme: "exact",
    network: "base-sepolia",
    maxAmountRequired: "1000000", // 1 USDC
    resource: "https://example.com/api/protected-endpoint",
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

  const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL as `${string}://${string}`;
  const { verify, settle } = useFacilitator({
    url: facilitatorUrl,
  });

  try {
    const payment = exact.evm.decodePayment(payload);
    const valid = await verify(payment, paymentRequirements);
    
    if (!valid.isValid) {
      return { success: false, error: valid.invalidReason };
    }

    const settleResponse = await settle(payment, paymentRequirements);

    if (!settleResponse.success) {
      return { success: false, error: settleResponse.errorReason };
    }

    return { success: true };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Payment verification failed" 
    };
  }
}