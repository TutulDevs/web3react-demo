import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { connectors } from "../src/connectors";

const W3RSection = () => {
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();
  const [accountData, setAccountData] = useState<any>(null);
  const [transactionHash, setTransactionHash] = useState<any>();
  const [disabledButton, setDisabledButton] = useState(true);

  // refs
  const senderRef = useRef<any>();
  const receiverRef = useRef<any>();
  const amountRef = useRef<any>();

  const connectMetaMask = async () => {
    try {
      await activate(connectors.metamask);
      localStorage.setItem("isConnected", "true");
    } catch (err) {
      console.log(err);
    }
  };

  const connectCoinbase = async () => {
    try {
      await activate(connectors.coinbaseWallet);
      localStorage.setItem("isConnectedToCoinbase", "true");
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletConnect = async () => {
    try {
      await activate(connectors.walletConnect);
      // localStorage.setItem("isConnectedToWalletConnect", "true");
    } catch (err) {
      console.log(err);
    }
  };

  const disConnect = async () => {
    try {
      deactivate();

      localStorage.removeItem("isConnectedToCoinbase");
      localStorage.removeItem("isConnected");

      setDisabledButton(false);
    } catch (err) {
      console.log(err);
    }
  };

  // connect on load and get account data
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      try {
        if (localStorage.getItem("isConnected") === "true") {
          await activate(connectors.metamask);
          localStorage.setItem("isConnected", "true");
        }

        if (localStorage.getItem("isConnectedToCoinbase") === "true") {
          await activate(connectors.coinbaseWallet);
          localStorage.setItem("isConnectedToCoinbase", "true");
        }

        setDisabledButton(false);
      } catch (err) {
        console.log(err);
        setDisabledButton(false);
      }
    };

    connectWalletOnPageLoad();

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
  }, [activate, active, library]);

  const handleSignMessage = async () => {
    const signer = library.getSigner();

    try {
      const res = await signer.signMessage("Welcome to my Ethereum dApp");
      console.log("signMessage: ", res);

      //0xa8ef5f973d0350d32c1aedd6e52b63907284d279f44a1a2eaafbc80e613d48141b076e9ddcdb425dc29e6f622c403da2c977b4fe3e5637e7c56f1b1468b7fc931c
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignerTransaction = async (e: any) => {
    e.preventDefault();

    const senderAddress = senderRef.current.value;
    const receiverAddress = receiverRef.current.value;
    const amount = amountRef.current.value;

    const tx = {
      to: receiverAddress,
      value: ethers.utils.parseEther(amount),
    };

    const signer = library.getSigner();

    setDisabledButton(true);

    try {
      const res = await signer.sendTransaction(tx);
      const hash = await res.hash;

      setTransactionHash(hash);
      alert(
        `Transaction of ${amount} ETH to ${receiverAddress} is successfull!`
      );

      setDisabledButton(false);
    } catch (err: any) {
      setDisabledButton(false);
      console.log(err);
      alert(err.code + ": " + err.message);
    }
  };

  return (
    <main>
      {!active && (
        <>
          <button type="button" onClick={connectCoinbase}>
            Coinbase Wallet
          </button>

          <button
            type="button"
            onClick={() => activate(connectors.walletConnect)}
          >
            Wallet Connect
          </button>

          <button type="button" onClick={connectMetaMask}>
            MetaMask
          </button>
        </>
      )}

      <div />

      {active && (
        <button type="button" onClick={disConnect}>
          Deactivate
        </button>
      )}

      {active && (
        <button type="button" onClick={handleSignMessage}>
          Sign Message
        </button>
      )}

      {active && (
        <>
          <h3>
            Address:{" "}
            <a
              href={`https://rinkeby.etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {account}
            </a>
          </h3>

          <p>
            Balance:{" "}
            {accountData
              ? Number(accountData.balance).toFixed(4) + " ETH"
              : "..."}{" "}
          </p>
        </>
      )}

      {transactionHash ? (
        <p>
          <a
            href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check your transaction in Etherscan
          </a>
        </p>
      ) : null}

      <form onSubmit={handleSignerTransaction}>
        <label htmlFor="sender">
          Sender Address
          <input
            type="text"
            name="sender"
            id="sender"
            placeholder="Sender Address"
            defaultValue={account ? account : ""}
            // defaultValue={"0xd23379e2776024ebcf398d4d79a4e5301a0807a9"}
            ref={senderRef}
            required
          />
        </label>

        <label htmlFor="receiver">
          Receiver Address
          <input
            type="text"
            name="receiver"
            id="receiver"
            placeholder="Receiver Address"
            ref={receiverRef}
            required
          />
        </label>

        <label htmlFor="amount">
          Amount
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount in ether"
            required
            min={0}
            step=".01"
            ref={amountRef}
          />
        </label>

        <button type="submit" disabled={!active || disabledButton}>
          Send Ether
        </button>
      </form>
    </main>
  );
};

export default W3RSection;
