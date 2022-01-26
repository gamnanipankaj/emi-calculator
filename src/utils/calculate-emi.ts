interface ICalculateEmiArgs {
    amount: number;
    interest: number;
    months: number;
}

export const calculateEmi = ({ amount, interest, months }: ICalculateEmiArgs): number => {
    const interestPerMonth = interest / 12 / 100;
    const interestOverTenure = (1 + interestPerMonth) ** months;
    const reducingBalanceAdjustment = interestOverTenure / (interestOverTenure - 1);

    return Math.round(amount * interestPerMonth * reducingBalanceAdjustment);
};