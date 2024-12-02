import type { GetServerSideProps } from 'next';
import Layout from '../components/Layout';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

const About: React.FC = () => {
  return (
    <Layout>
      <div className="px-6 py-12 bg-gray-900 text-gray-200 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8">О нас</h1>
        <div className="space-y-6">
          <p className="text-lg">
            Добро пожаловать в <strong>FunVerse</strong> — ваш путеводитель в миры, где мечты
            сбываются, а время словно останавливается. Здесь мы объединяем увлекательные фильмы, 
            захватывающие книги, культовые видеоигры и стратегические настольные игры.
          </p>
          <p className="text-lg">
            Наша команда — это те самые гики, которые могут спорить часами, кто сильнее — Джон Уик или Бэтмен,
            или обсуждать, почему Гэндальф всё-таки взял с собой хоббитов. Мы хотим делиться нашей страстью с вами.
          </p>
          <p className="text-lg">
            Почему FunVerse? Потому что мы верим, что каждая история, каждое приключение — это 
            маленькая вселенная. А в нашем каталоге таких вселенных тысячи!
          </p>
          <p className="text-lg italic">
            "В конце концов, не важно, кто выиграет. Важно, что вы играете. Играйте красиво." — 
            <span className="text-blue-400">неизвестный гик</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
