import React from "react";

interface IMortgageInputProps {
    label: string;
    value: number;
    setValue?: (newValue: number) => void;
}

export const MortgageInput = ({ label, value, setValue }: IMortgageInputProps) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue!(Number(e.target.value));

    return (
        <div className="p-2">
            <label className="text-red-900 font-extralight">{label}</label>
            <br />
            <input
                className="text-center border border-black"
                placeholder={label}
                value={value}
                type="number"
                onChange={handleInput}
            />
        </div>
    );
};