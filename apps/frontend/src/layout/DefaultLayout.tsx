import type { ReactNode } from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
  userRole?: 'guest' | 'user' | 'provider' | 'admin';
}

const DefaultLayout = ({
  children,
  userRole = 'admin',
}: DefaultLayoutProps) => {
  return (
    <>
      <Navbar role={userRole} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
