import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [sepolia],
    walletConnectProjectId: import.meta.env.VITE_WC_PROJECT_ID ?? "",
    appName: "RegenAtlas.fun",
    transports: {
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY_SEPOLIA}`
      ),
    },
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
