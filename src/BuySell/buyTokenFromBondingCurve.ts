import { Address } from "viem";
import { simulateContract, writeContract } from "@wagmi/core";
import { config } from "../wagmi";
import { GreenCurve } from "../abi/GreenCurve";

export const buyToken = async ({
  greenCurveAddress,
  ethIn,
  tokenDecimals,
}: {
  greenCurveAddress: Address;
  ethIn: number;
  tokenDecimals: number;
}) => {
  const { request } = await simulateContract(config, {
    abi: GreenCurve,
    address: greenCurveAddress,
    functionName: "buyTokens",
    value: BigInt(ethIn * 10 ** tokenDecimals),
  });
  const hash = await writeContract(config, request);
  return "buyToken" + hash;
};
