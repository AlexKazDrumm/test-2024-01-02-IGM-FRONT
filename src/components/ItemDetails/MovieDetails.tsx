import React from 'react';
import { MediaItem } from '../../types';
import { formatDate } from '@/utils/formatDate';

interface MovieDetailsProps {
  item: MediaItem;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ item }) => (
  <div className="space-y-2">
    {item.vote_average && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Рейтинг:</strong> {item.vote_average}
      </p>
    )}
    {item.vote_count && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Количество голосов:</strong> {item.vote_count}
      </p>
    )}
    {item.release_date && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Дата выхода:</strong> {formatDate(item.release_date)}
      </p>
    )}
    {item.runtime && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Длительность:</strong> {item.runtime} минут
      </p>
    )}
  </div>
);

export default MovieDetails;
