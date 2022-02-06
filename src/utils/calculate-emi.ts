import { TLoanDetails } from './loan-details-storage-service';

type TCalculateEmiArgs = TLoanDetails & {}

export const calculateEmi = ({ amount, interest, months }: TCalculateEmiArgs): number => {
  const interestPerMonth = interest / 12 / 100;
  const interestOverTenure = (1 + interestPerMonth) ** months;
  const reducingBalanceAdjustment = interestOverTenure / (interestOverTenure - 1);

  return amount * interestPerMonth * reducingBalanceAdjustment;
};
