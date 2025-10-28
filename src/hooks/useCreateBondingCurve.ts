import { useReadContract } from "wagmi";
import { sepolia } from "viem/chains";
import { contractAddress } from "@/lib/contractAddress";
import { abis } from "@/lib/abis";
import { useCallback, useState } from "react";
import { usePublicClient } from "wagmi";
import { parseEventLogs, encodeFunctionData } from "viem";
import { useZeroDev } from "@/providers/ZeroDev";

export function useCreateBondingCurve() {
  const publicClient = usePublicClient();
  const [bcWorkflowAddress, setBcWorkflowAddress] = useState<
    `0x${string}` | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { kernelClient, isInitializing } = useZeroDev();

  const { data: minDepositAmount } = useReadContract({
    address: contractAddress[sepolia.id].LM_Gaia_BC_Factory_v1,
    abi: abis.LM_Gaia_BC_Factory_v1,
    functionName: "minAmount",
  });

  const createBondingCurve = useCallback(
    async (params: {
      vaultAddress: `0x${string}`;
      feeVaultAddress: `0x${string}`;
      threshold: bigint;
      bcParams: {
        reserveRatioForBuying: number;
        reserveRatioForSelling: number;
        initialIssuanceSupply: bigint;
        initialCollateralSupply: bigint;
      };
      issuanceTokenParams: {
        name: string;
        symbol: string;
        decimals: number;
        maxSupply: bigint;
      };
      stakeAmount: bigint;
    }) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!publicClient) {
          throw new Error("Public client not available");
        }

        if (!kernelClient || !kernelClient.account) {
          throw new Error("Smart account not initialized. Please wait...");
        }

        if (minDepositAmount && params.stakeAmount < minDepositAmount) {
          throw new Error(
            `Stake amount must be greater than or equal to ${minDepositAmount}`
          );
        }

        // Bundle all three transactions into a single user operation (gasless)
        
        // Encode the three function calls
        const approveCallData = encodeFunctionData({
          abi: abis.ERC20Mint,
          functionName: "approve",
          args: [
            contractAddress[sepolia.id].FM_ExpectingPayment_v1,
            params.stakeAmount,
          ],
        });

        const depositCallData = encodeFunctionData({
          abi: abis.FM_ExpectingPayment_v1,
          functionName: "deposit",
          args: [params.stakeAmount],
        });

        const createBCCallData = encodeFunctionData({
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

        // Send all three transactions as a batch
        const userOpHash = await kernelClient.sendUserOperation({
          callData: await kernelClient.account.encodeCalls([
            {
              to: contractAddress[sepolia.id].FakeGaiaToken,
              value: BigInt(0),
              data: approveCallData,
            },
            {
              to: contractAddress[sepolia.id].FM_ExpectingPayment_v1,
              value: BigInt(0),
              data: depositCallData,
            },
            {
              to: contractAddress[sepolia.id].LM_Gaia_BC_Factory_v1,
              value: BigInt(0),
              data: createBCCallData,
            },
          ]),
        });

        // Wait for the bundled transaction to be mined
        const txid = await kernelClient.waitForUserOperationReceipt({
          hash: userOpHash,
        });

        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txid.receipt.transactionHash,
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

        if (receipt.status !== "success") {
          throw new Error("Transaction failed: " + receipt.status);
        }

        return { 
          txid: txid.receipt.transactionHash, 
          receipt,
          userOpHash, // The bundled user operation hash
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [kernelClient, publicClient, minDepositAmount]
  );

  return { 
    createBondingCurve, 
    bcWorkflowAddress, 
    minDepositAmount,
    isLoading,
    error,
    isInitializing,
  };
}
