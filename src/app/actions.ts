"use server";

import { useFacilitator } from "x402/verify";
import { PaymentRequirements } from "x402/types";
import { exact } from "x402/schemes";
import { DEPLOYMENT_PAYMENT_REQUIREMENTS } from "@/lib/constants";

export async function verifyDeploymentPayment(payload: string): Promise<{ success: boolean; error?: string }> {
  const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL as `${string}://${string}`;
  const { verify, settle } = useFacilitator({
    url: facilitatorUrl,
  });

  try {
    const payment = exact.evm.decodePayment(payload);
    const valid = await verify(payment, DEPLOYMENT_PAYMENT_REQUIREMENTS);
    
    if (!valid.isValid) {
      return { success: false, error: valid.invalidReason };
    }

    const settleResponse = await settle(payment, DEPLOYMENT_PAYMENT_REQUIREMENTS);

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