import React from 'react';
import { TAmortizationSummary } from 'utils/calculate-amortization';

function AmortizationHeader() {
  return (
    <thead id="amortization-header" className="sticky top-0 bg-white">
      <tr className="text-center">
        <td className="sticky top-0">Date</td>
        <td className="sticky top-0">Amount</td>
        <td className="sticky top-0">Interest</td>
        <td className="sticky top-0">Principal</td>
        <td className="sticky top-0">Pending</td>
      </tr>
    </thead>
  );
}

type TAmortizationBodyProps = {
  amortizationSummary: TAmortizationSummary;
};
function AmortizationBody({ amortizationSummary }: TAmortizationBodyProps) {
  const years: string[] = Object.keys(amortizationSummary);

  return (
    <tbody id="amortization-body">
      {
        years.map((year) => {
          const summary = amortizationSummary[year];
          return (
            <tr key={summary.year} className="font-lato font-light text-center">
              <td>{summary.year}</td>
              <td>{Math.round(summary.amount)}</td>
              <td className="text-red-600">{Math.round(summary.interest)}</td>
              <td className="text-green-600">{Math.round(summary.principal)}</td>
              <td>{Math.round(summary.pending)}</td>
            </tr>
          );
        })
      }
    </tbody>
  );
}

type TAmoritzationProps = {
  amortizationSummary: TAmortizationSummary,
};
export function Amortization({ amortizationSummary }: TAmoritzationProps) {
  return (
    <div id="amortization" className="mt-8 grid justify-items-center">
      <h3 className="pb-2">Amortization Schedule</h3>
      <div className="w-full px-8 md:w-1/2 max-h-96 overflow-y-auto border rounded-lg">
        <table className="w-full text-right border-separate">
          <AmortizationHeader />
          <AmortizationBody amortizationSummary={amortizationSummary} />
        </table>
      </div>
    </div>
  );
}
