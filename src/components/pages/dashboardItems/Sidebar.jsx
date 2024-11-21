import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
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
import DBConnection from './sidebarItems/DbConnection';
import { LiaToolsSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';


// Import ChevronLeftIcon from Material-UI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeWithDragDropContext from './sidebarItems/Home';

const drawerWidth = 240;

// Animation Variants
const sidebarVariants = {
  open: { x: 0, transition: { duration: 0.5 } },
  closed: { x: -drawerWidth, transition: { duration: 0.5 } },
};

const contentVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

function Sidebar(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState('Home');
  const [sidebarVisible, setSidebarVisible] = React.useState(true);
  const [toolbarVisible, setToolbarVisible] = React.useState(true);

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
    navigate(0); // Refresh to simulate a fresh session.
  };

  const username = localStorage.getItem("username") || "User";

  const renderContent = () => {
    switch (selectedOption) {
      case 'Home':
        return <HomeWithDragDropContext/>
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
    <motion.div
      initial="closed"
      animate={sidebarVisible ? 'open' : 'closed'}
      variants={sidebarVariants}
      style={{ height: '100%' }}
    >
      <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            marginX: '0px',
            gap: '75px',
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            width: '100%',
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: 'white' },
          }}
        >
          Dashboard
          <MdMenuOpen />
        </IconButton>
        <Divider />
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
                {icon}
                <ListItemText primary={text} sx={{ ml: 2 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
                <FiUser />
                <ListItemText primary="Profile" sx={{ ml: 2 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <FiSettings />
                <ListItemText primary="Settings" sx={{ ml: 2 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <MdOutlineLogout />
                <ListItemText primary="Logout" sx={{ ml: 2 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </div>
    </motion.div>
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
          ModalProps={{ keepMounted: true }}
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
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
        style={{
          flexGrow: 1,
          padding: '1.5rem',
          width: sidebarVisible ? `calc(100% - ${drawerWidth}px)` : '100%',
        }}
      >
        <Toolbar />
        {renderContent()}
      </motion.div>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
