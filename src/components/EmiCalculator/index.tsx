import { useState } from "react";
import { MortgageInput } from "./MortgageInput";
import { calculateEmi } from 'utils/calculate-emi';
import { useEffect } from "react";
import { Amortization } from "./Amortization";

export const EmiCalculator = () => {
    const [amount, setAmount] = useState<number>(1000000);
    const [interest, setInterest] = useState<number>(10);
    const [months, setMonths] = useState<number>(120);
    const [emi, setEmi] = useState<number>(0);

    useEffect(() => {
        setEmi(calculateEmi({ amount, interest, months }));
    }, [amount, interest, months]);

    return (
        <div id="emi-calculator" className="mt-8">
            <div id="emi-inputs" className="flex flex-col justify-center items-center">
                <MortgageInput label="Amount" value={amount} step={100000} setValue={setAmount} />
                <MortgageInput label="Interest" value={interest} step={0.05} setValue={setInterest} />
                <MortgageInput label="Months" value={months} step={10} setValue={setMonths} />
                <div className="mt-6">
                    <span className="w-40 inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-bold text-white text-center">
                        {`₹ ${emi}`}
                    </span>
                </div>
            </div>
            <Amortization
                amount={amount}
                interest={interest}
                months={months}
                emi={emi}
            />
        </div>
    );
};