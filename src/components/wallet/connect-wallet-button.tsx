"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import { useState } from "react";
import WalletDisplay from "./wallet-display";

export default function ConnectWalletButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, ready, authenticated } = usePrivy();

  const { login } = useLogin({
    onComplete: () => setIsLoading(false),
    onError: () => setIsLoading(false),
  });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {authenticated && user && user.wallet?.address ? (
        <WalletDisplay />
      ) : (
        <Button
          className="rounded-xl bg-background border border-white/50 hover:bg-white/90 text-white hover:text-black font-mono cursor-pointer"
          onClick={handleLogin}
          disabled={isLoading}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
