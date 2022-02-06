type TCalculateAmortizationArgs = {
    amount: number;
    interest: number;
    months: number;
    emi: number;
};

export type TAmoritzation = {
    month: number;
    amount: number;
    interest: number;
    principal: number;
    pending: number;
}[];

export const calculateAmortization = ({
  amount, interest, months, emi,
}: TCalculateAmortizationArgs): TAmoritzation => {
  const interestPerMonth = interest / 12 / 100;
  let amortizationAmount = amount;

  const amortization: TAmoritzation = [];
  for (let month = 1; month <= months; month += 1) {
    const amortizationInterest = amortizationAmount * interestPerMonth;
    const amortizationPrincipal = emi - amortizationInterest;
    const amortizationPending = amortizationAmount - amortizationPrincipal;

    amortization.push({
      month,
      amount: amortizationAmount,
      interest: amortizationInterest,
      principal: amortizationPrincipal,
      pending: amortizationPending,
    });

    amortizationAmount = amortizationPending;
  }

  return amortization;
};
