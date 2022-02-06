export type TLoanDetails = {
    amount: number;
    interest: number;
    months: number;
};

const LOAN_DETAILS_STORAGE_KEY_NAME = 'emiCalculator:LoanDetails';

export const getLoanDetails = (): TLoanDetails | null => {
  const loanDetails = localStorage.getItem(LOAN_DETAILS_STORAGE_KEY_NAME);

  return loanDetails ? JSON.parse(loanDetails) : null;
};

export const saveLoanDetails = (loanDetails: TLoanDetails) => {
  localStorage.setItem(LOAN_DETAILS_STORAGE_KEY_NAME, JSON.stringify(loanDetails));
};

export const resetLoanDetails = () => {
  localStorage.removeItem(LOAN_DETAILS_STORAGE_KEY_NAME);
};
