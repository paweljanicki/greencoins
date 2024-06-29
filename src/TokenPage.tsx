import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TokensStateContext } from "./context/tokensContext";
import Header from "./Header";
import { getTokenDetails } from "./shared/helpers/getToken";
import { getIpfsLink } from "./shared/helpers/getIpfsLink";
import TokenStats from "./TokenStats";
import { getPublicViemClient } from "./shared/helpers/getPublicViemClient";
import BuySell from "./BuySell/BuySell";
import { ReadableAddress } from "./shared/components/ReadableAddress";
import { TokenTransactions } from "./TokenTransactions";

export default () => {
  const { tokenAddress = "" } = useParams<{ tokenAddress: string }>();
  const { state } = useContext(TokensStateContext);
  const [fetchedToken, setFetchedToken] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const client = getPublicViemClient();

  let token = state?.tokens.find(
    (token) => token.tokenAddress === tokenAddress
  );

  useEffect(() => {
    const fetchToken = async () => {
      if (!token) {
        setLoading(true);
      }
      setError(null);
      try {
        const response = await getTokenDetails(tokenAddress);
        setFetchedToken(response);
      } catch (err) {
        setError("Failed to fetch token");
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [token, tokenAddress]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  token = {
    ...fetchedToken,
    decimals: fetchedToken?.decimals || token?.decimals,
    creator: token?.creator || fetchedToken?.creator,
  };

  if (!token) return <div>Token not found</div>;

  return (
    <div className="pt-[82px] p-4 bg-neutral text-neutral-content min-h-svh">
      <Header showCreate={false} />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="p-4 rounded-xl border-2 border-neutral-content">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-secondary">
                {token.name}
              </h1>
              <p className="mb-4">
                Ticker: {token.symbol} (
                <ReadableAddress address={tokenAddress} />)
              </p>
              <p>{token.description}</p>
            </div>
            <div className="grid md:grid-cols-[400px_1fr] gap-4">
              <div>
                <img
                  src={getIpfsLink(token.imageHash)}
                  className="w-full md:w-[400px] md:h-[400px]"
                  alt="Token"
                />
              </div>
              <div>
                <TokenStats tokenDetails={token} client={client} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <TokenTransactions tokenDetails={token} client={client} />
          </div>
        </div>
        <div className="max-w-[500px]">
          <BuySell tokenDetails={token} client={client} />
        </div>
      </div>
    </div>
  );
};
