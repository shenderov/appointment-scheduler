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
        <Box
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <Navbar role={user?.role} />
        </Box>
        <main>
          <Outlet />
        </main>
        <Footer />
      </Box>
    </>
  );
};

export default DefaultLayout;
