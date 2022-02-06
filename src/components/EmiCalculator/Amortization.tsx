import React from 'react';
import { calculateAmortization, TAmoritzation } from 'utils/calculate-amortization';

export function AmortizationHeader() {
  return (
    <thead id="amortization-header" className="sticky top-0 bg-white border-b">
      <tr className="font-normal">
        <td className="sticky top-0 px-4">Month</td>
        <td className="sticky top-0 px-6">Amount</td>
        <td className="sticky top-0 px-6 text-red-600">Interest</td>
        <td className="sticky top-0 px-6 text-green-600">Principal</td>
        <td className="sticky top-0 px-6">Pending</td>
      </tr>
    </thead>
  );
}

type TAmortizationBodyProps = {
  amortization: TAmoritzation;
};
function AmortizationBody({ amortization }: TAmortizationBodyProps) {
  return (
    <tbody id="amortization-body">
      {
        amortization.map((a) => (
          <tr key={a.month} className="font-extralight">
            <td className="px-4 text-center">{Math.round(a.month)}</td>
            <td className="px-6">{Math.round(a.amount)}</td>
            <td className="px-6 text-red-600">{Math.round(a.interest)}</td>
            <td className="px-6 text-green-600">{Math.round(a.principal)}</td>
            <td className="px-6">{Math.round(a.pending)}</td>
          </tr>
        ))
      }
    </tbody>
  );
}

type TAmortizationProps = {
  amount: number;
  interest: number;
  months: number;
  emi: number;
};
export function Amortization(amortizationTableProps: TAmortizationProps) {
  const amortization = calculateAmortization(amortizationTableProps);

  return (
    <div id="amortization" className="mt-8 grid justify-items-center">
      <h3 className="pb-2">Amortization Schedule</h3>
      <div className="w-full md:w-1/2 h-96 overflow-y-auto border rounded-lg">
        <table className="w-full text-right border-separate">
          <AmortizationHeader />
          <AmortizationBody amortization={amortization} />
        </table>
      </div>
    </div>
  );
}
