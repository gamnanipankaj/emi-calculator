import './index.css';

import React, { useState } from 'react';
import { TAmortizationSummary } from 'utils/calculate-amortization';
import { Amortization } from './Amortization';

type TAmoritzationProps = {
  amortizationSummary: TAmortizationSummary,
};
export function AmortizationLazy({ amortizationSummary }: TAmoritzationProps) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const containerClassName = `amortization-container ${isHidden ? '' : 'amortization-container-modal'}`;

  return (
    <div className={containerClassName}>
      <button type="button" className="amortization-visibility-btn" onClick={() => setIsHidden(!isHidden)}>
        Amortization
      </button>
      {
        isHidden ? null : <Amortization amortizationSummary={amortizationSummary} />
      }
    </div>
  );
}
