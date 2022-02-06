import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
      <p className="font-light">{label}</p>
      <input
        className="font-lato font-light text-center border rounded-lg"
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

type TMortgageInputDateProps = {
  label: string;
  date: Date;
  // eslint-disable-next-line no-unused-vars
  setDate: (newDate: Date) => void;
}

export function MortgageInputDate({ label, date, setDate }: TMortgageInputDateProps) {
  return (
    <div className="p-2">
      <p className="font-light">{label}</p>
      <DatePicker
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        className="font-lato font-light text-center border rounded-lg"
        selected={date}
        onChange={(newDate: Date) => setDate(newDate)}
      />
    </div>
  );
}
