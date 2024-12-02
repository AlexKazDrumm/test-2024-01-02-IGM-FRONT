import React, { useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import BookDetails from '@/components/ItemDetails/BookDetails';
import GameDetails from '@/components/ItemDetails/GameDetails';
import MovieDetails from '@/components/ItemDetails/MovieDetails';
import BoardGameDetails from '@/components/ItemDetails/BoardGameDetails';
import { fetchItemDetails } from '../../../api/fetchItemDetails';
import { MediaItem, CatalogType } from '../../../types';
import catalogSettings from '@/config/catalogConfig';

interface ItemDetailProps {
  item: MediaItem;
  type: CatalogType;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { type, id } = params as { type: CatalogType; id: string };

  const item = await fetchItemDetails(type, id);

  if (!item) {
    return { notFound: true };
  }

  return { props: { item, type } };
};

const ItemDetail: React.FC<ItemDetailProps> = ({ item, type }) => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string>(
    item.imageUrl || catalogSettings[type].placeholderUrl
  );

  const handleImageError = () => {
    setImageSrc(catalogSettings[type].placeholderUrl);
  };

  const handleBackToCatalog = () => {
    router.push(`/catalog/${type}`);
  };

  const renderSpecificDetails = () => {
    switch (type) {
      case 'books':
        return <BookDetails item={item} />;
      case 'games':
        return <GameDetails item={item} />;
      case 'movies':
        return <MovieDetails item={item} />;
      case 'board-games':
        return <BoardGameDetails item={item} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="p-5 bg-gray-900 min-h-screen">
        <Button
          text="Вернуться к каталогу"
          onClick={handleBackToCatalog}
          variant="secondary"
          className="mb-5"
        />
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[300px] max-w-[400px]">
            <img
              src={imageSrc}
              alt={item.title || 'Placeholder'}
              className="w-full rounded-lg shadow-lg"
              onError={handleImageError}
            />
          </div>
          <div className="flex-1 min-w-[300px]">
            <h1 className="text-3xl font-bold mb-5 text-white">{item.title}</h1>
            {item.description && (
              <p className="text-lg text-gray-300 mb-5">{item.description}</p>
            )}
            {item.genres && item.genres.length > 0 && (
              <p className="text-lg text-gray-300 mb-3">
                <strong className="text-white">Жанры:</strong>{' '}
                {item.genres.map((genre) => genre.name || genre).join(', ')}
              </p>
            )}
            {renderSpecificDetails()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
