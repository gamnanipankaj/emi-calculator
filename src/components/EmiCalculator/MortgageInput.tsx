import React from "react";

type TMortgageInputProps = {
    label: string;
    value: number;
    step?: number;
    setValue?: (newValue: number) => void;
}

export const MortgageInput = ({ label, value, step = 1, setValue }: TMortgageInputProps) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue!(Number(e.target.value));

    return (
        <div className="p-2">
            <label className="text-red-900 font-extralight">{label}</label>
            <br />
            <input
                className="text-center border border-black"
                step={step}
                placeholder={label}
                value={value}
                type="number"
                onChange={handleInput}
            />
        </div>
    );
};