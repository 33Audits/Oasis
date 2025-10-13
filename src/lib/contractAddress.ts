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
      Orchestrator_v1__GaiaFactory: "0xB52A56730E9ACf64ee1AD541BE27A074b7929229",
      LM_Gaia_BC_Factory_v1: "0xbbd61d20B0715914152f807514319940c484099f",
      FM_ExpectingPayment_v1: "0x1C3c9d52d67953B74Ed0a83033e10444d0D444aA",
      FakeGaiaToken: "0x525470415C0958a749888D4f2E872Ef1CF0A73C1",
      /// @deprecated This is the first Gaia Bonding Curve Orchestrator (just for testing, in real usecases you will grab this dinamically)
      Orchestrator_v1__BondingCurve: "0x95Aa6554e66F8d1A1D559F6D751b08ccEcbe3b94",
      /// @deprecated This is the first Gaia Bonding Curve (just for testing, in real usecases you will grab this dinamically)
      FM_BC_Bancor_Gaia_v1: "0x38f6bEcA8B08315FaED98621c76426df4fCA4ec0",
    }
} as const satisfies ChainAndContractAddress;