import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="flex-1 py-5 mx-auto w-4/5 box-border">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;