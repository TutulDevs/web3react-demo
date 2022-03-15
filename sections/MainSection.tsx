import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { accountDataType } from "../src/types";
import connectors from "../src/connectors";
import { useToasts } from "react-toast-notifications";
import { useWeb3React } from "@web3-react/core";

interface MainSectionType {
  setAccountData: Dispatch<SetStateAction<accountDataType | null>>;
}

const MainSection = ({ setAccountData }: MainSectionType) => {
  const { addToast } = useToasts();
  const { library, chainId, account, activate, deactivate, active, error } =
    useWeb3React();

  const connectMetaMask = useCallback(async () => {
    let status = false;
    await activate(connectors.metamask, (err: any) => {
      addToast(err.message, { appearance: "error" });
      status = true;
    });

    if (!status) {
      localStorage.setItem("walletIsConnectedTo", "metamask");
      addToast("Connected to MetaMask", { appearance: "success" });
    }
  }, [activate, addToast]);

  const connectCoinbase = useCallback(async () => {
    let status = false;
    await activate(connectors.coinbaseWallet, (err: any) => {
      addToast(err.message, { appearance: "error" });
      status = true;
    });

    if (!status) {
      localStorage.setItem("walletIsConnectedTo", "coinbase");
      addToast("Connected to Coinbase", { appearance: "success" });
    }
  }, [activate, addToast]);

  const connectWalletConnect = useCallback(async () => {
    let status = false;
    await activate(connectors.walletConnect, (err: any) => {
      addToast(err.message, { appearance: "error" });
      status = true;
    });

    if (!status) {
      localStorage.setItem("walletIsConnectedTo", "walletConnect");
      addToast("Connected to Wallet Connect", { appearance: "success" });
    }
  }, [activate, addToast]);

  const disConnect = async () => {
    deactivate();

    localStorage.removeItem("walletIsConnectedTo");

    setAccountData(null);
  };

  // connect on load
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage.getItem("walletIsConnectedTo") === "metamask") {
        await connectMetaMask();
      }

      if (localStorage.getItem("walletIsConnectedTo") === "coinbase") {
        await connectCoinbase();
      }

      if (localStorage.getItem("walletIsConnectedTo") === "walletConnect") {
        await connectWalletConnect();
      }
    };

    connectWalletOnPageLoad();
  }, [connectMetaMask, connectCoinbase, connectWalletConnect]);

  const walletsToDisplay = [
    { id: 1, title: "MetaMask", imgSrc: "", fn: connectMetaMask },
    { id: 2, title: "Coinbase", imgSrc: "", fn: connectCoinbase },
    { id: 3, title: "WalletConnect", imgSrc: "", fn: connectWalletConnect },
  ];

  //get account data
  useEffect(() => {
    if (active) {
      const checkMetaMaskConnected = async () => {
        const accounts = await library.listAccounts();

        const walletAddress = accounts[0];
        const hexBalance = await library.getBalance(walletAddress);
        const balance = ethers.utils.formatEther(hexBalance);
        const network = await library.getNetwork();
        const transactionCount = await library.getTransactionCount(
          walletAddress
        );
        setAccountData({
          accounts,
          walletAddress,
          balance,
          transactionCount,
          network,
        });
      };

      checkMetaMaskConnected();
    }
  }, [setAccountData, active, library]);

  return (
    <main className="flex-1 container mx-auto p-4 ">
      <div className="flex justify-evenly p-4 rounded-lg border">
        {walletsToDisplay.map((el) => (
          <button
            key={el.id}
            onClick={el.fn}
            className="px-4 py-2 rounded-full ring-2 ring-green-300"
          >
            {el.title}
          </button>
        ))}
      </div>
    </main>
  );
};

export default MainSection;
