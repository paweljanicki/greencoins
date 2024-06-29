import { Address, PublicClient } from "viem";
import { GreenCurve } from "../../abi/GreenCurve";
import { formatBigInt } from "./formatBigInt";

export const getTokenPriceInEth = async (
  client: PublicClient,
  greenCurveAddress: Address,
  decimals: number
): Promise<string> => {
  let result;
  console.log("greenCurveAddress", greenCurveAddress);
  try {
    result = await client.readContract({
      address: greenCurveAddress,
      abi: GreenCurve,
      functionName: "getTokenPriceinETH",
    });
  } catch (e) {
    console.log("err", e);
    throw new Error("Failed to fetch token price");
  }

  console.log("result", result);

  return formatBigInt(result, decimals, 4);
};
