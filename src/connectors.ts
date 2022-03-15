import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
};

// MetaMask
export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const activateInjectedProvider = (providerName: "MetaMask" | "CoinBase") => {
  const { ethereum } = window as any;

  if (!ethereum?.providers) {
    return undefined;
  }

  let provider;
  switch (providerName) {
    case "CoinBase":
      provider = ethereum.providers.find(
        ({ isCoinbaseWallet }: any) => isCoinbaseWallet
      );
      break;
    case "MetaMask":
      provider = ethereum.providers.find(({ isMetaMask }: any) => isMetaMask);
      break;
  }

  if (provider) {
    ethereum.setSelectedProvider(provider);
  }
};

activateInjectedProvider("MetaMask");

// wallet connect
const WalletConnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

// Coinbase
const CoinbaseWallet = new WalletLinkConnector({
  url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "My dApp 😎",
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const connectors = {
  metamask: Injected,
  walletConnect: WalletConnect,
  coinbaseWallet: CoinbaseWallet,
};
