export const getEtherscanLink = (address: string): string => {
  return `${import.meta.env.VITE_ETHERSCAN_LINK}/address/${address}`;
};

export const getEtherscanTxLink = (address: string): string => {
  return `${import.meta.env.VITE_ETHERSCAN_LINK}/tx/${address}`;
};
