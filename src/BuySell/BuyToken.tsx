import { useEffect, useState } from "react";
import { TokenDetails } from "../shared/types";
import { getPurchaseAmount } from "./getPurchaseAmount";
import { Address, PublicClient } from "viem";
import { formatBigInt } from "../shared/helpers/formatBigInt";
import { DECIMALS } from "../shared/consts";
import EthLogo from "./ethLogo";
import { buyToken } from "./buyTokenFromBondingCurve";

interface BuyTokenProps {
  tokenDetails: TokenDetails;
  client: PublicClient;
}

export default ({ tokenDetails, client }: BuyTokenProps): JSX.Element => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [purchaseAmount, setPurchaseAmount] = useState<string>("0");

  useEffect(() => {
    const load = async () => {
      if (!amount || amount <= 0) {
        setPurchaseAmount("0");
        return;
      }
      const response = await getPurchaseAmount({
        greenCurveAddress: tokenDetails.greenCurveAddress as Address,
        ethIn: amount,
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

    buyToken({
      greenCurveAddress: tokenDetails.greenCurveAddress as Address,
      ethIn: amount,
      tokenDecimals: tokenDetails.decimals || DECIMALS,
    });
  };

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2 text-neutral">
        <input
          className="pl-0 min-w-[140px] flex-1 input input-bordered text-neutral plain-number-input border-0"
          type="number"
          value={amount}
          step={0.001}
          placeholder="Enter amount"
          onChange={updatePrice}
        />
        <div className="flex items-center gap-2 font-bold">
          ETH
          <EthLogo />
        </div>
      </label>
      <p>
        You will get: {purchaseAmount} {tokenDetails.symbol}
      </p>

      <button onClick={placeTrade} className="btn btn-info w-full mt-4">
        Place Trade
      </button>
    </div>
  );
};
