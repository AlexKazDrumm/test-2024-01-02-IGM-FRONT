import { GetServerSideProps } from 'next';
import Layout from "../components/Layout";
import Card from "../components/Card";
import catalogSettings from '@/config/catalogConfig';

export const getServerSideProps: GetServerSideProps = async () => {
  // Извлекаем homeSection для каждого типа
  const sections = Object.values(catalogSettings).map((config) => config.homeSection);
  return {
    props: {
      sections,
    },
  };
};

interface HomeProps {
  sections: typeof catalogSettings[keyof typeof catalogSettings]['homeSection'][];
}

export default function Home({ sections }: HomeProps) {
  return (
    <Layout>
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          Добро пожаловать на платформу!
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Выберите категорию:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Card
              key={section.title}
              item={{
                id: section.title,
                type: section.type,
                title: section.title,
                description: section.description,
                imageUrl: section.imageUrl,
              }}
              placeholderUrl={section.placeholderUrl}
              detailsUrl={section.detailsUrl}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}