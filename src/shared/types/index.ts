import { Address } from "viem";

// Event emitted when token is deployed
export interface TokenDeployedEvent {
  creator: Address;
  tokenAddress: Address;
  greenCurveAddress: Address;
}

export interface Token {
  creator: string;
  tokenAddress: string;
  greenCurveAddress: string;
  metadata: TokenMetadata;
}

// This goes into a JSON file that is uploaded to IPFS
export interface TokenMetadata {
  latitude: number;
  longitude: number;
  imageHash: string;
  description?: string;
}

// This is accumulated data from the contract and IPFS
export interface TokenDetails {
  creator: string;
  tokenAddress: string;
  greenCurveAddress: string;
  latitude: number; // from IPFS
  longitude: number; // from IPFS
  imageHash: string; // from IPFS
  name: string; // from GreenERC20 contract
  symbol: string; // from GreenERC20 contract
  totalSupply: string; // from GreenERC20 contract
  description?: string; // from IPFS
  marketCap?: string; // from GreenCurve contract
  decimals?: number; // from GreenERC20 contract
}

// This is the data that is used to create a token through the UI
export interface CreateToken {
  description: string;
  file: FileList;
  lat: string;
  lng: string;
  name: string;
  ticker: string;
}

export interface BuyEvent {
  type: "buy";
  address: Address; // GreenCurve contract address
  args: {
    buyer: Address;
    ethIn: bigint;
    fee: bigint;
    tokenOut: bigint;
  };
  transactionHash: string;
  blockNumber: bigint;
}

export interface SellEvent {
  type: "sell";
  address: Address; // GreenCurve contract address
  args: {
    seller: Address;
    ethOut: bigint;
    fee: bigint;
    tokenIn: bigint;
  };
  transactionHash: string;
  blockNumber: bigint;
}

export type PurchaseEvent = BuyEvent | SellEvent;

export type TokenPurchases = Array<PurchaseEvent>;
