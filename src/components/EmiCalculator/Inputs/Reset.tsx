import './Reset.css';

import React from 'react';
import { resetLoanDetails, TLoanDetails } from 'utils/loan-details-storage-service';
import { TEmiCalculatorState } from '../index';

type TResetProps = {
    initialState: TEmiCalculatorState;
    setLoanDetails: React.Dispatch<React.SetStateAction<TLoanDetails>>;
}

export function Reset({ initialState, setLoanDetails }: TResetProps) {
  const handleClick = () => {
    resetLoanDetails();
    setLoanDetails(initialState);
  };

  return (
    <p role="presentation" className="reset" onClick={handleClick}>
      reset &#x21bb;
    </p>
  );
}
