import React, { useState, useEffect, useLayoutEffect } from 'react';
import { calculateEmi } from 'utils/calculate-emi';
import {
  getLoanDetails,
  saveLoanDetails,
  TLoanDetails,
} from 'utils/loan-details-storage-service';
import { calculateAmortization, calculateAmortizationSummary } from 'utils/calculate-amortization';
import { MortgageInput, MortgageInputDate } from './MortgageInput';
import { AmortizationLazy } from './Amortization';
import { Emi } from './Emi';
import { Reset } from './Inputs/Reset';

export type TEmiCalculatorState = TLoanDetails & {};

export function EmiCalculator() {
  const initialState: TEmiCalculatorState = {
    date: new Date(), amount: 1000000, interest: 10, months: 120,
  };

  const [loanDetails, setLoanDetails] = useState<TEmiCalculatorState>(initialState);
  const setDate = (newDate: Date) => setLoanDetails({ ...loanDetails, date: newDate });
  const setAmount = (newAmount: number) => setLoanDetails({ ...loanDetails, amount: newAmount });
  const setInterest = (newInterest: number) => setLoanDetails({
    ...loanDetails,
    interest: newInterest,
  });
  const setMonths = (newMonths: number) => setLoanDetails({ ...loanDetails, months: newMonths });
  const [emi, setEmi] = useState<number>(0);
  const amortization = calculateAmortization({ ...loanDetails, emi });
  const amortizationSummary = calculateAmortizationSummary(amortization);

  useLayoutEffect(() => {
    const savedLoanDetails = getLoanDetails();

    if (savedLoanDetails) {
      setLoanDetails(savedLoanDetails);
    }
  }, []);

  useEffect(() => {
    saveLoanDetails(loanDetails);
    setEmi(calculateEmi(loanDetails));
  }, [loanDetails, loanDetails.amount, loanDetails.interest, loanDetails.months]);

  return (
    <div id="emi-calculator" className="mt-2">
      <div id="emi-inputs" className="flex flex-col justify-center items-center">
        <div className="md:flex md:flex-row">
          <MortgageInputDate label="Start" date={loanDetails.date} setDate={setDate} />
          <MortgageInput label="Amount" value={loanDetails.amount} step={100000} setValue={setAmount} />
          <MortgageInput label="Interest" value={loanDetails.interest} step={0.05} setValue={setInterest} />
          <MortgageInput label="Months" value={loanDetails.months} step={10} setValue={setMonths} />
        </div>
        <div>
          <Reset initialState={initialState} setLoanDetails={setLoanDetails} />
          <Emi emi={emi} />
        </div>
      </div>
      <AmortizationLazy amortizationSummary={amortizationSummary} />
    </div>
  );
}
