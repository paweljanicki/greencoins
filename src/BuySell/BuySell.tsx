import { useState } from "react";
import { TokenDetails } from "../shared/types";
import clsx from "clsx";
import BuyToken from "./BuyToken";
import { PublicClient } from "viem";
import SellToken from "./SellToken";

interface BuySellProps {
  tokenDetails: TokenDetails;
  client: PublicClient;
}

export default ({ tokenDetails, client }: BuySellProps): JSX.Element => {
  const [mode, setMode] = useState<"buy" | "sell">("buy");

  return (
    <div className="p-4 rounded-xl border-2 border-neutral-content">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          className={clsx(
            "btn btn-neutral border-2 border-neutral-content",
            mode === "buy" && "!btn-secondary !border-secondary"
          )}
          onClick={() => setMode("buy")}
        >
          BUY
        </button>
        <button
          className={clsx(
            "btn btn-neutral border-2 border-neutral-content",
            mode === "sell" && "!btn-secondary !border-secondary"
          )}
          onClick={() => setMode("sell")}
        >
          SELL
        </button>
      </div>

      {mode === "buy" && (
        <BuyToken tokenDetails={tokenDetails} client={client} />
      )}

      {mode === "sell" && (
        <SellToken tokenDetails={tokenDetails} client={client} />
      )}
    </div>
  );
};
