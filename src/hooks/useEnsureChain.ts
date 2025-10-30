// hooks/useEnsureChain.js
import { useEffect } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { baseSepolia } from 'viem/chains';

const TARGET_CHAIN_ID = baseSepolia.id;

export const useEnsureChain = () => {
  const { wallets } = useWallets();

  useEffect(() => {
    const ensureCorrectChain = async () => {
      const wallet = wallets[0];
      if (!wallet) return;

      if (wallet.chainId !== `eip155:${TARGET_CHAIN_ID}`) {
        try {
          await wallet.switchChain(TARGET_CHAIN_ID);
        } catch (error) {
          console.error('Chain switch failed:', error);
        }
      }
    };

    ensureCorrectChain();
  }, [wallets]);

  return wallets[0];
};