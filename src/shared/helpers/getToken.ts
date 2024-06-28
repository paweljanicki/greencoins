import { Address } from "viem";
import { GreenERC20 } from "../../abi/GreenERC20";
import { getPublicViemClient } from "./getPublicViemClient";
import { TokenDetails } from "../types";
import { getTokenMetadata } from "./getTokenMetadata";

export const getTokenDetails = async (
  tokenAddress: string
): Promise<TokenDetails> => {
  const client = getPublicViemClient();

  const contract = {
    address: tokenAddress as Address,
    abi: GreenERC20,
  };

  const results = await client.multicall({
    contracts: [
      {
        ...contract,
        functionName: "name",
      },
      {
        ...contract,
        functionName: "symbol",
      },
      {
        ...contract,
        functionName: "decimals",
      },
      {
        ...contract,
        functionName: "metadataURI",
      },
      {
        ...contract,
        functionName: "greenCurve",
      },
    ],
  });

  if (results.some((result) => result.error)) {
    throw new Error("Failed to fetch token details");
  }

  console.log("results", results);

  const tokenMetadata = await getTokenMetadata(client, tokenAddress as Address);

  console.log("tokenMetadata", tokenMetadata);

  const token: TokenDetails = {
    creator: "",
    tokenAddress,
    greenCurveAddress: "",
    latitude: 0,
    longitude: 0,
    imageHash: "",
    name: results[0].result || "",
    symbol: results[1].result || "",
    description: "",
    marketCap: "",
  };

  // await 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return token;
};
