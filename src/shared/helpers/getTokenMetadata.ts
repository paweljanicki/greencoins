import { PublicClient, Address } from "viem";
import { GreenERC20 } from "../../abi/GreenERC20";
import { getIpfsLink } from "./getIpfsLink";
import { TokenMetadata } from "../types";

export const getTokenMetadata = async (
  client: PublicClient,
  tokenAddress: Address
): Promise<TokenMetadata> => {
  const hash = await client.readContract({
    address: tokenAddress,
    abi: GreenERC20,
    functionName: "metadataURI",
  });

  let response;
  try {
    response = await fetch(getIpfsLink(hash));
  } catch {
    throw new Error(`Failed to fetch metadata from IPFS: ${hash}`);
  }

  return await response.json();
};
