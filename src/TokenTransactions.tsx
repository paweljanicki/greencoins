import { useState, useEffect } from "react";
import { Address, PublicClient } from "viem";
import { getAllTokenPurchases } from "./shared/helpers/getAllTokenPurchases";
import { TokenDetails, TokenPurchases } from "./shared/types";
import { ReadableAddress } from "./shared/components/ReadableAddress";
import { formatBigInt } from "./shared/helpers/formatBigInt";
import { DECIMALS } from "./shared/consts";
import { ReadableTx } from "./shared/components/ReadableTx";

interface TokenTransactionsProps {
  tokenDetails: TokenDetails;
  client: PublicClient;
}

export const TokenTransactions = ({
  tokenDetails,
  client,
}: TokenTransactionsProps) => {
  const [purchases, setPurchases] = useState<TokenPurchases>([]);
  useEffect(() => {
    if (!tokenDetails.greenCurveAddress) return;

    fetchPurchases();
  }, [tokenDetails]);

  const fetchPurchases = async () => {
    if (!tokenDetails.greenCurveAddress) return;

    const data = await getAllTokenPurchases(
      client,
      tokenDetails.greenCurveAddress as Address
    );

    setPurchases(data);
  };

  return (
    <div className="p-4 rounded-xl border-2 border-neutral-content">
      <h3>Transactions:</h3>
      {purchases.map((purchase) => (
        <div key={purchase.transactionHash}>
          {purchase.type === "buy" ? (
            <div className="bg-neutral-600 rounded-md p-2 mb-2">
              <div className="flex justify-between">
                <p>
                  <span className="text-success">ETH In: </span>

                  {formatBigInt(
                    purchase.args.ethIn,
                    tokenDetails.decimals || DECIMALS,
                    2
                  )}
                </p>
                <p>
                  <span className="text-success">Token Out: </span>
                  {formatBigInt(
                    purchase.args.tokenOut,
                    tokenDetails.decimals || DECIMALS,
                    2
                  )}
                </p>
              </div>
              <div className="flex mt-4">
                <span className="mr-4">
                  <span>Buyer: </span>
                  <ReadableAddress address={purchase.args.buyer} />
                </span>
                <span>
                  <span>Transaction: </span>
                  <ReadableTx tx={purchase.transactionHash} />
                </span>
                <span className="ml-auto">
                  <span>Green Fee: </span>
                  {formatBigInt(
                    purchase.args.fee,
                    tokenDetails.decimals || DECIMALS,
                    2
                  )}{" "}
                  ETH
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-600 rounded-md p-2 mb-2">
              <div className="flex justify-between">
                <p>
                  <span className="text-accent">Token In: </span>

                  {formatBigInt(
                    purchase.args.tokenIn,
                    tokenDetails.decimals || DECIMALS,
                    2
                  )}
                </p>
                <p>
                  <span className="text-accent">ETH Out: </span>
                  {formatBigInt(
                    purchase.args.ethOut,
                    tokenDetails.decimals || DECIMALS,
                    2
                  )}
                </p>
              </div>
              <div className="flex mt-4">
                <span className="mr-4">
                  <span>Seller: </span>
                  <ReadableAddress address={purchase.args.seller} />
                </span>
                <span>
                  <span>Transaction: </span>
                  <ReadableTx tx={purchase.transactionHash} />
                </span>
                <span className="ml-auto">
                  <span>Green Fee: </span>
                  {formatBigInt(
                    purchase.args.fee,
                    tokenDetails.decimals || DECIMALS,
                    2
                  )}{" "}
                  {tokenDetails.symbol}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
