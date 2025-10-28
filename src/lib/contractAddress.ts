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
      Orchestrator_v1__GaiaFactory: "0x633F8eA71701D1f6B89b736025f74385b141ad96",
      LM_Gaia_BC_Factory_v1: "0xd1022A89efafFE2a8F428d84f93621404F6305C6",
      FM_ExpectingPayment_v1: "0xb56A61A5fDE17899b0241E3F9D367Af183b7E8Eb",
      FakeGaiaToken: "0x525470415C0958a749888D4f2E872Ef1CF0A73C1",
      /// @deprecated This is the first Gaia Bonding Curve Orchestrator (just for testing, in real usecases you will grab this dinamically)
      Orchestrator_v1__BondingCurve: "0x8054F3845dA9eB4505918fdC0472b7e3D83fE82B",
      /// @deprecated This is the first Gaia Bonding Curve (just for testing, in real usecases you will grab this dinamically)
      FM_BC_Bancor_Gaia_v1: "0x0F1143A76A21fd3b0e2Ff9c76CE2153aA04Af782",

      MULTICALL3_ADDRESS: "0xcA11bde05977b3631167028862bE2a173976CA11",
    }
} as const satisfies ChainAndContractAddress;