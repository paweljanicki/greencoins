export const greenLaunchpad = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_tokenImplementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "_greenCurveImplementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "_router",
        type: "address",
        internalType: "address",
      },
      {
        name: "_platformFeeReceiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "_marketCapThreshold",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_tradeFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_platformFeePercentage",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_communityAllocPercentage",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "communityPercentage",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deployToken",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "metadataURI",
        type: "string",
        internalType: "string",
      },
      {
        name: "maxSupply",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "greenCurveImplementation",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "marketCapThreshold",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "platformFeeAddress",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address payable",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "platformFeePercentage",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "router",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setCommunityPerecentage",
    inputs: [
      {
        name: "_communityPercentage",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMarketCapThreshold",
    inputs: [
      {
        name: "_newMarketCapThreshold",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPlatformFeeAddress",
    inputs: [
      {
        name: "_platformFeeAddress",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPlatformFeePercentage",
    inputs: [
      {
        name: "_platformFeePercentage",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTradeFee",
    inputs: [
      {
        name: "_tradeFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "tokenImplementation",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tradeFee",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CommunityPerecentageUpdated",
    inputs: [
      {
        name: "newCommunityShare",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MarketCapThresholdUpdated",
    inputs: [
      {
        name: "newMarketCapThreshold",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PlatformFeeAddressUpdated",
    inputs: [
      {
        name: "newPlatformFeeReceiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PlatformFeePercentageUpdated",
    inputs: [
      {
        name: "newPlatformFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenDeployed",
    inputs: [
      {
        name: "tokenAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "greenCurveAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "creator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TradeFeeUpdated",
    inputs: [
      {
        name: "newTradeFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ERC1167FailedCreateClone",
    inputs: [],
  },
  {
    type: "error",
    name: "EmptyGreenCurveImplementation",
    inputs: [],
  },
  {
    type: "error",
    name: "EmptyPlatformFeeReceiver",
    inputs: [],
  },
  {
    type: "error",
    name: "EmptyTokenImplementation",
    inputs: [],
  },
  {
    type: "error",
    name: "EmptyUniswapRouter",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeGreaterThanHundred",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
] as const;
