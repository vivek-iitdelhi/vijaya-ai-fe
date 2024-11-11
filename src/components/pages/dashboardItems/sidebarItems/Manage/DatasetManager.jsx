import { useState } from 'react';
import { Box, Button } from '@mui/material';
import DatasetContent from './ManageContents/DatasetContent';
import TrainingJobs from './ManageContents/TrainingJobs';
import ModelArtifacts from './ManageContents/ModelArtifacts';
import ServicesContent from './ManageContents/ServicesContent';
import { useParams } from 'react-router-dom';

export default function DatasetManager() {
  const [selectedSection, setSelectedSection] = useState('datasets');
  const { project_id } = useParams();

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
    <Box 
      sx={{ 
        padding: '20px', 
        width: '100rem',  // Original width for 17-inch screen
        maxWidth: '100%', // Ensure it doesn’t exceed screen width
        margin: '0 auto', // Center on smaller screens
        '@media (max-width: 1440px)': { // Large screens
          width: '80rem',
          padding: '18px',
        },
        '@media (max-width: 1024px)': { // Medium screens like tablets
          width: '60rem',
          padding: '16px',
        },
        '@media (max-width: 768px)': { // Small screens like large phones
          width: '100%',
          padding: '14px',
        },
        '@media (max-width: 480px)': { // Extra-small screens
          padding: '12px',
        },
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '32px', 
          marginBottom: '20px',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on small screens
          '@media (max-width: 768px)': { // Small screens
            gap: '16px',
          },
        }}
      >
        <Button
          variant={selectedSection === 'datasets' ? 'contained' : 'outlined'}
          onClick={() => setSelectedSection('datasets')}
          fullWidth={{ xs: true, sm: false }}
        >
          Datasets
        </Button>
        <Button
          variant={selectedSection === 'trainingJobs' ? 'contained' : 'outlined'}
          onClick={() => setSelectedSection('trainingJobs')}
          fullWidth={{ xs: true, sm: false }}
        >
          Training Jobs
        </Button>
        <Button
          variant={selectedSection === 'modelArtifacts' ? 'contained' : 'outlined'}
          onClick={() => setSelectedSection('modelArtifacts')}
          fullWidth={{ xs: true, sm: false }}
        >
          Model Artifacts
        </Button>
        <Button
          variant={selectedSection === 'services' ? 'contained' : 'outlined'}
          onClick={() => setSelectedSection('services')}
          fullWidth={{ xs: true, sm: false }}
        >
          Services
        </Button>
      </Box>

      <Box
        sx={{
          height: 'calc(100vh - 200px)',
          overflow: 'auto',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          '@media (max-width: 1440px)': { // Large screens
            padding: '18px',
            height: 'calc(100vh - 180px)',
          },
          '@media (max-width: 1024px)': { // Medium screens
            padding: '16px',
            height: 'calc(100vh - 160px)',
          },
          '@media (max-width: 768px)': { // Small screens
            padding: '14px',
            height: 'calc(100vh - 140px)',
          },
          '@media (max-width: 480px)': { // Extra-small screens
            padding: '12px',
            height: 'calc(100vh - 120px)',
          },
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}
