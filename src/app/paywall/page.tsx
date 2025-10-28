"use client";

import { useState } from "react";
import { verifyPayment } from "../actions";
import { PaymentRequirements, PaymentPayload } from "@thebadmandev/x402/types";
import { preparePaymentHeader } from "@thebadmandev/x402/client";
import { getNetworkId } from "@thebadmandev/x402/shared";
import { exact } from "@thebadmandev/x402/schemes";
import { useAccount, useSignTypedData } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import ConnectWalletButton from "@/components/wallet/connect-wallet-button";

function PaymentForm({
  paymentRequirements,
}: {
  paymentRequirements: PaymentRequirements;
}) {
  const { user, authenticated } = usePrivy();
  const userAddress = user?.wallet?.address;
  const [isProcessing, setIsProcessing] = useState(false);
  const { isError, isSuccess, signTypedDataAsync } = useSignTypedData();

  if (!authenticated || !userAddress) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <ConnectWalletButton />
        <p className="text-neutral-400">Please connect your wallet to proceed with payment.</p>
      </div>
    );
  }

  const unSignedPaymentHeader = preparePaymentHeader(
    userAddress as `0x${string}`,
    1,
    paymentRequirements
  );

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
      name: "USDC",
      version: "2",
      chainId: 11155111,
      verifyingContract: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" as `0x${string}`,
    },
    primaryType: "TransferWithAuthorization" as const,
    message: unSignedPaymentHeader.payload.authorization,
  };

  async function handlePayment() {
    setIsProcessing(true);
    const signature = await signTypedDataAsync(eip712Data);

    const paymentPayload: PaymentPayload = {
      ...unSignedPaymentHeader,
      payload: {
        ...unSignedPaymentHeader.payload,
        signature,
      },
    };

    const payment: string = exact.evm.encodePayment(paymentPayload);

    const verifyPaymentWithPayment = verifyPayment.bind(null, payment);
    const result = await verifyPaymentWithPayment();
    console.log("result", result);
    setIsProcessing(false);
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="mb-4">
        <ConnectWalletButton />
      </div>
      <p className="text-neutral-300">
        {paymentRequirements.maxAmountRequired} to {paymentRequirements.payTo}{" "}
        for {paymentRequirements.description}
      </p>

      <button
        disabled={!userAddress}
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Pay
      </button>
      {isProcessing && <p className="text-yellow-400">Processing...</p>}
      {isSuccess && <p className="text-green-400">Signed...</p>}
      {isError && <p className="text-red-400">Payment failed</p>}
    </div>
  );
}

export default function Paywall() {
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
  return (
    <div>
      <PaymentForm paymentRequirements={paymentRequirements} />
    </div>
  );
}