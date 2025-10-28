import { useState, useCallback } from "react";
import { useSignTypedData } from "wagmi";
import { preparePaymentHeader } from "@thebadmandev/x402/client";
import { PaymentRequirements, PaymentPayload } from "@thebadmandev/x402/types";
import { exact } from "@thebadmandev/x402/schemes";
import { usePrivy } from "@privy-io/react-auth";

export function useX402Payment() {
  const { user } = usePrivy();
  const userAddress = user?.wallet?.address;
  const [isProcessing, setIsProcessing] = useState(false);
  const { signTypedDataAsync } = useSignTypedData();

  const processPayment = useCallback(
    async (paymentRequirements: PaymentRequirements) => {
      if (!userAddress) {
        throw new Error("User wallet not connected");
      }

      setIsProcessing(true);

      try {
        // Prepare unsigned payment header
        const unSignedPaymentHeader = preparePaymentHeader(
          userAddress as `0x${string}`,
          1,
          paymentRequirements
        );

        // Prepare EIP-712 typed data for USDC transfer authorization
        const eip712Data = {
          types: {
            TransferWithAuthorization: [
              { name: "from", type: "address" },
              { name: "to", type: "address" },
              { name: "value", type: "uint256" },
              { name: "validAfter", type: "uint256" },
              { name: "validBefore", type: "uint256" },
              { name: "nonce", type: "bytes32" },
            ],
          },
          domain: {
            name: paymentRequirements.extra?.name || "USDC",
            version: paymentRequirements.extra?.version || "2",
            chainId: 11155111, // Sepolia
            verifyingContract: paymentRequirements.asset as `0x${string}`,
          },
          primaryType: "TransferWithAuthorization" as const,
          message: unSignedPaymentHeader.payload.authorization,
        };

        // Get user signature
        const signature = await signTypedDataAsync(eip712Data);

        // Create payment payload with signature
        const paymentPayload: PaymentPayload = {
          ...unSignedPaymentHeader,
          payload: {
            ...unSignedPaymentHeader.payload,
            signature,
          },
        };

        // Encode payment
        const payment: string = exact.evm.encodePayment(paymentPayload);

        return { payment, paymentPayload };
      } catch (error) {
        console.error("Payment processing failed:", error);
        throw error;
      } finally {
        setIsProcessing(false);
      }
    },
    [userAddress, signTypedDataAsync]
  );

  return {
    processPayment,
    isProcessing,
    userAddress,
  };
}
