import React from 'react';
import { MediaItem } from '../../types';

interface GameDetailsProps {
  item: MediaItem;
}

const GameDetails: React.FC<GameDetailsProps> = ({ item }) => (
  <div className="space-y-2">
    {item.publisher && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Издатель:</strong> {item.publisher}
      </p>
    )}
    {item.platform && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Платформа:</strong> {item.platform}
      </p>
    )}
  </div>
);

export default GameDetails;
