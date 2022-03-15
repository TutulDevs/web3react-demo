import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ethers } from "ethers";
import { ToastProvider } from "react-toast-notifications";
import { Web3ReactProvider } from "@web3-react/core";

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
        <Component {...pageProps} />
      </ToastProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
