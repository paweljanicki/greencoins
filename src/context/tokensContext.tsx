import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import { TokenDetails } from "../shared/types";

interface State {
  tokens: TokenDetails[];
  loading: boolean;
}

type Action =
  | { type: "SET_TOKENS"; payload: Array<TokenDetails> }
  | { type: "SET_LOADING"; payload: boolean }
  | {
      type: "UPDATE_MARKET_CAP";
      payload: {
        greenCurveAddress: string;
        marketCap: string;
      };
    };

const initialState: State = {
  tokens: [],
  loading: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TOKENS":
      return { ...state, tokens: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "UPDATE_MARKET_CAP":
      return {
        ...state,
        tokens: state.tokens.map((token) =>
          token.greenCurveAddress === action.payload.greenCurveAddress
            ? { ...token, marketCap: action.payload.marketCap }
            : token
        ),
      };
    default:
      throw new Error("Unknown action type");
  }
};

// Create context
const TokensStateContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

// Create a provider component
const TokensStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TokensStateContext.Provider value={{ state, dispatch }}>
      {children}
    </TokensStateContext.Provider>
  );
};

export { TokensStateProvider, TokensStateContext };
