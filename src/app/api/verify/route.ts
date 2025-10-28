import { NextResponse } from 'next/server';
import { verify } from '@thebadmandev/x402/facilitator';
import { 
  createConnectedClient, 
  PaymentPayloadSchema, 
  PaymentRequirementsSchema,
  SupportedEVMNetworks,
  SupportedSVMNetworks,
  createSigner,
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

    let client;
    if (SupportedEVMNetworks.includes(paymentRequirements.network)) {
      client = createConnectedClient(paymentRequirements.network);
    } else if (SupportedSVMNetworks.includes(paymentRequirements.network)) {
      const SVM_PRIVATE_KEY = process.env.SVM_PRIVATE_KEY || "";
      if (!SVM_PRIVATE_KEY) throw new Error('SVM_PRIVATE_KEY is not set');
      client = await createSigner(paymentRequirements.network, SVM_PRIVATE_KEY);
    } else {
      throw new Error(`Unsupported network: ${paymentRequirements.network}`);
    }

    const verificationResult = await verify(client, paymentPayload, paymentRequirements, x402Config);

    return NextResponse.json(verificationResult);
  } catch (error) {
    console.error("Verification error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Invalid request';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
