import { expect, test } from "vitest";
import { formatBigInt } from "./formatBigInt";

test("formatBigInt", () => {
  const bigNumber = BigInt(1 * 10 ** 27);
  const decimals = 18;
  const displayDecimals = 2;
  expect(formatBigInt(bigNumber, decimals, displayDecimals)).toBe(
    "1000000000.00"
  );
});

test("format real big int", () => {
  const bigNumber = BigInt(1499999999n);
  const decimals = 18;
  const displayDecimals = 2;
  expect(formatBigInt(bigNumber, decimals, displayDecimals)).toBe(
    "0.000000001499999999"
  );
});
