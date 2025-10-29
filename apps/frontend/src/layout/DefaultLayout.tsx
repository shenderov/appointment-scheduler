import { Outlet } from 'react-router-dom';
import Navbar from '@layout/components/Navbar';
import Footer from '@layout/components/Footer';
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
