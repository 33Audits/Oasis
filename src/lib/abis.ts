import { Address } from "viem";
import { Abi } from "abitype";

export type ContractNameAndAbi = {
    [contractName: string]: Abi;
};

export const abis = {
    Governor_v1: [
        {
            type: "constructor",
            inputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "COMMUNITY_MULTISIG_ROLE",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "DEFAULT_ADMIN_ROLE",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "TEAM_MULTISIG_ROLE",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "acceptOwnership",
            inputs: [
                {
                    name: "adr",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "cancelUpgrade",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "forceUpgradeBeaconAndRestartImplementation",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "newImplementation",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "newMinorVersion",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "newPatchVersion",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "getBeaconTimelock",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "tuple",
                    internalType: "struct IGovernor_v1.Timelock",
                    components: [
                        {
                            name: "timelockActive",
                            type: "bool",
                            internalType: "bool"
                        },
                        {
                            name: "timelockUntil",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "intendedImplementation",
                            type: "address",
                            internalType: "address"
                        },
                        {
                            name: "intendedMinorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "intendedPatchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        }
                    ]
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getFeeManager",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getLinkedBeacons",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address[]",
                    internalType: "contract IMosaicBeacon_v1[]"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getModuleFactory",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getRoleAdmin",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "grantRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "hasRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "_communityMultisig",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_teamMultisig",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_timelockPeriod",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_feeManager",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_moduleFactory",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "initiateBeaconShutdown",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "initiateBeaconShutdownForAllLinkedBeacons",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "moduleFactoryInitCallback",
            inputs: [
                {
                    name: "registeredBeacons",
                    type: "address[]",
                    internalType: "contract IMosaicBeacon_v1[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "registerMetadataInModuleFactory",
            inputs: [
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "beacon",
                    type: "address",
                    internalType: "contract IMosaicBeacon_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "registerNonModuleBeacon",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    internalType: "contract IMosaicBeacon_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "renounceRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "callerConfirmation",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "restartBeaconImplementation",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "revokeRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setFeeManager",
            inputs: [
                {
                    name: "newFeeManager",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setFeeManagerCollateralWorkflowFee",
            inputs: [
                {
                    name: "workflow",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "module",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "functionSelector",
                    type: "bytes4",
                    internalType: "bytes4"
                },
                {
                    name: "set",
                    type: "bool",
                    internalType: "bool"
                },
                {
                    name: "fee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setFeeManagerDefaultCollateralFee",
            inputs: [
                {
                    name: "_defaultCollateralFee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setFeeManagerDefaultIssuanceFee",
            inputs: [
                {
                    name: "_defaultIssuanceFee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setFeeManagerDefaultProtocolTreasury",
            inputs: [
                {
                    name: "_defaultProtocolTreasury",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setFeeManagerIssuanceWorkflowFee",
            inputs: [
                {
                    name: "workflow",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "module",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "functionSelector",
                    type: "bytes4",
                    internalType: "bytes4"
                },
                {
                    name: "set",
                    type: "bool",
                    internalType: "bool"
                },
                {
                    name: "fee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setFeeManagerMaxFee",
            inputs: [
                {
                    name: "maxFee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setFeeManagerWorkflowTreasuries",
            inputs: [
                {
                    name: "workflow",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setModuleFactory",
            inputs: [
                {
                    name: "newModuleFactory",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setTimelockPeriod",
            inputs: [
                {
                    name: "newTimelockPeriod",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "timelockPeriod",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "triggerUpgradeBeaconWithTimelock",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "upgradeBeaconWithTimelock",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "newImplementation",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "newMinorVersion",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "newPatchVersion",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "event",
            name: "BeaconAddedToLinkedBeacons",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BeaconForcefullyUpgradedAndImplementationRestarted",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "newImplementation",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "newMinorVersion",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newPatchVersion",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BeaconImplementationRestarted",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BeaconShutdownInitiated",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BeaconTimelockStarted",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "newImplementation",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "newMinorVersion",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newPatchVersion",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "timelockExceeded",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BeaconUpgraded",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "newImplementation",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "newMinorVersion",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newPatchVersion",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BeaconUpgradedCanceled",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "FeeManagerUpdated",
            inputs: [
                {
                    name: "feeManager",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleFactoryUpdated",
            inputs: [
                {
                    name: "moduleFactory",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OwnershipAccepted",
            inputs: [
                {
                    name: "adr",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "RoleAdminChanged",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32"
                },
                {
                    name: "previousAdminRole",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32"
                },
                {
                    name: "newAdminRole",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "RoleGranted",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32"
                },
                {
                    name: "account",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "sender",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "RoleRevoked",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    indexed: true,
                    internalType: "bytes32"
                },
                {
                    name: "account",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "sender",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TimelockPeriodSet",
            inputs: [
                {
                    name: "newTimelockPeriod",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "AccessControlBadConfirmation",
            inputs: []
        },
        {
            type: "error",
            name: "AccessControlUnauthorizedAccount",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "neededRole",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ]
        },
        {
            type: "error",
            name: "Governor__BeaconNotAccessible",
            inputs: [
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Governor__CallToTargetContractFailed",
            inputs: []
        },
        {
            type: "error",
            name: "Governor__InvalidAddress",
            inputs: [
                {
                    name: "adr",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Governor__InvalidTimelockPeriod",
            inputs: [
                {
                    name: "amt",
                    type: "uint256",
                    internalType: "uint256"
                }
            ]
        },
        {
            type: "error",
            name: "Governor__LinkedBeaconsNotEmpty",
            inputs: []
        },
        {
            type: "error",
            name: "Governor__OnlyCommunityOrTeamMultisig",
            inputs: []
        },
        {
            type: "error",
            name: "Governor__OnlyLinkedModuleFactory",
            inputs: []
        },
        {
            type: "error",
            name: "Governor__TimelockPeriodNotExceeded",
            inputs: []
        },
        {
            type: "error",
            name: "Governor__UpgradeProcessNotStarted",
            inputs: []
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        }
    ],
    ModuleFactory_v1: [
        {
            type: "constructor",
            inputs: [
                {
                    name: "_reverter",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_trustedForwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "acceptOwnership",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "createAndInitModule",
            inputs: [
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "orchestrator",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "configData",
                    type: "bytes",
                    internalType: "bytes"
                },
                {
                    name: "workflowConfig",
                    type: "tuple",
                    internalType: "struct IOrchestratorFactory_v1.WorkflowConfig",
                    components: [
                        {
                            name: "independentUpdates",
                            type: "bool",
                            internalType: "bool"
                        },
                        {
                            name: "independentUpdateAdmin",
                            type: "address",
                            internalType: "address"
                        }
                    ]
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "createModuleProxy",
            inputs: [
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "orchestrator",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "workflowConfig",
                    type: "tuple",
                    internalType: "struct IOrchestratorFactory_v1.WorkflowConfig",
                    components: [
                        {
                            name: "independentUpdates",
                            type: "bool",
                            internalType: "bool"
                        },
                        {
                            name: "independentUpdateAdmin",
                            type: "address",
                            internalType: "address"
                        }
                    ]
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "getBeaconAndId",
            inputs: [
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IMosaicBeacon_v1"
                },
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getOrchestratorOfProxy",
            inputs: [
                {
                    name: "proxy",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "governor",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "_governor",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "initialMetadataRegistration",
                    type: "tuple[]",
                    internalType: "struct IModule_v1.Metadata[]",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "initialBeaconRegistration",
                    type: "address[]",
                    internalType: "contract IMosaicBeacon_v1[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "owner",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "pendingOwner",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "registerMetadata",
            inputs: [
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "beacon",
                    type: "address",
                    internalType: "contract IMosaicBeacon_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "renounceOwnership",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "reverter",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "transferOwnership",
            inputs: [
                {
                    name: "newOwner",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "event",
            name: "GovernorSet",
            inputs: [
                {
                    name: "governor",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "MetadataRegistered",
            inputs: [
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "beacon",
                    type: "address",
                    indexed: true,
                    internalType: "contract IMosaicBeacon_v1"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleCreated",
            inputs: [
                {
                    name: "orchestrator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "module",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OwnershipTransferStarted",
            inputs: [
                {
                    name: "previousOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "newOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OwnershipTransferred",
            inputs: [
                {
                    name: "previousOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "newOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleFactory__InvalidInitialRegistrationData",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleFactory__InvalidMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleFactory__InvalidMosaicBeacon",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleFactory__MetadataAlreadyRegistered",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleFactory__ModuleIsSunset",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleFactory__UnregisteredMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        },
        {
            type: "error",
            name: "OwnableInvalidOwner",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "OwnableUnauthorizedAccount",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ]
        }
    ],
    OrchestratorFactory_v1: [
        {
            type: "constructor",
            inputs: [
                {
                    name: "_trustedForwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "acceptOwnership",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "beacon",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IMosaicBeacon_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "createOrchestrator",
            inputs: [
                {
                    name: "workflowConfig",
                    type: "tuple",
                    internalType: "struct IOrchestratorFactory_v1.WorkflowConfig",
                    components: [
                        {
                            name: "independentUpdates",
                            type: "bool",
                            internalType: "bool"
                        },
                        {
                            name: "independentUpdateAdmin",
                            type: "address",
                            internalType: "address"
                        }
                    ]
                },
                {
                    name: "fundingManagerConfig",
                    type: "tuple",
                    internalType: "struct IOrchestratorFactory_v1.ModuleConfig",
                    components: [
                        {
                            name: "metadata",
                            type: "tuple",
                            internalType: "struct IModule_v1.Metadata",
                            components: [
                                {
                                    name: "majorVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "minorVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "patchVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "url",
                                    type: "string",
                                    internalType: "string"
                                },
                                {
                                    name: "title",
                                    type: "string",
                                    internalType: "string"
                                }
                            ]
                        },
                        {
                            name: "configData",
                            type: "bytes",
                            internalType: "bytes"
                        }
                    ]
                },
                {
                    name: "authorizerConfig",
                    type: "tuple",
                    internalType: "struct IOrchestratorFactory_v1.ModuleConfig",
                    components: [
                        {
                            name: "metadata",
                            type: "tuple",
                            internalType: "struct IModule_v1.Metadata",
                            components: [
                                {
                                    name: "majorVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "minorVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "patchVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "url",
                                    type: "string",
                                    internalType: "string"
                                },
                                {
                                    name: "title",
                                    type: "string",
                                    internalType: "string"
                                }
                            ]
                        },
                        {
                            name: "configData",
                            type: "bytes",
                            internalType: "bytes"
                        }
                    ]
                },
                {
                    name: "paymentProcessorConfig",
                    type: "tuple",
                    internalType: "struct IOrchestratorFactory_v1.ModuleConfig",
                    components: [
                        {
                            name: "metadata",
                            type: "tuple",
                            internalType: "struct IModule_v1.Metadata",
                            components: [
                                {
                                    name: "majorVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "minorVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "patchVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "url",
                                    type: "string",
                                    internalType: "string"
                                },
                                {
                                    name: "title",
                                    type: "string",
                                    internalType: "string"
                                }
                            ]
                        },
                        {
                            name: "configData",
                            type: "bytes",
                            internalType: "bytes"
                        }
                    ]
                },
                {
                    name: "moduleConfigs",
                    type: "tuple[]",
                    internalType: "struct IOrchestratorFactory_v1.ModuleConfig[]",
                    components: [
                        {
                            name: "metadata",
                            type: "tuple",
                            internalType: "struct IModule_v1.Metadata",
                            components: [
                                {
                                    name: "majorVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "minorVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "patchVersion",
                                    type: "uint256",
                                    internalType: "uint256"
                                },
                                {
                                    name: "url",
                                    type: "string",
                                    internalType: "string"
                                },
                                {
                                    name: "title",
                                    type: "string",
                                    internalType: "string"
                                }
                            ]
                        },
                        {
                            name: "configData",
                            type: "bytes",
                            internalType: "bytes"
                        }
                    ]
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "getOrchestratorByID",
            inputs: [
                {
                    name: "id",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getOrchestratorIDCounter",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "governor_",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "beacon_",
                    type: "address",
                    internalType: "contract IMosaicBeacon_v1"
                },
                {
                    name: "moduleFactory_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "moduleFactory",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "owner",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "pendingOwner",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "renounceOwnership",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "transferOwnership",
            inputs: [
                {
                    name: "newOwner",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OrchestratorCreated",
            inputs: [
                {
                    name: "orchestratorId",
                    type: "uint256",
                    indexed: true,
                    internalType: "uint256"
                },
                {
                    name: "orchestratorAddress",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OrchestratorFactoryInitialized",
            inputs: [
                {
                    name: "beacon",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "moduleFactory",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OwnershipTransferStarted",
            inputs: [
                {
                    name: "previousOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "newOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OwnershipTransferred",
            inputs: [
                {
                    name: "previousOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "newOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        },
        {
            type: "error",
            name: "OrchestratorFactory__InvalidBeacon",
            inputs: []
        },
        {
            type: "error",
            name: "OrchestratorFactory__InvalidId",
            inputs: []
        },
        {
            type: "error",
            name: "OrchestratorFactory__ModuleDataLengthMismatch",
            inputs: []
        },
        {
            type: "error",
            name: "OrchestratorFactory__OrchestratorAdminIsInvalid",
            inputs: []
        },
        {
            type: "error",
            name: "OwnableInvalidOwner",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "OwnableUnauthorizedAccount",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ]
        }
    ],
    Orchestrator_v1: [
        {
            type: "constructor",
            inputs: [
                {
                    name: "_trustedForwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "MODULE_UPDATE_TIMELOCK",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "authorizer",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IAuthorizer_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "cancelAuthorizerUpdate",
            inputs: [
                {
                    name: "authorizer_",
                    type: "address",
                    internalType: "contract IAuthorizer_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "cancelFundingManagerUpdate",
            inputs: [
                {
                    name: "fundingManager_",
                    type: "address",
                    internalType: "contract IFundingManager_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "cancelModuleUpdate",
            inputs: [
                {
                    name: "module_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "cancelPaymentProcessorUpdate",
            inputs: [
                {
                    name: "paymentProcessor_",
                    type: "address",
                    internalType: "contract IPaymentProcessor_v2"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "executeAddModule",
            inputs: [
                {
                    name: "module_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "executeRemoveModule",
            inputs: [
                {
                    name: "module_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "executeSetAuthorizer",
            inputs: [
                {
                    name: "newAuthorizer",
                    type: "address",
                    internalType: "contract IAuthorizer_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "executeSetFundingManager",
            inputs: [
                {
                    name: "newFundingManager",
                    type: "address",
                    internalType: "contract IFundingManager_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "executeSetPaymentProcessor",
            inputs: [
                {
                    name: "newPaymentProcessor",
                    type: "address",
                    internalType: "contract IPaymentProcessor_v2"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "fundingManager",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IFundingManager_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "governor",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IGovernor_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "orchestratorId_",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "moduleFactory_",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "modules",
                    type: "address[]",
                    internalType: "address[]"
                },
                {
                    name: "fundingManager_",
                    type: "address",
                    internalType: "contract IFundingManager_v1"
                },
                {
                    name: "authorizer_",
                    type: "address",
                    internalType: "contract IAuthorizer_v1"
                },
                {
                    name: "paymentProcessor_",
                    type: "address",
                    internalType: "contract IPaymentProcessor_v2"
                },
                {
                    name: "governor_",
                    type: "address",
                    internalType: "contract IGovernor_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "initiateAddModuleWithTimelock",
            inputs: [
                {
                    name: "module_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "initiateRemoveModuleWithTimelock",
            inputs: [
                {
                    name: "module_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "initiateSetAuthorizerWithTimelock",
            inputs: [
                {
                    name: "newAuthorizer",
                    type: "address",
                    internalType: "contract IAuthorizer_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "initiateSetFundingManagerWithTimelock",
            inputs: [
                {
                    name: "newFundingManager",
                    type: "address",
                    internalType: "contract IFundingManager_v1"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "initiateSetPaymentProcessorWithTimelock",
            inputs: [
                {
                    name: "newPaymentProcessor",
                    type: "address",
                    internalType: "contract IPaymentProcessor_v2"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isModule",
            inputs: [
                {
                    name: "module",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "listModules",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "moduleAddressToTimelock",
            inputs: [
                {
                    name: "module",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "timelockActive",
                    type: "bool",
                    internalType: "bool"
                },
                {
                    name: "timelockUntil",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "moduleFactory",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "modulesSize",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint8",
                    internalType: "uint8"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "orchestratorId",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "paymentProcessor",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IPaymentProcessor_v2"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "event",
            name: "AuthorizerUpdated",
            inputs: [
                {
                    name: "_address",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "FundingManagerUpdated",
            inputs: [
                {
                    name: "_address",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleAdded",
            inputs: [
                {
                    name: "module",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleRemoved",
            inputs: [
                {
                    name: "module",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleTimelockStarted",
            inputs: [
                {
                    name: "module",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "timelockUntil",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleUpdateCanceled",
            inputs: [
                {
                    name: "module",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OrchestratorInitialized",
            inputs: [
                {
                    name: "orchestratorId_",
                    type: "uint256",
                    indexed: true,
                    internalType: "uint256"
                },
                {
                    name: "fundingManager",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "authorizer",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "paymentProcessor",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "modules",
                    type: "address[]",
                    indexed: false,
                    internalType: "address[]"
                },
                {
                    name: "governor",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "PaymentProcessorUpdated",
            inputs: [
                {
                    name: "_address",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__CallerNotAuthorized",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__InvalidModuleAddress",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__IsModule",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__IsNotModule",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__ModuleAmountOverLimits",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__ModuleFactoryInvalid",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__ModuleNotRegistered",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__ModuleUpdateAlreadyStarted",
            inputs: []
        },
        {
            type: "error",
            name: "ModuleManagerBase__ModuleUpdateTimelockStillActive",
            inputs: [
                {
                    name: "_module",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_timelockUntil",
                    type: "uint256",
                    internalType: "uint256"
                }
            ]
        },
        {
            type: "error",
            name: "ModuleManagerBase__OnlyCallableByModule",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        },
        {
            type: "error",
            name: "Orchestrator__CallerNotAuthorized",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "caller",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Orchestrator__DependencyInjection__ModuleNotUsedInOrchestrator",
            inputs: []
        },
        {
            type: "error",
            name: "Orchestrator__InvalidModuleType",
            inputs: [
                {
                    name: "module",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Orchestrator__InvalidRemovalOfAuthorizer",
            inputs: []
        },
        {
            type: "error",
            name: "Orchestrator__InvalidRemovalOfFundingManager",
            inputs: []
        },
        {
            type: "error",
            name: "Orchestrator__InvalidRemovalOfPaymentProcessor",
            inputs: []
        },
        {
            type: "error",
            name: "Orchestrator__MismatchedTokenForFundingManager",
            inputs: [
                {
                    name: "currentToken",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "newToken",
                    type: "address",
                    internalType: "address"
                }
            ]
        }
    ],
    LM_Gaia_BC_Factory_v1: [
        {
            type: "function",
            name: "bcWorkflowAddressById",
            inputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "bcWorkflowCount",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "collateralToken",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "createBCWorkflow",
            inputs: [
                {
                    name: "vault",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "feeVault",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "threshold",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "bondingCurveParams",
                    type: "tuple",
                    internalType: "struct BondingCurveParams",
                    components: [
                        {
                            name: "reserveRatioForBuying",
                            type: "uint32",
                            internalType: "uint32"
                        },
                        {
                            name: "reserveRatioForSelling",
                            type: "uint32",
                            internalType: "uint32"
                        },
                        {
                            name: "initialIssuanceSupply",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "initialCollateralSupply",
                            type: "uint256",
                            internalType: "uint256"
                        }
                    ]
                },
                {
                    name: "issuanceTokenParams",
                    type: "tuple",
                    internalType: "struct IssuanceTokenParams",
                    components: [
                        {
                            name: "name",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "symbol",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "decimals",
                            type: "uint8",
                            internalType: "uint8"
                        },
                        {
                            name: "maxSupply",
                            type: "uint256",
                            internalType: "uint256"
                        }
                    ]
                }
            ],
            outputs: [
                {
                    name: "orchestrator",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "issuanceToken",
                    type: "address",
                    internalType: "contract ERC20Issuance_v1"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "identifier",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "orchestrator_",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "configData",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "minAmount",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "onExpectingPayment",
            inputs: [
                {
                    name: "staker",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "orchestrator",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "orchestratorFactory",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract OrchestratorFactory_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "positionManager",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "revokeModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "revokeModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "stakingConfirmationCreditByOwner",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint8",
                    internalType: "uint8"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "title",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "url",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "version",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "workflowCountByOwner",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint8",
                    internalType: "uint8"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "event",
            name: "BondingCurveCreated",
            inputs: [
                {
                    name: "bcWorkflowAddress",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "creator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleInitialized",
            inputs: [
                {
                    name: "parentOrchestrator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeTransferred",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "StakingConfirmed",
            inputs: [
                {
                    name: "staker",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "Module_OrchestratorCallbackFailed",
            inputs: [
                {
                    name: "funcSig",
                    type: "string",
                    internalType: "string"
                }
            ]
        },
        {
            type: "error",
            name: "Module__CallerNotAuthorized",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "caller",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Module__InvalidAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidOrchestratorAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Gaia_BC_Factory__AmountTooSmall",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Gaia_BC_Factory__InvalidMaxSupply",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Gaia_BC_Factory__InvalidSender",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Gaia_BC_Factory__InvalidThreshold",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Gaia_BC_Factory__StakingNotConfirmed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByOrchestrator",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByPaymentClient",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        }
    ],
    FM_ExpectingPayment_v1: [
        {
            type: "function",
            name: "cliff",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "deposit",
            inputs: [
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "endSpan",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "expectingPaymentCallback",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IExpectingPaymentCallback"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "grantModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "identifier",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "orchestrator_",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "configData",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "orchestrator",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "paymentRouter",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract LM_PC_PaymentRouter_v2"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "paymentToken",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IERC20"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "revokeModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "revokeModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setExpectingPaymentCallback",
            inputs: [
                {
                    name: "expectingPaymentCallback_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setPaymentRouter",
            inputs: [
                {
                    name: "paymentRouter_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "startSpan",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "title",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "token",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IERC20"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "transferOrchestratorToken",
            inputs: [
                {
                    name: "to",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "url",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "version",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "event",
            name: "Deposit",
            inputs: [
                {
                    name: "_from",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "_amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ExpectingPaymentCallbackUpdated",
            inputs: [
                {
                    name: "expectingPaymentCallback",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleInitialized",
            inputs: [
                {
                    name: "parentOrchestrator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OrchestratorTokenSet",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "decimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "PaymentRouterUpdated",
            inputs: [
                {
                    name: "paymentRouter",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeTransferred",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TransferOrchestratorToken",
            inputs: [
                {
                    name: "_to",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "_amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "AddressEmptyCode",
            inputs: [
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "AddressInsufficientBalance",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "FailedInnerCall",
            inputs: []
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "InvalidOrchestratorTokenWithdrawAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module_OrchestratorCallbackFailed",
            inputs: [
                {
                    name: "funcSig",
                    type: "string",
                    internalType: "string"
                }
            ]
        },
        {
            type: "error",
            name: "Module__CallerNotAuthorized",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "caller",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Module__FM_ExpectingPayment__ExpectingPaymentCallbackNotSet",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_ExpectingPayment__InvalidCliffPeriod",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_ExpectingPayment__InvalidPaymentRouter",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_ExpectingPayment__InvalidTimeParameters",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_ExpectingPayment__PaymentRouterNotSet",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidOrchestratorAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByOrchestrator",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByPaymentClient",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        },
        {
            type: "error",
            name: "SafeERC20FailedOperation",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    internalType: "address"
                }
            ]
        }
    ],
    ERC20Mint: [
        {
            type: "constructor",
            inputs: [
                {
                    name: "name_",
                    type: "string",
                    internalType: "string"
                },
                {
                    name: "symbol_",
                    type: "string",
                    internalType: "string"
                },
                {
                    name: "decimals_",
                    type: "uint8",
                    internalType: "uint8"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "allowance",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "spender",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "approve",
            inputs: [
                {
                    name: "spender",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "value",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "balanceOf",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "blockAddress",
            inputs: [
                {
                    name: "user",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "burn",
            inputs: [
                {
                    name: "from",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "value",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "callData",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "callSuccessful",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "decimals",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint8",
                    internalType: "uint8"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "isBlockedAddress",
            inputs: [
                {
                    name: "user",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "mint",
            inputs: [
                {
                    name: "to",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "value",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "name",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "setDecimals",
            inputs: [
                {
                    name: "newDecimals",
                    type: "uint8",
                    internalType: "uint8"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setReentrancyOnTransfer",
            inputs: [
                {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "symbol",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "toggleReturnFalse",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "totalSupply",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "transfer",
            inputs: [
                {
                    name: "to",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "transferFrom",
            inputs: [
                {
                    name: "from",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "to",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "unblockAddress",
            inputs: [
                {
                    name: "user",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "event",
            name: "Approval",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "spender",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "value",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Transfer",
            inputs: [
                {
                    name: "from",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "to",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "value",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "ERC20InsufficientAllowance",
            inputs: [
                {
                    name: "spender",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "allowance",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "needed",
                    type: "uint256",
                    internalType: "uint256"
                }
            ]
        },
        {
            type: "error",
            name: "ERC20InsufficientBalance",
            inputs: [
                {
                    name: "sender",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "balance",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "needed",
                    type: "uint256",
                    internalType: "uint256"
                }
            ]
        },
        {
            type: "error",
            name: "ERC20InvalidApprover",
            inputs: [
                {
                    name: "approver",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "ERC20InvalidReceiver",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "ERC20InvalidSender",
            inputs: [
                {
                    name: "sender",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "ERC20InvalidSpender",
            inputs: [
                {
                    name: "spender",
                    type: "address",
                    internalType: "address"
                }
            ]
        }
    ],
    FM_BC_Bancor_Gaia_v1: [
        {
            type: "function",
            name: "buy",
            inputs: [
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_minAmountOut",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "buyFee",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "buyFor",
            inputs: [
                {
                    name: "_receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_minAmountOut",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "buyIsOpen",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "calculatePurchaseReturn",
            inputs: [
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "mintAmount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "calculateSaleReturn",
            inputs: [
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "redeemAmount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "closeBuy",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "closeSell",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "confirmAsGaiaFactory",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "formula",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IBancorFormula"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getIssuanceToken",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getReserveRatioForBuying",
            inputs: [],
            outputs: [
                {
                    name: "reserveRatioForBuying_",
                    type: "uint32",
                    internalType: "uint32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getReserveRatioForSelling",
            inputs: [],
            outputs: [
                {
                    name: "reserveRatioForSelling_",
                    type: "uint32",
                    internalType: "uint32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getStaticPriceForBuying",
            inputs: [],
            outputs: [
                {
                    name: "staticPriceForBuying_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getStaticPriceForSelling",
            inputs: [],
            outputs: [
                {
                    name: "staticPriceForSelling_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getVirtualCollateralSupply",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getVirtualIssuanceSupply",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "grantModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "identifier",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "orchestrator_",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "configData",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "openBuy",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "openSell",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "orchestrator",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "projectCollateralFeeCollected",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "revokeModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "revokeModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "sell",
            inputs: [
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_minAmountOut",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "sellFee",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "sellIsOpen",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "sellTo",
            inputs: [
                {
                    name: "_receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_minAmountOut",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setBuyFee",
            inputs: [
                {
                    name: "_fee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setReserveRatioForBuying",
            inputs: [
                {
                    name: "reserveRatio_",
                    type: "uint32",
                    internalType: "uint32"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setReserveRatioForSelling",
            inputs: [
                {
                    name: "reserveRatio_",
                    type: "uint32",
                    internalType: "uint32"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setSellFee",
            inputs: [
                {
                    name: "_fee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setVirtualCollateralSupply",
            inputs: [
                {
                    name: "virtualSupply_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setVirtualIssuanceSupply",
            inputs: [
                {
                    name: "virtualSupply_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "supportsInterface_",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "title",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "token",
            inputs: [],
            outputs: [
                {
                    name: "token_",
                    type: "address",
                    internalType: "contract IERC20"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "transferOrchestratorToken",
            inputs: [
                {
                    name: "to_",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "amount_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "url",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "version",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "withdrawProjectCollateralFee",
            inputs: [
                {
                    name: "_receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "event",
            name: "BalanceTransferredToVault",
            inputs: [
                {
                    name: "vault",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BuyFeeUpdated",
            inputs: [
                {
                    name: "newBuyFee",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "oldBuyFee",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BuyReserveRatioSet",
            inputs: [
                {
                    name: "newBuyReserveRatio",
                    type: "uint32",
                    indexed: false,
                    internalType: "uint32"
                },
                {
                    name: "oldBuyReserveRatio",
                    type: "uint32",
                    indexed: false,
                    internalType: "uint32"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BuyingDisabled",
            inputs: [],
            anonymous: false
        },
        {
            type: "event",
            name: "BuyingEnabled",
            inputs: [],
            anonymous: false
        },
        {
            type: "event",
            name: "GaiaFactoryConfirmed",
            inputs: [
                {
                    name: "factory",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "IssuanceTokenSet",
            inputs: [
                {
                    name: "issuanceToken",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "decimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleInitialized",
            inputs: [
                {
                    name: "parentOrchestrator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OrchestratorTokenSet",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "decimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "PoolCreated",
            inputs: [
                {
                    name: "poolAddress",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "collateralAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "issuanceAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "liquidity",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProjectCollateralFeeAdded",
            inputs: [
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProjectCollateralFeeWithdrawn",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProjectFeesTransferredToFeeVault",
            inputs: [
                {
                    name: "feeVault",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeMinted",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeTransferred",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "SellFeeUpdated",
            inputs: [
                {
                    name: "newSellFee",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "oldSellFee",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "SellReserveRatioSet",
            inputs: [
                {
                    name: "newSellReserveRatio",
                    type: "uint32",
                    indexed: false,
                    internalType: "uint32"
                },
                {
                    name: "oldSellReserveRatio",
                    type: "uint32",
                    indexed: false,
                    internalType: "uint32"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "SellingDisabled",
            inputs: [],
            anonymous: false
        },
        {
            type: "event",
            name: "SellingEnabled",
            inputs: [],
            anonymous: false
        },
        {
            type: "event",
            name: "SkippingPoolCreationDueToNotEnoughTokens",
            inputs: [
                {
                    name: "issuanceAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "collateralAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TokenDecimalsUpdated",
            inputs: [
                {
                    name: "oldDecimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                },
                {
                    name: "newDecimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TokensBought",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "depositAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "receivedAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "buyer",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TokensSold",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "depositAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "receivedAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "seller",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TransferOrchestratorToken",
            inputs: [
                {
                    name: "_to",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "_amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualCollateralAmountAdded",
            inputs: [
                {
                    name: "amountAdded",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualCollateralAmountSubtracted",
            inputs: [
                {
                    name: "amountSubtracted",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualCollateralSupplySet",
            inputs: [
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "oldSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualIssuanceAmountAdded",
            inputs: [
                {
                    name: "amountAdded",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualIssuanceAmountSubtracted",
            inputs: [
                {
                    name: "amountSubtracted",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualIssuanceSupplySet",
            inputs: [
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "oldSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "AddressEmptyCode",
            inputs: [
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "AddressInsufficientBalance",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__InsufficientCollateralBalance",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__InsufficientIssuanceBalance",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__InvalidFeeVault",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__InvalidMaxIssuanceSupply",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__InvalidPositionManager",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__InvalidPrice",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__InvalidSender",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__InvalidThreshold",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__NotEnabled",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__PriceCalculationOverflow",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__PriceTooLarge",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__SqrtPriceX96Overflow",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Gaia__ZeroAmount0",
            inputs: []
        },
        {
            type: "error",
            name: "FailedInnerCall",
            inputs: []
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "InvalidOrchestratorTokenWithdrawAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module_OrchestratorCallbackFailed",
            inputs: [
                {
                    name: "funcSig",
                    type: "string",
                    internalType: "string"
                }
            ]
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__BuyingFunctionaltiesClosed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__FeeAmountToHigh",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InsufficientOutputAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidDepositAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidFeePercentage",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidMinAmountOut",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidRecipient",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidWithdrawAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__TradeAmountTooLow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__CallerNotAuthorized",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "caller",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Module__FM_BC_Bancor_Redeeming_VirtualSupply__CurveInteractionsMustBeClosed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_BC_Bancor_Redeeming_VirtualSupply__InvalidBancorFormula",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_BC_Bancor_Redeeming_VirtualSupply__InvalidReserveRatio",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_BC_Bancor_Redeeming_VirtualSupply__InvalidTokenDecimal",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidOrchestratorAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByOrchestrator",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByPaymentClient",
            inputs: []
        },
        {
            type: "error",
            name: "Module__RedeemingBondingCurveBase__InsufficientCollateralForProjectFee",
            inputs: []
        },
        {
            type: "error",
            name: "Module__RedeemingBondingCurveBase__SellingFunctionaltiesClosed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualCollateralSupplyBase__AddResultsInOverflow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualCollateralSupplyBase__SubtractResultsInUnderflow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualCollateralSupplyBase__VirtualSupplyCannotBeZero",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualIssuanceSupplyBase__AddResultsInOverflow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualIssuanceSupplyBase__SubtractResultsInUnderflow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualIssuanceSupplyBase__VirtualSupplyCannotBeZero",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        },
        {
            type: "error",
            name: "SafeERC20FailedOperation",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    internalType: "address"
                }
            ]
        }
    ],
    LM_Launchpad_BC_Factory_v1: [
        {
            type: "function",
            name: "bcOrchestratorBuilder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "bcWorkflowAddressById",
            inputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "bcWorkflowCount",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "createBCWorkflow",
            inputs: [
                {
                    name: "threshold",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "strategyExecutorAddress",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "bondingCurveParams",
                    type: "tuple",
                    internalType: "struct ILM_Launchpad_BC_OrchestratorBuilder_v1.BondingCurveParams",
                    components: [
                        {
                            name: "reserveRatioForBuying",
                            type: "uint32",
                            internalType: "uint32"
                        },
                        {
                            name: "reserveRatioForSelling",
                            type: "uint32",
                            internalType: "uint32"
                        },
                        {
                            name: "initialIssuanceSupply",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "initialCollateralSupply",
                            type: "uint256",
                            internalType: "uint256"
                        }
                    ]
                },
                {
                    name: "issuanceTokenParams",
                    type: "tuple",
                    internalType: "struct ILM_Launchpad_BC_Factory_v1.IssuanceTokenParams",
                    components: [
                        {
                            name: "name",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "symbol",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "decimals",
                            type: "uint8",
                            internalType: "uint8"
                        },
                        {
                            name: "maxSupply",
                            type: "uint256",
                            internalType: "uint256"
                        }
                    ]
                }
            ],
            outputs: [
                {
                    name: "orchestrator",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "issuanceToken",
                    type: "address",
                    internalType: "contract ERC20Issuance_v1"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "identifier",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "orchestrator_",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "configData_",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "minAmount",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "onExpectingPayment",
            inputs: [
                {
                    name: "staker",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "orchestrator",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "orchestratorFactory",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "revokeModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "revokeModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setBcOrchestratorBuilder",
            inputs: [
                {
                    name: "bcOrchestratorBuilder_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "stakingConfirmationCreditByOwner",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint8",
                    internalType: "uint8"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "title",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "url",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "version",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "workflowCountByOwner",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint8",
                    internalType: "uint8"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "event",
            name: "BondingCurveCreated",
            inputs: [
                {
                    name: "bcWorkflowAddress",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "creator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleInitialized",
            inputs: [
                {
                    name: "parentOrchestrator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeTransferred",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "StakingConfirmed",
            inputs: [
                {
                    name: "staker",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "Module_OrchestratorCallbackFailed",
            inputs: [
                {
                    name: "funcSig",
                    type: "string",
                    internalType: "string"
                }
            ]
        },
        {
            type: "error",
            name: "Module__CallerNotAuthorized",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "caller",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Module__InvalidAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidOrchestratorAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Launchpad_BC_Factory__AmountTooSmall",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Launchpad_BC_Factory__InvalidMaxSupply",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Launchpad_BC_Factory__InvalidSender",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Launchpad_BC_Factory__InvalidThreshold",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Launchpad_BC_Factory__OrchestratorBuilderAlreadySet",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Launchpad_BC_Factory__OrchestratorBuilderNotSet",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Launchpad_BC_Factory__StakingNotConfirmed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByOrchestrator",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByPaymentClient",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        }
    ],
    FM_BC_Bancor_Launchpad_v1: [
        {
            type: "function",
            name: "buy",
            inputs: [
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_minAmountOut",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "buyFee",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "buyFor",
            inputs: [
                {
                    name: "_receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_minAmountOut",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "buyIsOpen",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "calculatePurchaseReturn",
            inputs: [
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "mintAmount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "calculateSaleReturn",
            inputs: [
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "redeemAmount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "closeBuy",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "closeSell",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "confirmAsLaunchpadFactory",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "feeVault",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "formula",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IBancorFormula"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getIssuanceToken",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getReserveRatioForBuying",
            inputs: [],
            outputs: [
                {
                    name: "reserveRatioForBuying_",
                    type: "uint32",
                    internalType: "uint32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getReserveRatioForSelling",
            inputs: [],
            outputs: [
                {
                    name: "reserveRatioForSelling_",
                    type: "uint32",
                    internalType: "uint32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getStaticPriceForBuying",
            inputs: [],
            outputs: [
                {
                    name: "staticPriceForBuying_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getStaticPriceForSelling",
            inputs: [],
            outputs: [
                {
                    name: "staticPriceForSelling_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getVirtualCollateralSupply",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "getVirtualIssuanceSupply",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "grantModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "identifier",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "orchestrator_",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "configData",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "issuanceTokenAddress",
            inputs: [],
            outputs: [
                {
                    name: "issuanceTokenAddress_",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "openBuy",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "openSell",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "orchestrator",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "projectCollateralFeeCollected",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "revokeModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "revokeModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "sell",
            inputs: [
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_minAmountOut",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "sellFee",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "sellIsOpen",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "sellTo",
            inputs: [
                {
                    name: "_receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_depositAmount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "_minAmountOut",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setBuyFee",
            inputs: [
                {
                    name: "_fee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setReserveRatioForBuying",
            inputs: [
                {
                    name: "reserveRatio_",
                    type: "uint32",
                    internalType: "uint32"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setReserveRatioForSelling",
            inputs: [
                {
                    name: "reserveRatio_",
                    type: "uint32",
                    internalType: "uint32"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setSellFee",
            inputs: [
                {
                    name: "_fee",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setVault",
            inputs: [
                {
                    name: "vault_",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setVirtualCollateralSupply",
            inputs: [
                {
                    name: "virtualSupply_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setVirtualIssuanceSupply",
            inputs: [
                {
                    name: "virtualSupply_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "supportsInterface_",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "title",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "token",
            inputs: [],
            outputs: [
                {
                    name: "token_",
                    type: "address",
                    internalType: "contract IERC20"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "transferOrchestratorToken",
            inputs: [
                {
                    name: "to_",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "amount_",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "url",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "vault",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "version",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "withdrawProjectCollateralFee",
            inputs: [
                {
                    name: "_receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "_amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "event",
            name: "BalanceTransferredToVault",
            inputs: [
                {
                    name: "vault",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BuyFeeUpdated",
            inputs: [
                {
                    name: "newBuyFee",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "oldBuyFee",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BuyReserveRatioSet",
            inputs: [
                {
                    name: "newBuyReserveRatio",
                    type: "uint32",
                    indexed: false,
                    internalType: "uint32"
                },
                {
                    name: "oldBuyReserveRatio",
                    type: "uint32",
                    indexed: false,
                    internalType: "uint32"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "BuyingDisabled",
            inputs: [],
            anonymous: false
        },
        {
            type: "event",
            name: "BuyingEnabled",
            inputs: [],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "IssuanceTokenSet",
            inputs: [
                {
                    name: "issuanceToken",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "decimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "LaunchpadFactoryConfirmed",
            inputs: [
                {
                    name: "factory",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleInitialized",
            inputs: [
                {
                    name: "parentOrchestrator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OrchestratorTokenSet",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "decimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "PoolCreated",
            inputs: [
                {
                    name: "poolAddress",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "collateralAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "issuanceAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "liquidity",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProjectCollateralFeeAdded",
            inputs: [
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProjectCollateralFeeWithdrawn",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProjectFeesTransferredToFeeVault",
            inputs: [
                {
                    name: "feeVault",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeMinted",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeTransferred",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "SellFeeUpdated",
            inputs: [
                {
                    name: "newSellFee",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "oldSellFee",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "SellReserveRatioSet",
            inputs: [
                {
                    name: "newSellReserveRatio",
                    type: "uint32",
                    indexed: false,
                    internalType: "uint32"
                },
                {
                    name: "oldSellReserveRatio",
                    type: "uint32",
                    indexed: false,
                    internalType: "uint32"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "SellingDisabled",
            inputs: [],
            anonymous: false
        },
        {
            type: "event",
            name: "SellingEnabled",
            inputs: [],
            anonymous: false
        },
        {
            type: "event",
            name: "SkippingPoolCreationDueToNotEnoughTokens",
            inputs: [
                {
                    name: "issuanceAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "collateralAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TokenDecimalsUpdated",
            inputs: [
                {
                    name: "oldDecimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                },
                {
                    name: "newDecimals",
                    type: "uint8",
                    indexed: false,
                    internalType: "uint8"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TokensBought",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "depositAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "receivedAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "buyer",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TokensSold",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "depositAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "receivedAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "seller",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "TransferOrchestratorToken",
            inputs: [
                {
                    name: "_to",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "_amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VaultSet",
            inputs: [
                {
                    name: "vault",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualCollateralAmountAdded",
            inputs: [
                {
                    name: "amountAdded",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualCollateralAmountSubtracted",
            inputs: [
                {
                    name: "amountSubtracted",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualCollateralSupplySet",
            inputs: [
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "oldSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualIssuanceAmountAdded",
            inputs: [
                {
                    name: "amountAdded",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualIssuanceAmountSubtracted",
            inputs: [
                {
                    name: "amountSubtracted",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "VirtualIssuanceSupplySet",
            inputs: [
                {
                    name: "newSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                },
                {
                    name: "oldSupply",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "AddressEmptyCode",
            inputs: [
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "AddressInsufficientBalance",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__InsufficientCollateralBalance",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__InsufficientIssuanceBalance",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__InvalidFeeVault",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__InvalidMaxIssuanceSupply",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__InvalidPositionManager",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__InvalidPrice",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__InvalidSender",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__InvalidThreshold",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__NotEnabled",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__PriceCalculationOverflow",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__PriceTooLarge",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__SqrtPriceX96Overflow",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__VaultNotSet",
            inputs: []
        },
        {
            type: "error",
            name: "FM_BC_Bancor_Launchpad__ZeroAmount0",
            inputs: []
        },
        {
            type: "error",
            name: "FailedInnerCall",
            inputs: []
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "InvalidOrchestratorTokenWithdrawAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module_OrchestratorCallbackFailed",
            inputs: [
                {
                    name: "funcSig",
                    type: "string",
                    internalType: "string"
                }
            ]
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__BuyingFunctionaltiesClosed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__FeeAmountToHigh",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InsufficientOutputAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidDepositAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidFeePercentage",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidMinAmountOut",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidRecipient",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__InvalidWithdrawAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module__BondingCurveBase__TradeAmountTooLow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__CallerNotAuthorized",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "caller",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Module__FM_BC_Bancor_Redeeming_VirtualSupply__CurveInteractionsMustBeClosed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_BC_Bancor_Redeeming_VirtualSupply__InvalidBancorFormula",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_BC_Bancor_Redeeming_VirtualSupply__InvalidReserveRatio",
            inputs: []
        },
        {
            type: "error",
            name: "Module__FM_BC_Bancor_Redeeming_VirtualSupply__InvalidTokenDecimal",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidOrchestratorAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByOrchestrator",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByPaymentClient",
            inputs: []
        },
        {
            type: "error",
            name: "Module__RedeemingBondingCurveBase__InsufficientCollateralForProjectFee",
            inputs: []
        },
        {
            type: "error",
            name: "Module__RedeemingBondingCurveBase__SellingFunctionaltiesClosed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualCollateralSupplyBase__AddResultsInOverflow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualCollateralSupplyBase__SubtractResultsInUnderflow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualCollateralSupplyBase__VirtualSupplyCannotBeZero",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualIssuanceSupplyBase__AddResultsInOverflow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualIssuanceSupplyBase__SubtractResultsInUnderflow",
            inputs: []
        },
        {
            type: "error",
            name: "Module__VirtualIssuanceSupplyBase__VirtualSupplyCannotBeZero",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        },
        {
            type: "error",
            name: "SafeERC20FailedOperation",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    internalType: "address"
                }
            ]
        }
    ],
    LM_MultiAssetVault_Rewarder_v1: [
        {
            type: "receive",
            stateMutability: "payable"
        },
        {
            type: "function",
            name: "allowance",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "approve",
            inputs: [
                {
                    name: "spender",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "id",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "balanceOf",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "contractOwnedTokens",
            inputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "contractOwnedTokensIndex",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "deposit",
            inputs: [
                {
                    name: "asset",
                    type: "address",
                    internalType: "contract ERC20"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "payable"
        },
        {
            type: "function",
            name: "executeStrategy",
            inputs: [
                {
                    name: "contracts",
                    type: "address[]",
                    internalType: "address[]"
                },
                {
                    name: "data",
                    type: "bytes[]",
                    internalType: "bytes[]"
                },
                {
                    name: "msgValues",
                    type: "uint256[]",
                    internalType: "uint256[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "identifier",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "orchestrator_",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isOperator",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "orchestrator",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "revokeModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "revokeModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "reward",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "multiplier",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "divisor",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "rewardCaller",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "setOperator",
            inputs: [
                {
                    name: "operator",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "approved",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setRewardCaller",
            inputs: [
                {
                    name: "_rewardCaller",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "setStrategyExecutor",
            inputs: [
                {
                    name: "_strategyExecutor",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "strategyExecutor",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "supportsInterface_",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "title",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "totalAssets",
            inputs: [
                {
                    name: "asset",
                    type: "address",
                    internalType: "contract ERC20"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "transfer",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "id",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "transferFrom",
            inputs: [
                {
                    name: "sender",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "id",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "url",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "version",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "withdraw",
            inputs: [
                {
                    name: "asset",
                    type: "address",
                    internalType: "contract ERC20"
                },
                {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address"
                },
                {
                    name: "owner",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "event",
            name: "Approval",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "spender",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "id",
                    type: "uint256",
                    indexed: true,
                    internalType: "uint256"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleInitialized",
            inputs: [
                {
                    name: "parentOrchestrator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Module__LM_MultiAssetVault_v1__Deposit",
            inputs: [
                {
                    name: "caller",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "owner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "asset",
                    type: "address",
                    indexed: true,
                    internalType: "contract ERC20"
                },
                {
                    name: "assetAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "OperatorSet",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "operator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "approved",
                    type: "bool",
                    indexed: false,
                    internalType: "bool"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeTransferred",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Transfer",
            inputs: [
                {
                    name: "caller",
                    type: "address",
                    indexed: false,
                    internalType: "address"
                },
                {
                    name: "from",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "to",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "id",
                    type: "uint256",
                    indexed: true,
                    internalType: "uint256"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "Module_OrchestratorCallbackFailed",
            inputs: [
                {
                    name: "funcSig",
                    type: "string",
                    internalType: "string"
                }
            ]
        },
        {
            type: "error",
            name: "Module__CallerNotAuthorized",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "caller",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Module__InvalidAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidOrchestratorAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_MultiAssetVault_v1__ArrayLengthsMismatch",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_MultiAssetVault_v1__CallFailed",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_MultiAssetVault_v1__IncorrectAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_MultiAssetVault_v1__InvalidRewardCaller",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_MultiAssetVault_v1__InvalidStrategyExecutor",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_MultiAssetVault_v1__RewardCallerAlreadySet",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_MultiAssetVault_v1__StrategyExecutorAlreadySet",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByOrchestrator",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByPaymentClient",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        }
    ],
    LM_Synthetix_Staking_WithExternalRewarder_v1: [
        {
            type: "function",
            name: "balanceOf",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "claimReward",
            inputs: [
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "configData",
            inputs: [],
            outputs: [
                {
                    name: "stakingToken",
                    type: "address",
                    internalType: "contract ERC20"
                },
                {
                    name: "rewardsToken",
                    type: "address",
                    internalType: "contract ERC20"
                },
                {
                    name: "rewardRate",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "earned",
            inputs: [
                {
                    name: "_account",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "grantModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "grantModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "identifier",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "bytes32",
                    internalType: "bytes32"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "init",
            inputs: [
                {
                    name: "orchestrator_",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                },
                {
                    name: "configData_",
                    type: "bytes",
                    internalType: "bytes"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "isTrustedForwarder",
            inputs: [
                {
                    name: "forwarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "lastTimeRewardApplicable",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "orchestrator",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "contract IOrchestrator_v1"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "revokeModuleRole",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "target",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "revokeModuleRoleBatched",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "rewardPerToken",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "rewardPerTokenStored",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "rewarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "rewards",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "setRewarder",
            inputs: [
                {
                    name: "_rewarder",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "stake",
            inputs: [
                {
                    name: "_amount",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "function",
            name: "supportsInterface",
            inputs: [
                {
                    name: "interfaceId",
                    type: "bytes4",
                    internalType: "bytes4"
                }
            ],
            outputs: [
                {
                    name: "supportsInterface_",
                    type: "bool",
                    internalType: "bool"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "title",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "totalRewards",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "totalSupply",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "trustedForwarder",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "updatedAt",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "url",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "string",
                    internalType: "string"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "userRewardPerTokenPaid",
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "version",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256"
                }
            ],
            stateMutability: "view"
        },
        {
            type: "function",
            name: "withdraw",
            inputs: [
                {
                    name: "_amount",
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "receiver",
                    type: "address",
                    internalType: "address"
                }
            ],
            outputs: [],
            stateMutability: "nonpayable"
        },
        {
            type: "event",
            name: "ILM_Synthetix_Staking_v1_RewardsClaimed",
            inputs: [
                {
                    name: "user",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "receiver",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ILM_Synthetix_Staking_v1_Withdrawn",
            inputs: [
                {
                    name: "user",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "receiver",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ILM_Synthetix_Staking_v1__Staked",
            inputs: [
                {
                    name: "user",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "amount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "Initialized",
            inputs: [
                {
                    name: "version",
                    type: "uint64",
                    indexed: false,
                    internalType: "uint64"
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ModuleInitialized",
            inputs: [
                {
                    name: "parentOrchestrator",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "metadata",
                    type: "tuple",
                    indexed: false,
                    internalType: "struct IModule_v1.Metadata",
                    components: [
                        {
                            name: "majorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "minorVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "patchVersion",
                            type: "uint256",
                            internalType: "uint256"
                        },
                        {
                            name: "url",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "title",
                            type: "string",
                            internalType: "string"
                        }
                    ]
                }
            ],
            anonymous: false
        },
        {
            type: "event",
            name: "ProtocolFeeTransferred",
            inputs: [
                {
                    name: "token",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "treasury",
                    type: "address",
                    indexed: true,
                    internalType: "address"
                },
                {
                    name: "feeAmount",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256"
                }
            ],
            anonymous: false
        },
        {
            type: "error",
            name: "InvalidInitialization",
            inputs: []
        },
        {
            type: "error",
            name: "Module_OrchestratorCallbackFailed",
            inputs: [
                {
                    name: "funcSig",
                    type: "string",
                    internalType: "string"
                }
            ]
        },
        {
            type: "error",
            name: "Module__CallerNotAuthorized",
            inputs: [
                {
                    name: "role",
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "caller",
                    type: "address",
                    internalType: "address"
                }
            ]
        },
        {
            type: "error",
            name: "Module__InvalidAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidMetadata",
            inputs: []
        },
        {
            type: "error",
            name: "Module__InvalidOrchestratorAddress",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Synthetix_Staking_WithExternalRewarder_v1__InvalidRewarder",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Synthetix_Staking_WithExternalRewarder_v1__NoStakingBalance",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Synthetix_Staking_WithExternalRewarder_v1__NotRewardCaller",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Synthetix_Staking_WithExternalRewarder_v1__NotUnstakable",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Synthetix_Staking_WithExternalRewarder_v1__RewarderAlreadySet",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Synthetix_Staking_v1__InvalidAmount",
            inputs: []
        },
        {
            type: "error",
            name: "Module__LM_Synthetix_Staking_v1__InvalidStakingToken",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByOrchestrator",
            inputs: []
        },
        {
            type: "error",
            name: "Module__OnlyCallableByPaymentClient",
            inputs: []
        },
        {
            type: "error",
            name: "NotInitializing",
            inputs: []
        }
    ]
} as const satisfies ContractNameAndAbi;