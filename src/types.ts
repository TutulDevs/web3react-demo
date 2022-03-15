export interface accountDataType {
  accounts: string[];
  walletAddress: string;
  balance: string;
  transactionCount: number;
  network: {
    chainId: number;
    ensAddress: string;
    name: string;
  };
}
