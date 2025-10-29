export interface SidebarItem {
  text: string;
  to: string;
}

export interface DashboardLayoutProps {
  sidebarItems: SidebarItem[];
  sidebarTitle?: string;
  drawerWidth?: number;
  navbarHeight?: number;
}
