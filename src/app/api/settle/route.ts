import { NextResponse } from 'next/server';
import { settle } from '@thebadmandev/x402/facilitator';
import { 
  createSigner, 
  PaymentPayloadSchema, 
  PaymentRequirementsSchema,
  SupportedEVMNetworks,
  SupportedSVMNetworks,
  X402Config
} from '@thebadmandev/x402/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const paymentRequirements = PaymentRequirementsSchema.parse(body.paymentRequirements);
    const paymentPayload = PaymentPayloadSchema.parse(body.paymentPayload);

    const SVM_RPC_URL = process.env.SVM_RPC_URL || "";
    const x402Config: X402Config | undefined = SVM_RPC_URL
      ? { svmConfig: { rpcUrl: SVM_RPC_URL } }
      : undefined;

    let privateKey;
    if (SupportedEVMNetworks.includes(paymentRequirements.network)) {
      privateKey = process.env.EVM_PRIVATE_KEY;
    } else if (SupportedSVMNetworks.includes(paymentRequirements.network)) {
      privateKey = process.env.SVM_PRIVATE_KEY;
    } else {
      throw new Error(`Unsupported network: ${paymentRequirements.network}`);
    }

    if (!privateKey) {
      throw new Error(`Private key for network ${paymentRequirements.network} is not set`);
    }

    const signer = await createSigner(paymentRequirements.network, privateKey);

    const settlementResult = await settle(signer, paymentPayload, paymentRequirements, x402Config);

    return NextResponse.json(settlementResult);
  } catch (error) {
    console.error("Settlement error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Invalid request';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
