import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen text-[#5c3a44]">
      <NavBar />
      <main className="pb-10 pt-6 sm:pt-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;