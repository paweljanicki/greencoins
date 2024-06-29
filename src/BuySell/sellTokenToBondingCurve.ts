import { Address } from "viem";
import { simulateContract, writeContract } from "@wagmi/core";
import { config } from "../wagmi";
import { GreenCurve } from "../abi/GreenCurve";
import { approveGreenCurveToSell } from "./approveGreenCurveToSell";
import { DECIMALS } from "../shared/consts";

export const sellToken = async ({
  greenCurveAddress,
  tokenAddress,
  tokenIn,
  tokenDecimals,
}: {
  greenCurveAddress: Address;
  tokenAddress: Address;
  tokenIn: number;
  tokenDecimals: number;
}) => {
  const amountWithDecimals =
    BigInt(tokenIn) * BigInt(10 ** (tokenDecimals || DECIMALS));

  await approveGreenCurveToSell({
    amount: amountWithDecimals,
    greenCurveAddress: greenCurveAddress,
    tokenAddress: tokenAddress,
  });

  console.log("Approved");

  const { request } = await simulateContract(config, {
    abi: GreenCurve,
    address: greenCurveAddress,
    functionName: "sellTokens",
    args: [amountWithDecimals],
  });
  const hash = await writeContract(config, request);
  return "sellToken" + hash;
};
