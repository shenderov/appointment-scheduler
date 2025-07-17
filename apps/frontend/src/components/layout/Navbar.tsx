import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Role } from '@shared/models/enums';

interface NavbarProps {
  role: Role;
}

const Navbar: React.FC<NavbarProps> = ({ role }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = () => {
    switch (role) {
      case Role.Admin:
        return (
          <>
            <Button component={RouterLink} to="/dashboard" color="inherit">
              Dashboard
            </Button>
            <Button component={RouterLink} to="/users" color="inherit">
              Users
            </Button>
            <Button component={RouterLink} to="/providers" color="inherit">
              Providers
            </Button>
          </>
        );
      case Role.Provider:
        return (
          <>
            <Button component={RouterLink} to="/record" color="inherit">
              Record an Appointment
            </Button>
            <Button component={RouterLink} to="/dashboard" color="inherit">
              Dashboard
            </Button>
          </>
        );
      case Role.Client:
        return (
          <>
            <Button component={RouterLink} to="/book" color="inherit">
              Book an Appointment
            </Button>
            <Button component={RouterLink} to="/profile" color="inherit">
              My Profile
            </Button>
          </>
        );
      case Role.Guest:
      default:
        return (
          <>
            <Button component={RouterLink} to="/book" color="inherit">
              Book an Appointment
            </Button>
            <Button component={RouterLink} to="/auth/login" color="inherit">
              Log In / Sign Up
            </Button>
          </>
        );
    }
  };

  const showDropdown =
    role === Role.Client || role === Role.Provider || role === Role.Admin;

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ textDecoration: 'none' }}
          >
            WellnessCare
          </Typography>
        </Box>

        {renderMenuItems()}

        {showDropdown && (
          <>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMenu}
              sx={{ ml: 2 }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/account"
              >
                My Account
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/auth/logout"
              >
                Exit
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
