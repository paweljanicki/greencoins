import { Address, PublicClient } from "viem";
import { GreenCurve } from "../abi/GreenCurve";
import { DECIMALS } from "../shared/consts";

export const getPurchaseAmount = async ({
  greenCurveAddress,
  ethIn,
  client,
}: {
  greenCurveAddress: Address;
  ethIn: number;
  client: PublicClient;
}): Promise<string> => {
  const withDecimals = ethIn * 10 ** DECIMALS;
  const response = await client.readContract({
    address: greenCurveAddress,
    abi: GreenCurve,
    functionName: "calculatePurchaseTokenOut",
    args: [BigInt(withDecimals)],
  });

  console.log("response", response);

  const amount = response[0].toString();

  return amount;
};
