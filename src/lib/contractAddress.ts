import { Address } from "viem";
import { Abi } from "abitype";

export type InheritedFunctions = { readonly [key: string]: string };

export type ChainAndContractAddress = {
  [chainId: number]: {
    [contractName: string]: Address;
  };
};

export const contractAddress = {
    11155111: {
      // Singletons
      Governor_v1: "0x47682119Be003b98FBE9F03d6Ae5FC7F7995b897",
      ModuleFactory_v1: "0x9947005fAd8C9E002eE9Eebf351A1C1B65c7de79",
      OrchestratorFactory_v1: "0x160618e15361402C201184C6E9E6E4fFE6896A49",
      // Gaia Factory Workflow
      Orchestrator_v1__GaiaFactory: "0x42F32E146BE504a51995efF41630255e11f3B829",
      LM_Gaia_BC_Factory_v1: "0x1fF4D9AE318517cfe0baD55a75aDeC8c45678afe",
      FM_ExpectingPayment_v1: "0x5DA6BFd31475057af04E2804a03a3B1D06338724",
      FakeGaiaToken: "0x525470415C0958a749888D4f2E872Ef1CF0A73C1",
      /// @deprecated This is the first Gaia Bonding Curve Orchestrator (just for testing, in real usecases you will grab this dinamically)
      Orchestrator_v1__BondingCurve: "0x14d1e5ec6e2BC910C833187c85514aDa23EC23D6",
      /// @deprecated This is the first Gaia Bonding Curve (just for testing, in real usecases you will grab this dinamically)
      FM_BC_Bancor_Gaia_v1: "0x3aadd4115cf6D8f3B13437B7be77a314D7D68cB6",
    }
} as const satisfies ChainAndContractAddress;