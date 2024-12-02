import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-100 mb-6">404</h1>
        <p className="text-lg text-gray-400 mb-8">
          К сожалению, запрашиваемая страница не найдена.
        </p>
        <a href="/" className="text-blue-400 text-xl hover:underline">
          Вернуться на главную страницу
        </a>
      </div>
    </Layout>
  );
}