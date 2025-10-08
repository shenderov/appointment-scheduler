import { Outlet } from 'react-router-dom';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import { useAuth } from '@auth/hooks/useAuth';

const DefaultLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar role={user?.role} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
