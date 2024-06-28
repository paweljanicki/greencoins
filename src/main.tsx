import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import TokenPage from "./TokenPage.tsx";
import { TokensStateProvider } from "./context/tokensContext.tsx";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "token/:tokenAddress",
    element: <TokenPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="retro">
          <TokensStateProvider>
            <RouterProvider router={router} />
          </TokensStateProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
