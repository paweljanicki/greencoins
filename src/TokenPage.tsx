import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TokensStateContext } from "./context/tokensContext";
import Header from "./Header";
import { getTokenDetails } from "./shared/helpers/getToken";

export default () => {
  const { tokenAddress = "" } = useParams<{ tokenAddress: string }>();
  const { state } = useContext(TokensStateContext);
  const [fetchedToken, setFetchedToken] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

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

  token = token || fetchedToken;

  if (!token) return <div>Token not found</div>;

  return (
    <div className="pt-[82px] p-4 bg-neutral text-neutral-content min-h-svh">
      <Header showCreate={false} />
      <div className="">TokenPage: {tokenAddress}</div>
      <h1>{token.name}</h1>
    </div>
  );
};
