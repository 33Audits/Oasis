import { Address } from "viem";

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
      FM_BC_Bancor_Launchpad_v1: "0x0F1143A76A21fd3b0e2Ff9c76CE2153aA04Af782",
    },
    84532: {
      Governor_v1: "0x4737a254715B6c0Bd8CFa5439c3a64E5D7A86AB7",
      ModuleFactory_v1: "0x74Acd68bE0CACdb36B33525B5e9b7e0Da7607243",
      OrchestratorFactory_v1: "0xa10CC7465EF526B799f79ce2015825A9e587Fc4D",
      // Gaia Factory Workflow
      Orchestrator_v1__LaunchpadFactory: "0x6a0f35901AF9A000B33232e9D95BE84bAdb15d2D",
      LM_Launchpad_BC_Factory_v1: "0xba37ed225663B999F4dFFAeDbA7Bf6022792EcBe",
      FM_ExpectingPayment_v1: "0x86C0D57F932F603f2D63B8eE4AaB9f8fad54FEAA",
      CollateralToken: "0x7457EB2F2D6e906dad221dba7Ca8dDe3De4afc00",
      /// @deprecated This is the first Gaia Bonding Curve Orchestrator (just for testing, in real usecases you will grab this dinamically)
      Orchestrator_v1__BondingCurve: "0xAdF5dC4B10dfb6F4b19bc55494E9d6da2ab8d04f",
      /// @deprecated This is the first Gaia Bonding Curve (just for testing, in real usecases you will grab this dinamically)
      FM_BC_Bancor_Launchpad_v1: "0x5ccff5A82977EcB100dc2549EE73e2d8FC726FAE",
      LM_MultiAssetVault_Rewarder_v1: "0xfddBEE0aDfBd5716B33865159f27a85a918f48c6",
      LM_Synthetix_Staking_WithExternalRewarder_v1: "0xe2D07f8E3758fC7F4AC7273ea0C1814aEa6c7De1",
    }
} as const satisfies ChainAndContractAddress;