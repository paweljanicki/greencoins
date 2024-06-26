export const GreenCurve = [
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "V_ETH_BALANCE",
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
    name: "WETH_USDC_PAIR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IUniswapV2Pair",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "buyTokens",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "calculatePurchaseTokenOut",
    inputs: [
      {
        name: "amountETHIn",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
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
    name: "calculateSaleTokenOut",
    inputs: [
      {
        name: "amountTokenIn",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
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
    name: "ethBalance",
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
    name: "feeReceiver",
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
    name: "getTokenPriceinETH",
    inputs: [],
    outputs: [
      {
        name: "ethAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "greenErc20Balance",
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
    name: "initialize",
    inputs: [
      {
        name: "_tokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_feeReceiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "_tradeFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_maxSupply",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_marketCapThreshold",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_uniswapRouter",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "marketCap",
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
    name: "maxSupply",
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
    name: "saleActive",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "sellTokens",
    inputs: [
      {
        name: "tokenAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "token",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
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
    name: "uniswapRouter",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IUniswapV2Router02",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "BondingEnded",
    inputs: [
      {
        name: "totalEth",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "totalTokens",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GreenCurveInitialized",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "tradeFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "feeReceiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "maxSupply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenBuy",
    inputs: [
      {
        name: "ethIn",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenOut",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "buyer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenSell",
    inputs: [
      {
        name: "tokenIn",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "ethOut",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "seller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "FeeTransferFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "GreenCurveInactive",
    inputs: [],
  },
  {
    type: "error",
    name: "MaxSupplyCannotBeLowerThanSuppliedTokens",
    inputs: [],
  },
  {
    type: "error",
    name: "NotEnoughETH",
    inputs: [],
  },
  {
    type: "error",
    name: "PurchaseExceedsSupply",
    inputs: [],
  },
] as const;
