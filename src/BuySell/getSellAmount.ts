import { Address, PublicClient } from "viem";
import { GreenCurve } from "../abi/GreenCurve";
import { DECIMALS } from "../shared/consts";

export const getSellAmount = async ({
  greenCurveAddress,
  tokenIn,
  client,
}: {
  greenCurveAddress: Address;
  tokenIn: number;
  client: PublicClient;
}): Promise<string> => {
  const withDecimals = BigInt(tokenIn) * BigInt(10 ** DECIMALS);

  const response = await client.readContract({
    address: greenCurveAddress,
    abi: GreenCurve,
    functionName: "calculateSaleTokenOut",
    args: [withDecimals],
  });

  console.log("getSellAmount", response);

  return response[0].toString();
};
