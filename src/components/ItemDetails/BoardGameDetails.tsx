import React from 'react';
import { MediaItem } from '../../types';

interface BoardGameDetailsProps {
  item: MediaItem;
}

const BoardGameDetails: React.FC<BoardGameDetailsProps> = ({ item }) => (
  <div className="space-y-2">
    {item.min_players && item.max_players && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Количество игроков:</strong> от {item.min_players} до {item.max_players}
      </p>
    )}
    {item.duration && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Длительность партии:</strong> {item.duration}
      </p>
    )}
    {item.publisher && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Издатель:</strong> {item.publisher}
      </p>
    )}
  </div>
);

export default BoardGameDetails;
