import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import DatasetContentRAG from './ManageContentsRAG/DatasetContentRAG';
import Embeddings from './ManageContentsRAG/Embeddings';
import ServicesContentRAG from './ManageContentsRAG/ServicesContentRAG';

export default function DatasetManagerRAG() {
  const [selectedSection, setSelectedSection] = useState('datasets');
  const { project_id } = useParams();

  // Animation variants
  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'datasets':
        return <DatasetContentRAG/>;
      case 'embeddings':
        return <Embeddings/>
      case 'services':
        return <ServicesContentRAG/>
      default:
        return <DatasetContentRAG/>;
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        width: '100rem',
        maxWidth: '100%',
        margin: '0 auto',
        '@media (max-width: 1440px)': { width: '80rem', padding: '18px' },
        '@media (max-width: 1024px)': { width: '60rem', padding: '16px' },
        '@media (max-width: 768px)': { width: '100%', padding: '14px' },
        '@media (max-width: 480px)': { padding: '12px' },
      }}
    >
      {/* Navigation Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginBottom: '20px',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px',
          flexDirection: { xs: 'column', sm: 'row' },
          '@media (max-width: 768px)': { gap: '16px' },
        }}
      >
        {['datasets', 'embeddings', 'services'].map((section) => (
          <motion.div
            key={section}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => setSelectedSection(section)}
              variant={selectedSection === section ? 'contained' : 'outlined'}
              sx={{
                width: '150px',
                color: selectedSection === section ? '#fff' : '#1976d2',
                backgroundColor: selectedSection === section ? '#1976d2' : '#fff',
                borderRadius: '8px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                boxShadow:
                  selectedSection === section
                    ? '0px 4px 12px rgba(25, 118, 210, 0.4)'
                    : 'none',
                transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
              }}
            >
              {section.replace(/([A-Z])/g, ' $1')} {/* Format names */}
            </Button>
          </motion.div>
        ))}
      </Box>

      {/* Content Box */}
      <Box
        sx={{
          height: 'calc(100vh - 200px)',
          overflow: 'hidden',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '16px',
          backgroundColor: '#fff',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
          '@media (max-width: 1440px)': { padding: '18px', height: 'calc(100vh - 180px)' },
          '@media (max-width: 1024px)': { padding: '16px', height: 'calc(100vh - 160px)' },
          '@media (max-width: 768px)': { padding: '14px', height: 'calc(100vh - 140px)' },
          '@media (max-width: 480px)': { padding: '12px', height: 'calc(100vh - 120px)' },
        }}
      >
        <motion.div
          key={selectedSection}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderContent()}
        </motion.div>
      </Box>
    </Box>
  );
}  