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
  const [credits, setCredits] = useState(null); // Initially null to indicate loading
  const [error, setError] = useState(null); // To handle errors for credits

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const getToken = () => localStorage.getItem('authToken');

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const openDashboardInNewTab = () => {
    window.open('/dashboard', '_blank');
  };

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const token = getToken(); 

        const response = await fetch(`${import.meta.env.VITE_HOST_URL}/credits/`, {
          headers: {
            Authorization: `Token ${token}`,
            "ngrok-skip-browser-warning": "69420"
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCredits(data.total_credits); 
      } catch (err) {
        setError('Failed to load credits');
        console.error(err);
      }
    };

    fetchCredits();
  }, []);


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
        <ListItem
          button
          onClick={openDashboardInNewTab}
          sx={{ padding: '1rem', color: '#fff', '&:hover': { backgroundColor: '#555' } }}
        >
          <ListItemText primary="Dashboard" />
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
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="a"
            href="https://www.vijaya.ai/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#fff',
              fontWeight: 700,
              letterSpacing: '1px',
              fontSize: '1.8rem',
              transition: 'color 0.3s ease',
              '&:hover': { color: '#ffd700' },
            }}
          >
            Vijaya AI
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  mr: 2,
                }}
              >
                {error ? error : credits !== null ? `Total Credits: $${credits}` : 'Loading...'}
              </Typography>
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
