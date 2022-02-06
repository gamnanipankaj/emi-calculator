import { TLoanDetails } from './loan-details-storage-service';

const monthMap: { [index: number]: string } = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

type TCalculateAmortizationArgs = TLoanDetails & {
  emi: number;
};

export type TAmoritzation = {
  index: number;
  monthName: string;
  year: number;
  amount: number;
  interest: number;
  principal: number;
  pending: number;
}[];

export const calculateAmortization = ({
  amount, interest, months, emi, date,
}: TCalculateAmortizationArgs): TAmoritzation => {
  const interestPerMonth = interest / 12 / 100;
  let amortizationAmount = amount;

  const amortization: TAmoritzation = [];
  for (let index = 1; index <= months; index += 1) {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDay());
    newDate.setMonth(newDate.getMonth() + index - 1);
    const amortizationInterest = amortizationAmount * interestPerMonth;
    const amortizationPrincipal = emi - amortizationInterest;
    const amortizationPending = amortizationAmount - amortizationPrincipal;

    amortization.push({
      index,
      monthName: monthMap[newDate.getMonth()],
      year: newDate.getFullYear(),
      amount: amortizationAmount,
      interest: amortizationInterest,
      principal: amortizationPrincipal,
      pending: amortizationPending,
    });

    amortizationAmount = amortizationPending;
  }

  return amortization;
};

export type TAmortizationSummary = {
  [year: string]: {
    year: number;
    amount: number;
    interest: number;
    principal: number;
    pending: number;
    group: TAmoritzation;
  }
};
export const calculateAmortizationSummary = (amortization: TAmoritzation): TAmortizationSummary => {
  const amortizationSummary: TAmortizationSummary = {};

  amortization.forEach((amortizationEntry) => {
    const {
      year, amount, interest, principal, pending,
    } = amortizationEntry;

    amortizationSummary[year] = amortizationSummary[year] || {
      year, amount, interest: 0, principal: 0, pending, group: [],
    };

    amortizationSummary[year].interest += interest;
    amortizationSummary[year].principal += principal;
    amortizationSummary[year].pending = pending;
    amortizationSummary[year].group.push(amortizationEntry);
  });

  return amortizationSummary;
};
