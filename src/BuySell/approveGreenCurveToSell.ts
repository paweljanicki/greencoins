import { Address } from "viem";
import { simulateContract, writeContract } from "@wagmi/core";
import { config } from "../wagmi";
import { GreenERC20 } from "../abi/GreenERC20";

export const approveGreenCurveToSell = async ({
  amount,
  greenCurveAddress,
  tokenAddress,
}: {
  amount: bigint;
  greenCurveAddress: string;
  tokenAddress: string;
}) => {
  const { request } = await simulateContract(config, {
    abi: GreenERC20,
    address: tokenAddress as Address,
    functionName: "approve",
    args: [greenCurveAddress as Address, amount],
  });
  const hash = await writeContract(config, request);
  return "Approved " + hash;
};
