import { Address } from "viem";
import { GreenERC20 } from "../../abi/GreenERC20";
import { getPublicViemClient } from "./getPublicViemClient";
import { TokenDetails } from "../types";
import { getTokenMetadata } from "./getTokenMetadata";
import { getTokenMarketCap } from "./getTokenMarketCap";

export const getTokenDetails = async (
  tokenAddress: string
): Promise<TokenDetails> => {
  const client = getPublicViemClient();

  const tokenContract = {
    address: tokenAddress as Address,
    abi: GreenERC20,
  };

  const results = await client.multicall({
    contracts: [
      {
        ...tokenContract,
        functionName: "name",
      },
      {
        ...tokenContract,
        functionName: "symbol",
      },
      {
        ...tokenContract,
        functionName: "decimals",
      },
      {
        ...tokenContract,
        functionName: "metadataURI",
      },
      {
        ...tokenContract,
        functionName: "greenCurve",
      },
      {
        ...tokenContract,
        functionName: "totalSupply",
      },
    ],
  });

  if (results.some((result) => result.error)) {
    throw new Error("Failed to fetch token details");
  }

  const name = results[0].result;
  const symbol = results[1].result;
  const decimals = results[2].result;
  const metadataURI = results[3].result;
  const greenCurveAddress = results[4].result as Address;
  const totalSupply = results[5]?.result?.toString();

  if (
    !name ||
    !symbol ||
    !decimals ||
    !metadataURI ||
    !greenCurveAddress ||
    !totalSupply
  ) {
    throw new Error("Failed to fetch token details");
  }

  const tokenMetadata = await getTokenMetadata(client, tokenAddress as Address);

  const marketCap = await getTokenMarketCap(client, greenCurveAddress);

  const token: TokenDetails = {
    creator: "",
    tokenAddress,
    greenCurveAddress: greenCurveAddress || "",
    latitude: tokenMetadata.latitude || 0,
    longitude: tokenMetadata.longitude || 0,
    imageHash: tokenMetadata.imageHash || "",
    name,
    symbol,
    totalSupply: totalSupply,
    description: tokenMetadata.description || "",
    marketCap: marketCap || "",
    decimals,
  };

  return token;
};
