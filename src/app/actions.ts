"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useFacilitator } from "@thebadmandev/x402/verify";
import { PaymentRequirements } from "@thebadmandev/x402/types";
import { exact } from "@thebadmandev/x402/schemes";

export async function verifyPayment(payload: string): Promise<string> {
  // right now this needs to be defined in 2 places, we'll clean this up with a proper nextjs abstraction
  const paymentRequirements: PaymentRequirements = {
    scheme: "exact",
    network: "sepolia",
    maxAmountRequired: "1",
    resource: "https://example.com",
    description: "Payment for a service",
    mimeType: "text/html",
    payTo: "0x02F6302D1b7C94FF01a2B59ebAC8d9aa2fc62522",
    maxTimeoutSeconds: 60,
    asset: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    outputSchema: undefined,
    extra: {
      name: "USDC",
      version: "2",
    },
  };

  const { verify, settle } = useFacilitator(
    {
      url: "http://localhost:3000/api",
    }
  ); // eslint-disable-line

  try {
    const payment = exact.evm.decodePayment(payload);
    const valid = await verify(payment, paymentRequirements);
    if (!valid.isValid) {
      throw new Error(valid.invalidReason);
    }

    const settleResponse = await settle(payment, paymentRequirements);

    if (!settleResponse.success) {
      throw new Error(settleResponse.errorReason);
    }
  } catch (error) {
    console.error({ error });
    return `Error: ${error}`;
  }

  const cookieStore = await cookies();
  // This should be a JWT signed by the server following best practices for a session token
  // See: https://nextjs.org/docs/app/guides/authentication#stateless-sessions
  cookieStore.set("payment-session", payload);
  return "Payment verified successfully";
}

export async function verifyDeploymentPayment(payload: string): Promise<{ success: boolean; error?: string }> {
  const paymentRequirements: PaymentRequirements = {
    scheme: "exact",
    network: "sepolia",
    maxAmountRequired: "1000000", // 1 USDC (6 decimals)
    resource: "https://example.com/api/protected-endpoint",
    description: "Payment for bonding curve deployment",
    mimeType: "application/json",
    payTo: "0x02F6302D1b7C94FF01a2B59ebAC8d9aa2fc62522", // Your payment receiver address
    maxTimeoutSeconds: 300,
    asset: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // USDC on Sepolia
    outputSchema: undefined,
    extra: {
      name: "USDC",
      version: "2",
    },
  };

  const facilitatorUrl = "http://localhost:3000/api";
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