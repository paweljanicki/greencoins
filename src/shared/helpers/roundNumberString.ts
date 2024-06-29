export function roundNumberString(
  numberString: string,
  decimals: number
): string {
  // Convert the string to a number
  const numberValue = parseFloat(numberString);

  // Round the number to the specified number of decimals
  const roundedValue = numberValue.toFixed(decimals);

  // Return the rounded value as a string
  return roundedValue;
}
