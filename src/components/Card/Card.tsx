import React from 'react';
import { MediaItem } from '@/types';
import CardImage from './CardImage';
import CardTitle from './CardTitle';
import CardDescription from './CardDescription';
import CardMeta from './CardMeta';
import CardFooter from './CardFooter';

interface CardProps {
  item: MediaItem;
  placeholderUrl: string;
  detailsUrl?: string;
}

const Card: React.FC<CardProps> = ({ item, placeholderUrl, detailsUrl }) => {
  return (
    <div
      className="border border-gray-700 rounded-lg p-4 bg-gray-800 flex flex-col shadow-md hover:shadow-blue-500/50 transition-shadow duration-300 cursor-default"
    >
      <CardImage
        src={item.imageUrl ?? placeholderUrl} // Гарантируем, что src всегда строка
        placeholderUrl={placeholderUrl}
        alt={item.title}
        itemId={String(item.id)} // Преобразуем item.id в строку
      />
      <CardTitle title={item.title} />
      {item.description && <CardDescription description={item.description} />}
      <CardMeta item={item} />
      <CardFooter item={item} detailsUrl={detailsUrl} />
    </div>
  );
};

export default Card;