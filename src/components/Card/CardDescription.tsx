import React from 'react';
import { truncateText } from '@/utils/truncateText';

interface CardDescriptionProps {
  description: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => (
  <p className="text-sm text-gray-400 line-clamp-3 mb-3">
    {truncateText(description, 100)}
  </p>
);

export default CardDescription;
