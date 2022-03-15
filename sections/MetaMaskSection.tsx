import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

export const MetaMaskSection = () => {
  const ethersUtils = ethers.utils;
  const [provider, setProvider] = useState<any>();
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [accountData, setAccountData] = useState<any>(null);
  const [transactionHash, setTransactionHash] = useState<any>();
  const [disabledButton, setDisabledButton] = useState(false);

  // refs
  const senderRef = useRef<any>();
  const receiverRef = useRef<any>();
  const amountRef = useRef<any>();

  useEffect(() => {
    if (
      typeof (window as any).ethereum !== "undefined" &&
      window.hasOwnProperty("ethereum")
    ) {
      const etherProvider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      setProvider(etherProvider);
    }
  }, []);

  // check status and load data
  useEffect(() => {
    if (provider) {
      const checkMetaMaskConnected = async () => {
        const accounts = await provider.listAccounts();

        if (!accounts.length) {
          setIsMetaMaskConnected(false);
          return;
        } else {
          const walletAddress = accounts[0];
          const hexBalance = await provider.getBalance(walletAddress);
          const balance = ethersUtils.formatEther(hexBalance);
          const network = await provider.getNetwork();
          const transactionCount = await provider.getTransactionCount(
            walletAddress
          );
          setAccountData({
            accounts,
            walletAddress,
            balance,
            transactionCount,
            network,
          });
        }

        accounts.length
          ? setIsMetaMaskConnected(true)
          : setIsMetaMaskConnected(false);
      };

      checkMetaMaskConnected();

      // checkMetaMaskConnected().then((connected) =>
      //   connected ? setIsMetaMaskConnected(true) : setIsMetaMaskConnected(false)
      // );
    }
  }, [provider, ethersUtils, setIsMetaMaskConnected]);

  // console.log(provider);
  //console.log(accountData);

  const handleConnectWallet = async () => {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const walletAddress = accounts[0];
      const hexBalance = await provider.getBalance(walletAddress);
      const balance = ethersUtils.formatEther(hexBalance);
      const transactionCount = await provider.getTransactionCount(
        walletAddress
      );
      const network = await provider.getNetwork();

      setAccountData({
        accounts,
        walletAddress,
        balance,
        transactionCount,
        network,
      });

      setIsMetaMaskConnected(true);
    } catch (err: any) {
      setIsMetaMaskConnected(false);

      if (typeof err === "string") {
        const errObj = JSON.parse(err);
        alert(errObj.error.code + ": " + errObj.error.message);
      } else {
        if (err.code === -32002)
          alert(err.code + ": " + "Previous request is pending!");
        else alert(err.code + ": " + err.message);
      }
    }
  };

  const handleConnectCoinbase = async () => {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const walletAddress = accounts[0];
      const hexBalance = await provider.getBalance(walletAddress);
      const balance = ethersUtils.formatEther(hexBalance);
      const transactionCount = await provider.getTransactionCount(
        walletAddress
      );
      const network = await provider.getNetwork();

      setAccountData({
        accounts,
        walletAddress,
        balance,
        transactionCount,
        network,
      });

      setIsMetaMaskConnected(true);
    } catch (err: any) {
      setIsMetaMaskConnected(false);

      if (typeof err === "string") {
        const errObj = JSON.parse(err);
        alert(errObj.error.code + ": " + errObj.error.message);
      } else {
        if (err.code === -32002)
          alert(err.code + ": " + "Previous request is pending!");
        else alert(err.code + ": " + err.message);
      }
    }
  };

  const handleSignerData = async () => {
    try {
      const signer = provider.getSigner();

      const estimateGasPrice = await signer.estimateGas();
      const addr = await signer.getAddress();
      console.log(addr);
      console.log(
        "estimateGasPrice: " + ethersUtils.formatEther(estimateGasPrice)
      );

      const defProvider = ethers.getDefaultProvider("rinkeby");
      let privateKey =
        "bfe8c38d5faff144ae68902a006a8328e8be6a718bc4d73c2ece63f4e1442945";
      const wallet = new ethers.Wallet(privateKey, defProvider);

      console.log(wallet);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignerTransation = async (e: any) => {
    e.preventDefault();

    const senderAddress = senderRef.current.value;
    const receiverAddress = receiverRef.current.value;
    const amount = amountRef.current.value;

    const tx = {
      to: receiverAddress,
      value: ethersUtils.parseEther(amount),
    };

    const signer = provider.getSigner();

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

  const handleSignMessage = async () => {
    const signer = provider.getSigner();

    try {
      const res = await signer.signMessage("Test Message!");
      console.log(res);

      //0xa8ef5f973d0350d32c1aedd6e52b63907284d279f44a1a2eaafbc80e613d48141b076e9ddcdb425dc29e6f622c403da2c977b4fe3e5637e7c56f1b1468b7fc931c
    } catch (err) {
      console.log(err);
    }
  };

  const handleDaiContract = async () => {
    //give a contract address not wallet address
    const daiAddress = "0x4B27946689E70b2d4024FCA65D79BF31447e94C8";

    const daiAbi = [
      { inputs: [], stateMutability: "nonpayable", type: "constructor" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Paused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "previousAdminRole",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "newAdminRole",
            type: "bytes32",
          },
        ],
        name: "RoleAdminChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleGranted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleRevoked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Unpaused",
        type: "event",
      },
      {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MINTER_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "PAUSER_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "contractURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
        name: "getRoleAdmin",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "getRoleMember",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
        name: "getRoleMemberCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "hasRole",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "string", name: "metadataURI", type: "string" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "paused",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bytes", name: "_data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
        name: "tokenByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    // The Contract object
    const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

    try {
      const name = await daiContract.name();
      const balance = await daiContract.balanceOf(daiAddress);
      const symbol = await daiContract.symbol();

      console.log(name, ethersUtils.formatUnits(balance), symbol);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main>
        <section id="controls">
          <h1>Controls ⚙</h1>

          {provider ? (
            <button
              type="button"
              onClick={handleConnectWallet}
              disabled={isMetaMaskConnected}
            >
              {isMetaMaskConnected ? "Connected" : "Connect"} to MetaMask
            </button>
          ) : (
            <a
              href="https://metamask.io/download.html"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Install MetaMask
            </a>
          )}

          <button type="button" onClick={handleConnectCoinbase}>
            Connect to Coinbase
          </button>

          <button hidden type="button" onClick={handleSignerData}>
            Get More Info
          </button>

          <button hidden type="button" onClick={handleSignMessage}>
            Sign Message
          </button>

          <button
            hidden={!accountData}
            type="button"
            onClick={handleDaiContract}
          >
            Dai Contract
          </button>

          <form onSubmit={handleSignerTransation}>
            <label htmlFor="sender">
              Sender Address
              <input
                type="text"
                name="sender"
                id="sender"
                placeholder="Sender Address"
                defaultValue={
                  isMetaMaskConnected && accountData
                    ? accountData.walletAddress
                    : ""
                }
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

            <button
              type="submit"
              disabled={!isMetaMaskConnected || disabledButton}
            >
              Send Ether
            </button>
          </form>
        </section>

        <section className="info">
          <h1>Information 📝</h1>

          {transactionHash ? (
            <a
              href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
              style={{ margin: "0.5rem 0", display: "inline-block" }}
            >
              Check your transaction in Etherscan
            </a>
          ) : null}

          {isMetaMaskConnected && accountData ? (
            <>
              <p>Network: {accountData.network.name} </p>
              <p>Net Balance: {accountData.balance + " ETH"} </p>
            </>
          ) : (
            "connect to MetaMask"
          )}
        </section>
      </main>
    </>
  );
};
