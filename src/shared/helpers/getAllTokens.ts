import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { greenLaunchpad } from "../../abi/GreenLaunchpad";
import { GreenERC20 } from "../../abi/GreenERC20";
import { TokenDeployedEvent, TokenDetails, TokenMetadata } from "../types";
import { GreenCurve } from "../../abi/GreenCurve";
import { formatBigInt } from "./formatBigInt";
import { DECIMALS, MARKET_CAP_DECIMALS } from "../consts";
import { getTokenMetadata } from "./getTokenMetadata";

export const getAllTokens = async (): Promise<TokenDetails[]> => {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(
      `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY_SEPOLIA}`
    ),
  });

  const getTokenDeployedEvents = async (): Promise<
    Array<{
      args: TokenDeployedEvent;
    }>
  > => {
    const tokenDeployedEvents = await client.getContractEvents({
      address: import.meta.env.VITE_GREEN_LAUNCHPAD_CONTRACT,
      abi: greenLaunchpad,
      eventName: "TokenDeployed",
      fromBlock: 0n,
    });

    console.log("tokenDeployedEvents", tokenDeployedEvents);

    return tokenDeployedEvents as Array<{
      args: TokenDeployedEvent;
    }>;
  };

  const getDeployedTokens = async () => {
    const events = await getTokenDeployedEvents();

    const tokens = [];
    for (const event of events) {
      let metadata: TokenMetadata | null;
      try {
        metadata = await getTokenMetadata(client, event.args.tokenAddress);
      } catch {
        metadata = null;
      }

      let token: TokenDetails;

      if (metadata) {
        let name: string;
        let symbol: string;
        let marketCap: string;

        name = await client.readContract({
          address: event.args.tokenAddress,
          abi: GreenERC20,
          functionName: "name",
        });

        symbol = await client.readContract({
          address: event.args.tokenAddress,
          abi: GreenERC20,
          functionName: "symbol",
        });

        marketCap = await getTokenMarketCap(event.args.greenCurveAddress);

        token = {
          creator: event.args.creator,
          tokenAddress: event.args.tokenAddress,
          greenCurveAddress: event.args.greenCurveAddress,
          latitude: metadata?.latitude || 0,
          longitude: metadata?.longitude || 0,
          imageHash: metadata?.imageHash || "",
          name,
          symbol,
          description: metadata?.description || "",
          marketCap,
        };
        tokens.push(token);
      }
    }

    const filteredTokens = removeTokensWithBrokenMetadata(tokens);

    return filteredTokens;
  };

  const getTokenMarketCap = async (
    greenCurveAddress: Address
  ): Promise<string> => {
    const marketCap = await client.readContract({
      address: greenCurveAddress,
      abi: GreenCurve,
      functionName: "marketCap",
    });

    return formatBigInt(marketCap, DECIMALS, MARKET_CAP_DECIMALS);
  };

  const removeTokensWithBrokenMetadata = async (tokens: TokenDetails[]) => {
    const filteredTokens = tokens.filter((token) => {
      let isValid = true;

      if (
        !token.name ||
        !token.symbol ||
        !token.imageHash ||
        (token.latitude !== 0 && !token.latitude) ||
        (token.longitude !== 0 && !token.longitude)
      ) {
        isValid = false;
      }

      return isValid;
    });

    return filteredTokens;
  };

  return await getDeployedTokens();
};
