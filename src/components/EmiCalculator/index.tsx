import React, { useState, useEffect, useLayoutEffect } from 'react';
import { calculateEmi } from 'utils/calculate-emi';
import {
  getLoanDetails, resetLoanDetails, saveLoanDetails, TLoanDetails,
} from 'utils/loan-details-storage-service';
import { MortgageInput } from './MortgageInput';
import { Amortization } from './Amortization';
import { Emi } from './Emi';

export type TEmiCalculatorState = {
  amount: number;
  interest: number;
  months: number;
};

export function EmiCalculator() {
  const initialState: TEmiCalculatorState = { amount: 1000000, interest: 10, months: 120 };

  const [loanDetails, setLoanDetails] = useState<TLoanDetails>(initialState);
  const setAmount = (newAmount: number) => setLoanDetails({ ...loanDetails, amount: newAmount });
  // eslint-disable-next-line max-len
  const setInterest = (newInterest: number) => setLoanDetails({ ...loanDetails, interest: newInterest });
  const setMonths = (newMonths: number) => setLoanDetails({ ...loanDetails, months: newMonths });
  const [emi, setEmi] = useState<number>(0);

  useLayoutEffect(() => {
    const savedLoanDetails: TLoanDetails | null = getLoanDetails();

    if (savedLoanDetails) {
      setLoanDetails(savedLoanDetails);
    }
  }, []);

  useEffect(() => {
    saveLoanDetails(loanDetails);
    setEmi(calculateEmi(loanDetails));
  }, [loanDetails, loanDetails.amount, loanDetails.interest, loanDetails.months]);

  // eslint-disable-next-line react/no-unstable-nested-components
  function ResetLoanDetails() {
    const handleClick = () => {
      resetLoanDetails();
      setLoanDetails(initialState);
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <p className="absolute translate-x-14 translate-y-16 text-xs text-blue-600 cursor-pointer" onClick={handleClick} onKeyDown={handleClick}>
        reset &#x21bb;
      </p>
    );
  }

  return (
    <div id="emi-calculator" className="mt-8">
      <div id="emi-inputs" className="flex flex-col justify-center items-center">
        <MortgageInput label="Amount" value={loanDetails.amount} step={100000} setValue={setAmount} />
        <MortgageInput label="Interest" value={loanDetails.interest} step={0.05} setValue={setInterest} />
        <MortgageInput label="Months" value={loanDetails.months} step={10} setValue={setMonths} />
        <ResetLoanDetails />
        <Emi emi={emi} />
      </div>
      <Amortization
        amount={loanDetails.amount}
        interest={loanDetails.interest}
        months={loanDetails.months}
        emi={emi}
      />
    </div>
  );
}
