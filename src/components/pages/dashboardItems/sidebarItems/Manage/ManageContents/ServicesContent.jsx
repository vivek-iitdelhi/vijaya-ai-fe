import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Status from './Services/Status';
import Playground from './Services/Playground';
import ApiCalls from './Services/ApiCalls';
import Monitoring from './Services/Monitoring';

const ServicesContent = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Status />;
      case 1:
        return <Playground />;
      case 2:
        return <ApiCalls />;
      case 3:
        return <Monitoring />;
      default:
        return <Status />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', 
        minHeight: '90vh', 
        backgroundColor: '#f0f0f0', 
        padding: 0, 
        
      }}
    >
      {/* Main Content Box with improved styling */}
      <Box
        sx={{
          width: '90vw', // Responsive width for the container
          height: '90vh', // Responsive height for the container
          backgroundColor: '#fff', // Keeps content background clean and white
          borderRadius: '16px', // Rounded corners for modern look
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          overflow: 'hidden', // Ensure content stays inside rounded corners
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Tabs Header with minimal spacing */}
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#f8f9fa', // Light background for the header
            padding: '10px 20px', // Padding for clean appearance
            borderBottom: '2px solid #e0e0e0', // Border for separation
            position: 'relative', // Make the tabs sticky
            top: 0, // Stick to the top of the parent container
            zIndex: 1, // Ensure the tabs are on top
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              minHeight: '48px', // Ensure tabs are big enough for touch devices
              fontWeight: 'bold', // Make tabs more prominent
              '& .MuiTab-root': {
                padding: '12px 0', // Adjust padding for better vertical space
              },
            }}
          >
            <Tab label="Status" />
            <Tab label="Playground" />
            <Tab label="API Calls" />
            <Tab label="Monitoring" />
          </Tabs>
        </Box>
        <Box
          sx={{
            flexGrow: 1, // Fills the remaining space below the tabs
            padding: '16px', // Reduce padding for a more compact layout
            backgroundColor: '#f7f7f7', // Neutral background to make the content stand out
            borderRadius: '0 0 16px 16px', // Rounded corners on bottom for seamless look
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default ServicesContent;
