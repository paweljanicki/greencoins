import { Address } from "viem";
import { simulateContract, writeContract } from "@wagmi/core";
import { config } from "../wagmi";
import { GreenCurve } from "../abi/GreenCurve";

export const sellToken = async ({
  greenCurveAddress,
  tokenIn,
  tokenDecimals,
}: {
  greenCurveAddress: Address;
  tokenIn: number;
  tokenDecimals: number;
}) => {
  console.log("sellToken", greenCurveAddress, tokenIn, tokenDecimals);
  const { request } = await simulateContract(config, {
    abi: GreenCurve,
    address: greenCurveAddress,
    functionName: "sellTokens",
    args: [BigInt(tokenIn * 10 ** tokenDecimals)],
  });
  const hash = await writeContract(config, request);
  return "sellToken" + hash;
};
