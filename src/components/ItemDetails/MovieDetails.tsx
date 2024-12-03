import React from 'react';
import { MediaItem } from '@/types';
import DetailField from './DetailField';
import { formatDate } from '@/utils/formatDate';

interface MovieDetailsProps {
  item: MediaItem;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ item }) => (
  <div className="space-y-2">
    {item.vote_average && (
      <DetailField label="Рейтинг" value={item.vote_average} />
    )}
    {item.vote_count && (
      <DetailField label="Количество голосов" value={item.vote_count} />
    )}
    {item.release_date && (
      <DetailField label="Дата выхода" value={formatDate(item.release_date)} />
    )}
    {item.runtime && (
      <DetailField label="Длительность" value={`${item.runtime} минут`} />
    )}
  </div>
);

export default MovieDetails;