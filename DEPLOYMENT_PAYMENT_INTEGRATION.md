# x402 Payment Integration for Bonding Curve Deployment

## Overview
The deploy button now requires a 1 USDC payment via x402 before deploying the bonding curve. The payment is processed using EIP-3009 signatures (gasless for users), and the deployment transaction is sponsored by ZeroDev.

## Implementation Details

### 1. Custom Hook: `useX402Payment`
**Location**: `/src/hooks/useX402Payment.ts`

This hook handles the x402 payment flow:
- Prepares payment headers
- Signs EIP-712 typed data for USDC transfer authorization
- Returns encoded payment payload

### 2. Server Action: `verifyDeploymentPayment`
**Location**: `/src/app/actions.ts`

Server-side payment verification:
- Validates payment signature
- Verifies payment amount (1 USDC = 1,000,000 with 6 decimals)
- Settles payment with x402 facilitator
- Returns success/failure status

### 3. Updated Deploy Component
**Location**: `/src/components/steps/deploy-step.tsx`

Enhanced deployment flow:
1. **Payment Phase** (0-25% progress)
   - User signs USDC payment authorization (gasless)
   - Server verifies payment
   - Payment confirmation
2. **Deployment Phase** (25-100% progress)
   - Approve GAIA tokens (ZeroDev sponsored)
   - Deposit stake (ZeroDev sponsored)
   - Create bonding curve (ZeroDev sponsored)

## User Experience

### Before Deployment
- Shows "Deployment Fee: 1 USDC" notice
- Button text: "Pay & Deploy Bonding Curve"
- Requires connected wallet

### During Payment
- Progress: 0-15% - "Signing USDC payment authorization..."
- Progress: 15-25% - "Verifying payment..."
- Toast notifications guide the user

### During Deployment
- Progress: 25-50% - "Approving tokens..."
- Progress: 50-100% - "Creating bonding curve..."
- All gas costs sponsored by ZeroDev

## Configuration

### Payment Settings
Edit in `/src/components/steps/deploy-step.tsx`:

```typescript
const paymentRequirements: PaymentRequirements = {
  scheme: "exact",
  network: "sepolia",
  maxAmountRequired: "1000000", // 1 USDC (6 decimals)
  resource: "bonding-curve-deployment",
  description: "Payment for bonding curve deployment",
  payTo: "0x02F6302D1b7C94FF01a2B59ebAC8d9aa2fc62522", // YOUR ADDRESS
  asset: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // USDC Sepolia
  // ...
};
```

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_FACILITATOR_URL=https://x402-facilitator-vercel.vercel.app/api
NEXT_PUBLIC_ZERODEV_RPC=your_zerodev_rpc_url
```

## Key Benefits

1. **Gasless Payment**: Users only sign, no gas required for USDC transfer
2. **Gasless Deployment**: ZeroDev sponsors all deployment transactions
3. **Atomic Flow**: Payment verified before deployment begins
4. **Clear UX**: Progress indicators and toast notifications
5. **Error Handling**: Separate error messages for payment vs deployment failures

## Testing

1. Ensure you have USDC on Sepolia testnet
2. Connect wallet with USDC balance
3. Fill in bonding curve parameters
4. Click "Pay & Deploy Bonding Curve"
5. Sign USDC payment authorization (MetaMask/wallet popup)
6. Wait for payment verification
7. Deployment proceeds automatically after payment confirmation

## Notes

- Payment is **non-refundable** once verified
- If deployment fails after payment, the payment has already been processed
- Consider implementing a refund mechanism for failed deployments
- The facilitator URL should point to your x402 facilitator instance
