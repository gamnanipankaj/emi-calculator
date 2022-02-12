import './index.css';

import React from 'react';

type TEmiProps = {
  emi: number;
};

export function Emi({ emi }: TEmiProps) {
  return (
    <p className="emi">{`₹ ${Math.round(emi)}`}</p>
  );
}
