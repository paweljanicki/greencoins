import { PublicClient, Address } from "viem";
import { GreenCurve } from "../../abi/GreenCurve";
import { BuyEvent, TokenPurchases } from "../types";

export const getAllTokenPurchases = async (
  client: PublicClient,
  greenCurveAddress: Address
): Promise<TokenPurchases> => {
  const buyEventsResponse = await client.getContractEvents({
    address: greenCurveAddress,
    abi: GreenCurve,
    eventName: "TokenBuy",
    fromBlock: 0n,
  });

  const buyEvents: BuyEvent[] = buyEventsResponse.map((event) => ({
    type: "buy",
    address: event.address as Address,
    args: {
      buyer: event.args.buyer as Address,
      ethIn: event.args.ethIn as bigint,
      fee: event.args.fee as bigint,
      tokenOut: event.args.tokenOut as bigint,
    },
    transactionHash: event.transactionHash,
    blockNumber: event.blockNumber,
  }));

  return [...buyEvents];
};
