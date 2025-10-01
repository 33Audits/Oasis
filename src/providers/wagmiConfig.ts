import { linea, lineaSepolia } from "viem/chains";
import { http } from "wagmi";

import { createConfig } from "@privy-io/wagmi";

export const wagmiConfig = createConfig({
  chains: [linea, lineaSepolia],
  transports: {
    [linea.id]: http(),
    [lineaSepolia.id]: http(),
  },
});
