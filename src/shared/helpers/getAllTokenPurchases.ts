import { PublicClient, Address } from "viem";
import { GreenCurve } from "../../abi/GreenCurve";
import { BuyEvent, SellEvent, TokenPurchases } from "../types";

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

  const sellEventsResponse = await client.getContractEvents({
    address: greenCurveAddress,
    abi: GreenCurve,
    eventName: "TokenSell",
    fromBlock: 0n,
  });

  const sellEvents: SellEvent[] = sellEventsResponse.map((event) => ({
    type: "sell",
    address: event.address as Address,
    args: {
      seller: event.args.seller as Address,
      tokenIn: event.args.tokenIn as bigint,
      ethOut: event.args.ethOut as bigint,
      fee: event.args.fee as bigint,
    },
    transactionHash: event.transactionHash,
    blockNumber: event.blockNumber,
  }));

  // sort by block number
  const allEvents = [...buyEvents, ...sellEvents].sort(
    (a, b) => Number(a.blockNumber) - Number(b.blockNumber)
  );

  return allEvents;
};
