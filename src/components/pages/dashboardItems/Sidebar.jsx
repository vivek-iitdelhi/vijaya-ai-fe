import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { FiHome, FiUser, FiSettings, FiDatabase, FiSliders } from 'react-icons/fi';
import { FaConnectdevelop } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineLogout } from 'react-icons/md';
import FineTuning from './sidebarItems/FineTuning';
import RAG from './sidebarItems/Rag';
import Tools from './sidebarItems/Tools';
import DBConnection from './sidebarItems/DbConnection';4
import { LiaToolsSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState('Home');
  const [sidebarVisible, setSidebarVisible] = React.useState(true);
  const [toolbarVisible, setToolbarVisible] = React.useState(true);
  const [loggedOut, setLoggedOut] = React.useState(false);

  const handleDrawerToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setToolbarVisible(false);
  };

  
   
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setLoggedOut(true);
    navigate(0); // This should cause the component to re-render and simulate a fresh session.
  };
  
  // React.useEffect(() => {
  //   if (loggedOut && typeof window !== 'undefined') {
  //     navigate('/'); // Ensures navigation to '/' in case the effect triggers
  //   }
  // }, [loggedOut, navigate]);


  
  
  

  const username = localStorage.getItem("username") || "User"; // Get username from local storage

  const renderContent = () => {
    switch (selectedOption) {
      case 'Home':
        return <Typography variant="h6">Welcome to the Home section!</Typography>;
      case 'Fine Tuning':
        return <FineTuning />;
      case 'RAG':
        return <RAG />;
      case 'Tools':
        return <Tools />;
      case 'DB Connection':
        return <DBConnection />;
      default:
        return null;
    }
  };

  const drawer = (
    <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Username and Menu Icon */}
      <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{
        marginX:'0px',
        gap:'75px',
        display: 'flex',
        alignItems: 'center',
        background: 'white', 
        borderRadius: '0.5rem', 
        padding: '0.5rem', 
        width: '100%',
        justifyContent: 'flex-start', // Aligns content to the left
        '&:hover': {
          backgroundColor: 'white',
        },
      }}
    >
      Dashboard

      <MdMenuOpen />
    </IconButton>

      <Divider />

      {/* Main Navigation List with Icons */}
      <List>
        {[
          { text: 'Home', icon: <FiHome /> },
          { text: 'Fine Tuning', icon: <FiSliders /> },  
          { text: 'RAG', icon: <FaConnectdevelop /> },           
          { text: 'Tools', icon: <LiaToolsSolid /> },      
          { text: 'DB Connection', icon: <FiDatabase /> },
        ].map(({ text, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleOptionClick(text)}>
              {icon} {/* Icon from react-icons */}
              <ListItemText primary={text} sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User Profile Section at the Bottom */}
      <Box sx={{ mt: 'auto', p: 2 }}>
      <h2>User Details</h2>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Avatar sx={{ width: 40, height: 40, mr: 2 }}>{username[0]}</Avatar>
          <Typography variant="body1">@{username}</Typography> 
        </Box>
        
        <List>
          <ListItem disablePadding>
            
            <ListItemButton>
              <FiUser /> {/* Profile icon */}
              <ListItemText primary="Profile" sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <FiSettings /> {/* Settings icon */}
              <ListItemText primary="Settings" sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <MdOutlineLogout /> {/* Logout icon */}
              <ListItemText primary="Logout" sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: sidebarVisible ? `${drawerWidth}px` : '0' },
          display: toolbarVisible ? 'flex' : 'none',
        }}
      />

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          display: sidebarVisible ? 'block' : 'none',
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: sidebarVisible ? 'block' : 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Sidebar toggle button */}
      {!sidebarVisible && (
        <IconButton
          color="primary"
          sx={{
            position: 'fixed',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 1201,
          }}
          onClick={handleDrawerToggle}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: sidebarVisible ? { sm: `calc(100% - ${drawerWidth}px)` } : '100%',
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
