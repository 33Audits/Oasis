import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text: ', err)
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (fallbackErr) {
      console.error('Fallback copy failed: ', fallbackErr)
      return false
    }
  }
}

export function shortenTokenAddress(address: `0x${string}`) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Format large numbers into human-readable compact form (e.g. 1.2K, 3.4M, 5B).
export function formatCompactNumber(value: number, maximumFractionDigits = 2): string {
  if (isNaN(value)) return "-";

  try {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits,
    }).format(value);
  } catch {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    const units: [number, string][] = [
      [1e12, "T"],
      [1e9, "B"],
      [1e6, "M"],
      [1e3, "K"],
    ];
    for (const [divisor, suffix] of units) {
      if (abs >= divisor) {
        return `${sign}${(abs / divisor).toFixed(maximumFractionDigits)}${suffix}`;
      }
    }
    return value.toString();
  }
}
