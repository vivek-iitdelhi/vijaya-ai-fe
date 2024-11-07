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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Icon for pulling out the sidebar
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FineTuning from './sidebarItems/FineTuning';
import RAG from './sidebarItems/Rag';
import Tools from './sidebarItems/Tools';
import DBConnection from './sidebarItems/DbConnection';

const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState('Home');
  const [sidebarVisible, setSidebarVisible] = React.useState(true);  // Track sidebar visibility
  const [toolbarVisible, setToolbarVisible] = React.useState(true);  // Track toolbar visibility

  const handleDrawerToggle = () => {
    setSidebarVisible(!sidebarVisible);  // Toggle sidebar visibility
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setToolbarVisible(false);  // Hide the toolbar when a menu item is clicked
  };

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
    <div style={{ paddingTop:'10px' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: 'flex',       
          justifyContent: 'center',  
          width: '100%',        
          mr: 2,                 
        }}
      >
        <h6>@Username</h6>
        <MenuIcon />
      </IconButton>
    
      <Divider />
      <List>
        {['Home', 'Fine Tuning', 'RAG', 'Tools', 'DB Connection'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleOptionClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
          ml: { sm: sidebarVisible ? `${drawerWidth}px` : '0' },  // Adjust based on sidebar visibility
          display: toolbarVisible ? 'flex' : 'none',  // Show/hide the toolbar based on visibility state
        }}
      >

      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          display: sidebarVisible ? 'block' : 'none',  // Hide/Show based on sidebarVisible state
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
            display: { xs: 'none', sm: sidebarVisible ? 'block' : 'none' },  // Hide/Show based on sidebarVisible state
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Sidebar toggle button (Floating button when sidebar is hidden) */}
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
          width: sidebarVisible ? { sm: `calc(100% - ${drawerWidth}px)` } : '100%',  // Adjust width based on sidebar visibility
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
