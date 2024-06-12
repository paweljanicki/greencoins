import { ChangeEvent } from "react";

interface NumberInputProps {
  value: string;
  min: number;
  max: number;
  onChange: (value: string) => void;
}
export default ({
  min,
  max,
  value,
  onChange,
}: NumberInputProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let { value } = e.target;
    const regex = /^-?(?!0\d)\d*\.?\d{0,15}$/;

    if (value === "" || regex.test(value)) {
      if (value === "") {
        value = "0";
      }
      const numericValue = parseFloat(value);
      if (isNaN(numericValue) || (numericValue >= min && numericValue <= max)) {
        onChange(value);
      }
    }
  };

  return <input type="text" value={value} onChange={handleChange} />;
};
