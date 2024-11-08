import { useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const dummyData = [
  { id: 1, name: 'Card 1', description: 'Description of Card 1' },
  { id: 2, name: 'Card 2', description: 'Description of Card 2' },
  { id: 3, name: 'Card 3', description: 'Description of Card 3' },
  { id: 4, name: 'Card 4', description: 'Description of Card 4' },
  { id: 5, name: 'Card 5', description: 'Description of Card 5' },
];

const RAG = () => {
  const [files, setFiles] = useState({});

  const handleFileChange = (event, cardId) => {
    const newFiles = { ...files, [cardId]: event.target.files[0] };
    setFiles(newFiles);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {dummyData.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>  {/* Adjust to 3 cards per row */}
            <Card
              sx={{
                position: 'relative',
                padding: '16px',
                height: '350px',
                width: '100%',
                backgroundColor: '#2196F3',
                color: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '12px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 4px 15px rgba(255, 255, 0, 0.5)',
                },
              }}
            >
              {/* Upload Button at the Right Top */}
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px', 
                  backgroundColor: '#1976D2',
                  borderRadius: '8px',
                  padding: '5px',
                  '&:hover': {
                    backgroundColor: '#1565C0',
                  },
                }}
                color="primary"
              >
                <CloudUploadIcon />
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e, card.id)}
                />
              </IconButton>

              {/* Card Content */}
              <CardContent sx={{ padding: '3rem' }}>
                <div
                  style={{
                    backgroundColor: '#1565C0',
                    padding: '10px',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '8px',
                  }}
                >
                  <Typography variant="h6" component="div" gutterBottom style={{ fontWeight: 'bold',}}>
                    {card.name}
                  </Typography>
                </div>
                <div
                  style={{
                    backgroundColor: '#1976D2',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="body2" color="#fff">
                    {card.description}
                  </Typography>
                </div>
              </CardContent>

              {/* Uploaded File Display */}
              {files[card.id] && (
                <Typography variant="body2" color="primary" sx={{ marginTop: '10px' }}>
                  Uploaded: {files[card.id].name}
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RAG;
