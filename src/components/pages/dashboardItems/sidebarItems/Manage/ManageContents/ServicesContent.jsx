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
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#f0f0f0', // Background color for the whole page
        padding: '20px', // Adds padding around the entire view
      }}
    >
      {/* Main Content Box with enhanced styling */}
      <Box
        sx={{
          width: '85vw', // Adjust width to be responsive and centered
          height: '85vh', // Maintain relative height
          backgroundColor: '#fff', // Keeps content background clean and white
          borderRadius: '16px', // Slightly more rounded corners for modern look
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)', // Larger shadow for depth
          overflow: 'hidden', // Ensures content stays inside rounded corners
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Tabs Header with better spacing */}
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#f8f9fa', // Slightly lighter background for the header
            padding: '10px 20px', // Adds padding for a cleaner look
            borderBottom: '2px solid #e0e0e0', // Slightly thicker border for separation
            position: 'sticky', // Make the tabs sticky
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

        {/* Tab Content with modern spacing */}
        <Box
          sx={{
            flexGrow: 1, // Fills the remaining space below the tabs
            padding: '30px', // Increased padding for better spacing
            backgroundColor: '#f7f7f7', // Neutral background to make the content stand out
            borderRadius: '0 0 16px 16px', // Rounded corners on bottom for seamless look
            overflow: 'hidden', // Prevents outer scrollbar
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              flexGrow: 1, // Allows this box to take the remaining space
              maxHeight: '100%', // Use maxHeight to limit overflow
              overflowY: 'auto', // Allow inner content to scroll if necessary
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ServicesContent;
