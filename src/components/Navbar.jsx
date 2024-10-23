import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check for token in localStorage
  const checkAuthentication = () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Return true if token exists
  };

  // Set the initial authentication state when component mounts
  useEffect(() => {
    setIsAuthenticated(checkAuthentication());
  }, []);

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to open the dashboard in a new tab
  const openDashboardInNewTab = () => {
    window.open('/dashboard', '_blank'); // Opens dashboard in a new tab
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setIsAuthenticated(false); // Update authentication state
    window.location.reload();  // Reload the page to reflect changes
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#333',
        color: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={handleDrawerToggle}
    >
      <List>
        <ListItem button onClick={openDashboardInNewTab} sx={{ padding: '1rem', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {!isAuthenticated && (
          <ListItem button component={NavLink} to="/login" sx={{ padding: '1rem', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
            <ListItemText primary="Log In" />
          </ListItem>
        )}
        <ListItem button component={NavLink} to="/about" sx={{ padding: '1rem', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={NavLink} to="/contactus" sx={{ padding: '1rem', color: '#fff', '&:hover': { backgroundColor: '#555' } }}>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
      <Box sx={{ padding: '1rem', backgroundColor: '#222' }}>
        <Typography variant="body2" align="center" color="#aaa">
          © 2024 Vijaya AI
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(45deg, #6a00f4 30%, #f20089 90%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'background 0.3s ease',
          marginBottom: '100px',
          height: '64px',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#fff',
              fontWeight: 700,
              letterSpacing: '1px',
              fontSize: '1.8rem',
              transition: 'color 0.3s ease',
              '&:hover': { color: '#ffd700' }
            }}
          >
            Vijaya AI
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="inherit"
                onClick={openDashboardInNewTab}
                sx={{
                  mx: 1,
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'color 0.3s ease, background 0.3s ease',
                  '&:hover': {
                    color: '#6a00f4',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to="/about"
                sx={{
                  mx: 1,
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'color 0.3s ease, background 0.3s ease',
                  '&:hover': {
                    color: '#6a00f4',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                About
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to="/contactus"
                sx={{
                  mx: 1,
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'color 0.3s ease, background 0.3s ease',
                  '&:hover': {
                    color: '#6a00f4',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Contact Us
              </Button>
              {isAuthenticated ? (
                <>
                  <Typography
                    variant="body1"
                    sx={{
                      mx: 1,
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                  </Typography>
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    sx={{
                      mx: 1,
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'color 0.3s ease, background 0.3s ease',
                      '&:hover': {
                        color: '#6a00f4',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/login"
                  sx={{
                    mx: 1,
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'color 0.3s ease, background 0.3s ease',
                    '&:hover': {
                      color: '#6a00f4',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Log In
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: '64px', width: '100%' }}>
        <Drawer anchor="left" open={menuOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
