import { Address } from "viem";
import { getPublicViemClient } from "./getPublicViemClient";
import { GreenCurve } from "../../abi/GreenCurve";
import { getTokenMarketCap } from "./getTokenMarketCap";

export const watchTokenMarketCap = async ({
  greenCurveAddress,
  onMarketCapUpdate,
}: {
  greenCurveAddress: string;
  onMarketCapUpdate: (marketCap: string, greenCurveAddress: string) => void;
}) => {
  const client = getPublicViemClient();

  const handleLogs = async (logs: any) => {
    console.log(logs);
    const marketCap = await getTokenMarketCap(
      client,
      greenCurveAddress as Address
    );
    onMarketCapUpdate(marketCap, greenCurveAddress); // Pass the marketCap to the callback
  };

  const unwatch = client.watchContractEvent({
    address: greenCurveAddress as Address,
    abi: GreenCurve,
    onLogs: (logs) => {
      handleLogs(logs);
    },
  });

  return unwatch;
};
