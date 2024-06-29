import { useState, useEffect } from "react";
import { Address, PublicClient } from "viem";
import { getTokenPriceInEth } from "./shared/helpers/getTokenPriceInEth";
import { TokenDetails, TokenPurchases } from "./shared/types";
import { DECIMALS } from "./shared/consts";
import { getAllTokenPurchases } from "./shared/helpers/getAllTokenPurchases";
import { formatBigInt } from "./shared/helpers/formatBigInt";
import { ReadableAddress } from "./shared/components/ReadableAddress";

interface TokenStatsProps {
  client: PublicClient;
  tokenDetails: TokenDetails;
}

export default ({ client, tokenDetails }: TokenStatsProps) => {
  const [priceInEth, setPriceInEth] = useState<string>("");
  const [purchases, setPurchases] = useState<TokenPurchases>({
    buy: [],
    sell: [],
  });
  useEffect(() => {
    if (!tokenDetails.greenCurveAddress) return;

    fetchPrice();
    fetchPurchases();
  }, [tokenDetails]);

  const fetchPrice = async () => {
    const price = await getTokenPriceInEth(
      client,
      tokenDetails.greenCurveAddress as Address,
      tokenDetails.decimals || DECIMALS
    );

    setPriceInEth(price);
  };

  const fetchPurchases = async () => {
    if (!tokenDetails.greenCurveAddress) return;

    const data = await getAllTokenPurchases(
      client,
      tokenDetails.greenCurveAddress as Address
    );

    setPurchases(data);
  };

  return (
    <div className="grid gap-2">
      <div>Price in ETH: {priceInEth}</div>
      {tokenDetails.totalSupply && (
        <div>
          Total supply:{" "}
          {formatBigInt(
            BigInt(tokenDetails.totalSupply),
            tokenDetails.decimals || DECIMALS,
            0
          )}
        </div>
      )}
      <p>
        <span>Market Cap: </span>
        <span>
          {tokenDetails.marketCap ? `$${tokenDetails.marketCap}` : "N/A"} USD
        </span>
      </p>
      <p>
        Decimals: {tokenDetails.decimals ? `${tokenDetails.decimals}` : "N/A"}
      </p>
      <p>
        Creator:{" "}
        {tokenDetails.creator ? (
          <ReadableAddress address={tokenDetails.creator} />
        ) : (
          "N/A"
        )}
      </p>
    </div>
  );
};
