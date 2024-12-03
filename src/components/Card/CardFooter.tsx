import React from 'react';
import Button from '../UI/Button';
import { useRouter } from 'next/router';
import { MediaItem } from '@/types';

interface CardFooterProps {
  item: MediaItem;
  detailsUrl?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ item, detailsUrl }) => {
  const router = useRouter();
  const linkHref = detailsUrl || `/catalog/${item.type}/${encodeURIComponent(item.id)}`;

  const handleNavigate = () => {
    router.push(linkHref);
  };

  return (
    <div className="mt-auto">
      <Button
        text="Подробнее"
        onClick={handleNavigate}
        variant="primary"
        className="cursor-pointer"
      />
    </div>
  );
};

export default CardFooter;
