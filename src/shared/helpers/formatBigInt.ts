import { formatUnits } from "viem";
import { roundNumberString } from "./roundNumberString";

export function formatBigInt(
  bigIntValue: bigint,
  decimals: number,
  displayDecimals: number
): string {
  const formatted = formatUnits(bigIntValue, decimals);

  if (parseFloat(formatted) < 1) {
    // take the digits after the decimal point
    const [, fractionalPart] = formatted.split(".");

    const [frontZeros] = fractionalPart.split(/[^0]/);
    const trimmed = fractionalPart.replace(/^0+/, "");

    const roundTrimmed = roundNumberString(
      `0.${trimmed}`,
      displayDecimals
    ).split(".")[1];

    return `0.${frontZeros}${roundTrimmed}`;
  }

  return roundNumberString(formatted, displayDecimals);
}
