export function formatBigInt(
  bigIntValue: bigint,
  decimals: number,
  displayDecimals: number
): string {
  const valueString = bigIntValue.toString();

  // Ensure that the fractional part is at least as long as the decimals
  let integerPart = valueString.slice(0, -decimals);
  let fractionalPart = valueString.slice(-decimals);

  if (!integerPart) {
    integerPart = "0";
  }

  while (fractionalPart.length < decimals) {
    fractionalPart = "0" + fractionalPart;
  }

  // Truncate or pad the fractional part to the desired display length
  fractionalPart = fractionalPart
    .slice(0, displayDecimals)
    .padEnd(displayDecimals, "0");

  return `${integerPart}.${fractionalPart}`;
}
