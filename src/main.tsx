import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { http,WagmiProvider } from "wagmi";
import { bsc,bscTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  bitgetWallet,
  metaMaskWallet,
  okxWallet,
  injectedWallet,
  // coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { StoreProvider } from "./StoreProvider";
import "./index.css"
import 'swiper/css';
import "@rainbow-me/rainbowkit/styles.css";
import App from "./App.tsx";

// coinbaseWallet.preference = "smartWalletOnly";

const config = getDefaultConfig({
  chains: [bsc,bscTestnet],
  appName: "AUC",
  wallets: [
    {
      groupName: "Recommended",
      wallets: [
        bitgetWallet,
        metaMaskWallet,
        okxWallet,
        // coinbaseWallet,
        injectedWallet,
      ],
    },
  ],
  projectId: "YOUR_PROJECT_ID",
  transports: {
    [bsc.id]: http('https://bsc-dataseed.bnbchain.org'),
    [bscTestnet.id]: http('https://bsc-testnet-dataseed.bnbchain.org'),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </StoreProvider>
  </StrictMode>
);
