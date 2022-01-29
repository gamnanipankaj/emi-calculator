import { calculateAmortization, TAmoritzation } from "utils/calculate-amortization";

export const AmortizationHeader = () => {
    return (
        <thead id="amortization-header">
            <tr className="font-normal">
                <td className="px-4 text-center">Month</td>
                <td className="px-4 text-red-900">Amount</td>
                <td className="px-4 text-red-700">Interest</td>
                <td className="px-4 text-green-700">Principal</td>
                <td className="px-4 text-red-900">Pending</td>
            </tr>
        </thead>
    );
};

type TAmortizationBodyProps = {
    amortization: TAmoritzation;
};
const AmortizationBody = ({ amortization }: TAmortizationBodyProps) => {
    return (
        <tbody id="amortization-body">
            {
                amortization.map(a => (
                    <tr key={a.month} className="font-extralight">
                        <td className="px-4 text-center">{Math.round(a.month)}</td>
                        <td className="px-4 text-red-900">{Math.round(a.amount)}</td>
                        <td className="px-4 text-red-700">{Math.round(a.interest)}</td>
                        <td className="px-4 text-green-700">{Math.round(a.principal)}</td>
                        <td className="px-4 text-red-900">{Math.round(a.pending)}</td>
                    </tr>
                ))
            }
        </tbody>
    );
};

type TAmortizationProps = {
    amount: number;
    interest: number;
    months: number;
    emi: number;
};
export const Amortization = (amortizationTableProps: TAmortizationProps) => {
    const amortization = calculateAmortization(amortizationTableProps);

    return (
        <div id="amortization" className="mt-8 w-full grid justify-items-center">
            <div className="w-full md:w-1/2 max-h-96 overflow-scroll border border-indigo-500">
                <table className="w-full table-auto border-separate text-right">
                    <AmortizationHeader />
                    <AmortizationBody amortization={amortization} />
                </table>
            </div>
        </div>
    );
};