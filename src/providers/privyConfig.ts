import type { PrivyClientConfig } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    ethereum: {
      createOnLogin: "users-without-wallets",
    },
    showWalletUIs: true,
    priceDisplay: {
      primary: "fiat-currency",
      secondary: "native-token",
    },
  },
  defaultChain: baseSepolia,
  supportedChains: [baseSepolia],

  loginMethods: ["wallet"],
  appearance: {
    showWalletLoginFirst: true,
    theme: "#010101",
    accentColor: "#3db9ff",
    logo: "/logo-white.png",
    
  },
};
