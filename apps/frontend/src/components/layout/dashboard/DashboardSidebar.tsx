import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
  text: string;
  to: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  title?: string;
  navbarHeight?: number;
  drawerWidth?: number;
}

const DashboardSidebar = ({
  items,
  title = 'Dashboard',
  navbarHeight = 64,
  drawerWidth = 240,
}: DashboardSidebarProps) => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
        },
      }}
    >
      <Typography variant="h6" noWrap sx={{ p: 2 }}>
        {title}
      </Typography>
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={location.pathname === item.to}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default DashboardSidebar;
