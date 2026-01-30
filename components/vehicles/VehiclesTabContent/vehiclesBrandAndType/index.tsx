import React from 'react';
import { BrandTable } from './BrandTable';
import { TypeTable } from './TypeTable';

export const VehiclesBrandAndType: React.FC = () => {
  return (
    <div >

      <div className="grid grid-cols-2 gap-6">
        <BrandTable />
        <TypeTable />
      </div>
    </div>
  );
};

