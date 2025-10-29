import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '@layout/components/Navbar';
import Footer from '@layout/components/Footer';
import { useAuth } from '@auth/hooks/useAuth';
import DashboardSidebar from '@layout/components/dashboard/DashboardSidebar';

interface SidebarItem {
  text: string;
  to: string;
}

interface DashboardLayoutProps {
  sidebarItems: SidebarItem[];
  sidebarTitle?: string;
  drawerWidth?: number;
  navbarHeight?: number;
}

const DashboardLayout = ({
  sidebarItems,
  sidebarTitle = 'Dashboard',
  drawerWidth = 240,
  navbarHeight = 64,
}: DashboardLayoutProps) => {
  const { user } = useAuth();

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <Navbar role={user?.role} />
        </Box>

        <Box
          sx={{ display: 'flex', pt: `${navbarHeight}px`, minHeight: '80vh' }}
        >
          <Box
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              position: 'fixed',
              top: `${navbarHeight}px`,
              left: 0,
              height: `calc(100vh - ${navbarHeight}px)`,
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              overflowY: 'auto',
            }}
          >
            <DashboardSidebar
              items={sidebarItems}
              title={sidebarTitle}
              navbarHeight={navbarHeight}
              drawerWidth={drawerWidth}
            />
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              ml: `${drawerWidth}px`,
              p: 3,
              width: `calc(100% - ${drawerWidth}px)`,
            }}
          >
            <Outlet />
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default DashboardLayout;
