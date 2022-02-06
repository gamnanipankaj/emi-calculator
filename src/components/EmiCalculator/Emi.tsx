import React from 'react';

type TEmiProps = {
  emi: number;
};

export function Emi({ emi }: TEmiProps) {
  return (
    <div className="mt-6">
      <span className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-blue-500 text-xs font-bold text-white">
        {`₹ ${Math.round(emi)}`}
      </span>
    </div>
  );
}
