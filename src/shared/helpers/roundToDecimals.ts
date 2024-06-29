export function roundToDecimals(value: number, decimals: number): number {
  if (decimals < 0) {
    throw new Error("The number of decimals cannot be negative");
  }

  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
