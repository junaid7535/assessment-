import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  ExitToApp,
  Dashboard as DashboardIcon,
  AdminPanelSettings,
} from '@mui/icons-material';
import { logout } from '../../services/auth';
import toast from 'react-hot-toast';

const Navbar = ({ user, setUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem component={Link} to="/">
            Home
          </MenuItem>
          {user && (
            <MenuItem component={Link} to="/dashboard">
              <DashboardIcon sx={{ mr: 1 }} />
              Dashboard
            </MenuItem>
          )}
          {user?.role === 'admin' && (
            <MenuItem component={Link} to="/admin">
              <AdminPanelSettings sx={{ mr: 1 }} />
              Admin Panel
            </MenuItem>
          )}
        </Menu>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🍭 Sweet Shop
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ShoppingCart />
          
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person />
                <Typography variant="body2">
                  {user.name} ({user.role})
                </Typography>
              </Box>
              <Button
                color="inherit"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;