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

/**
 * Format wei (18 decimals) to human readable token amount
 */
export function formatTokenAmount(weiValue: string): string {
  if (!weiValue || weiValue === "0") return "";
  try {
    const value = BigInt(weiValue);
    return (Number(value) / 1e18).toString();
  } catch {
    return "";
  }
}
