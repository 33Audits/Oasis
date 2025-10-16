import { usePublicClient, useWriteContract } from "wagmi";
import { sepolia } from "viem/chains";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { useCallback } from "react";
import { useWallets } from "@privy-io/react-auth";

export function useBuyFromBondingCurve() {
  const publicClient = usePublicClient();
  const { writeContractAsync, ...rest } = useWriteContract();

  const { wallets } = useWallets();

  const activeWallet = wallets?.[0];

  const walletChainId = activeWallet?.chainId
    ? Number(activeWallet.chainId.split(':')[1])
    : NaN;

  const buyFromBondingCurve = useCallback(async (params: {
    bcAddress: `0x${string}`,
    receiver: `0x${string}`,
    depositAmount: bigint,
    minAmountOut: bigint,
  }) => {
    if (!publicClient) {
      throw new Error("Public client not available");
    }

    // if (walletChainId !== sepolia.id) {
    //   throw new Error("Please switch to Sepolia to buy from a bonding curve");
    // }

    await writeContractAsync({
      address: contractAddress[sepolia.id].FakeGaiaToken,
      abi: abis.ERC20Mint,
      functionName: "approve",
      args: [params.bcAddress, params.depositAmount],
    });

    const txid =  await writeContractAsync({
      address: params.bcAddress,
      abi: abis.FM_BC_Bancor_Gaia_v1,
      functionName: "buyFor",
      args: [params.receiver, params.depositAmount, params.minAmountOut],
      gas: BigInt(2100000),
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txid,
      confirmations: 1,
    });

    if (receipt.status !== "success") {
      throw new Error("Transaction failed: " + receipt.status);
    }

    return { txid, receipt };
  }, [writeContractAsync, publicClient]);

  return { buyFromBondingCurve, ...rest };
}