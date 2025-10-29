"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MintTokensButton } from "@/components/MintTokensButton";
import { useSmartAccountBalance } from "@/hooks/useSmartAccountBalance";
import { AlertCircle } from "lucide-react";

export function MintTokensModal() {
  const { hasZeroBalance, isLoading, refetchBalance } = useSmartAccountBalance();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && hasZeroBalance) {
      setOpen(true);
    }
  }, [hasZeroBalance, isLoading]);

  const handleMintSuccess = async () => {
    await refetchBalance();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <DialogTitle>Low Balance Detected</DialogTitle>
          </div>
          <DialogDescription>
            Your smart account has zero balance. You need Collateral Tokens to create
            a bonding curve. Mint some tokens to get started!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-sm text-muted-foreground text-center">
            Mint 100,000 Collateral Tokens to your account for free.
          </p>
          <MintTokensButton onMintSuccess={handleMintSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
