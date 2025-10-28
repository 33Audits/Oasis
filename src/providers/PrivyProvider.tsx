"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";

import { privyConfig } from "./privyConfig";
import { wagmiConfig } from "./wagmiConfig";
import { ZeroDevProvider } from "./ZeroDev";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_ID || ""} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ZeroDevProvider>{children}</ZeroDevProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
