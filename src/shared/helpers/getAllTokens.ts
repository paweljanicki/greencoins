import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { greenLaunchpad } from "../../abi/GreenLaunchpad";
import { GreenERC20 } from "../../abi/GreenERC20";
import { getIpfsLink } from "./getIpfsLink";
import { Token } from "../types";

export const getAllTokens = async (): Promise<Token[]> => {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(
      `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY_SEPOLIA}`
    ),
  });

  const getTokenDeployedEvents = async (): Promise<Array<any>> => {
    const tokenDeployedEvents = await client.getContractEvents({
      address: import.meta.env.VITE_GREEN_LAUNCHPAD_CONTRACT,
      abi: greenLaunchpad,
      eventName: "TokenDeployed",
      fromBlock: 0n,
    });

    console.log("tokenDeployedEvents", tokenDeployedEvents);

    return tokenDeployedEvents;
  };

  const getDeployedTokens = async () => {
    const events = await getTokenDeployedEvents();

    const tokens = [];
    for (const event of events) {
      let metadata;
      try {
        metadata = await getTokenMetadataHash(event.args.tokenAddress);
      } catch {
        metadata = null;
      }

      let name;
      let ticker;
      if (metadata) {
        name = await client.readContract({
          address: event.args.tokenAddress,
          abi: GreenERC20,
          functionName: "name",
        });

        ticker = await client.readContract({
          address: event.args.tokenAddress,
          abi: GreenERC20,
          functionName: "symbol",
        });
      }

      const token = {
        ...event.args,
        metadata: metadata
          ? {
              ...metadata,
              name,
              ticker,
            }
          : null,
      };

      tokens.push(token);
    }

    const filteredTokens = tokens.filter((token) => token.metadata !== null);

    return filteredTokens;
  };

  const getTokenMetadataHash = async (tokenAddress: Address) => {
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

  return await getDeployedTokens();
};
