"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";

import { privyConfig } from "./privyConfig";
import { wagmiConfig } from "./wagmiConfig";
import { ZeroDevProvider } from "./ZeroDev";
import { ChainGuard } from "../components/chain-guard";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_ID || ""}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ZeroDevProvider>
            <ChainGuard>{children}</ChainGuard>
          </ZeroDevProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
