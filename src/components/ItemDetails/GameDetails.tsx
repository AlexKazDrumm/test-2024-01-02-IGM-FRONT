import React from 'react';
import { MediaItem } from '@/types';
import DetailField from './DetailField';

interface GameDetailsProps {
  item: MediaItem;
}

const GameDetails: React.FC<GameDetailsProps> = ({ item }) => (
  <div className="space-y-2">
    {item.publisher && (
      <DetailField label="Издатель" value={item.publisher} />
    )}
    {item.platform && (
      <DetailField label="Платформа" value={item.platform} />
    )}
  </div>
);

export default GameDetails;