import './Amortization.css';
import React, { useState } from 'react';
import { TAmoritzation, TAmortizationSummary, TAmortizationSummaryEntry } from 'utils/calculate-amortization';

type TAmortizationGroupProps = {
  isHidden: boolean;
  group: TAmoritzation;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
};
function AmortizationGroup({ group, isHidden, setIsHidden }: TAmortizationGroupProps) {
  return (
    <td
      role="presentation"
      colSpan={6}
      hidden={isHidden}
      className="p-0"
      onClick={() => setIsHidden(!isHidden)}
    >
      <table className="amortization-table amortization-table-group">
        <tbody>
          {
            group.map((amortizationEntry) => (
              <tr key={amortizationEntry.index} className="amortization-table-body-row">
                <td><button type="button">-</button></td>
                <td>{amortizationEntry.monthName}</td>
                <td>{Math.round(amortizationEntry.amount)}</td>
                <td>{Math.round(amortizationEntry.interest)}</td>
                <td>{Math.round(amortizationEntry.principal)}</td>
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
    <thead id="amortization-header">
      <tr>
        <td className="amortization-table-header-data" />
        <td className="amortization-table-header-data">Date</td>
        <td className="amortization-table-header-data">Amount</td>
        <td className="amortization-table-header-data">Interest</td>
        <td className="amortization-table-header-data">Principal</td>
        <td className="amortization-table-header-data">Pending</td>
      </tr>
    </thead>
  );
}

type TAmortizationBodyDataProps = {
  summary: TAmortizationSummaryEntry;
}
function AmortizationBodyData({ summary }: TAmortizationBodyDataProps): any {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const className = `amortization-table-body-row ${isHidden ? '' : 'bg-blue-100'}`;

  return [
    <tr key={summary.year} className={className} onClick={() => setIsHidden(!isHidden)}>
      <td><button type="button">{isHidden ? '+' : '-'}</button></td>
      <td>{summary.year}</td>
      <td>{Math.round(summary.amount)}</td>
      <td>{Math.round(summary.interest)}</td>
      <td>{Math.round(summary.principal)}</td>
      <td>{Math.round(summary.pending)}</td>
    </tr>,
    <tr key={`amortization-group-${summary.year}`}>
      <AmortizationGroup
        group={summary.group}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
      />
    </tr>,
  ];
}

type TAmortizationBodyProps = {
  amortizationSummary: TAmortizationSummary;
};
function AmortizationBody({ amortizationSummary }: TAmortizationBodyProps) {
  const years: string[] = Object.keys(amortizationSummary);

  return (
    <tbody id="amortization-body" className="amortization-table-body">
      {
        years.map((year) => {
          const summary = amortizationSummary[year];
          return <AmortizationBodyData key={summary.year} summary={summary} />;
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
    <div id="amortization" className="amortization">
      <div>
        <table className="amortization-table px-4">
          <AmortizationHeader />
          <AmortizationBody amortizationSummary={amortizationSummary} />
        </table>
      </div>
    </div>
  );
}
