import { usePublicClient, useWriteContract } from "wagmi";
import { sepolia } from "viem/chains";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { useCallback } from "react";

export function useBuyFromBondingCurve() {
  const publicClient = usePublicClient();
  const { writeContractAsync, ...rest } = useWriteContract();

  const buyFromBondingCurve = useCallback(async (params: {
    bcAddress: `0x${string}`,
    receiver: `0x${string}`,
    depositAmount: bigint,
    minAmountOut: bigint,
  }) => {
    if (!publicClient) {
      throw new Error("Public client not available");
    }

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
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txid,
      confirmations: 1,
    });

    return { txid, receipt };
  }, [writeContractAsync, publicClient]);

  return { buyFromBondingCurve, ...rest };
}