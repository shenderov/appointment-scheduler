import type { ReactNode } from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import { useAuth } from '@context/AuthContext';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { user } = useAuth();

  return (
    <>
      <Navbar role={user.role} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
