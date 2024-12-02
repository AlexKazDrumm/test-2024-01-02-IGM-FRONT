import React from 'react';
import { MediaItem } from '../../types';
import Button from '../Button';

interface BookDetailsProps {
  item: MediaItem;
}

const BookDetails: React.FC<BookDetailsProps> = ({ item }) => (
  <div className="space-y-2">
    {item.author_names && item.author_names.length > 0 && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Авторы:</strong> {item.author_names.join(', ')}
      </p>
    )}
    {item.publisher && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Издатель:</strong> {item.publisher}
      </p>
    )}
    {item.pages && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Страниц:</strong> {item.pages}
      </p>
    )}
    {item.year && (
      <p className="text-sm text-gray-200">
        <strong className="font-semibold text-white">Год издания:</strong> {item.year}
      </p>
    )}
    {item.download && (
      <div>
        <Button
          text="Скачать книгу"
          onClick={() => {
            if (item.download) {
              window.open(item.download, '_blank', 'noopener,noreferrer');
            }
          }}
          variant="primary"
          className="text-sm"
        />
      </div>
    )}
  </div>
);

export default BookDetails;
