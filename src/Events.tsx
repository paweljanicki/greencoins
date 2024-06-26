import { useEffect, useState } from "react";
import { getAllTokens } from "./shared/helpers/getAllTokens";

export default (): JSX.Element => {
  const [allTokens, setAllTokens] = useState<any[]>([]);

  const loadTokens = async () => {
    const data = await getAllTokens();
    setAllTokens(data);
  };

  useEffect(() => {
    loadTokens();
  }, []);

  return (
    <>
      {allTokens.map((token, index) => {
        return (
          <div className="p-4" key={token.tokenAddress}>
            <div>Token Address: {token.tokenAddress}</div>
            <div>Green Curve Address: {token.greenCurveAddress}</div>
            <div>Creator: {token.creator}</div>
            <div>Metadata: {JSON.stringify(token.metadata)}</div>
          </div>
        );
      })}
    </>
  );
};
