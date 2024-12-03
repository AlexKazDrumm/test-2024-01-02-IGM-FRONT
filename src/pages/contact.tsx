import type { GetServerSideProps } from 'next';
import Layout from '../components/UI/Layout';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className="px-6 py-12 bg-gray-900 text-gray-200 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8">Контакты</h1>
        <div className="space-y-6">
          <p className="text-lg">
            Хотите обсудить новый блокбастер или задать вопрос о настольной игре? Мы всегда на связи!
          </p>
          <p className="text-lg">
            📧 Email: <a href="mailto:contact@funverse.com" className="text-blue-400 hover:underline">contact@funverse.com</a>
          </p>
          <p className="text-lg">
            🐦 Twitter: <a href="https://twitter.com/funverse" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@FunVerse</a>
          </p>
          <p className="text-lg">
            📞 Телефон: <span className="text-blue-400">+7 (123) 456-7890</span>
          </p>
          <p className="text-lg">
            🕹 Discord-сервер для геймеров и гиков: <a href="https://discord.gg/funverse" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">discord.gg/funverse</a>
          </p>
          <p className="text-lg">
            <em>"Как говорил Йода: Связь важна. Задайте свой вопрос, вы должны."</em>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;