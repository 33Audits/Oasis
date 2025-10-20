// Bancor bonding-curve helpers for calculating spot price and market cap.
// The Bancor formula (continuous token model) expresses the spot price as:
//    price = reserveBalance / (CRR * tokenSupply)
// where:
//  • reserveBalance – current collateral in the pool (same units as quote token)
//  • tokenSupply   – circulating supply of the issuance token
//  • CRR           – connector weight expressed as a fraction (0 < CRR ≤ 1)
//
// On-chain, CRR is often stored as a uint32 representing parts-per-million (ppm).
// For example, a 20 % reserve ratio is stored as 200_000 (because 0.20 × 1e6).
//
// These helpers accept CRR either as a fraction (0–1) or in ppm.

export interface BancorInputs {
  /** Circulating supply of the issuance token */
  supply: bigint | number;
  /** Collateral balance held by the bonding curve */
  reserveBalance: bigint | number;
  /** Connector weight (e.g. 0.2 for 20 %). If you supply `crrPpm`, this can be omitted. */
  crr?: number;
  /** Connector weight in parts-per-million (1 = 0.0001 %). Optional alternative to `crr`. */
  crrPpm?: number;
}

const PPM_DENOMINATOR = 1_000_000;

function normaliseCRR(inputs: BancorInputs): number {
  if (inputs.crr !== undefined) return inputs.crr;
  if (inputs.crrPpm !== undefined)
    return inputs.crrPpm / PPM_DENOMINATOR;
  throw new Error("Connector weight (crr or crrPpm) must be provided");
}

/**
 * Returns the instantaneous Bancor spot price given supply, reserve balance, and connector weight.
 * The price is returned as a plain JavaScript number (floating-point). For UI display this is fine; if you
 * need exact fixed-point maths, adapt to a BigNumber library.
 */
export function getBancorSpotPrice({ supply, reserveBalance, ...rest }: BancorInputs): number {
  const crr = normaliseCRR(rest as BancorInputs);
  const supplyNum = typeof supply === "bigint" ? Number(supply) : supply;
  const reserveNum = typeof reserveBalance === "bigint" ? Number(reserveBalance) : reserveBalance;

  if (supplyNum === 0) throw new Error("Supply cannot be zero");
  if (crr <= 0 || crr > 1) throw new Error("CRR must be between 0 and 1 (exclusive 0)");

  return reserveNum / (crr * supplyNum);
}

/**
 * Market cap is simply price × supply.
 */
export function getBancorMarketCap(inputs: BancorInputs): number {
  const price = getBancorSpotPrice(inputs);
  const supplyNum = typeof inputs.supply === "bigint" ? Number(inputs.supply) : inputs.supply;
  return price * supplyNum;
}

// ---------------- BigInt Utilities ----------------

import { formatUnits } from "viem";

/**
 * Calculate market cap entirely with integers using on-chain wei values and reserve ratio in PPM.
 * Returns the raw market cap in wei (BigInt).
 */
export function calcMarketCapWei(reserveBalanceWei: bigint, reserveRatioPpm: bigint): bigint {
  if (reserveRatioPpm === BigInt(0)) return BigInt(0);
  const ppmDenominator = BigInt(1_000_000);
  return (reserveBalanceWei * ppmDenominator) / reserveRatioPpm; // wei
}

/**
 * Convenience helper: returns human-readable number (ether units, JS number) given
 * reserve balance (wei) and reserve ratio (ppm).
 */
export function calcMarketCapNumber(reserveBalanceWei: bigint, reserveRatioPpm: bigint): number {
  const capWei = calcMarketCapWei(reserveBalanceWei, reserveRatioPpm);
  return Number(formatUnits(capWei, 18));
}

// Example
// const marketCap = getBancorMarketCap({
//   supply: 1_000_000n,
//   reserveBalance: 200_000n,
//   crr: 0.2,
// });
