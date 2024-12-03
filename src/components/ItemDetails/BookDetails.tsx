import React from 'react';
import { MediaItem } from '@/types';
import DetailField from './DetailField';
import Button from '../UI/Button';
import classNames from 'classnames';

interface BookDetailsProps {
  item: MediaItem;
}

const BookDetails: React.FC<BookDetailsProps> = ({ item }) => (
  <div className="space-y-2">
    {item.author_names && item.author_names.length > 0 && (
      <DetailField label="Авторы" value={item.author_names.join(', ')} />
    )}
    {item.publisher && (
      <DetailField label="Издатель" value={item.publisher} />
    )}
    {item.pages && (
      <DetailField label="Страниц" value={item.pages} />
    )}
    {item.year && (
      <DetailField label="Год издания" value={item.year} />
    )}
    {item.download && (
      <div>
        <Button
          text="Скачать книгу"
          onClick={() => window.open(item.download!, '_blank', 'noopener,noreferrer')}
          variant="primary"
          className={classNames('text-sm')}
        />
      </div>
    )}
  </div>
);

export default BookDetails;