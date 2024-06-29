import { getEtherscanTxLink } from "../helpers/getEtherscanLink";

export const ReadableTx = ({ tx }: { tx: string }) => {
  const short = `${tx.slice(0, 12)}...`;
  return (
    <a
      href={getEtherscanTxLink(tx)}
      target="_blank"
      className="hover:text-accent"
    >
      {short}
    </a>
  );
};
