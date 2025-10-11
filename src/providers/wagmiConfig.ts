import { sepolia } from "viem/chains";
import { http } from "wagmi";

import { createConfig } from "@privy-io/wagmi";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
