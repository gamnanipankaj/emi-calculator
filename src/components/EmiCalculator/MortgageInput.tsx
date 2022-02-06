import React from 'react';

type TMortgageInputProps = {
  label: string;
  value: number;
  step?: number;
  // eslint-disable-next-line no-unused-vars
  setValue?: (newValue: number) => void;
}

export function MortgageInput({
  label, value, step = 1, setValue,
}: TMortgageInputProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue!(Number(e.target.value));

  return (
    <div className="p-2">
      <label htmlFor={label} className="font-extralight">{label}</label>
      <br />
      <input
        id={label}
        className="text-center border rounded-lg"
        step={step}
        placeholder={label}
        value={value}
        type="number"
        onChange={handleInput}
      />
    </div>
  );
}

MortgageInput.defaultProps = {
  step: 1,
  setValue: () => null,
};
