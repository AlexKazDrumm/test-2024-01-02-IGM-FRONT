import React from 'react';
import { formatDate } from '@/utils/formatDate';
import { MediaItem } from '@/types';

interface CardMetaProps {
  item: MediaItem;
}

const CardMeta: React.FC<CardMetaProps> = ({ item }) => {
  const renderGenres = () =>
    item.genres && item.genres.length > 0 && (
      <p className="text-xs text-gray-500 mb-1">
        <strong>Жанры:</strong> {item.genres.map((genre) => genre.name || genre).join(', ')}
      </p>
    );

  const renderReleaseDate = () =>
    item.release_date && (
      <p className="text-xs text-gray-500 mb-1">
        <strong>Дата выхода:</strong> {formatDate(item.release_date)}
      </p>
    );

  const renderAuthors = () =>
    item.type === 'books' && item.author_names && (
      <p className="text-xs text-gray-500 mb-1">
        <strong>Авторы:</strong> {item.author_names.join(', ')}
      </p>
    );

  const renderBoardGameDetails = () =>
    item.type === 'board-games' && (
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
    );

  return (
    <>
      {renderReleaseDate()}
      {renderGenres()}
      {renderAuthors()}
      {renderBoardGameDetails()}
    </>
  );
};

export default CardMeta;
