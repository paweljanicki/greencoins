import { useEffect, useState } from "react";
import { TokenDetails } from "../shared/types";
import { Address, PublicClient } from "viem";
import { formatBigInt } from "../shared/helpers/formatBigInt";
import { DECIMALS } from "../shared/consts";
import { getSellAmount } from "./getSellAmount";
import { getIpfsLink } from "../shared/helpers/getIpfsLink";
import { sellToken } from "./sellTokenToBondingCurve";
import { ReadableTx } from "../shared/components/ReadableTx";

interface SellTokenProps {
  tokenDetails: TokenDetails;
  client: PublicClient;
}

export default ({ tokenDetails, client }: SellTokenProps): JSX.Element => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [purchaseAmount, setPurchaseAmount] = useState<string>("0");
  const [transactionHash, setTransactionHash] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const load = async () => {
      if (!amount || amount <= 0) {
        setPurchaseAmount("0");
        return;
      }
      const response = await getSellAmount({
        greenCurveAddress: tokenDetails.greenCurveAddress as Address,
        tokenIn: amount,
        client,
      });

      setPurchaseAmount(
        formatBigInt(BigInt(response), tokenDetails.decimals || DECIMALS, 4)
      );
    };

    load();
  }, [amount]);

  const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    console.log(amount);
    setAmount(parseFloat(amount));
  };

  const placeTrade = async () => {
    if (!amount || amount <= 0) {
      return;
    }

    const hash = await sellToken({
      greenCurveAddress: tokenDetails.greenCurveAddress as Address,
      tokenIn: amount,
      tokenDecimals: tokenDetails.decimals || DECIMALS,
      tokenAddress: tokenDetails.tokenAddress as Address,
    });

    setAmount(undefined);
    setPurchaseAmount("0");
    setTransactionHash(hash);
  };

  if (transactionHash) {
    return (
      <div>
        <p>Transaction Hash: </p>
        <ReadableTx tx={transactionHash} />
      </div>
    );
  }

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2 text-neutral">
        <input
          className="pl-0 min-w-[140px] flex-1 input input-bordered plain-number-input border-0"
          type="number"
          value={amount}
          min={1}
          step={1000}
          placeholder="Enter amount"
          onChange={updatePrice}
        />
        <div className="flex items-center gap-2 font-bold">
          {tokenDetails.symbol}
          <img
            className="w-10 h-10 rounded-full"
            src={getIpfsLink(tokenDetails.imageHash)}
          />
        </div>
      </label>
      <p>You will get: {purchaseAmount} ETH</p>

      <button onClick={placeTrade} className="btn btn-info w-full mt-4">
        Place Trade
      </button>
    </div>
  );
};
