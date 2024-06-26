import { useState, useEffect } from "react";
import { getAllTokens } from "../helpers/getAllTokens";

export const useTokens = () => {
  const [allTokens, setAllTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTokens = async () => {
    try {
      setLoading(true);
      const data = await getAllTokens();
      setAllTokens(data);
    } catch (err: any) {
      setError(err?.message || "Error loading tokens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  return { allTokens, loadingTokens: loading, loadingTokensError: error };
};
