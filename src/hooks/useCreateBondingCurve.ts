import { useReadContract, useWriteContract } from "wagmi";
import { sepolia } from "viem/chains";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { useCallback, useState } from "react";
import { usePublicClient } from "wagmi";
import { parseEventLogs } from "viem";

export function useCreateBondingCurve() {
  const publicClient = usePublicClient();
  const [bcWorkflowAddress, setBcWorkflowAddress] = useState<`0x${string}` | null>(null);

  const { data: minDepositAmount } = useReadContract({
    address: contractAddress[sepolia.id].LM_Gaia_BC_Factory_v1,
    abi: abis.LM_Gaia_BC_Factory_v1,
    functionName: "minAmount"
  });

  const { writeContractAsync, ...rest } = useWriteContract();

  const createBondingCurve = useCallback(async (params: {
    vaultAddress: `0x${string}`,
    feeVaultAddress: `0x${string}`,
    threshold: bigint,
    bcParams: { reserveRatioForBuying: number, reserveRatioForSelling: number, initialIssuanceSupply: bigint, initialCollateralSupply: bigint },
    issuanceTokenParams: { name: string, symbol: string, decimals: number, maxSupply: bigint },
    stakeAmount: bigint,
  }) => {
    if (!publicClient) {
      throw new Error("Public client not available");
    }

    if (minDepositAmount && params.stakeAmount < minDepositAmount) {
      throw new Error(`Stake amount must be greater than or equal to ${minDepositAmount}`);
    }

    await writeContractAsync({
      address: contractAddress[sepolia.id].FakeGaiaToken,
      abi: abis.ERC20Mint,
      functionName: "approve",
      args: [contractAddress[sepolia.id].FM_ExpectingPayment_v1, params.stakeAmount],
    });

    await writeContractAsync({
      address: contractAddress[sepolia.id].FM_ExpectingPayment_v1,
      abi: abis.FM_ExpectingPayment_v1,
      functionName: "deposit",
      args: [params.stakeAmount],
    });

    const txid = await writeContractAsync({
      address: contractAddress[sepolia.id].LM_Gaia_BC_Factory_v1,
      abi: abis.LM_Gaia_BC_Factory_v1,
      functionName: "createBCWorkflow",
      args: [
        params.vaultAddress,
        params.feeVaultAddress,
        params.threshold,
        params.bcParams,
        params.issuanceTokenParams,
      ],
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txid,
      confirmations: 1,
    });

    const [bondingCurveEvent] = parseEventLogs({
      abi: abis.LM_Gaia_BC_Factory_v1,
      eventName: "BondingCurveCreated",
      logs: receipt.logs,
    });

    if (bondingCurveEvent && "bcWorkflowAddress" in bondingCurveEvent.args) {
      setBcWorkflowAddress(bondingCurveEvent.args.bcWorkflowAddress);
    }

    return { txid, receipt };
  }, [writeContractAsync, publicClient, minDepositAmount]);

  return { createBondingCurve, bcWorkflowAddress, minDepositAmount, ...rest };
}