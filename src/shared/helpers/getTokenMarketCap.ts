import { Address, PublicClient } from "viem";
import { GreenCurve } from "../../abi/GreenCurve";
import { DECIMALS, MARKET_CAP_DECIMALS } from "../consts";
import { formatBigInt } from "./formatBigInt";

export const getTokenMarketCap = async (
  client: PublicClient,
  greenCurveAddress: Address
): Promise<string> => {
  let marketCap;
  try {
    marketCap = await client.readContract({
      address: greenCurveAddress,
      abi: GreenCurve,
      functionName: "marketCap",
    });
  } catch (e) {
    console.log("marketCap err", e);
    throw new Error("Failed to fetch token market cap");
  }

  return formatBigInt(marketCap, DECIMALS, MARKET_CAP_DECIMALS);
};
