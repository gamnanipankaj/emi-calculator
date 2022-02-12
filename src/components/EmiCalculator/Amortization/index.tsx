import './index.css';

import React, { useState, Suspense, lazy } from 'react';
import { TAmortizationSummary } from 'utils/calculate-amortization';

const Amortization = lazy(() => import('./Amortization'));

type TAmoritzationProps = {
    amortizationSummary: TAmortizationSummary,
};
export function AmortizationLazy({ amortizationSummary }: TAmoritzationProps) {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  return (
    <div className="mt-2 text-center">
      <button type="button" className="amortization-visibility-btn" onClick={() => setIsHidden(!isHidden)}>
        Amortization
      </button>
      {
          isHidden
            ? null
            : (
              <Suspense fallback={null}>
                <Amortization amortizationSummary={amortizationSummary} />
              </Suspense>
            )
      }
    </div>
  );
}
