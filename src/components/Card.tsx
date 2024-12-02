import React, { useEffect, useState } from 'react';
import { truncateText } from '../utils/textUtils';
import { MediaItem } from '../types';
import Button from './Button';
import { useRouter } from 'next/router';
import { formatDate } from '@/utils/formatDate';

interface CardProps {
  item: MediaItem;
  placeholderUrl: string;
  detailsUrl?: string;
}

const Card: React.FC<CardProps> = ({ item, placeholderUrl, detailsUrl }) => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(item.imageUrl || placeholderUrl);
  const linkHref = detailsUrl || `/catalog/${item.type}/${encodeURIComponent(item.id)}`;

  useEffect(() => {
    setImageSrc(item.imageUrl || placeholderUrl);
  }, [item.imageUrl, placeholderUrl]);

  const handleImageError = () => {
    setImageSrc(placeholderUrl);
  };

  const handleNavigate = () => {
    router.push(linkHref);
  };

  return (
    <div
      className="border border-gray-700 rounded-lg p-4 bg-gray-800 flex flex-col shadow-md hover:shadow-blue-500/50 transition-shadow duration-300 cursor-default"
    >
      <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
        <img
          src={`${imageSrc}?v=${item.id}`}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      <div className="mb-2">
        <span
          className="block text-lg font-semibold text-center text-gray-100 break-words"
          title={item.title}
        >
          {truncateText(item.title, 30)}
        </span>
      </div>
      {item.description && (
        <p className="text-sm text-gray-400 line-clamp-3 mb-3">
          {truncateText(item.description, 100)}
        </p>
      )}
      {item.type === 'books' && item.author_names && (
        <p className="text-xs text-gray-500 mb-1">
          <strong>Авторы:</strong> {item.author_names.join(', ')}
        </p>
      )}
      {item.release_date && (
        <p className="text-xs text-gray-500 mb-1">
          <strong>Дата выхода:</strong> {formatDate(item.release_date)}
        </p>
      )}
      {item.genres && item.genres.length > 0 && (
        <p className="text-xs text-gray-500 mb-1">
          <strong>Жанры:</strong> {item.genres.map((genre) => genre.name || genre).join(', ')}
        </p>
      )}
      {item.type === 'board-games' && (
        <>
          {item.players && (
            <p className="text-xs text-gray-500 mb-1">
              <strong>Игроки:</strong> {item.players}
            </p>
          )}
          {item.duration && (
            <p className="text-xs text-gray-500 mb-1">
              <strong>Длительность:</strong> {item.duration}
            </p>
          )}
        </>
      )}
      <div className="mt-auto">
        <Button
          text="Подробнее"
          onClick={handleNavigate}
          variant="primary"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Card;
