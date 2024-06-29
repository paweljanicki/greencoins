import { getEtherscanLink } from "../helpers/getEtherscanLink";

export const ReadableAddress = ({ address }: { address: string }) => {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  return (
    <a
      href={getEtherscanLink(address)}
      target="_blank"
      className="hover:text-accent"
    >
      {shortAddress}
    </a>
  );
};
