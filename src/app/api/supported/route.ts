import { NextResponse } from 'next/server';
import { isSvmSignerWallet, createSigner } from '@thebadmandev/x402/types';
import type { SupportedPaymentKind } from '@thebadmandev/x402/types';

export async function GET() {
  const EVM_PRIVATE_KEY = process.env.EVM_PRIVATE_KEY;
  const SVM_PRIVATE_KEY = process.env.SVM_PRIVATE_KEY;

  let kinds: SupportedPaymentKind[] = [];

  // EVM support
  if (EVM_PRIVATE_KEY) {
    kinds.push({
      x402Version: 1,
      scheme: "exact",
      network: "sepolia",
    });
  }

  // SVM support
  if (SVM_PRIVATE_KEY) {
    try {
      const signer = await createSigner("solana-devnet", SVM_PRIVATE_KEY);
      const feePayer = isSvmSignerWallet(signer) ? signer.address : undefined;
      kinds.push({
        x402Version: 1,
        scheme: "exact",
        network: "solana-devnet",
        extra: {
          feePayer,
        },
      });
    } catch (e) {
        console.error("Could not create SVM signer for /supported endpoint. Is SVM_PRIVATE_KEY valid?", e)
    }
  }

  return NextResponse.json({ kinds });
}
