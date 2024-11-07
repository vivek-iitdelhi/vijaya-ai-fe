import { useState } from 'react';
import { Box, Button } from '@mui/material';
import DatasetContent from './ManageContents/DatasetContent';
import TrainingJobs from './ManageContents/TrainingJobs';
import ModelArtifacts from './ManageContents/ModelArtifacts';
import ServicesContent from './ManageContents/ServicesContent';
import { useParams } from 'react-router-dom'; // To get the project_id from the URL

export default function DatasetManager() {
  const [selectedSection, setSelectedSection] = useState('datasets');

  const { project_id } = useParams(); // Extract project_id from URL

  const renderContent = () => {
    switch (selectedSection) {
      case 'datasets':
        return <DatasetContent project_id={project_id} />;
      case 'trainingJobs':
        return <TrainingJobs project_id={project_id} />;
      case 'modelArtifacts':
        return <ModelArtifacts project_id={project_id} />;
      case 'services':
        return <ServicesContent project_id={project_id} />;
      default:
        return <DatasetContent project_id={project_id} />;
    }
  };

  return (
    <Box sx={{ padding: '20px', width:"100rem"}}> {/* Overall padding */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', // Center the buttons
          gap: '32px', 
          marginBottom: '20px',
          borderBottom: '2px solid #ddd', // Border below the button section
          paddingBottom: '10px', // Padding below buttons for spacing
        }}
      >
        <Button
          variant={selectedSection === 'datasets' ? 'contained' : 'outlined'}
          onClick={() => setSelectedSection('datasets')}
        >
          Datasets
        </Button>
        <Button
          variant={selectedSection === 'trainingJobs' ? 'contained' : 'outlined'}
          onClick={() => setSelectedSection('trainingJobs')}
        >
          Training Jobs
        </Button>
        <Button
          variant={selectedSection === 'modelArtifacts' ? 'contained' : 'outlined'}
          onClick={() => setSelectedSection('modelArtifacts')}
        >
          Model Artifacts
        </Button>
        <Button
          variant={selectedSection === 'services' ? 'contained' : 'outlined'}
          onClick={() => setSelectedSection('services')}
        >
          Services
        </Button>
      </Box>

      <Box
        sx={{
          height: 'calc(100vh - 200px)',
          overflow: 'auto',
          padding: '20px',
          border: '1px solid #ddd', // Border around the content area
          borderRadius: '8px', // Rounded corners for the content area
          backgroundColor: '#fff', // Background color for the content area
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for the content area
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
} 