import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import Layout from '@/components/UI/Layout';
import Button from '@/components/UI/Button';
import { fetchItemDetails } from '@/api/fetchItemDetails';
import { MediaItem, CatalogType } from '@/types';
import { getDetailsComponent } from '@/components/ItemDetails';
import ImageWithFallback from '@/components/ItemDetails/ImageWithFallback';

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

  const handleBackToCatalog = useCallback(() => {
    router.push(`/catalog/${type}`);
  }, [router, type]);

  const DetailsComponent = getDetailsComponent(type);

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
            <ImageWithFallback
              src={item.imageUrl ?? undefined}
              alt={item.title || 'Placeholder'}
              type={type}
              className="w-full rounded-lg shadow-lg"
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
            {DetailsComponent && <DetailsComponent item={item} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;