import { Home } from '../pages';
import { Navbar, Footer } from '../components';
const RootLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='container mx-auto px-4 py-8 mb-auto'>
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
