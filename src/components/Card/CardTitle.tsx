import React from 'react';
import { truncateText } from '@/utils/truncateText';

interface CardTitleProps {
  title: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ title }) => (
  <div className="mb-2">
    <span
      className="block text-lg font-semibold text-center text-gray-100 break-words"
      title={title}
    >
      {truncateText(title, 30)}
    </span>
  </div>
);

export default CardTitle;
