export type TLoanDetails = {
  amount: number;
  interest: number;
  months: number;
  date: Date;
};

const LOAN_DETAILS_STORAGE_KEY_NAME = 'emiCalculator:LoanDetails';

export const getLoanDetails = (): TLoanDetails | null => {
  const loanDetailsStorage = localStorage.getItem(LOAN_DETAILS_STORAGE_KEY_NAME);

  if (!loanDetailsStorage) return null;

  const loanDetails = JSON.parse(loanDetailsStorage) as TLoanDetails;
  loanDetails.date = new Date(loanDetails.date);

  return loanDetails;
};

export const saveLoanDetails = (loanDetails: TLoanDetails) => {
  localStorage.setItem(LOAN_DETAILS_STORAGE_KEY_NAME, JSON.stringify(loanDetails));
};

export const resetLoanDetails = () => {
  localStorage.removeItem(LOAN_DETAILS_STORAGE_KEY_NAME);
};
