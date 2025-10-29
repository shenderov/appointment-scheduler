import { Outlet } from 'react-router-dom';
import Navbar from '@layout/components/Navbar';
import Footer from '@layout/components/Footer';
import { useAuth } from '@auth/hooks/useAuth';
import { Box } from '@mui/material';

const DefaultLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar role={user?.role} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Box>
    </>
  );
};

export default DefaultLayout;
