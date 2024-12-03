import React from 'react';

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
}

const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => (
  <p className="text-sm text-gray-200">
    <strong className="font-semibold text-white">{label}:</strong> {value}
  </p>
);

export default DetailField;