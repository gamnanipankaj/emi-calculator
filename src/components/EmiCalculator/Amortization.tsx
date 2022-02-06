import React, { useState } from 'react';
import { TAmoritzation, TAmortizationSummary } from 'utils/calculate-amortization';

type TAmortizationGroupProps = {
  isHidden: boolean;
  group: TAmoritzation
};
function AmortizationGroup({ isHidden, group }: TAmortizationGroupProps) {
  return (
    <td colSpan={6} className="p-0" hidden={isHidden}>
      <table className="w-full">
        <tbody>
          {
            group.map((amortizationEntry) => (
              <tr key={amortizationEntry.index}>
                <td className="text-sm">&and;</td>
                <td>{amortizationEntry.monthName}</td>
                <td>{Math.round(amortizationEntry.amount)}</td>
                <td className="text-red-700">{Math.round(amortizationEntry.interest)}</td>
                <td className="text-green-700">{Math.round(amortizationEntry.principal)}</td>
                <td>{Math.round(amortizationEntry.pending)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </td>
  );
}

function AmortizationHeader() {
  return (
    <thead id="amortization-header" className="sticky top-0 bg-white">
      <tr>
        <td className="sticky top-0" />
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
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <tbody id="amortization-body" className="font-lato font-light">
      {
        years.map((year) => {
          const summary = amortizationSummary[year];
          return [
            <tr key={summary.year} className="cursor-pointer" onClick={() => setIsHidden(!isHidden)}>
              <td className="text-sm">&or;</td>
              <td>{summary.year}</td>
              <td>{Math.round(summary.amount)}</td>
              <td className="text-red-700">{Math.round(summary.interest)}</td>
              <td className="text-green-700">{Math.round(summary.principal)}</td>
              <td>{Math.round(summary.pending)}</td>
            </tr>,
            <tr key={`amortization-group-${summary.year}`}>
              <AmortizationGroup group={summary.group} isHidden={isHidden} />
            </tr>,
          ];
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
        <table className="w-full text-center">
          <AmortizationHeader />
          <AmortizationBody amortizationSummary={amortizationSummary} />
        </table>
      </div>
    </div>
  );
}
