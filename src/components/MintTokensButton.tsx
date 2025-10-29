"use client";

import { Button } from "@/components/ui/button";
import { useMintTokens } from "@/hooks/useMintTokens";
import { toast } from "sonner";
import { formatEther } from "viem";
import { Coins, Loader2 } from "lucide-react";

interface MintTokensButtonProps {
  onMintSuccess?: () => void | Promise<void>;
}

export function MintTokensButton({ onMintSuccess }: MintTokensButtonProps) {
  const { mintTokens, isLoading, isInitializing, mintAmount, tokenAddress } =
    useMintTokens();

  const handleMint = async () => {
    try {
      const result = await mintTokens();
      toast.success("Tokens Minted Successfully!", {
        description: `You received ${formatEther(mintAmount)} GAIA tokens`,
      });
      console.log("Mint transaction:", result);
      
      if (onMintSuccess) {
        await onMintSuccess();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to mint tokens";
      toast.error("Mint Failed", {
        description: errorMessage,
      });
      console.error("Mint failed:", err);
    }
  };

  return (
    <Button
      onClick={handleMint}
      disabled={isLoading || isInitializing}
      className="bg-primary text-white"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Minting...
        </>
      ) : isInitializing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Initializing...
        </>
      ) : (
        <>
          <Coins className="mr-2 h-4 w-4" />
          Mint 100,000 Collateral Tokens
        </>
      )}
    </Button>
  );
}
