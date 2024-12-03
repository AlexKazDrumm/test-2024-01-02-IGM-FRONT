import React from 'react';
import { MediaItem } from '@/types';
import DetailField from './DetailField';

interface BoardGameDetailsProps {
  item: MediaItem;
}

const BoardGameDetails: React.FC<BoardGameDetailsProps> = ({ item }) => (
  <div className="space-y-2">
    {item.min_players && item.max_players && (
      <DetailField
        label="Количество игроков"
        value={`от ${item.min_players} до ${item.max_players}`}
      />
    )}
    {item.duration && (
      <DetailField label="Длительность партии" value={item.duration} />
    )}
    {item.publisher && (
      <DetailField label="Издатель" value={item.publisher} />
    )}
  </div>
);

export default BoardGameDetails;